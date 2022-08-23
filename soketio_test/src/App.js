import './App.css';
import { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import socket from 'socket.io-client';

function App() {
  const [chat, setChat] = useState({ message: '', name: '' });
  const [list, setList] = useState([]);

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setList([...list, { name, message }])
    })
  }, []);

  const onTextChange = (e) => {
    setChat({ ...chat, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    e.preventDefault()
    const { name, message } = chat
    socket.emit('message', { name, message })
    setChat({ message: '', name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, idx) => {
      <div key={idx}>
        <h4>{name} : <span>{message}</span></h4>

      </div>

    })
  }
  return (
    <div className='card'>
      <form onSubmit={onMessageSubmit}>
        <h1>Message</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={chat.name}
            label="Name" />
        </div>
        <div >
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={chat.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message" />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat log</h1>
        {renderChat()}
      </div>
    </div>


  );
}

export default App;
