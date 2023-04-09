import { useAtom } from "jotai";
import { forwardRef, useRef, useState } from "react";
import styled from "styled-components";
import { isCloseAtom } from "../../atom/atom";
import Menu from '/img/new-menu.png';
import X from '/img/x.png';
const MenuDialog = forwardRef((props, ref) => {

    let first = useRef(true);

    const audioRef = useRef(null);

    const [isClose, setIsClose] = useAtom(isCloseAtom)

    const handleClick = (e) => {
        if (first) {
            setIsClose(true)
            first = false
        }
        ref.current?.close()
    }

    return (
        <MenuBlock ref={ref}
            >
            <MenuHead>
                <div className="close" onClick={handleClick}>
                    <img src={X} alt="x" width="100%" height="100%" />
                </div>
            </MenuHead>
            <MenuContent>
                <div className="img-box">
                    <img src={Menu} alt="menu" width="100%" height="auto"/>
                </div>
            </MenuContent>
            <audio controls ref={audioRef} style={{"display": "none"}}></audio>
        </MenuBlock>
    )
})

const MenuBlock = styled.dialog`
    z-index: -1;
    position: absolute;
    border: 0;
    width: 400px;
    margin-top: 20px;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 0;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.25);
    &.backdrop {
        max-width: 100%;
        max-height: 100%;
    }

    @media screen and (max-width: 1300px){
        width: 35%;
    }
    
    @media screen and (max-width: 575px){
        width: 70%;
    }
`

const MenuContent = styled.div`
    height: calc(100% - 42px);
    position: relative;
    .img-box{
        width: 100%;
        height: auto;
    }
    @media screen and (max-width: 575px){
        height: calc(100% - 38px);
    }

`

const MenuHead = styled.div`
    display: flex;
    justify-content: flex-end;
    .close {
        width: 22px;
        height: 22px;
        margin: 10px;
    }

    @media screen and (max-width: 575px){
        .close{
            width: 18px;
            height: 18px;
        }
    }
`

export default MenuDialog;