// import React from 'react';
// import logo from './logo.svg';
import { Grid, GridItem } from "@chakra-ui/react";
import ChatMessage from "./components/Chat";
import ChatInput from "./components/Input";
import ChatHeader from "./components/Header";
// import database from "./components/database";

import React, { useState, useRef, useEffect } from "react";

function App() {
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [onlineStatus, setOnlineStatus] = useState<string>("Online");
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [chatsLoaded, setChatsLoaded] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  let currentDate: string = "";
  let newDate: string = "";

 
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    fetchChatData();
    setTimeout(() => {
      setChatsLoaded(true);
    }, 2000);
  }, [pageNumber]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 200;
    }
  }, [pageNumber]);

  useEffect(() => {
    if (chatsLoaded && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatsLoaded]);

  return (
    <div className="ChatApp">
      <Grid templateRows="2fr 8fr 1.5fr" height="100vh" gap="10px">
        <GridItem>
          <ChatHeader />
          {onlineStatus === "Offline" && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                backgroundColor: "#ffd400",
                padding: "6px",
                margin: "-10px -20px",
              }}
            >
              You are offline!! Go online to view new chats.
            </p>
          )}
        </GridItem>
        <GridItem className="chatContainer" ref={chatContainerRef}>
          <div className="chatDiv">
            {chatMessages
              .slice()
              .reverse()
              .map((message, index) => {
                let dateChanged = false;
                if (index === 0) {
                  newDate = message.time.slice(0, 10);
                  currentDate = newDate;
                }
                currentDate = newDate;
                if (currentDate !== message.time.slice(0, 10)) {
                  dateChanged = true;
                  newDate = message.time.slice(0, 10);
                }

                return (
                  <ChatMessage/>
                );
              })}
          </div>
        </GridItem>
        <GridItem>
          <ChatInput />
        </GridItem>
      </Grid>
    </div>
  );
}




export default App;
