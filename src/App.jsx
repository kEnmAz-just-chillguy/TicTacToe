
import '@fontsource-variable/honk';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TwoPlayersPage from './pages/TwoPlayersPage';
import OnePlayerPage from './pages/OnePlayerPage';
function App() {

  return (
    <div className=' text-center select-none'>
     <h1 className='text-white  pt-15 font-extrabold text-3xl sm:text-4xl text-center '>Tic Tac Toe</h1>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/two-players' element={<TwoPlayersPage/>}/>
      <Route path='/one-player' element={<OnePlayerPage/>}/>
     </Routes>
    </div>
  );
}

export default App;
