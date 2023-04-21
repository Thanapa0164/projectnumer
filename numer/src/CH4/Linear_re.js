import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { pow, inv, multiply } from 'mathjs';
import { Line} from 'react-chartjs-2';
import axios from "axios"
import { CalLinear } from './callinear';

function Linear_re() {
  var x=[], fx=[], mA=[], mAinv=[], mB=[], mX=[],gX=[];
  var inputx=[], inputfx=[];
  let output = [];
  const givenprob = [];
  const [probtable, setProbtable] = useState()
  const [OutA,setA] = useState([])
  let n =0;

  const [token, setToken] = useState()


  const inputN=(event)=>{
      console.log(event.target.value)
      n = parseFloat(event.target.value)
      createTable(n);
      setProbtable(result_problem());
  }
  
  const createTable=(n)=>{
      for(let i=0;i<n;i++){
          inputx.push(<div><input type='number' id={"x" + i} ></input></div>)
          inputfx.push(<div><input type='number' id={"fx" + i} ></input></div>)
      }
      givenprob.push({inputx, inputfx})
  }

    const CalculateRoot =()=>{
        for(let i=0;i<n;i++){
            x[i] = (parseFloat(document.getElementById("x" + i).value));
            fx[i] = (parseFloat(document.getElementById("fx" + i).value));
            if(isNaN(x[i]) || isNaN(fx[i])){
                //alert("no have data")
                break
            }
        }
            console.log(x, fx)
            const {gxnew,outputnew}= CalLinear(x, fx, n);
            gX = gxnew
            output = outputnew
            setA(result_output());
            try{
                axios.post("http://localhost:4000/insertdata", {
                    numgen: n,
                    x: x,
                    y: fx
                })
            }catch(err){console.log(err)}
        
    }

    
  const result_problem=()=>{
      return(
          <div>
              <div>
                  {givenprob.map((data)=>(
                      <div style={{display:"inline-flex"}}>
                          <br/>
                          <h4 style={{margin:10}}>X</h4>
                          <div>{data.inputx}</div>
  
                          <h4 style={{margin:10}}>f(x)</h4>
                          <div>{data.inputfx}</div>
                      </div>
                  ))}
              </div>
              <br/>
                <Button onClick={Example}>Example</Button>
              <br/>
              <br/>
              <Button onClick={CalculateRoot}>Calculate</Button>
    
          </div>
      );
  }

  const getToken=()=>{
    let name = document.getElementById("tokenName").value
    try{
        axios.get(`http://localhost:4000/gettoken/${name}`).then((res)=>{
            console.log(res.data)
            setToken(res.data)
        })
    }catch(err){console.log(err)}
    }

    const Example =()=>{
        console.log(token)
        console.log(n)
        if(token !== undefined){
            try{
                axios.post("http://localhost:4000/getdata",{num: n}, {headers:{authorization:`T ${token}`}}).then((res)=>{
                    console.log(res.data.length)
                    const ran = Math.floor(Math.random()*res.data.length)
                    console.log(res.data[ran].alldata)
                    const jsons = JSON.parse(res.data[ran].alldata)
                    console.log(jsons)
                    for(let i=0;i<n;i++){
                        document.getElementById("x"+i).value = jsons.x[i]
                        document.getElementById("fx"+i).value = jsons.y[i]
                    }
                })
            }
            catch(err){console.log(err)}
        }
        else{
            alert("you must to get token")
            window.location.reload()
        }
    }

  const result_output=()=>{
    return(
        <div>
            {output.map((data,i)=>(
                      <div key={i} >
                          <br/>
                          <h4>a{i} = {data.mX[i]} </h4>
                          <h4>a{i+1} = {data.mX[i+1]} </h4>
                      </div>
                  ))}
            <Container>
            <Line
             data={{
                labels: x,
                datasets:[
                    {
                        label: "g(x)",
                        borderColor: 'red',
                        data: gX,
                        pointRadius: 0
                    },
                    {
                        label: "f(x)",
                        borderColor: 'green',
                        data: fx,
                        type: "bubble"
                    }
                ]
             }}
            /> 
            </Container>
        </div>
    )
  }
  
//   const CalLinear=(x, fx)=>{
//       var sumx= 0, sumy =0, sumxy =0, sumx2 =0;

//       for(let i=0;i<n;i++){
//         sumx += x[i];
//         sumx2 += pow(x[i],2);
//         sumy += fx[i];
//         sumxy += x[i]*fx[i];
//       }

//       mA = [[n,sumx],[sumx,sumx2]];
//       mB = [sumy,sumxy];
//       mAinv = inv(mA);

//       mX = multiply(mAinv,mB)

//       for(let i =0;i<n;i++){
//         gX[i] = mX[0]+mX[1]*x[i];
//       }

//       output.push({mX,gX})

      
//   }
  
  return (
    <div style={{textAlign:'center'}}>
      <Form>
    <br></br>
      <h1>Linear Regression</h1>
      <br></br>
      <input type='text' id='tokenName' style={{margin:10}}></input>
      <Button onClick={getToken}>Get Token</Button>
        <br/>
        <br/>
      <Form.Label style={{margin:10}}>input n</Form.Label>
      <input type = "number" onChange={inputN}></input>
      <br></br>
      <br/><br/>
      <div>
          {probtable}
      </div>
      <div>
        {OutA}
      </div>
  </Form>
  </div>
)
};
export default Linear_re