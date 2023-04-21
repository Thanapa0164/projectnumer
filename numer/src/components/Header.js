import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FcCalculator,FcHome } from "react-icons/fc";

function Header() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/"><FcCalculator/> NUMERICAL METHODS <FcCalculator/> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/"><FcHome/> Home</Nav.Link>
            <Nav.Link href="/CH1/Thanapa">thanapa</Nav.Link>

            <NavDropdown title="Roots of equations" id="basic-nav-dropdown">
              <NavDropdown.Item href="/CH1/Bisection">Bisection method</NavDropdown.Item>
              <NavDropdown.Item href="/CH1/False_position">False-position method</NavDropdown.Item>
              <NavDropdown.Item href="/CH1/One_point">One-point iteration method</NavDropdown.Item>
              <NavDropdown.Item href="/CH1/Taylor">Taylor series</NavDropdown.Item>
              <NavDropdown.Item href="/CH1/Newton">Newton-Raphson</NavDropdown.Item>
              <NavDropdown.Item href="/CH1/Secant">Secant method</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Linear algebraic" id="basic-nav-dropdown">
              <NavDropdown.Item href="/CH2/Cramer1">Cramer's Rule</NavDropdown.Item>
              <NavDropdown.Item href="/CH2/Test">Gauss Elimination Method</NavDropdown.Item>
              <NavDropdown.Item href="#">Gauss-Jordan Method</NavDropdown.Item>
              <NavDropdown.Item href="#">Matrix Inversion Method</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">LU Decomposition Method</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Cholesky Decomposition Method</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Interpolation" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Action</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Least-squares regression" id="basic-nav-dropdown">
              <NavDropdown.Item href="/CH4/Linear_re">Linear regression</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Action</NavDropdown.Item>
            </NavDropdown>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;