import React, { useState } from "react";
import axios from "axios";
import "./Chatbox.css";

export default function Chatbox(props) {
  const avatars = { Frog: "🐸", Raccoon: "🦝" };
  // Checks if its the first load of the page
  // if yes -> gets chat history from the database
  const [loadDB, setLoadDB] = useState(false);
  if (!loadDB) {
    axios({
      url: "http://localhost:5000/chat/list",
      method: "GET",
    })
      .then((res) => setChatHistory(res.data))
      .catch((err) => console.log(err));
    setLoadDB(true);
  }
  const [messageData, setMessageData] = useState();
  const [chatHistory, setChatHistory] = useState([]);
  function handleChange(e) {
    setMessageData(e.target.value);
  }
  // let displayOrder = [...dbResult, ...chatHistory];
  return (
    <article id="chatbox">
      <header>
        <h2>
          <span className="icon">💬</span> Chat with {props.userTo}
        </h2>
        <aside className="connected">
          2 connected
          <br />
          <span className="chatUser">
            ({props.userFrom}, {props.userTo})
          </span>
        </aside>
      </header>
      <main>
        {chatHistory.map((chat) => {
          return (
            <section
              key={chat._id}
              className={
                chat.userFrom === props.userFrom
                  ? "messageContainer fromMe"
                  : "messageContainer"
              }
            >
              <figure className="avatar">{avatars[chat.userFrom]}</figure>
              <p className="timestamp">{chat.timestamp}</p>
              <p className="message">{chat.message}</p>
            </section>
          );
        })}
      </main>
      <footer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let currentDate = new Date();
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            let dateTime =
              monthNames[currentDate.getMonth()].substr(0, 3) +
              " " +
              currentDate.getDate() +
              ", " +
              currentDate.getFullYear() +
              " // " +
              currentDate.getHours() +
              ":" +
              currentDate.getMinutes() +
              ":" +
              currentDate.getSeconds();
            let newMessage = {
              id: chatHistory.length,
              userFrom: props.userFrom,
              userTo: props.userTo,
              timestamp: dateTime,
              message: messageData,
            };
            setChatHistory([...chatHistory, newMessage]);
            axios({
              url: "http://localhost:5000/chat/add",
              method: "POST",
              data: newMessage,
            })
              .then((response) => console.log(response))
              .catch((err) => console.log(err));
            console.log(messageData);
            document.getElementById("message").value = "";
          }}
        >
          <input
            type="text"
            id="message"
            name="message"
            placeholder="Write a message..."
            onChange={handleChange}
          />
          <button>Send</button>
        </form>
      </footer>
    </article>
  );
}
