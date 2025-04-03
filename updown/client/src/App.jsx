import { useState } from 'react'
import './App.css'
import { Main } from './components/Main'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SelectMode } from './components/SelectMode';
import { PlayGame } from './components/playGame';
import { Select } from './components/Select';
import { Input } from './components/Input';
import { Button } from './components/Button';


function App() {
    const [count, setCount] = useState(0)

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <>
                        <Main>
                            <SelectMode>
                                <Select address="/easy" detail="EASY" />
                                <Select address="/normal" detail="NORMAL" />
                                <Select address="/hard" detail="HARD" />
                            </SelectMode>
                        </Main>
                    </>
                }/>
                <Route path='/easy' element={
                    <>
                    <Main>
                        <PlayGame>
                            <Input placeholder='숫자를 입력해주세요'/>
                            <Button btnName={"입력"} />
                        </PlayGame>
                    </Main>
                    </>
                    }/>
                <Route path='/normal' element={<>
                    <Main>
                        <PlayGame>
                            <Input placeholder='숫자를 입력해주세요'/>
                            <Button btnName={"입력"} />
                        </PlayGame>
                    </Main>
                </>}/>
                <Route path='/hard' element={<>
                    <Main>
                        <PlayGame>
                            <Input placeholder='숫자를 입력해주세요'/>
                            <Button btnName={"입력"} />
                        </PlayGame>
                    </Main>
                </>}/>
            </Routes>

        </BrowserRouter>

    )
}

export default App