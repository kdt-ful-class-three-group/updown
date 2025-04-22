import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/Button'
import './App.css'
import { SignUp, StartPage } from './Pages/SignUp'
import { GameEnd } from './Pages/GameEnd'
import { GamePage } from './pages/GamePage'
import { Login } from './Pages/Login'


function App() {
    const navigate = useNavigate();

    return (
        <>
                <Routes>
                    <Route path='/' element={<StartPage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/game' element={<GamePage />} />
                    <Route path='/gameEnd' element={<GameEnd />} />
                </Routes>
        </>
    )
}

export default App