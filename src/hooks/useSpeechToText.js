import { useEffect, useState } from "react";

const useSpeechToText = ({ isRecording }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    let recognition = null;

    const handleResult = (event) => {
      const results = event.results;
      const contents = [];
      Object.keys(results).forEach((key) =>
        contents.push(results[key][0].transcript)
      );
      const content = contents.join(" ");
      setContent(content);
    };

    if (isRecording) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.onresult = handleResult;
      recognition.onerror = (event) => {
        console.error(event.error);
      };
      recognition.start();
    } else {
      if (recognition) {
        recognition.stop();
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isRecording]);

  return content;
};

export default useSpeechToText;
