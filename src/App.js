import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner'
import Movielists from './Components/Movielists';
import Favourites from './Components/Favourites';
function App() {
  return (
    <div>
      <Navbar />
      {/* <Banner />
      <Movielists /> */}
      <Favourites />
    </div>


  );
}

export default App;
