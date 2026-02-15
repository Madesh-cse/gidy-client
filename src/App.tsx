// import './App.css'
import { Route , Routes } from 'react-router-dom'
import Profile from "./pages/Profile"

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Profile/>}></Route>
      </Routes>
    </main>
  )
}

export default App
