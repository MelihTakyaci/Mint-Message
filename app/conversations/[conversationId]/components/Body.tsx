"use client";

import MessageBox from "./MessageBox";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

interface BodyProps{
    map: any;
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(initialMessages);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    } , [conversationId])

    return(
        <div className="flex-1 overflow-y-auto">
            {messages.map((message , i) => (
                <MessageBox
                isLast={i == messages.length - 1}
                key={message.id}
                data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body;