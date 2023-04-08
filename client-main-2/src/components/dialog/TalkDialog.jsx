import { useAtomValue } from "jotai";
import { messagesAtom } from "../../atom/atom";
import styled from "styled-components";
import { forwardRef } from "react";
const TalkDialog = forwardRef((props, ref) => {

    const messages = useAtomValue(messagesAtom);

    return (
        <TalkBlock ref={ref}
            onClick={(e) => {
                if (e.target === ref.current) ref.current?.close()
            }}>
            <TalkHead>
                <div className="text">{props.head}</div>
                <div className="close" onClick={() => ref.current?.close()}>
                    <img src="../img/x.png" alt="x" width="100%" height="100%"/>
                </div>
            </TalkHead>
            <TalkContent>
                {messages && messages.map((message, index) => {
                    if (message.role !== "system" && !message.content.includes('@')) {
                        return (
                            <TalkItem key={index}>
                                <div className={message.role === "assistant" ? "gpt-box" : "user-box"}>
                                    <div className={message.role === "assistant" ? "gpt" : "user"}>
                                        {message.content}
                                    </div>
                                </div>
                            </TalkItem>
                        )
                    }
                })}
            </TalkContent>
        </TalkBlock>
    )
})

const TalkBlock = styled.dialog`
    width: 375px;
    height: 597px;
    background: #F9FAFC;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    border: 0;
    padding: 0%;

    @media screen and (max-width: 575px){
        width: 100vw;
        height: 70%;
        position: absolute;
        top: 30%;
        
    }
`

const TalkHead = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F1F4F6;
    padding: 15px;
    .text{
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
    }
    .close{
        width: 16px;
        height: 16px;
    }
`

const TalkContent = styled.div`
    overflow: auto;
    padding: 15px;
`

const TalkItem = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    padding: 10px;

    .gpt-box{   
        display: flex;
        justify-content: flex-start;
        .gpt{
            background: #919EAB;
            padding: 10px;
            border-radius: 20px;
        }
    }

    .user-box{
        display: flex;
        justify-content: flex-end;
        .user{
            background: #555555;
            padding: 10px;
            border-radius: 20px;
        }
    }
`
export default TalkDialog;