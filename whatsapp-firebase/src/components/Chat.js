import React, { useState , useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import './Chat.css'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFile from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import db from '../firebase';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';

const Chat = () => {
    const [num, setNum] = useState('')
    const [input , setInput] = useState('')
    const {roomId} = useParams()
    const [roomName , setRoomName] = useState('')
    const [messages ,setMessages] = useState([])
    const [{user} , dispatch ] = useStateValue()

    useEffect(() => {
        if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot =>(
               setRoomName(snapshot.data().name) 
               ))
               db.collection("rooms")
               .doc(roomId)
               .collection("message")
               .orderBy("timestamp" , "asc")
               .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    },[roomId])    

    const sendmessage = e => {
        e.preventDefault()
        db.collection('rooms').doc(roomId).collection('message').add({
            message : input,
            name : user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }

    useEffect(() => {
        setNum(Math.floor(Math.random()  * 50))
    }, [])



  return (
    <div className='chat'>
        <div className='chat__header'>
        <Avatar src={`https://randomuser.me/api/portraits/men/${num}.jpg`} />
        <div className='chat__headerInfo'>
            <h3>{roomName}</h3>
            <p>last seen....</p>
        </div>
        <div className='chat__headerRight'>
        <IconButton>
            <SearchIcon/>
        </IconButton>
        <IconButton>
            <AttachFile/>
        </IconButton>
        <IconButton>
            <MoreVertIcon/>
        </IconButton>
        </div>
        </div>
        <div className='chat__body'>
            {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                    <span className='chat__name'>{message.name}</span>
                    {message.message}
                    <span className='chat__timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
            
            
           
        </div>
    <div className='chat__footer'>
        <InsertEmoticonIcon/>
        <form>
        <input type="text" placeholder='type message here'
        value={input} 
        onChange={e => setInput(e.target.value)}
        />
        <button onClick={sendmessage} type='submit'><SendIcon/></button>
        </form>
        <MicIcon/>
    </div>
    </div>
    
  )
}

export default Chat