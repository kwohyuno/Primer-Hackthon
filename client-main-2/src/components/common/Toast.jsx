import { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
const Toast = forwardRef(({ location, content, color, background }, ref) => {
    const [visible, setVisible] = useState(true);

    const showToast = () => {
        setTimeout(() => setVisible(false), 90000); 
    }

    useImperativeHandle(ref, () => ({
        showToast
    }))

    return (visible && (
        <ToastBlock location={location} background={background} color={color}>
            {content}
        </ToastBlock>
    ))
})

const ToastBlock = styled.div`
    max-height: 70px;
    min-width: 300px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 20px 15px;
    text-align: center;
    opacity: 0.7;
    position: absolute;
    top: 10px;
    left: 40%;
    background: ${props => props.background};
    color: ${props => props.color};

    @media screen and (max-width: 575px){
        top: 10px;
        left: 20%;
    }
     
`

export default Toast;