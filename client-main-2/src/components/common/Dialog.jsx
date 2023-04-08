import { forwardRef } from "react";
import styled from "styled-components"
const Dialog = forwardRef((props, ref) => {
    return (
        <>
            <DialogBlock 
                ref={ref}
                onClick={(e) => {
                    if (e.target === ref.current) ref.current?.close()
                }}
            >
                <DialogHead>
                    <div className="close" onClick={() => ref.current?.close()}></div>
                </DialogHead>
                <DiaLogContent>
                    {props.children}
                </DiaLogContent>
            </DialogBlock>
        </>
    )
})

const DialogBlock = styled.dialog`
    /* padding: 50px; */
    border-radius: 30px;
    border: 0;
    @media screen and (max-width: 575px){
        width: 90%;
        box-sizing: border-box;
    }
`

const DialogHead = styled.div`
    display: flex;
    justify-content: flex-end;
    .text{
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
    }
    .close{
        background: url("img/x.png");
        width: 22px;
        height: 22px;
    }
`

const DiaLogContent = styled.div`
    
`

export default Dialog;