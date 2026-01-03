"use client";

import { useState, useEffect, useRef } from "react";


const BASIC_QUESTIONS = [
  "Who is Sathick?",
  "What technologies does he specialize in?",
  "Does he have banking experience?",
  "How can I contact him?"
];

// ✅ Typing dots component
function TypingBubble() {
  return (
    <div style={{ ...styles.message, ...styles.botMsg, ...styles.typingBubble }}>
      <span style={{ ...styles.dot, animationDelay: "0ms" }} />
      <span style={{ ...styles.dot, animationDelay: "150ms" }} />
      <span style={{ ...styles.dot, animationDelay: "300ms" }} />
    </div>
  );
}

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I’m Sathick’s AI assistant." }
  ]);
  const [input, setInput] = useState("");

const [showPopup, setShowPopup] = useState(false);
const popupTimerRef = useRef(null);
  
  // ✅ NEW: typing state
  const [botTyping, setBotTyping] = useState(false);


 const messagesRef = useRef(null);

useEffect(() => {
  if (open) {
    setShowPopup(false);
    return;
  }

  const randomDelay = Math.floor(Math.random() * 10000) + 2000; // 5–15 sec

  popupTimerRef.current = setTimeout(() => {
    setShowPopup(true);

    // auto hide after 4 sec
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  }, randomDelay);

  return () => clearTimeout(popupTimerRef.current);
}, [open]);


useEffect(() => {
  if (!open) return;

  // wait for DOM paint (important)
  requestAnimationFrame(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  });
}, [messages, botTyping, open]);


  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setPanelOpen(false);

    // ✅ show typing
    setBotTyping(true);

    try {
      const res = await fetch("https://chatbot-gold-nine-27.vercel.app/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text })
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { from: "bot", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Something went wrong. Try again later." }
      ]);
    } finally {
      // ✅ hide typing
      setBotTyping(false);
    }
  };

  return (
    <>
      {/* ✅ Keyframes for typing animation */}
      {showPopup && (
  <div style={styles.popup}>
    👋 Wanna know more about him?<br />
    Ask his personal AI assistant!
  </div>
)}
      <style>{`
        @keyframes bounceDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-4px); opacity: 1; }
        }

        @keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

      `}</style>

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
          <div style={styles.messages} ref={messagesRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  ...(m.from === "user" ? styles.userMsg : styles.botMsg)
                }}
              >
                {m.text}
              </div>
            ))}

            {/* ✅ Typing bubble (bot side) */}
            {botTyping && <TypingBubble />}
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
              <span style={styles.handleText}>{"Quick Questions"}</span>
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
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              // optional: prevent spamming while bot typing
              disabled={botTyping}
            />
            <button
              style={{
                ...styles.sendBtn,
                opacity: botTyping ? 0.7 : 1,
                cursor: botTyping ? "not-allowed" : "pointer"
              }}
              onClick={() => !botTyping && sendMessage(input)}
              disabled={botTyping}
            >
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
    gap: "8px"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "80%",
    fontSize: "14px"
  },

  // ✅ Use these so you don’t repeat inline logic
  userMsg: {
    alignSelf: "flex-end",
    background: "#9233ee",
    color: "#fff"
  },
  botMsg: {
    alignSelf: "flex-start",
    background: "#f1f5f9",
    color: "#000"
  },

  bottomSheet: {
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
    fontWeight: "bold", // ✅ fixed typo (fontWight -> fontWeight)
    color: "#fff",
    border: "none",
    borderRadius: "6px"
  },

  // ✅ Typing bubble styles
  typingBubble: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    width: "fit-content"
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#64748b",
    display: "inline-block",
    animation: "bounceDot 0.9s infinite ease-in-out"
  },
  popup: {
  position: "fixed",
  bottom: "165px",
  right: "20px",
  maxWidth: "220px",
  background: "#111827",
  color: "#fff",
  padding: "10px 12px",
  borderRadius: "10px",
  fontSize: "13px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  animation: "fadeSlideIn 0.4s ease",
  zIndex: 999
}

};
