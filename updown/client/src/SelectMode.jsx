import { useState } from 'react'
import { Main } from './components/Main';
import { Input } from './components/Input';
import { Button } from './components/Button';
// import './App.css'

function SelectMode() {
    const [count, setCount] = useState(0)

    return (
        <>
          <Main>
            <Button btnName="Easy" onClick={() => {window.location.href = "./mode/easy/easy.html";}} id='easy'/>
            <Button btnName="Normal" onClick={() => {window.location.href = "./mode/normal/normal.html";}} id='normal'/>
            <Button btnName="Hard" onClick={() => {window.location.href = "./mode/hard/hard.html";}} id='hard'/>
          </Main>
        </>
    )
}

export default SelectMode;