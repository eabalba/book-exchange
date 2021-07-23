import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import TopRated from './components/pages/top-rated';
import SignUp from './components/pages/Sign-up';


function App() {
  return (
    <>
    <Router>
     <Navbar/>
     <Switch>
       <Route path='/' exact component = {Home}/>;
       <Route path='/top-rated' component = {TopRated}/>;
       <Route path='/Sign-up' component = {SignUp}/>;
     </Switch>
     <Footer/>
    </Router>
    </>
  );
}

export default App;
