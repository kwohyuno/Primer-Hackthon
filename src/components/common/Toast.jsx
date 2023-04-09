import { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
const Toast = forwardRef(({ 
    location = { "top" : "0px", "left" : "50%", "bottom" : "0px", "right" : "0px"},
    content = "Defailt Message",
    color = "white",
    background = "black" 
}, ref) => {
    const [visible, setVisible] = useState(true);

    const showToast = () => {
        setVisible(true)
    }
    const hideToast = () => {
        setVisible(false)
    }

    useImperativeHandle(ref, () => ({
        showToast,
        hideToast
    }))

    return (visible && (
        <ToastBlock location={location} background={background} color={color}>
            {content}
        </ToastBlock>
    ))
})

const ToastBlock = styled.div`
    max-height: 70px;
    min-width: 350px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 20px 15px;
    text-align: center;
    opacity: 0.7;
    z-index: 9;
    position: fixed;
    top: ${props => props.location.top};
    left: ${props => props.location.left};
    bottom: ${props => props.location.bottom};
    right: ${props => props.location.right};
    transform: translateX(-50%);
    justify-content: center;
    background: ${props => props.background};
    color: ${props => props.color};
`

export default Toast;