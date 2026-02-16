// import './App.css'
import { Route , Routes } from 'react-router-dom'
import Profile from "./pages/Profile"
import { useEffect } from 'react';

function App() {

    useEffect(() => {
    console.log("API_URL:", import.meta.env.VITE_API_URL);
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/" element={<Profile/>}></Route>
      </Routes>
    </main>
  )
}

export default App
