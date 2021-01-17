import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header"
import Home from "./components/Home"
import Cities from "./components/Cities"
import Footer from "./components/Footer"
import './App.css';
import { BrowserRouter, Route } from "react-router-dom"

function App() { 
  return ( 
    <>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/cities" component={Cities} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
