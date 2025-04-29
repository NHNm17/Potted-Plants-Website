import React, { useState } from "react";
import "./AIchatbot.css";
import CustomerDashboard from "../Dashboard/CustomerDashboard";


const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me about plant care 🌱" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const [responses, setResponses] = useState({
    "How often should I water my succulents?":
      "Succulents should be watered once every 2-3 weeks, allowing the soil to dry out completely between waterings.",
    "What is the best soil for potted plants?":
      "A well-draining potting mix with organic matter, peat moss, and perlite is ideal for potted plants.",
    "Which plants need low sunlight?":
      "Plants like Snake Plant, ZZ Plant, and Pothos thrive in low-light conditions.",
    "Do you offer free delivery?":
      "Yes! We offer free delivery for orders above $50.",
  });

  const sendMessage = () => {
    if (!userInput.trim()) return;

    setMessages([...messages, { sender: "user", text: userInput }]);

    setTimeout(() => {
      const response = responses[userInput] || "Sorry, I don't have an answer for that yet.";
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 500);

    setUserInput("");
  };

  const setQuestion = (question) => {
    setUserInput(question);
    sendMessage();
  };

  const handleFaqAction = (action) => {
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      alert("Please enter both a question and an answer.");
      return;
    }

    if (action === "add" || action === "update") {
      setResponses(prev => ({...prev, [faqQuestion]: faqAnswer}));
      alert(`FAQ ${action === "add" ? "added" : "updated"} successfully!`);
    } else if (action === "delete") {
      const newResponses = {...responses};
      delete newResponses[faqQuestion];
      setResponses(newResponses);
      alert("FAQ deleted successfully!");
    }
  };

  return (
    <div>
      <CustomerDashboard/>
      <div className="chatbot-container">
        <h2>🌿 Plant Care AI Chatbot 🌱</h2>
        <p>Ask me about plant care, watering tips, or product recommendations!</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Ask me about plant care..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>

        <div className="chatbox">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
              <strong>{msg.sender === "bot" ? "Bot" : "You"}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <h4>💡 Sample Questions:</h4>
        <ul className="sample-questions">
          {Object.keys(responses).map((question, index) => (
            <li key={index} onClick={() => setQuestion(question)}>
              {question}
            </li>
          ))}
        </ul>

        <div className="admin-panel">
          <h3>🔧 Manage Chatbot Knowledge Base</h3>
          <input
            type="text"
            placeholder="New FAQ or Tip"
            value={faqQuestion}
            onChange={(e) => setFaqQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Response"
            value={faqAnswer}
            onChange={(e) => setFaqAnswer(e.target.value)}
          />
          <div className="admin-buttons">
            <button onClick={() => handleFaqAction("add")}>Add</button>
            <button onClick={() => handleFaqAction("update")}>Update</button>
            <button onClick={() => handleFaqAction("delete")}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;