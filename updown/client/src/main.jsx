import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');
export const root = ReactDOM.createRoot(rootElement);
root.render(
  <App />)
{/* <BrowserRouter>
</BrowserRouter>) */}




// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <StrictMode>
//       <App />
//     </StrictMode>
//   </BrowserRouter>
// )