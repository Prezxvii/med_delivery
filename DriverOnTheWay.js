import React, { useState, useEffect } from 'react';

const DriverOnTheWay = () => {
  const [distance, setDistance] = useState(5); // Distance in miles
  const [eta, setEta] = useState(10); // ETA in minutes
  const [isArrived, setIsArrived] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isCanceling, setIsCanceling] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelResponse, setCancelResponse] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (distance > 0) {
        setDistance(prev => prev - 0.1); // Decrease distance
        setEta(prev => Math.max(prev - 1, 0)); // Decrease ETA
      } else {
        setIsArrived(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [distance]);

  const automatedResponses = [
    { question: /where.*you/i, answer: "I’m just 5 minutes away from your location." },
    { question: /how long.*take/i, answer: "I’ll arrive in approximately 10 minutes." },
    { question: /status.*order/i, answer: "I’ve picked up your order and am on my way." },
    { question: /thank/i, answer: "You’re welcome! See you soon!" },
    { question: /.*/, answer: "I’m sorry, I didn’t quite catch that. Can you rephrase?" },
  ];

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);

    const response = automatedResponses.find(({ question }) => question.test(input))?.answer;
    setTimeout(() => {
      setMessages([...newMessages, { sender: "Driver", text: response }]);
    }, 1000);

    setInput("");
  };

  const cancelOrder = (reason) => {
    const responses = {
      "Changed my mind": "We understand! Your order has been canceled.",
      "Order is taking too long": "We’re sorry for the delay. We’ll work to improve our service!",
      "Found a better option": "Thank you for letting us know. We hope you’ll consider us next time!",
      "Incorrect delivery address": "Got it! Your order has been canceled. Please double-check your address next time.",
      "Other": "Thank you for your feedback. Your order has been canceled.",
    };

    setCancelReason(reason);
    setCancelResponse(responses[reason]);
    setIsCanceling(false);
  };

  const formatDistance = (dist) => dist.toFixed(1) + ' miles';
  const formatTime = (time) => time + ' min';

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Driver on the Way</h1>
      <div style={styles.mapContainer}>
        <div style={styles.driverIcon}>🚗</div>
        <div style={styles.userIcon}>📍</div>
      </div>
      <div style={styles.info}>
        <p>Distance: {formatDistance(distance)}</p>
        <p>ETA: {formatTime(eta)}</p>
        {isArrived ? (
          <p style={styles.arrivalMessage}>Your driver has arrived!</p>
        ) : (
          <p>Your driver is on the way.</p>
        )}
      </div>
      <div style={styles.actions}>
        <button style={styles.cancelButton} onClick={() => setIsCanceling(true)}>
          Cancel Trip
        </button>
        <button style={styles.contactButton} onClick={() => setIsChatOpen(!isChatOpen)}>
          {isChatOpen ? "Close Chat" : "Contact Driver"}
        </button>
      </div>

      {/* Cancel Order Modal */}
      {isCanceling && (
        <div style={styles.cancelModal}>
          <h3>Why are you canceling your order?</h3>
          <ul style={styles.cancelReasons}>
            {["Changed my mind", "Order is taking too long", "Found a better option", "Incorrect delivery address", "Other"].map((reason) => (
              <li
                key={reason}
                style={styles.reasonItem}
                onClick={() => cancelOrder(reason)}
              >
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cancel Response */}
      {cancelReason && (
        <div style={styles.cancelResponse}>
          <p><strong>Reason:</strong> {cancelReason}</p>
          <p><strong>Response:</strong> {cancelResponse}</p>
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h3>Chat with Driver</h3>
            <button onClick={() => setIsChatOpen(false)} style={styles.closeButton}>
              ✖
            </button>
          </div>
          <div style={styles.chatBody}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  ...(msg.sender === "You" ? styles.userMessage : styles.driverMessage),
                }}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div style={styles.chatFooter}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: { fontFamily: 'Arial, sans-serif', padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', maxWidth: '400px', margin: '0 auto' },
  heading: { color: '#333' },
  mapContainer: { position: 'relative', width: '300px', height: '300px', margin: '20px auto', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#e0f7fa' },
  driverIcon: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px' },
  userIcon: { position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', fontSize: '24px' },
  info: { marginTop: '20px' },
  arrivalMessage: { color: 'green', fontWeight: 'bold' },
  actions: { marginTop: '20px' },
  cancelButton: { backgroundColor: '#ff4d4f', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' },
  contactButton: { backgroundColor: '#1890ff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' },
  cancelModal: { backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px' },
  cancelReasons: { listStyleType: 'none', padding: 0 },
  reasonItem: { backgroundColor: '#f1f1f1', padding: '10px', marginBottom: '10px', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' },
  cancelResponse: { marginTop: '20px', backgroundColor: '#d1e7dd', padding: '10px', borderRadius: '8px' },
  chatWindow: { position: 'fixed', bottom: '20px', right: '20px', width: '300px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' },
  chatHeader: { backgroundColor: '#1890ff', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  closeButton: { backgroundColor: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' },
  chatBody: { maxHeight: '200px', overflowY: 'auto', padding: '10px', backgroundColor: '#f9f9f9' },
  message: { marginBottom: '10px', padding: '8px', borderRadius: '8px' },
  userMessage: { backgroundColor: '#d1e7dd', alignSelf: 'flex-end' },
  driverMessage: { backgroundColor: '#f8d7da', alignSelf: 'flex-start' },
  chatFooter: { display: 'flex', padding: '10px', backgroundColor: '#f1f1f1' },
  input: { flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px', marginRight: '10px' },
  sendButton: { backgroundColor: '#1890ff', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' },
};

export default DriverOnTheWay;


