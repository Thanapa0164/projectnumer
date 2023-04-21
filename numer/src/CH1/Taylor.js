import React, { useState } from 'react'
import { evaluate, pow, factorial, derivative, simplify, print } from 'mathjs'
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";


const Taylor =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValuefX0(data.map((x)=>x.fX0));
        setValuefX1(data.map((x)=>x.fX1));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">fX</th>
                            <th width="30%">fXi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.fX0}</td>
                                <td>{element.fX1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line
                data={state}
                />
            </Container>
           
        );
    }

    const error =(xreal, xcal)=> Math.abs((xreal-xcal)/xreal)*100;
   
    const CalTaylor = (x0,x,n) => {
        var fx,ea,d,ans =0;
        var fxd,fxi;
        var iter = 0;
        const e = 0.000001;
        var obj={};
        do
        {
            if(iter>0){
                d = derivative(fx,'x').toString();
                fx = d;
                fxd = evaluate(d, {x:x0});
                ans += (pow((x-x0),iter)/factorial(iter))*fxd;
                iter++;
            }else if(iter == 0){
                fxd = evaluate(Equation, {x:x0})
                ans += fxd;
                fx = Equation ;
                iter++
            }
            fxi = evaluate(Equation, {x:x});
            ea = error(fxi,ans)
            obj = {
                iteration:iter,
                fX0:fxi,
                fX1:ans
            }
            data.push(obj)
        }while(ea>e && iter<n)
        setX(ans)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValuefX0] = useState([]);
    const [valueX1, setValuefX1] = useState([]);

    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'X0',
            fill: false,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: valueX0
          },
          {
            label: 'X1',
            fill: false,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: valueX1
          }
        ]
    }
     
   
    const [html, setHtml] = useState(null); //ตัวตาราง Table
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XX,setXX] = useState(0)
    const [X0,setX0] = useState(0)
    const [N,setN] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputXX = (event) =>{
        console.log(event.target.value)
        setXX(event.target.value)
    }

    const inputN = (event) =>{
        console.log(event.target.value)
        setN(event.target.value)
    }


    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const xnum = parseFloat(XX)
        const nnum = parseFloat(N)
        CalTaylor(x0num,xnum,nnum);
     
        setHtml(print());
    }

    return (
        <div>
        {/* <Header/> */}
        <br></br>
        <p class="text-center"> <h1>Taylor series</h1></p>
        <br></br>
        <Container>
            <Form>
                <Form.Group as={Row} className="mb-3 justify-content-md-center" >
                    <Form.Label column sm={1}>Input f(x)</Form.Label>
                    <Col xs="4">
                        <Form.Control type="text" id="equation" value={Equation} onChange={inputEquation} className="form-control" />
                    </Col>
                </Form.Group>
                <br></br>
                <Form.Group as={Row} className="mb-3 justify-content-md-center">
                    <Form.Label column sm={1}>Input X0</Form.Label>
                    <Col xs="3">
                        <Form.Control type="number" id="X0" onChange={inputX0} className="form-control" />
                    </Col>
                    <Form.Label column sm={1}>Input X</Form.Label>
                    <Col xs="3">
                        <Form.Control type="number" id="X" onChange={inputXX} className="form-control" />
                    </Col>
                    <Form.Label column sm={1}>Input N</Form.Label>
                    <Col xs="3">
                        <Form.Control type="number" id="N" onChange={inputN} className="form-control" />
                    </Col>
                </Form.Group>
                <br></br>
                <div class="text-center">
                <Button variant="primary" onClick={calculateRoot} className="btn justify-content-md-center" >
                    Calculate
                </Button>
                </div>
            </Form>
            <br></br>
            <h5 style={{textAlign:"center"}}>Answer = {X.toPrecision(7)}</h5>
            <Container>
                {html}
            </Container>
        </Container>   
        </div>
    )
}

export default Taylor