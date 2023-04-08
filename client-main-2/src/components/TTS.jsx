import React, { useRef, useState } from "react";
import axios from "axios";

const TTS = () => {
  const audioRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const callTTS = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("https://api.just-say.net/api/v1/tts", {
        ssml:
          '<speak> <voice name="en-GB-Wavenet-A">This your <emphasis level="moderate">coffee.</emphasis></voice> <break time="1s"/>Enjoy it! <prosody rate="slow" pitch="-2st">Take your time</prosody> </speak>',
        lang_code: "en-US",
        pitch: 0,
        volume: 10.0,
        speaking_rate: 1,
      },
      { responseType: "arraybuffer" } // responseType 설정 추가
      );
      const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={callTTS} disabled={isLoading}>
        {isLoading ? "Loading..." : "Play Audio"}
      </button>
      <audio ref={audioRef} controls></audio>
    </>
  );
};

export default TTS;