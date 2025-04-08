import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context/MessageContext';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  //* Provider는 context API를 사용하여 하위 컴포넌트에 context를 전달하는 역할을 함
//* StrictMode는 리액트에서 제공하는 개발 모드에서만 활성화되는 기능으로, 컴포넌트의 렌더링을 두 번 수행하여 사이드 이펙트를 감지하고, 경고를 표시하는 등의 기능을 제공
//* createRoot는 React 18에서 도입된 새로운 API로, ReactDOM.render() 대신 사용
  <StrictMode>
    <Provider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
