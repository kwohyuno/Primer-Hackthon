import axios from "axios";
import { callTTS1 } from "../api/talk";

const useTextToSpeech = async ({
  ssml = "This your coffee. Enjoy it! Take your time",
  lang_code = "en-US",
  voice_name = "en-GB-Wavenet-A",
  feeling = "happy", // normal/sad/angry/happy 중 하나. 기본값은 normal
  gender = 'man',
  volume = 10.0,
  speaking_rate = 1,
}) => {
  console.log("hooks: ", lang_code, voice_name, feeling, gender);
  return await callTTS1({
    ssml,
    lang_code,
    voice_name,
    feeling,
    gender,
    volume,
    speaking_rate,
  });
}

export default useTextToSpeech;
