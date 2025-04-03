import { useState } from 'react'
import './App.css'
import { Button } from './components/Button.jsx';
import {Input} from './components/Input.jsx';
import {Main} from './components/Main.jsx';
import {Heading} from './components/Tag.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Easy = () => {
    return (
        <div>
          <Heading number="1" children={"안녕하세요. Easy 모드입니다."}/>
        </div>
      );
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

const MainPage = () => {
    return(
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
        {/* <Head />
            <Link to="/easy"><Button btnName="easy" onClick={<Easy />} /></Link>
            <Link to="/normal"><Button btnName="normal" onClick={<Normal />} /></Link>
            <Link to="/hard"><Button btnName="hard" onClick={<Hard />} /></Link>
        <Routes>
          <Route path="/easy" element={<Easy />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/hard" element={<Hard />} />
        </Routes> */}

        </>
    )
}

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <MainPage />
            <Routes>
                <Route path="/easy" element={<Easy />} />
                <Route path="/normal" element={<Normal />} />
               <Route path="/hard" element={<Hard />} />
            </Routes>
        </>
    //     <>
        
    // <Heading number="1" children="메인 화면에 오신 것을 환영합니다."/>

    // <Router>
    //         <Link to="/easy"><Button btnName="easy" onClick={<Easy />} /></Link>
    //         <Link to="/normal"><Button btnName="normal" onClick={<Normal />} /></Link>
    //         <Link to="/hard"><Button btnName="hard" onClick={<Hard />} /></Link>
    //     <Routes>
    //       <Route path="/easy" element={<Easy />} />
    //       <Route path="/normal" element={<Normal />} />
    //       <Route path="/hard" element={<Hard />} />
    //     </Routes>
    // </Router>

    //     </>
    )
}

export default App