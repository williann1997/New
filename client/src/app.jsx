import { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = new WebSocket(import.meta.env.VITE_SERVER_URL || "ws://localhost:3001");

  useEffect(() => {
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  const sendMessage = () => {
    socket.send(input);
    setInput('');
  };

  return (
    <div className="p-4 text-white bg-black h-screen">
      <div className="h-[90%] overflow-y-scroll">
        {messages.map((msg, idx) => (
          <div key={idx} className="my-1">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 p-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-blue-600 px-4 py-2" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
