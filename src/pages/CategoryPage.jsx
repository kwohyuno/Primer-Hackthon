import styled from "styled-components"
import Container from '../components/common/Container'
import { useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { infoAtom } from "../atom/atom";
const CategoryPage = () => {

    const [info, setInfo] = useAtom(infoAtom);

    const navigate = useNavigate();

    const categorys = [
        { name: "카페", value:"cafe"},
        { name: "택시", value:"cafe"},
        { name: "식당", value:"cafe"},
        { name: "공항", value:"cafe"}
    ]

    const handleClick = (category) => {
        setInfo({
            ...info,
            category
        })
        navigate('/main')
    }

    return (
        <Container>
            <CategoryPageBlock>
                <TextBlock>{progress.city} 도착! 어디로 가볼까요?</TextBlock>
                <SelectBlock>
                    {categorys.map((category, index) => <div key={index} className="category-item" onClick={() => handleClick(category)}>{category.name}</div>)}
                </SelectBlock>
            </CategoryPageBlock>
    </Container>
    )
}

const CategoryPageBlock = styled.div`
    padding-top: 250px;
`

const TextBlock = styled.div`
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding: 30px 0px;
`

const SelectBlock = styled.div`
    display: flex;
    justify-content: space-around;
    font-size: 1.6rem;
    font-weight: bold;
    .category-item{
        border: 1px solid black;
        height: 200px;
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export default CategoryPage;