import { useState } from "react"
import { Button, Container, Form, Table,Row, Col } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { MdCalculate } from "react-icons/md";
import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";

const Secant =()=>{
    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValueX1(data.map((x)=>x.X1));

        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X0</th>
                            <th width="30%">X1</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.X1}</td>

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
   
    const Calsecant = (x0, x1) => {
        var x2,fx0,fx1,ea,scope;
        var iter = 0;
        var MAXiter = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            scope = {
                x:x0,
            }
            fx0 = evaluate(Equation, scope)

            scope = {
                x:x1,
            }
            fx1 = evaluate(Equation, scope)
            x2 = x1-((fx1*(x0-x1))/(fx0-fx1));

            iter ++;
            ea = error(x0, x1);
            obj = {
                iteration:iter,
                X0:x0,
                X1:x1,
            }
            data.push(obj)
            x0 = x1;
            x1 = x2;
        }while(ea>e && iter<MAXiter)
        setX(x1)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);

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
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)
  

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputX1 = (event) =>{
        console.log(event.target.value)
        setX1(event.target.value)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        const x1num = parseFloat(X1)
        Calsecant(x0num,x1num);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueX0)
    }

    return (
        <div>
            <br></br>
            <p class="text-center"> <h1>Secant </h1></p>
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
                    <Form.Label column sm={1}>Input X1</Form.Label>
                    <Col xs="3">
                    <Form.Control type="number" id="X1" onChange={inputX1} className="form-control" />
                    </Col>
                </Form.Group>
                <br></br>
                <div class="text-center">
                    <Button variant="primary" onClick={calculateRoot} className="btn justify-content-md-center" >
                       Calculate  <MdCalculate/>
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

export default Secant