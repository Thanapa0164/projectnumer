import 'bootstrap/dist/css/bootstrap.min.css';
import Bisection from './CH1/Bisection';
import {Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Newton from './CH1/Newton'
import False_position from './CH1/False_position';
import One_point from './CH1/One_point';
import Secant from './CH1/Secant';
import Home from './Home';
import Taylor from './CH1/Taylor';
// import Gauss from './CH2/Gauss';
import Thanapa from './CH1/Thanapa';
// import CramerRule from './CH2/Cramer';
import Test from './CH2/Test';
import Cramer1 from './CH2/Cramer1';
import Linear_re from './CH4/Linear_re';
import Mutiple_re from './CH4/Mutiple_re';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="CH1/Bisection" element={<Bisection/>} />
        <Route path="CH1/False_position" element={<False_position/>} />
        <Route path="CH1/One_point" element={<One_point/>} />
        <Route path="CH1/Newton" element={<Newton/>} />
        <Route path="CH1/Secant" element={<Secant/>} />
        <Route path="CH1/Taylor" element={<Taylor/>} />
        <Route path="CH1/thanapa" element={<Thanapa/>} />
        {/* <Route path="CH2/Cramer" element={<CramerRule/>}/>
        <Route path="CH2/Gauss" element={<Gauss/>} /> */}
        <Route path="CH2/Test" element={<Test/>} />
        <Route path="CH2/Cramer1" element={<Cramer1/>} />
        <Route path="CH4/Linear_re" element={<Linear_re/>}/>
        <Route path="CH4/Mutiple_re" element={<Mutiple_re/>}/>
      </Routes>

    </div>
    
  );
}

export default App;
