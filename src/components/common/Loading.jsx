import styled from 'styled-components';
import spinner from '/img/spinner.gif';
const Loading = () => {
    return (
        <LoadingBlock>
            <LoadingText>잠시만 기다려 주세요.</LoadingText>
            <div className='loading-box'>
                <LoadingSpinner src={spinner} alt="로딩중" width="30%" />
            </div>
        </LoadingBlock>
    )
}

const LoadingBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .loading-box{
        display: flex;
        justify-content: center;
    }
`

const LoadingText = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
`

const LoadingSpinner = styled.img`
    
`

export default Loading;