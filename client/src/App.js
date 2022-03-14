import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import GameForm from './components/GameForm';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path= '/home' element={<Home />}></Route>
        <Route path={`/detail/:id`} element={<Detail />}></Route>
        <Route path='/videogame' element={<GameForm />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
