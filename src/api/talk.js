import { instance } from ".";

const callGPT1 = (payload) => {
    return instance.post(`api/v1/gpt`, payload, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
}

const callTTS1 = (payload) => {
    return instance.post(`api/v1/tts`, payload, {
      responseType: "arraybuffer", // responseType 설정 추가
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
};

export { callGPT1, callTTS1 };