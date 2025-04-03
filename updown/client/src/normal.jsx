import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/play.css'
// import App from './App.jsx'
import { Main } from './components/Main';
import { Input } from './components/Input';
import { Button } from './components/Button';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main>
      <Input placeholder="숫자를 입력해주세요"/>
      <Button btnName="입력"/>
    </Main>
  </StrictMode>,
)