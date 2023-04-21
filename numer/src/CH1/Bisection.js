import { useState } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { evaluate } from 'mathjs'
import Chart from "chart.js/auto";
import { Calbisection } from "./Calbi";
import { Line } from "react-chartjs-2";


const Bisection =()=>{

    let data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    // let valueIter = []
    // let valueXl = []
    // let valueXm = []
    // let valueXr = []

    const [html, setHtml] = useState(null); //ตัวตาราง Table
    const [Equation,setEquation] = useState("(x^4)-13")
    // const [X,setX] = useState(0)
    let X =0
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
        const {datanew,xnew}= Calbisection(Equation,xlnum,xrnum);
        data = datanew;
        X = xnew;
     
        setHtml(print());

        // valueIter.push(data.map((x)=>x.iteration));
        // valueXl.push(data.map((x)=>x.Xl));
        // valueXm.push(data.map((x)=>x.Xm));
        // valueXr.push(data.map((x)=>x.Xr));
           
        // console.log(valueIter)
        // console.log(valueXl)
    }

    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        return(
            <Container>
                <br/>
                <h5 style={{textAlign:"center"}} data-testid="ans">Answer = {X.toPrecision(7)}</h5>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={{
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
                            label: 'Xm',
                            fill: false,
                            backgroundColor: 'white',
                            borderColor: 'green',
                            borderWidth: 2,
                            data: valueXm
                          },
                          {
                            label: 'Xr',
                            fill: false,
                            backgroundColor: 'white',
                            borderColor: 'blue',
                            borderWidth: 2,
                            data: valueXr
                          }
                        ]
                    }}/>
            </Container>
           
        );
    }

    //const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    // const Calbisection = (xl, xr) => {
    //     var xm,fXm,fXr,ea,scope;
    //     var iter = 0;
    //     var MAX = 50;
    //     const e = 0.000001;
    //     var obj={};
    //     do
    //     {
    //         xm = (xl+xr)/2.0;
    //         scope = {
    //             x:xr,
    //         }
    //         fXr = evaluate(Equation, scope)

    //         scope = {
    //             x:xm,
    //         }
    //         fXm = evaluate(Equation, scope)

    //         iter ++;
    //         if (fXm*fXr > 0)
    //         {
    //             ea = error(xr, xm);
    //             obj = {
    //                 iteration:iter,
    //                 Xl:xl,
    //                 Xm:xm,
    //                 Xr:xr
    //             }
    //             data.push(obj)
    //             xr = xm;
    //         }
    //         else if (fXm*fXr < 0)
    //         {
    //             ea = error(xl, xm);
    //             obj = {
    //                 iteration:iter,
    //                 Xl:xl,
    //                 Xm:xm,
    //                 Xr:xr
    //             }
    //             data.push(obj)
    //             xl = xm;
    //         }
    //     }while(ea>e && iter<MAX)
    //     setX(xm)
    // }


    return (
        <div>
            <br></br>
            <p class="text-center"> <h1>Bisection</h1></p>
            <br></br>
            <Container>
                <Form>
                    <Form.Group as={Row} className="mb-3 justify-content-md-center" >
                         <Form.Label column sm={1}>Input f(x)</Form.Label>
                         <Col xs="4">
                            <Form.Control type="text" id="equation" data-testid="Equation" value={Equation} onChange={inputEquation} className="form-control" />
                         </Col>
                     </Form.Group>
                     <br></br>
                     <Form.Group as={Row} className="mb-3 justify-content-md-center">
                     <Form.Label column sm={1}>Input XL</Form.Label>
                         <Col xs="3">
                            <Form.Control type="number" id="XL" data-testid="XL" onChange={inputXL} className="form-control" />
                         </Col>
                         <Form.Label column sm={1}>Input XR</Form.Label>
                         <Col xs="3">
                            <Form.Control type="number" id="XR" data-testid="XR" onChange={inputXR} className="form-control" />
                         </Col>
                     </Form.Group>
                     <br></br>
                     <div class="text-center">
                        <Button variant="primary" data-testid="myBtn" onClick={calculateRoot} className="btn justify-content-md-center" >
                             Calculate
                        </Button>
                     </div>
                </Form>
                <Container>
                {html}
                </Container>
            </Container>  
            </div>
    )
}

export default Bisection