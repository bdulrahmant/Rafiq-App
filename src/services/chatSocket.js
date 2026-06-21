let socket = null;

export const connectSocket = ({ onMessage, onDone, onError }) => {
  socket = new WebSocket(import.meta.env.VITE_AI_SOCKET_URL);

  socket.onopen = () => {
    console.log("✅ WebSocket Connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    console.log("WS Message:", data);

    // streaming chunk
    if (data.type === "chunk") {
      onMessage?.(data.content);
    }

    // stream finished
    if (data.type === "done") {
      onDone?.();
    }

    // ping from server
    if (data.type === "ping") {
      socket.send(JSON.stringify({ type: "pong" }));
    }

    // error
    if (data.type === "error") {
      onError?.(data.error);
    }
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.log("🔌 WebSocket Closed");
  };
};

export const sendMessage = ({ question, session_id }) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.log("socket not ready");
    return;
  }

  socket.send(
    JSON.stringify({
      question,
      session_id,
    }),
  );
};
export const disconnectSocket = () => {
  socket?.close();
};
