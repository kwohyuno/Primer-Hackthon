import { useEffect, useState, useRef } from "react";
import styled from "styled-components"
import EndDialog from "../components/dialog/EndDialog";
import MenuDialog from "../components/dialog/MenuDialog";
import TalkButton from "../components/TalkButton";
import ToolTip from "../components/common/tooltip";
import CafeBGM from '/mp3/카페.mp3';
import CafeBG from '/img/대화_카페.png';
import Document from '/img/document 1.png';
import X from '/img/x-1.png';
import { useAtom, useAtomValue } from "jotai";
import { infoAtom, isCloseAtom, userLevel } from "../atom/atom";
import Toast from "../components/common/Toast";

const TalkPage = () => {
    const modal = useRef(null);
    const menu = useRef(null);
    const bgmRef = useRef(null);
    const isClose = useAtomValue(isCloseAtom);
    const level = useAtomValue(userLevel)
    const toastRef = useRef(null);
    const userAgent = navigator.userAgent.toLowerCase();
    const [info, setInfo] = useAtom(infoAtom);
    useEffect(() => {

        console.log(info);
        if(isClose) {
            if (userAgent.match(/iphone|ipad|ipod|android/)) {
                console.log("모바일");
                bgmRef.current.volume = 0.05;    
            } else {
                console.log("PC");
                bgmRef.current.volume = 0.1;
            }
            toastRef.current.hideToast()
            bgmRef.current.play();
        } else {
            toastRef.current.showToast()
            menu.current?.showModal()
        }
    },[isClose])
    return (
        <>
            <TalkBlock>
                <ImageBlock>
                    <div className="test">
                        <CloseBlock onClick={() => modal.current?.showModal()}>
                            <img src={X} alt="x" width="100%" height="100%"/>
                        </CloseBlock>
                        <div className="gradient">
                            <TextBlock>메뉴를 보고, 카페에서 내가 먹고 싶은 것을 주문해 보세요</TextBlock>
                            <MenuBlock onClick={() => menu.current?.showModal()}>
                                <div className="document">
                                    <img src={Document} alt="document" width="100%" height="100%" />
                                </div>
                                <div className="text">메뉴판</div>
                            </MenuBlock>
                        </div>
                        <img src={CafeBG} alt="cafe-bg" width="100%" height="100%" />
                    </div>
                    <ToolTip />
                </ImageBlock>

                <audio loop controls src={CafeBGM} style={{ "display" : "none" }} ref={bgmRef}></audio>
                <MiceBlock>
                    <TalkButton></TalkButton>
                </MiceBlock>
                <EndDialog ref={modal}/>
                <Toast ref={toastRef} location={{"bottom": "40px", "left" : "50%"}} content="메뉴판을 닫으면 대화가 시작됩니다." background="#4B8BF6" color="#FFFFFF"/>
            </TalkBlock>
            <MenuDialog ref={menu} />
        </>
    )
}

const TalkBlock = styled.div`
    z-index: -1;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CloseBlock = styled.div`
    position: absolute;
    top: 30px;
    right: 100px;
    width: 32px;
    height: 32px;
    
    .hidden{
        display: none;
    }

    @media screen and (max-width: 575px){
        position: absolute;
        top: 30px;
        right: 50px;
        width: 22px;
        height: 22px;
    }
`

const ImageBlock = styled.div`
    position: relative;
    width: 100%;
    height: 80%;
    
    .gradient{
        box-sizing: border-box;
        padding: 0px 30px;
        display: flex;
        width: 100%;
        height: 100px; 
        position: absolute;
        bottom: 0;
        right: 0;
    }

    @media screen and (max-width: 575px){
        height: 80%;
        .gradient{
            height: 100px;
            padding: 0;
            justify-content: space-around;
        }
    }

    .test{
        width: 100%;
        height: 100%;
        display: flex;
    }
`

const MenuBlock = styled.div`
    width: 60px;
    .document{
        width: 44px;
        height: 44px;
    }

    .text{
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: white;
    }

    @media screen and (max-width: 575px){
        
    }
`

const TextBlock = styled.div`
    font-weight: 700;
    font-size: 36px;
    line-height: 43px;
    width: 100%;
    padding-bottom: 10px;
    display: flex;
    color: #FFFFFF;
    
    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 18px;
        line-height: 30px;
        width: 62%;
        padding-bottom: 0;
    }
`

const MiceBlock = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    height: 20%;
   
    @media screen and (max-width: 575px){
        height: 20%;
    }
`

export default TalkPage;