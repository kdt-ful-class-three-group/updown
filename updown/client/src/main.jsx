import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
// import App from './App.jsx'
import { Main } from './components/Main';
import { Input } from './components/Input';
import { Button } from './components/Button';
import SelectMode from './SelectMode'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SelectMode />
  </StrictMode>,
)