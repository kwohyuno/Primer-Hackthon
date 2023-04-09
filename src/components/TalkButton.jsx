import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useTextToSpeech from "../hooks/useTextToSpeech";
import { useAtom, useAtomValue } from "jotai";
import { infoAtom, isCloseAtom, userLevel, isLikeAtom, messagesAtom, voiceInfoAtom } from "../atom/atom";
import lang_data from "../assets/language.json";
import cafe_info from "../assets/cafe.json";
import { useNavigate } from "react-router-dom";
import Loading from "./common/Loading";

import Mice1 from '/img/mice.png';
import Mice2 from '/img/mice2.png';
import { callGPT1 } from "../api/talk";

const TalkButton = () => {
    const audioRef = useRef(null);
    const [info, setInfo] = useAtom(infoAtom);
    const [level, setLevel] = useAtom(userLevel);
    const [content, setContent] = useState("");
    const [messages, setMessages] = useAtom(messagesAtom);
    const isLike = useAtomValue(isLikeAtom);
    
    const userAgent = navigator.userAgent.toLowerCase();

    const [isRecording, setIsRecording] = useState(false);
    const [isClose, setIsClose] = useAtom(isCloseAtom)
    const navitate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [voiceInfo1, setVoiceInfo] = useAtom(voiceInfoAtom)

    const initTTS = () => {
        let sex = ["man","woman"][Math.floor(Math.random()*2)]
        let feelingnow = ["normal","happy","tired", "busy"][Math.floor(Math.random()*4)]
        let lang_voice = "";
        const langdetail = lang_data.language.find(item => item.name === info.language.value);
        if(!langdetail){
            console.log("RESET Voice 1 !")
            lang_voice = "en-US-Wavenet-A"
        }else {
            const accent = langdetail.accents.find(item => item.name === info.city.value)
            if(!accent){
                console.log("RESET Voice 2 !")
                lang_voice = "en-US-Wavenet-A"
            }else{
                lang_voice = accent[sex].voices[Math.floor(Math.random()*accent[sex].voices.length)]
                console.log(accent, sex, lang_voice)
            }
        }

        setVoiceInfo(prev => {
            let newVoice = {...prev};
            newVoice = {
                gender: sex,
                feeling: feelingnow,
                lang_code: info.city.value,
                lang_voice, 
            }
            console.log("setVoiceInfo : " , newVoice);
            setVoiceInfo(newVoice);
            return newVoice;
        })

        return { sex, feelingnow, lang_voice }
    }

    const initGPT = (feelingnow) => {
        //  기본 역할 정의
        let define_bot_role = "you are a cafe manager."
        //  카페 메뉴 설정. 이미지에 있는 메뉴 모두 추가
        let menu_num = cafe_info.menu_list.length;
        define_bot_role += `you have ${menu_num} menus. The menus and price are `;
        const menus = cafe_info.menu_list.map(item => item.menu);
        const prices = cafe_info.menu_list.map(item => item.price);
        for (let idx = 0; idx < menu_num; idx++) {
          define_bot_role += `${menus[idx]} and price is ${prices[idx]}`;
          if (idx === menu_num - 1) {
            define_bot_role += ".";
          } else {
            define_bot_role += ",";
          }
        }
        //  매니저 성격 설정. prompt에 영향을 미친다.
        define_bot_role += "you are " + feelingnow + " now.";
        //  그 외 기본 세팅
        define_bot_role += "always say in " + info.language.value +"."
        // 시작할 때 유저가 먼저 말하는게 아니고 chatGPT가 먼저 인사하게 만듭니다.
        define_bot_role += "Let's start now. You say 'Can I take your order?' in "+ info.language.value + " first."
        // 고객이 이미 카페 안에 있다고 가정합니다 (방문해서 알아보세요라는 대답 방지 )
        define_bot_role += "The customer is currently in the cafe."
        // 외국어로 말하면 잘 모르겠다고(이해를 못하겠다고) 답변
        define_bot_role += "you do not understand if the customer does not speak in " + info.language.value + "."
        // 포장 여부 혹은 결제 방법 꼭 물어보기 
        define_bot_role += "during the conversation, payment method and for here or to go is important."
        define_bot_role += "Ask one question at a time. "
        define_bot_role += "do not include 'swipe machine provided' in the conversation."

        //  초기 프롬프트 설정
        let msgList = []
        msgList.push({"role":"system", "content": define_bot_role})
        // 항상 상기시켜야 하는 내용들?
        // 이후 4096을 넘어갔을 때 다시 한번 상기시켜야 함.
        let notice_msg = "you never say you are a bot but pretend you are a cafe manager."
        console.log(level)
        if(level === "begin"){
            notice_msg += "use easy and simple vocabularies. use less than 3 sentences.";
        }else if(level === "hard"){
            notice_msg += "use difficult vocabularies and difficult adjective.";
        }
        notice_msg += "Use "+info.language.value+" only."
        notice_msg += "add @ at the end of conversation if the order and payment made by user was successful."
        notice_msg += "The following is the start of conversation with customer and start talking 'Welcome!' include another one sentence."
        msgList.push({"role":"user", "content": notice_msg})
        setMessages(messages);
        return msgList;
    }

    // TTS & GPT 초기화 및 호출
    useEffect(() => {

        if (!isClose) {
            console.log("useEffect Closed!")
            return;
        }

        console.log(isLike);

        if (isLike) {

            const { sex, feelingnow, lang_voice } = initTTS();
    
            const voiceInfo = {
                gender: sex,
                feeling: feelingnow,
                lang_code: info.city.value,
                lang_voice
            }
    
            const messages = initGPT(feelingnow);
            // 다른 직원
            callGPT(messages, voiceInfo)
        } else {
            
            const newMessages = initGPT(voiceInfo1.feeling);
            console.log(newMessages, voiceInfo1);
            // 같은 직원
            callGPT(newMessages, voiceInfo1)
        }

    }, [isClose, isLike])

    const callGPT = async (msgs, voiceInfo) => {

        // 입력 값이 없을 경우 GPT 호출 방지
        if (msgs[msgs.length - 1].content === '') return;
        setLoading(true);
        // GPT API 호출
        const res = await callGPT1(msgs);
        // GPT 답변 저장
        msgs.push({"role":"assistant", "content": res.data.answer})  
        console.log( "SET Message List =", msgs)
        // messages 업데이트
        setMessages(msgs);  

        let answer = `${res.data.answer}`
        if(answer === undefined || answer.length < 1){
            //  예외 발생 
            console.log("ERROR ", answer);
        }else{
            callTTS(answer, voiceInfo).then(() => {
                // GPT가 대화가 끝났다고 판단하면 성공 페이지로 이동
                if (res.data.answer.includes("@")) {
                    //  음성 데이터는 비동기 형태로 출력되므로 (사운드 버퍼에 순차적으로 기록됨.) 이 시점에 아직 대화가 출력중임.
                    //  약 5초 후 화면 전환 발생하게 수정하자.
                    setTimeout(() => {
                        setIsClose(false)
                        navitate(`/result/success`)
                    }, 5000);
                }
            });
        }
    }

    const callTTS = (answer, voiceInfo) => {
        return new Promise( async (resolve, reject) => {
            console.log(" TTS 요청 : " + answer, voiceInfo.gender, voiceInfo.feeling, voiceInfo.lang_code, voiceInfo.lang_voice)
            answer = answer.replace("@", "");   //  점원의 마지막 대사가 전달될 수 있음.
            try {
                const res = await useTextToSpeech({ ssml: answer, gender: voiceInfo.gender, feeling: voiceInfo.feeling, voice_name: voiceInfo.lang_voice, lang_code: voiceInfo.lang_code });
                const audioBlob = new Blob([res.data], { type: "audio/mpeg" });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioRef.current.src = audioUrl;
                await audioRef.current.play();
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
            resolve();
        });
    }

    useEffect(() => {
        // if (!isRecording) return;
        let recognition = null;
        let content = "";
        const handleResult = async (event) => {
            const results = event.results;
            const contents = []
            await Object.keys(results).forEach(key => contents.push(results[key][0].transcript))
            content = contents.join(' ,')
            console.log(content);
            setContent(content); // setContent 호출
            await requestGPT();
        }

        function requestGPT() {
            if (recognition && content) {
                recognition.stop();
                setIsRecording(!isRecording);
                setMessages(prev => {
                    if(content === undefined || content.length < 1){
                        console.log("nothing!!", prev)
                        setMessages(prev);
                        return prev;
                    }else{
                        const newMessages = [...prev]
                        newMessages.push({
                            role: "user",
                            content,
                        })
                        callGPT(newMessages, voiceInfo1)
                        setMessages(newMessages);
                        console.log("new message = ", newMessages);
                        return newMessages;
                    }
                })
            }
        }

        if (isRecording) {
            recognition = new window.webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.lang = "en-US";
            recognition.onresult = handleResult; // 이벤트 핸들러를 변수로 빼서 사용
            recognition.onerror = (event) => {
                console.error(event.error);
            }
            recognition.start();
        }
    }, [isRecording]);

    const handleRecognition = () => {
        console.log("handleRecognition", isRecording)
        setIsRecording(!isRecording);
    };

    return (
        <>
            {loading ? 
                <Loading /> :
                <>
                    <Help>
                        {userAgent.match(/iphone|ipad|ipod|android/) ? 
                            (!isRecording ? '터치하여 대화를 시작하세요':'듣는 중이에요..') :
                            (!isRecording ? '클릭하여 대화를 시작하세요':'듣는 중이에요..')
                        }
                    </Help>
                    <TalkButtonBlock onClick={handleRecognition} >
                        <img src={isRecording ? Mice2 : Mice1 } alt="mice" />    
                    </TalkButtonBlock>
                </> 
            }
            <audio controls ref={audioRef} style={{"display": "none"}}></audio>
        </>
    )
}

const TalkButtonBlock = styled.div`
    cursor: pointer;
    
`

const Help = styled.div`
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    padding: 30px 0;
    @media screen and (max-width: 575px){
        padding: 10px 0;
    }
`

export default TalkButton;
