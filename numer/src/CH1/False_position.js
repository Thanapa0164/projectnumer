import { useState } from "react"
import { Button, Container, Form, Table,Row, Col } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";


const False_position =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueX1(data.map((x)=>x.X1));
        setValueXr(data.map((x)=>x.Xr));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">X1</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.X1}</td>
                                <td>{element.Xr}</td>
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

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calfalse = (xl, xr) => {
        var x1,fX1,fXr,fXl,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj={};
        do
        {
            scope = {
                x:xl
            }
            fXl = evaluate(Equation, scope)

            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)
            x1 = (xl*fXr-xr*fXl)/(fXr-fXl);
            
            scope = {
                x:x1,
            }
            fX1 = evaluate(Equation, scope)
            

            iter ++;
            if (fX1*fXr > 0)
            {
                ea = error(xr, x1);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    X1:x1,
                    Xr:xr
                }
                data.push(obj)
                xr = x1;
            }
            else if (fX1*fXr <= 0)
            {
                ea = error(xl, x1);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    X1:x1,
                    Xr:xr
                }
                data.push(obj)
                xl = x1;
            }
        }while(ea>e && iter<MAX)
        setX(x1)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const state = {
        labels: valueIter,
        datasets: [
          {
            label: 'Xl',
            fill: false,
            backgroundColor: 'white',
            borderColor: 'red',
            borderWidth: 2,
            data: valueXl
          },
          {
            label: 'X1',
            fill: false,
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 2,
            data: valueX1
          },
          {
            label: 'Xr',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'white',
            borderColor: 'blue',
            borderWidth: 2,
            data: valueXr
          }
        ]
    }
     
   
    const [html, setHtml] = useState(null); //ตัวตาราง Table
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calfalse(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueXl)
    }

    return (
        <div>
            <br></br>
            <p class="text-center"> <h1>False position</h1></p>
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
                    <Form.Label column sm={1}>Input XL</Form.Label>
                    <Col xs="3">
                        <Form.Control type="number" id="XL" onChange={inputXL} className="form-control" />
                    </Col>
                    <Form.Label column sm={1}>Input XR</Form.Label>
                    <Col xs="3">
                    <Form.Control type="number" id="XR" onChange={inputXR} className="form-control" />
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

export default False_position