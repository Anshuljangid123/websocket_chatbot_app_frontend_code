import { useEffect, useRef, useState } from 'react'
import './App.css'



function App() {

  const [messages , setMessages] = useState(["hi there....." , "hello"]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() =>{
    // connecting to the websocket . 
    const ws = new WebSocket("http://localhost:8090"); // web socket connection 
    ws.onmessage = (event) => {
      // ws.onmessage is an event handler in WebSockets that listens for messages received from the server.
      // @ts-ignore
      setMessages(m => [...m , event.data]);
    }

    wsRef.current = ws;

    ws.onopen = () =>{
      ws.send(JSON.stringify({
        type : "join",
        payload : {
          roomId : "red"
        }
      }))
    }

    return () => {
      // clean up logic 
      ws.close();
    }
    
  } , []);

  return (
    <div className='h-screen bg-black text-white'>
      <br/> <br/>
          <div className='h-[85vh]'>
            {messages.map(message => <div className='m-8'>
                <span className='bg-white text-black p-4 rounded '> 
                  {message}
                </span>
              </div>)}
          </div>
          <div className='bg-black'> </div>
          <div className='w-full bg-white flex '>
            <input id='message' type="text" className='flex-1 p-4 text-black '></input>
            <button onClick={() =>{
              //@ts-ignore
              const message = document.getElementById("message")?.value;
              //@ts-ignore
              wsRef.current.send(JSON.stringify({
                type : "chat",
                payload : {
                  message : message
                }
              }))
            }} className='bg-purple-600 p-4 text-black'> 
                send message
            </button> 
          </div>
    </div>
  )
}

export default App
