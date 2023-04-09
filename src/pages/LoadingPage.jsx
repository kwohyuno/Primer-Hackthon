import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { infoAtom } from "../atom/atom";
import { useAtom } from "jotai";
const LoadingPage = () => {
    const navigate = useNavigate();

    const [planeAngle, setPlaneAngle] = useState(0);

    const [info, setInfo] = useAtom(infoAtom);

    useEffect(() => {
        setTimeout(() => {
            navigate('/ready')
        }, 2000)
        // const intervalId = setInterval(() => {
        // }, 50);
        // return () => clearInterval(intervalId);
    }, []);

    


    return (
        <LoadingBlock>  
            <TextBlock>{info.city.name}가는 중..</TextBlock>
            <ImageBlock>
                <div className="earth-container">
                    <div className="earth">
                        <img src="img/earth.png" alt="earth" width="100%" height="100%"/>
                    </div>
                    <div className="plane">
                        <img src="img/plane.png" alt="plane" width="100%" height="100%"/>
                    </div>
                </div>
            </ImageBlock>
        </LoadingBlock>
    )
}

const LoadingBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 24px 14px;
    @media screen and (max-width: 575px){
        width: 100%;
        height: 100vh;
        padding: 0;
    }
`

const TextBlock = styled.div`
    font-weight: 700;
    font-size: 64px;
    line-height: 76px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50%;

    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 28px;
        line-height: 33px;
        height: 50%;
    }
`

const ImageBlock = styled.div`
    height: 50%;
    position: relative;
    overflow: hidden;

    .earth-containe{
        position: relative;
        width: 100%;
        height: 100%;
    }

    .plane{
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        transform: translateX(-50%);
        transform-origin: bottom center;
        animation: move-arc 2s linear infinite;
    }
    .earth{
        width: 100%;
        min-height: 100%;
        position: absolute;
        top: 50%;
        left: 0;
    }

    @media screen and (max-width: 575px){
        height: 50%;

        .earth{
            width: 100%;
            height: 100%;
        }
    }
    @keyframes move-arc {
        0% {
            transform: translateX(-500%) translateY(-80%) rotate(35deg); /* 반원 시작점 */
          }
          50% {
            transform: translateX(0%) translateY(-80%) rotate(35deg); /* 반원 중간점 */
          }
          100% {
            transform: translateX(500%) translateY(-80%) rotate(35deg); /* 반원 끝점 */
          }
    }
`

export default LoadingPage;