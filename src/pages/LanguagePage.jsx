import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { infoAtom } from "../atom/atom";
import Back from "../components/common/Back";
import Container from "../components/common/Container";

const LanguagePage = () => {
    const [info, setInfo] = useAtom(infoAtom);

    const navigate = useNavigate();

    const languages = [
        {
            name : "영어",
            value :"english",
        }, 
        {
            name : "일본어",
            value :"japanese",
        }, 
    ]

    const handleClick = (language) => {
        setInfo({
            ...info,
            language,
        })
        navigate('/city')
    }

    return (
        <LanguageBlock>
            <Back />
            <div className="container">
                <TextBlock>
                    이제부터 여행을 떠나봅시다! <br />
                    내가 말할 언어를 골라주세요.
                </TextBlock>
                <SelectBlock>
                    {languages.map((language, index) => <div className="language-item" onClick={() => handleClick(language)} key={index}>{language.name}</div>)}
                </SelectBlock>
            </div>
        </LanguageBlock>
    )
}

const LanguageBlock = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    padding: 24px 5%;
    height: 100vh;
    width: 1280px;
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
    @media screen and (max-width: 575px){
        width: 100%;
        padding: 30px 30px;
        .container{
            height: 100%;
        }
    }
`

const TextBlock = styled.div`
    box-sizing: border-box;
    font-weight: 700;
    font-size: 40px;
    line-height: 62px;
    padding: 100px 0px 0px 0px;
    height: 50%;

    @media screen and (max-width: 575px){
        font-size: 24px;
        line-height: 42px;
        text-align: center;
        padding: 30px 0px 150px 0px;
    }
`

const SelectBlock = styled.div`
    height: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;
    color: #4B8BF6;
    .language-item{
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: 417px;
        height: 77px;
        border-radius: 50px;
        border: 1px solid #4B8BF6;
        background: white;
        &:hover{
            background: #4B8BF6;
            color: #FFFFFF;
            border: 1px solid #4B8BF6;
        }
    }

    @media screen and (max-width: 575px){
        font-size: 24px;
        line-height: 33px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: auto;

        .language-item{
            margin: 25px 0px;
            width: 100%;
            height: 54px;
        }
    }
    
`
export default LanguagePage;