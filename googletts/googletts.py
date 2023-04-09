from fastapi import HTTPException
from fastapi.responses import StreamingResponse
from google.cloud import texttospeech
import io

client = texttospeech.TextToSpeechClient.from_service_account_json('just-say-net-d4b38777b915.json')

def GoogleTTS(ssml, gender, lang_code, voice_name, feeling, volume, speaking_rate):
    comp_ssml = f'<speak><voice name="{voice_name}">{ssml}</voice></speak>'
    synthesis_input = texttospeech.SynthesisInput(ssml=comp_ssml)
    voice = texttospeech.VoiceSelectionParams(
        language_code=lang_code,
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(
        pitch=1,# [-20.0, 20.0] pitch를 올릴수록 약간 여성스러워지고, 너무 높이 올리면 목이 쉰 사람 같다. -로 내려가면 중저음의 보이스
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=speaking_rate,  # [0.25, 4.0] 
        volume_gain_db=1 # [-96.0, 16.0] , 주변 상황에 따라 크게 말하는 점원이 있을 수도, 작게 말할 수도..
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