import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Routes ,Route} from 'react-router-dom'
import Login from './components/Login'
import { useState } from 'react';
import { useStateValue } from './components/StateProvider';
function App() { 
  const [{user} , dispatch] = useStateValue()

  return (
    <div className="App"> 
    {!user ? <Login/> :(
        <div className='app__body'>
        <Sidebar/>
        <Routes>
          <Route path="/rooms/:roomId"  element={ <Chat/>}></Route>
          <Route path="/"  element={<Chat/>}></Route>
        </Routes>
        </div>
    )}
      
    </div>
)}
export default App;
