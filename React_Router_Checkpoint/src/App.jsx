import logo from './logo.svg';
import './App.css';
import MovieList from "./MovieList"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComingFromInsanity from './moviePages/ComingFromInsanity';
import ATSV from './moviePages/ATSV';
import TAWOG from './moviePages/TAWOG';
import ShitboxNollywoodMovie from './moviePages/ShitboxNollywoodMovie';

function App() {
  const routes = (
    <Router>
      <Routes>
        <Route path='/' exact element={<MovieList/>}></Route>
        <Route path='/coming-from-insanity' exact element={<ComingFromInsanity/>}></Route>
        <Route path='/atsv' exact element={<ATSV/>}></Route>
        <Route path='/tawog' exact element={<TAWOG/>}></Route>
        <Route path='/shitbox-nollywood-movie' exact element={<ShitboxNollywoodMovie/>}></Route>
      </Routes>
    </Router>
  )
  return (
    <>
     {routes}
    </>
  );
}

export default App;
