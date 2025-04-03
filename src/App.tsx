import { useEffect, useRef, useState } from 'react'
import './App.css'
import { JoinRoom } from './room';
function App() {

  // useState is used to maintain the state of messages.
  // The messages state is initialized with an array containing two default messages.
  const [messages , setMessages] = useState([]);

  // useRef hook to reference the message input field.
  const inputRef = useRef<HTMLInputElement>(null);

  // useRef is used to store a reference to the WebSocket connection.
  // This is useful to persist the WebSocket instance across re-renders without re-initializing it.
  const wsRef = useRef<WebSocket | null>(null);

  // useState to control the visibility of the room input field.
  const [roomInputVisible , setRoomInputVisible] = useState(true);


  // useRef to store a reference to the room input field.
  const roomRef = useRef<HTMLInputElement>(null);

  // useEffect runs the enclosed function once when the component mounts (due to an empty dependency array `[]`).
  useEffect(() => {
    // Creating a new WebSocket connection to the server at localhost on port 8090.
    const ws = new WebSocket("http://localhost:8090"); // WebSocket connection 

    // This event listener runs when a new message is received from the WebSocket server.
    ws.onmessage = (event) => {
      // @ts-ignore 
      setMessages(m => [...m , event.data]);
    }

    // Store the WebSocket instance in wsRef so it can be accessed elsewhere in the component.
    // wsRef.current = ws;

    // This event fires when the WebSocket connection is successfully opened.
    ws.onopen = () => {
      wsRef.current = ws;
    }

    // Cleanup function that runs when the component unmounts.
    return () => {
      // Closing the WebSocket connection to free up resources.
      ws.close();
    }

  } , []); // The empty dependency array ensures this effect runs only once when the component mounts.


  // Function to send a chat message.
  const sendMessage = () => {
    // Ensure the input field and WebSocket are available.
    if (inputRef.current && wsRef.current) {
      const message = inputRef.current.value; // Get message input value.

      // Send message via WebSocket.
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );

      // Clear input field after sending the message.
      inputRef.current.value = "";
    }
  };

  // Function to join a chat room.
  const onSubmit = () => {
    // Check if WebSocket is open and roomRef is available.
    if(wsRef.current?.readyState === WebSocket.OPEN && roomRef.current)
    {
      const roomId = roomRef.current.value; // Get room ID from input.

      // Send join request to the WebSocket server.
      wsRef.current.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: roomId,
          },
        })
      );

      // Show an alert confirming successful room join.
      alert("You have successfully Joined The Room : " + roomId);

      
    }
    // Hide the room input field after joining.
    setRoomInputVisible(false);
  }


  return (
    <div>
      {/* Main container with a full-screen height and gray background */}
      <div className="flex flex-col h-screen bg-gray-400">

        {/* Display the room input field only if roomInputVisible is true */}
        {roomInputVisible && <JoinRoom close={onSubmit} reference={roomRef} /> }

        {/* Chat messages container */}
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index} // Unique key for each message.
              className="p-2 bg-green-200 rounded mb-2 max-w-xs break-words"
            >
              {message} {/* Display chat message */}
            </div>
          ))}
        </div>

        {/* Input field and send button for sending messages */}
        <div className="p-4 border-t flex">
          <input
            ref={inputRef} // Reference to input field
            type="text"
            placeholder="Type a message..."
            className="border p-2 rounded mr-2 flex-grow bg-gray-200"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(); // Send message when Enter key is pressed
              }
            }}
          />
          <button
            onClick={sendMessage} // Send message when button is clicked
            className="bg-gray-700 text-white border rounded-lg p-2"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App
