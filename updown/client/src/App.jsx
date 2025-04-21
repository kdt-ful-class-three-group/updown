import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from './context/MessageContext'
import { Button } from './components/Button'
import './App.css'
import { StartPage } from './pages/StartPage'
import { GameEnd } from './Pages/GameEnd'
import { GamePage } from './pages/GamePage'


function App() {
    const navigate = useNavigate();

    return (
        <>
                <Routes>
                    <Route path='/' element={<StartPage />} />
                    <Route path='/game' element={<GamePage />} />
                    <Route path='/gameEnd' element={<GameEnd />} />
                </Routes>
        </>
    )
}

export default App