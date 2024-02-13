import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/HomePage.css";

const ChatGPT = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue === "") {
      toast.error("Please write something");
      return; // Exit the function if inputValue is empty
    }

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);
    senMessage(inputValue);
    setInputValue("");
  };

  const senMessage = (message) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    };

    const data = {
      model: "gpt-3.5-turbo-instruct",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        console.log(res);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: res.data.choices[0].message.content },
        ]);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  // if condition

  const toggleChat = () => {
    setChatVisible(!isChatVisible);
  };
  return (
    <>
      <div className="btn-chat">
        <p className="text-center" onClick={toggleChat}>
          <img src="/images/bot.png" alt="bot" />
        </p>
        {isChatVisible && (
          <div className="chat">
            <div className="container mx-auto w-50">
              <div className="d-flex flex-column ">
                <h1 className="text-center title">Chat Bot</h1>
                <div>
                  <div className="messages">
                    {chatLog.length === 0 ? (
                      <>
                        <span className="ask">Ask any thing...</span>
                        <div className="sasasa"></div>
                      </>
                    ) : (
                      <div>
                        {chatLog.map((message, index) => (
                          <div
                            key={index}
                            className={`d-flex ${
                              message.type === "user"
                                ? "justify-content-end"
                                : "justify-content-start "
                            }`}
                          >
                            <div
                              className={`${
                                message.type === "user" ? "bg-user" : "bg-bot"
                              } `}
                            >
                              {message.message}
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div
                            key={chatLog.length}
                            className="d-flex justify-content-start"
                          >
                            <div>
                              <div class="bot-load"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex field mx-auto">
                    <input
                      type="text"
                      className=" form-control"
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">Send</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatGPT;
