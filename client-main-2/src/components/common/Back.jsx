import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import back from '/img/left-arrow 1.png';
const Back = () => {
    const navigate = useNavigate();
    return (
        <BackBlock onClick={() => navigate(-1)}>
            <img src={back} alt="arrow" width="100%" height="100%" />
        </BackBlock>
    )
}

const BackBlock = styled.div`
    width: 42px;
    height: 42px;
    margin: 0;

    @media screen and (max-width: 575px){
        width: 22px;
        height: 22px;
    }
`
export default Back;