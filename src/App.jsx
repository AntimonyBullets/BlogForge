import { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import { authService } from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((user)=>{
      if(user){
        dispatch(login(user))
      }
      else{
        dispatch(logout)
      }
    })
    .catch((e)=>{
      console.log("Some error occured!:", e)
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-100'>
      <Header />
      <main className='flex-grow flex flex-col'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  ) : null;
}

export default App
