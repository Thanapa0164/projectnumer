import { evaluate } from 'mathjs'
import React, { useState } from 'react'
import { Button, Container,Table } from 'react-bootstrap'
import { Line } from 'react-chartjs-2'

function Test() {
  const print=()=>{
    console.log(data)
    setvalueiter(data.map((x)=>x.iteration))
    setvalueXl(data.map((x)=>x.Xl))
    setvalueXm(data.map((x)=>x.Xm))
    setvalueXr(data.map((x)=>x.Xr))
    return(
      <Container>
        <Table>
          <thead>
            <tr>
              <th width="10%">iteration</th>
              <th width="30%">XL</th>
              <th width="30%">XM</th>
              <th width="30%">XR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e,i)=>{
              return(
              <tr key={i}>
                <th>{e.iteration}</th>
                <th>{e.Xl}</th>
                <th>{e.Xm}</th>
                <th>{e.Xr}</th>
              </tr>)
            })}
          </tbody>
        </Table>
        <Line
        data ={state}
        >

        </Line>
      </Container>
    )
  }

const [valueiter,setvalueiter] = useState([]);
const [valueXl,setvalueXl] = useState([]);
const [valueXm,setvalueXm] = useState([]);
const [valueXr,setvalueXr] = useState([]);


const[Equation,setEquation] = useState("x^2+3")
const[XL,setXL] = useState(0)
const[XR,setXR] = useState(0)
const[X,setX] = useState(0)
const data = [];
const[html,sethtlm] = useState()

const state = {
  labels: valueiter,
  datasets : [
    { 
      label: "XL",
      borderColor: 'red',
      data : valueXl
    },
    { 
      label: "XM",
      borderColor: 'green',
      data : valueXm
    },
    { 
      label: "XR",
      borderColor: 'blue',
      data : valueXr
    }
   
  ]
}


const inputEquation =(event)=>{
  setEquation(event.target.value);
  console.log(event.target.value);
}

const inputXL =(event)=>{
  setXL(event.target.value);
  console.log(event.target.value);
}
const inputXR =(event)=>{
  setXR(event.target.value);
  console.log(event.target.value);
}

const CalculateRoot=()=>{
  const numxl = parseFloat(XL);
  const numxr = parseFloat(XR);

  bisection(numxl,numxr);
  sethtlm(print())
}

const error =(xold,xnew)=> Math.abs((xnew-xold)/xnew)*100;
const bisection =(xl,xr)=>{
  var xm,fxr,fxm,ea;
  var iter =0 ;
  var Max = 50;
  const e = 0.000001;
  var obj = {};

  do{
    xm = (xl+xr)/2.0;
    fxr = evaluate(Equation,{x:xr})
    fxm = evaluate(Equation,{x:xm})

    iter ++

    if(fxr*fxm > 0){
      ea = error(xr,xm);
      obj = {
        iteration : iter,
        Xl : xl,
        Xm : xm,
        Xr : xr
      }
      data.push(obj)
      xr = xm;
    }else{
      ea = error(xl,xm);
      obj = {
        iteration : iter,
        Xl : xl,
        Xm : xm,
        Xr : xr
      }
      data.push(obj)
      xl = xm;
    }
  }while(ea>e && iter<Max)
  setX(xm)
}


  return (
    <div style={{textAlign:'center'}}>
      <div>
        <br></br>
        <h1>Bisection</h1>
        <br></br>
        <label style={{margin:10}}>Input f(x)</label>
        <input type='text' onChange={inputEquation} value={Equation}></input>
        <br></br><br></br>
        <label style={{margin:10}}>Input XL</label>
        <input type='number'onChange={inputXL}></input>
        <label style={{margin:10}}>Input XM</label>
        <input type='number' onChange={inputXR}></input>
        <br></br><br></br>
        <Button onClick={CalculateRoot}>Calculate</Button>
      </div>

      <div>
        <br></br>
        <h5>Answer = {X.toPrecision(7)}</h5>
      </div>

      <div>
        {html}
      </div>
    </div>
  )
}

export default Test