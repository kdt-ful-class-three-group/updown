import { useState } from 'react'
import ReactDOM from 'react-dom/client';
import './App.css'
import { Button } from './components/Button.jsx';
import {Heading} from './components/Tag.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {root} from './main.jsx'

const Easy = () => {

    // return (
    //     <div>
    //         <Heading number="1" children={"안녕하세요. Easy 모드입니다."}/>  
    //     </div>
    //   );
    root.render(<Heading number="1" children={"안녕하세요. Easy 모드입니다."}/>)
}

const Normal = () => {
    return (
        <div>
          <Heading number="1" children={"안녕하세요. Normal 모드입니다."}/>
        </div>
      );
};

const Hard = () => {
    return (
        <div>
          <Heading number="1" children={"안녕하세요. Hard 모드입니다."}/>
        </div>
      );
};

const Head = () => {
        return(
            <Heading number="1" children={"메인 화면에 오신 것을 환영합니다."}/>
        )
}

// 첫 화면에서 모드를 고르는 페이지
const MainPage = () => {
    return(

        
        <Router>
            <Routes>
                <Route path="/" element={
                            <>
                            <nav>
                                <Link to="/easy">
                                    <Button btnName="easy"/>
                                </Link>
                                
                                <Link to="/normal">
                                    <Button btnName="normal"/>
                                </Link>
                                
                                <Link to="/hard">
                                    <Button btnName="hard"/>
                                </Link>
                            </nav>
                            </>
                } />
                <Route path="/easy" element={<Easy />} />
                <Route path="/normal" element={<Normal />} />
               <Route path="/hard" element={<Hard />} />
            </Routes>

            </Router>

    )
}

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <MainPage />
        </>
    )
}

export default App