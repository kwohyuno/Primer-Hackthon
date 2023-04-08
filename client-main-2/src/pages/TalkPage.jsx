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
import { useAtomValue } from "jotai";
import { isCloseAtom } from "../atom/atom";
import Toast from "../components/common/Toast";

const TalkPage = () => {
    const modal = useRef(null);
    const menu = useRef(null);
    const bgmRef = useRef(null);
    const isClose = useAtomValue(isCloseAtom);
    const toastRef = useRef(null);
    const userAgent = navigator.userAgent.toLowerCase();


    useEffect(() => {
        if(isClose) {
            if (userAgent.match(/iphone|ipad|ipod|android/)) {
                console.log("모바일");
                bgmRef.current.volume = 0.05;    
            } else {
                console.log("PC");
                bgmRef.current.volume = 0.1;
            }
            
            bgmRef.current.play();;
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
            </TalkBlock>
            <MenuDialog ref={menu} />
            <Toast ref={toastRef} location={{"bottom" : "30px", "left" : "45px"}} content="메뉴판을 닫으면 대화가 시작됩니다." background="#4B8BF6" color="#FFFFFF"/>
        </>
    )
}

const TalkBlock = styled.div`
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
    
    width: 100%;
    height: 80%;
    
    .gradient{
        display: flex;
        width: 100%;
        height: 198px; 
        position: absolute;
        bottom: 200px;
        left: 0px;
       
    }

    @media screen and (max-width: 575px){
        height: 80%;
        .gradient{
            bottom: 100px;
            height: 100px;
            justify-content: space-around;
        }
    }


    .test{
        width: 100%;
        height: 100%;
        display: flex;
        /* align-items: flex-end; */
    }
`

const MenuBlock = styled.div`
    width: 60px;
    padding: 0px 30px 30px 0px;
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
    font-size: 48px;
    line-height: 57px;
    width: 100%;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 730px);
   
   @media screen and (max-width: 575px){
        height: 20%;
    }
`

export default TalkPage;