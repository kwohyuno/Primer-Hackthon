from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import texttospeech
import io

app = FastAPI()

# CORS 설정
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/api/v1/tts')
async def text_to_speech(request: Request):
    request_data = await request.json()
    print(request_data)
    ssml = request_data['ssml']
    lang_code = request_data['lang_code']
    pitch=request_data['pitch']
    speaking_rate=request_data['speaking_rate']
    volumn_gain_db=10 # request_data['volumn'] 계속 키 에러나네... 모지??
    # Text-to-Speech API 인증 정보 생성
    client = texttospeech.TextToSpeechClient.from_service_account_json('just-say-net-d4b38777b915.json')

    comp_ssml = f'<speak><voice name="en-GB-Wavenet-A"><prosody pitch="+20%" rate="fast" volume="loud">Enjoy it. take your time.</prosody></voice></speak>'
    # Text-to-Speech API 호출
    synthesis_input = texttospeech.SynthesisInput(ssml=comp_ssml)
    voice = texttospeech.VoiceSelectionParams(
        language_code=lang_code,
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(
        pitch=1,# [-20.0, 20.0] pitch를 올릴수록 약간 여성스러워지고, 너무 높이 올리면 목이 쉰 사람 같다. -로 내려가면 중저음의 보이스
        audio_encoding=texttospeech.AudioEncoding.MP3,
        # 1.3만 되어도 너무 빠른 느낌임. 급한 사람도 1.2 이상은 올리지 말자. 너무 어색해.
        # 0.7 이하로 내리면 너무 느려서 불편함. 0.8 정도가 적당한 느낌.
        # ssml 의 break를 넣어둔 경우 break 시간까지 빨라지지는 않는다. 사용에 주의가 필요.
        speaking_rate=speaking_rate,  # [0.25, 4.0] 
        volume_gain_db=10 # [-96.0, 16.0] , 주변 상황에 따라 크게 말하는 점원이 있을 수도, 작게 말할 수도..
        #sample_rate_hertz (int):
        #effects_profile_id # audio profiles <https://cloud.google.com/text-to-speech/docs/audio-profiles>
    )
    print(synthesis_input)
    print(voice)
    print(audio_config)    
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    if response.audio_content:
        # Stream the response audio content back to the client
        return StreamingResponse(io.BytesIO(response.audio_content), media_type="audio/mp3")

    raise HTTPException(status_code=404, detail="Audio content not found")
    # def generate():
    #     chunk = response.audio_content
    #     while chunk:
    #         yield chunk
    #         chunk = response.audio_content

    # return StreamingResponse(generate(), media_type='audio/mpeg')

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
