import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import X from '/img/x.png';
const EndDialog= forwardRef((props, ref) => {
    const navigate = useNavigate();
    return (
        <EndBlock ref={ref}>
            <Head>
                <div className="close" onClick={() => ref.current?.close()}>
                    <img src={X} alt="x" width="100%" height="100%"/>
                </div>
            </Head>
            <TextBlock>대화를 정말 끝내시겠어요?</TextBlock>
            <div className='btn-box'>
                <CancleButton onClick={() => ref.current?.close()}>취소하기</CancleButton>
                <EndButton onClick={() => navigate(`/result/fail`)}>대화 끝내기</EndButton>
            </div>
        </EndBlock>
    )
})

const EndBlock = styled.dialog`
    box-sizing: border-box;
    border: 0;
    padding: 50px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    .btn-box{
        display: flex;
        gap: 10px;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
    }

    @media screen and (max-width: 575px){
        box-sizing: border-box;
        width: 80%;
        padding: 30px 30px;

        .btn-box{
            justify-content: space-between;
        }
    }
`

const Head = styled.div`
    display: flex;
    justify-content: flex-end;

    .close{
        width: 18px;
        height: 18px;
    }
`

const TextBlock = styled.div`
    font-weight: 700;
    font-size: 48px;
    line-height: 57px;
    padding-bottom: 80px;

    @media screen and (max-width: 575px){
        width: 90%;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        padding-bottom: 40px;
    }
`

const CancleButton = styled.div`
    width: 325px;
    height: 80.64px;
    background: #F1F4F6;
    border-radius: 10px;

    font-weight: 700;
    font-size: 32px;
    line-height: 38px;

    color: #AAB5C0;;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        width: 125px;
        height: 44px;
    }
`

const EndButton = styled.div`
    width: 325px;
    height: 80.64px;
    background: #4B8BF6;
    border-radius: 10px;

    font-weight: 700;
    font-size: 32px;
    line-height: 38px;

    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 575px){
        font-weight: 700;
        font-size: 16px;
        line-height: 19px;
        width: 125px;
        height: 44px;
    }
    
`
export default EndDialog;