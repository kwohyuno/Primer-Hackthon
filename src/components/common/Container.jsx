import styled from "styled-components"
const Container = ({ children }) => {
    return (
        <ContainerBlock>
            {children}
        </ContainerBlock>
    )
}


const ContainerBlock = styled.div`
  width: 1280px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 24px 0;
  height: 100vh;
  box-sizing: border-box;
  @media screen and (max-width: 1300px){
    width: 960px;
  }
  @media screen and (max-width: 980px){
    width: 640px;
  }
  @media screen and (max-width: 575px){
    width: 100%;
  }
`

export default Container;