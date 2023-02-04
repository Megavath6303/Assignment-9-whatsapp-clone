import React, { useState , useEffect } from 'react'
//import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar';
import './SidebarChat.css'
import db from '../firebase';
import { Link } from 'react-router-dom';
import { ownerDocument } from '@mui/material';

const SidebarChat = ({id,name,addNewChat}) => {
    const [num, setNum] = useState('')
    const [messages , setMessages] = useState("")

    useEffect (() => {
        if(id){
          db.collection("rooms")
          .doc(id)
          .collection("messages")
          .orderBy("timestamp" , "desc")
          .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))
        }
    } ,[id])
    useEffect(() => {
        setNum(Math.floor(Math.random()  * 50))
    }, [])


const createChat = () => {
  const roomName = prompt("Please add a new chat")
  if(roomName){
    db.collection('rooms').add({
      name : roomName
    })
  }   
}

return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat'>
       
        <Avatar src={`https://randomuser.me/api/portraits/men/${num}.jpg`} />
    
        <div className='sidebarChat__info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
            
        </div>
    </div>
    </Link>
  ):(
    <div onClick={createChat} className="sidebarChat">
      <h3>Add New Chat</h3></div>
  )
}

export default SidebarChat
