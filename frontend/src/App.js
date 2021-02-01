import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header"
import Home from "./components/Home"
import Cities from "./components/Cities"
import Footer from "./components/Footer"
import City from "./components/City"
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

const App=()=> { 

  return ( 
    //Router con sus Route para rutear cada componente, 
    //indicando en el primer Route: cuando el path sea exactamente "/" render el componente Home
    <>
      <BrowserRouter>
        <Header />
    <Switch>
        <Route exact path="/" component={Home}/> 
        <Route path="/home" component={Home}/>
        <Route path="/cities" component={Cities}/>
        <Route path="/city/:id" component={City}/>
        <Redirect to="/"/>
      </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
