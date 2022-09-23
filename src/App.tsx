import React, {useState} from 'react'
import './App.css'
import CanvasLayer from "./polygraph/graphic/layer/CanvasLayer";
import Rectangle from "./polygraph/graphic/figure/Rectangle";
import Circle from "./polygraph/graphic/figure/Circle";

function App() {
    const [ visibility, setVisibility ] = useState(false);

    return (
        <div>
            <button onClick={() => setVisibility(!visibility)}>Test</button>
            <CanvasLayer width={1000} height={1000}>
                {
                    !visibility &&
                    <Circle radius={14} posX={20} posY={20} onClick={(e) => console.log(e)}/>
                }
                {
                    visibility &&
                    <Rectangle posX={20} posY={20} width={400} height={400}/>
                }
                <Rectangle posX={30} posY={30} width={400} height={400}/>
                <Rectangle posX={590} posY={590} width={20} height={20}/>
            </CanvasLayer>
        </div>
    );
}

export default App
