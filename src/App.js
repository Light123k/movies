import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner'
import Movielists from './Components/Movielists';
import Favourites from './Components/Favourites';
import Moviedescription from './Components/Moviedescription';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>


      <Navbar />
      <Switch>
        {/* <Route exact path='/' element={<Movielists />} /> */}
        <Route path="/" exact render={(props) => (
          <>
            <Banner {...props} />
            <Movielists {...props} />
          </>

        )} />
        <Route path='/favourites' component={Favourites} />
        <Route path="/moviedescription" component={Moviedescription} />
      </Switch>


    </BrowserRouter>
    // {/* <Banner />
    //   <Movielists />
    //   <Favourites /> */}
  );
}

export default App;
