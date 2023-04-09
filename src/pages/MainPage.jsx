import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Container from "../components/common/Container";
import Toast from "../components/common/Toast";
import BG_IMG from '/img/BG_IMG 1.png';
import { useEffect, useRef } from "react";

const MainPage = () => {
    const navigate = useNavigate();
    const toastRef = useRef(null);
    useEffect(() => {
        setTimeout(() => toastRef.current.hideToast() , 5000)
    })
    return (
        <Container>
            <MainBlock>
                <TextBlock>
                    <div className="en">
                        Just Say!
                    </div>
                    <div className="m-image-box">
                        <img src={BG_IMG} alt="m-bg" width="100%" height="100%" />
                    </div>
                    <div className="ko" align="left">
                        두려움없이 외국어를 말할 수 있도록. <br />
                        될 때까지 말해보세요!
                    </div>
                    <div className="btn-box">
                        <StartButton onClick={() => navigate('/language')}>
                            시작하기
                        </StartButton>
                    </div>
                </TextBlock>
                <div className="image-box">
                    <ImageBlock>
                        <img src={BG_IMG} alt="dd" width="100%" height="100%" />
                    </ImageBlock>
                </div>
                <Toast ref={toastRef} location={{"top": "40px", "left": "50%"}} content="현재 edge/chrome browser만 지원됩니다." background="black" color="white"/>
            </MainBlock>
        </Container>
    )
}

const MainBlock = styled.div`
    width: 100%;
    font-style: normal;
    text-align: center;
    padding: 0px 5%;
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    justify-content: space-between;
   
    .image-box{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* .btn-box{
        display: flex;
        flex-direction: column;
        align-items: center;
    } */

    

    @media screen and (max-width: 575px){
        padding: 10px 30px;
        flex-direction: column;
        align-items: center;

        .image-box{
            display: none;
        }

        .m-image-box{
            width: 100%;
        }

        .btn-box{
            display: flex;
            justify-content: center;
            padding-bottom: 50px;
        }
    }
`

const TextBlock = styled.div`

    width: 50%;
    .en{
        font-style: normal;
        font-weight: 700;
        font-size: 64px;
        line-height: 81px;
        padding-bottom: 50px;
        text-align: start;
    }

    .ko{
        font-style: normal;        
        font-weight: 400;
        font-size: 20px;
        line-height: 36px;
        padding-bottom: 50px;
    }

    .m-image-box{
        display: none;
    }

    @media screen and (max-width: 575px){
        width: 100%;
        .en{
            font-size: 40px;
            line-height: 48px;
            text-align: center;
            padding-bottom: 0px;
        }
        .ko{
            font-size: 18px;
            line-height: 24px;
            text-align: center;
        }
        .m-image-box{
            display: block;
            width: 281px;
            height: 183px;
            margin: 0 auto;
            padding: 60px 0;
        }
    }
    
   
`

const ImageBlock = styled.div`
    height: 366.943359375px;
    width: 552px;
    border-radius: 0px;

    @media screen and (max-width: 575px){
        display: none;
        width: 281px;
        height: 183.47px;
    }
`

const StartButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 22px 160px;
    gap: 10px;
    background: #4B8BF6;
    border-radius: 50px;
    border: 0;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    color: #FFFFFF;


    @media screen and (max-width: 575px){
        font-size: 20px;
        line-height: 24px;
        padding: 15px 119px;
    }
`

export default MainPage;