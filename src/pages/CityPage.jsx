import styled from "styled-components"
import { useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { infoAtom } from "../atom/atom";
import Back from "../components/common/Back";
import 고베 from '/img/고베.png';
import city_newyork from '/img/city_newyork.png';
import city_dublin from '/img/city_dublin.png';
import 도쿄 from '/img/도쿄.png';
import city_london from '/img/city_london.png';
import city_sydney from '/img/city_sydney.png';
import 오사카 from '/img/오사카.png';
import 후쿠오카 from '/img/후쿠오카.png';
const CityPage = () => {

    const [info, setInfo] = useAtom(infoAtom);

    const citys = [
        { name: "도쿄", value: "ja-JP"},
        { name: "오사카", value: "ja-JP"},
        { name: "고베", value: "ja-JP"},
        { name: "후쿠오카", value: "ja-JP"},
        { name: "뉴욕", value: "en-US"},
        { name: "런던", value: "en-GB"},
        { name: "시드니", value: "en-AU"},
        { name: "더블린", value: "en-IN"},
    ]

    function getImage(name) {
        if (name === "뉴욕") return city_newyork;
        else if (name === "런던") return city_london;
        else if (name === "시드니") return city_sydney;
        else if (name === "더블린") return city_dublin;
        else if (name === "도쿄") return 도쿄;
        else if (name === "고베") return 고베;
        else if (name === "오사카") return 오사카;
        else if (name === "후쿠오카") return 후쿠오카;
    }



    const navigate = useNavigate();

    const handleClick = (city) => {
        setInfo({
            ...info,
            city,
        })
        navigate('/loading')
    }
    
    return (
        <CityBlock>
            <Back />
            <div className="container">
                <TextBlock>
                    <div className="main">어디로 갈까요?</div>
                    <div className="sub">선택한 도시의 억양이 내가 대화할 상대방에게 반영됩니다.</div>
                </TextBlock>
                <SelectBlock>
                    {info.language.value === 'japanese' ? 
                        citys.map((city, index) => {
                            if (city.value === 'ja-JP') {
                                return (
                                    <div key={index} className="city-item" onClick={() => handleClick(city)}>
                                        <div className="name">{city.name}</div>
                                        <img src={getImage(city.name)} alt="dd" width="100%" height="100%"/>
                                    </div>
                                )
                            }
                        }) : 
                        citys.map((city, index) => {
                            if (city.value !== 'ja-JP') {
                                return (
                                    <div key={index} className="city-item" onClick={() => handleClick(city)}>
                                        <div className="name">{city.name}</div>
                                        <img src={getImage(city.name)} alt="dd" width="100%" height="100%"/>
                                    </div>
                                )
                            }
                        })
                    }
                </SelectBlock>
            </div>
        </CityBlock>
    )
}
const CityBlock = styled.div`
    
    box-sizing: border-box;
    width: 1280px;
    margin: 0 auto;
    padding: 24px 5%;
    min-height: 100vh;
    
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        height: calc(100% - 42px);
        padding: 20px 0px;
    }

    @media screen and (max-width: 575px){
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 30px 30px;
        .container{
            height: calc(100% - 22px);
        }
    }
`

const TextBlock = styled.div`
    .main{
        font-weight: 700;
        font-size: 40px;
        line-height: 48px;
        padding: 40px 0px 10px 0px;
    }
    .sub{
        font-weight: 400;
        font-size: 24px;
        line-height: 29px;
        padding: 20px 0 60px 0;
    }
    @media screen and (max-width: 575px){
        .main{
            font-weight: 700;
            font-size: 24px;
            line-height: 33px;
            text-align: center;
            padding: 50px 0;
        }

        .sub{
            display: none;
        }
    }
`

const SelectBlock = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 60px;
    box-sizing: border-box;

    .city-item{
        width: 40%;
        border-radius: 20px;
        box-sizing: border-box;
        
        font-weight: 700;
        font-size: 56px;
        line-height: 67px;
        text-align: right;
        border: 1px solid #EEEEEE;
        position: relative;
        

        &:hover{
            border: 5px solid #4B8BF6;
        }

        .name{
            position: absolute;
            color: white;
            bottom: 20px;
            right: 30px;
        }
    }

    @media screen and (max-width: 575px){
        gap: 40px;
        justify-content: center;
        .city-item{
            width: 90%;
            height: auto;

            .name{
                font-weight: 700;
                font-size: 28px;
                line-height: 33px;
            }
        }
    }
`
export default CityPage;