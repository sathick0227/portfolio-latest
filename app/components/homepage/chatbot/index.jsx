"use client";
import { useState } from "react";

const BASIC_QUESTIONS = [
  "Who is Sathick?",
  "What technologies does he specialize in?",
  "Does he have banking experience?",
  "How can I contact him?"
];

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m Sathick’s AI assistant." }
  ]);
  const [input, setInput] = useState("");

 const sendMessage = async (text) => {
  if (!text.trim()) return;

  // Add user message
  setMessages(prev => [...prev, { from: "user", text }]);
  setInput("");
  setPanelOpen(false);

  try {
    const res = await fetch("https://chatbot-gold-nine-27.vercel.app/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    });

    const data = await res.json();

    setMessages(prev => [...prev, { from: "bot", text: data.answer }]);
  } catch (err) {
    console.error(err);
    setMessages(prev => [
      ...prev,
      { from: "bot", text: "Oops! Something went wrong. Try again later." }
    ]);
  }
};


  return (
    <>
      {/* Floating Button */}
      <button style={styles.fab} onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div style={styles.chatBox}>
          {/* Header */}
          <div style={styles.header}>
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  background: m.from === "user" ? "#9233ee" : "#f1f5f9",
                  color: m.from === "user" ? "#fff" : "#000"
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Bottom Sheet */}
          <div
            style={{
              ...styles.bottomSheet,
              height: panelOpen ? "160px" : "32px"
            }}
          >
            {/* Handle */}
            <div
              style={styles.handleWrap}
              onClick={() => setPanelOpen(!panelOpen)}
            >
              <div style={styles.handle} />
              <span style={styles.handleText}>
                {"Quick Questions"}
              </span>
            </div>

            {/* Content */}
            {panelOpen && (
              <div style={styles.sheetContent}>
                {BASIC_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    style={styles.sheetBtn}
                    onClick={() => sendMessage(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={styles.inputBox}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              style={styles.input}
              onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            />
            <button style={styles.sendBtn} onClick={() => sendMessage(input)}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  fab: {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#9233ee",
    color: "#fff",
    fontSize: "22px",
    border: "none",
    cursor: "pointer",
    zIndex: 1000
  },
  chatBox: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: "480px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000
  },
  header: {
    padding: "12px",
    background: "#9233ee",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between"
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
    fontSize: "14px",
    background: "#9233ee",
  },
  bottomSheet: {
    // background: "#000",
    color: "#000",
    borderTop: "1px solid #e5e7eb",
    transition: "height 0.25s ease",
    zIndex: 1000
  },
  handleWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    padding: "4px"
  },
  handle: {
    width: "36px",
    height: "4px",
    background: "#c7d2fe",
    borderRadius: "4px",
    marginBottom: "2px"
  },
  handleText: {
    fontSize: "11px",
    color: "#475569"
  },
  sheetContent: {
    padding: "8px"
  },
  sheetBtn: {
    width: "100%",
    padding: "8px",
    marginBottom: "6px",
    fontSize: "13px",
    borderRadius: "8px",
    border: "1px solid #9233ee",
    background: "#9233ee",
    cursor: "pointer",
    color: "#fff"
  },
  inputBox: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #e5e7eb"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    color: "#000"
  },
  sendBtn: {
    marginLeft: "6px",
    padding: "8px 12px",
    background: "#9233ee",
    fontSize: "14px",
    fontWight: "bold",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
