import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner'
import Movielists from './Components/Movielists';
import Favourites from './Components/Favourites';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>


      <Navbar />
      <Routes>
        {/* <Route exact path='/' element={<Movielists />} /> */}
        <Route path="/" exact render={(props) => (
          <>
            <Banner {...props} />
            <Movielists {...props} />
          </>
        )} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>


    </BrowserRouter>
    // {/* <Banner />
    //   <Movielists />
    //   <Favourites /> */}
  );
}

export default App;
