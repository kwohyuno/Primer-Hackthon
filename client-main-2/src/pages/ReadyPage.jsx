import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { infoAtom } from "../atom/atom";
import ReadyCafe from '/img/준비_카페.png';
import useSpeechToText from "../hooks/useSpeechToText";
import { useEffect, useState } from "react";

const ReadyPage = () => {

    const [isRecording, SetIsRecording] = useState(false);

    const navigate = useNavigate();

    const info = useAtomValue(infoAtom);
    
    let text = useSpeechToText({ isRecording });

    const handleClick = () => {
        SetIsRecording(!isRecording)
    }

    useEffect(() => {
        if (!isRecording) {
            return;
        } else if (text){
            SetIsRecording(false);
        }
    },[text])

    return (
        <ReadyBlock>
            <TextBlock>
                {info.city.name} 34st 카페에 도착했어요. <br />
                <div className="sub">
                    메뉴를 보고, 내가 먹고 싶은 것을 주문해 볼까요?
                </div>
            </TextBlock>
            <div className="btn-box">
                <Help>내 스피커와 마이크가 잘 동작하는지 확인해 주세요.</Help>
                <div className="text-box">{text}</div>
                <div className="btn-box1">
                    <TestButton onClick={handleClick}>{!isRecording ? "마이크 테스트 시작" : "마이크 테스트 중지"}</TestButton>
                    <StartButton onClick={() => navigate('/talk')}>대화 시작</StartButton>
                </div>
            </div>
        </ReadyBlock>
    )
}

const ReadyBlock = styled.div`
    height: 100vh;
    width: 100vw;
    background:url(${ReadyCafe});
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .btn-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .text-box{
        box-sizing: border-box;
        border-radius: 10px;
        width: 90%;
        height: 300px;
        background-color: #ffffff;
        background-color: rgba( 255, 255, 255, 0.5 );
        padding: 10px;
        font-size: 36px;
        font-weight: bold;
        overflow: scroll;
    }

    .btn-box1{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }

    @media screen and (max-width: 575px){
        width: 100%;
        height: 100vh;
        padding: 0;

        .text-box{
            width: 70%;
            height: 100px;
            font-size: 24px;
        }
    }
    
`

const TestButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 518px;
    height: 94px;
    background: #4B8BF6;
    border-radius: 50px;

    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;

    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;

        width: 312px;
        height: 54px;
    }
`

const TextBlock = styled.div`
    font-weight: 700;
    font-size: 64px;
    line-height: 100px;
    text-align: center;
    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 28px;
        line-height: 33px;
        /* .sub{
            width: 180px;
        } */
    }
`

const Help = styled.div`
    font-weight: 400;
    font-size: 28px;
    line-height: 33px;
    padding: 50px 0;

    @media screen and (max-width: 575px){
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        padding: 10px 0;
    }
`

const StartButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 518px;
    height: 94px;
    background: #4B8BF6;
    border-radius: 50px;

    font-weight: 700;
    font-size: 32px;
    line-height: 38px;
    color: #FFFFFF;

    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;

        width: 312px;
        height: 54px;
    }
`

export default ReadyPage;