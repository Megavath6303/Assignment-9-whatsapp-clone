import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import IconButton from '@mui/material/IconButton'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import SidebarChat from './SidebarChat'
import db from '../firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {
const [{user} , dispatch] = useStateValue([])
const [rooms , setRooms] = useState([])

useEffect(() => {
     db.collection('rooms').onSnapshot(snapshot => (
        setRooms(snapshot.docs.map(doc => (
              {
                id : doc.id,
                data : doc.data()
              }
        )))
     ))
},[])

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar src={user ?.photoURL } />
        <div className='sidebar__headerRight'>
        <IconButton>
            <DonutLargeIcon/>
        </IconButton>
        <IconButton>
            <ChatIcon/>
        </IconButton>
        <IconButton>
            <MoreVertIcon/>
        </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
        <SearchIcon/>
        <input type="text" placeholder="search contacts"/>
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat addNewChat/>
        {rooms.map(room => <SidebarChat key={room.id} id={room.id} name={room.data.name}/>)}
      </div>
    </div>
  )
}

export default Sidebar
