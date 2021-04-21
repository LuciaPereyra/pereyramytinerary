import React from 'react'
import Header from "./components/Header"
import Home from "./components/Home"
import Cities from "./components/Cities"
import Footer from "./components/Footer"
import City from "./components/City"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import { connect } from "react-redux"
import authActions from "./redux/actions/authActions"


// condicional para evaluar si hay usuario logueado ve todo excepto login y register, sino, ve todo y además puede acceder a login y register
// con esto protegemos rutas a nivel frontend

const App = ({usuarioLogueado,logLocalStorage}) => {
  if (usuarioLogueado) {
    var routes =
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/cities" component={Cities} />
        <Route path="/city/:id" component={City} />
        <Redirect to="/" />
      </Switch>
  } else if(localStorage.getItem("token")){
    logLocalStorage(localStorage.getItem("firstName"),localStorage.getItem("urlPic"),localStorage.getItem("token"),localStorage.getItem("idUser"))

  }else{
    var routes =
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/cities" component={Cities} />
      <Route path="/city/:id" component={City} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={Register} />
      <Redirect to="/" />
    </Switch>

  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
        {routes}
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );

}

const mapStateToProps = state => {
  return {
    usuarioLogueado: state.auth.usuarioRegistrado
  }
}
const mapDispatchToProps = {
  logLocalStorage: authActions.logFromLocalStorage
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
