import React, { useState } from 'react'
import { Button} from 'react-bootstrap'
import axios from "axios"

function Thanapa() {
    var inputx =[], inputfx=[];
    const giventable = [];
    const [Dtable,setdtable]= useState();
    let n=0;
    const InputN =(event)=>{
        console.log(event.target.value)
        n = parseFloat(event.target.value)
        createtable()
        setdtable(result_p)
    }

    const exam =()=>{
        try{
            axios.post("http://localhost:5000/getdata", {num:n}).then((res)=>{
                const ran = Math.floor(Math.random()*res.data.length)
                console.log(res.data[ran])
                const jsons = JSON.parse(res.data[ran].alldata)
                for(let i=0;i<n;i++){
                    document.getElementById("x"+i).value = jsons.x[i]
                    document.getElementById("fx"+i).value = jsons.y[i]
                }
            })
        }
        catch(err){console.log(err)}

    }

    const createtable =()=>{
        for(let i=0;i<n;i++){
            inputx.push(<div><input type='number' id={"x"+i}></input></div>)
            inputfx.push(<div><input type='number' id={"fx"+i}></input></div>)
        }
        giventable.push({inputx,inputfx})
    }
    
    const result_p=()=>{
        return(
            <div>
                {giventable.map((data)=>(
                    <div style={{display:"inline-flex"}}>
                        <br/>
                        <h5>X</h5>
                        <div>{data.inputx}</div>

                        <h5>fx</h5>
                        <div>{data.inputfx}</div>
                    </div>
                ))}
                <br/>

                <Button onClick={exam}>Example</Button>
            </div>
        )
    }

    return (
    <div style={{textAlign:'center'}}>
        <br/>
        <h1>Linear regression</h1>
        <br/>
        <input type='number' onChange={InputN}></input>
        <br/>
        <br/>

        <div>
            {Dtable}
        </div>
    </div>
  )
}

export default Thanapa
