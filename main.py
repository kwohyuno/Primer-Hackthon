import logging
from fastapi import FastAPI, APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseSettings, BaseModel
from chatgpt.chatgpt import askToChatGPT
from googletts.googletts import GoogleTTS

class Settings(BaseSettings):  # 배포용 스크립트로 환경변수를 설정하게 되면 기본 설정값을 비워주세요.
    APP_ENV: str = 'dev'
    AWS_ACCESS_KEY_ID: str = ''
    AWS_SECRET_ACCESS_KEY: str = ''
    REGION_NAME: str = 'ap-northeast-2'
settings = Settings()

logging.basicConfig(level=logging.WARNING, filename='./log.txt', filemode='w')
logger = logging.getLogger('[main.py]: ')

app = FastAPI()
router = APIRouter()

# CORS 설정
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# for healthcheck
@app.get("/")
def hc():
    return 200

'''
서버에서 보내는 모든 응답에는 "status"값이 포함되며, "ok" 또는 "fail"이 될 수 있습니다.
client에서 messages = [] 의 내용을 JSON.stringify()로 직렬화하여 전달해야 합니다.
'''
@app.post("/api/v1/gpt")
async def ask2GPT(request: Request):
    messages = await request.json()
    return askToChatGPT(messages)

'''
사운드가 정상적으로 생성되면 StreamingResponse로 응답합니다.
'''
# 세션 종료 시 에러 발생하는 로그 기록해서 확인 필요
@app.post("/api/v1/tts")
async def askTTS(request: Request):
    data = await request.json()
    askMsg = [
        {"role":"system", "content":"Let's say your role is a cafe manager. Do not include 'swipe machine provided' in the conversation."},
        {"role":"user" , "content":"A cafe manager says \"" + data['ssml'] + "\". Transcribe that sentence into SSML with " + data['feeling'] + ". Don't use values starting with x- for rate. Do not use an interjection. Don't use emojis. Don't say be programmed"}
    ]
    ret = askToChatGPT(askMsg)
    if ret['status'] == 'ok' and ret['answer']:
        return GoogleTTS(ret['answer'], data['gender'], data['lang_code'], data['voice_name'], data['feeling'], data['volume'], data['speaking_rate'])
    else:
        return GoogleTTS(data['ssml'], data['gender'], data['lang_code'], data['voice_name'], data['feeling'], data['volume'], data['speaking_rate'])    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)