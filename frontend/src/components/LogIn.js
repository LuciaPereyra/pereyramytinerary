import { useState } from "react"
import { Link } from "react-router-dom"

const LogIn = () =>{
    const[logueo, setLogueo]=useState({})


    const capturaInputLogIn = e =>{
        const valor = e.target.value
        const campo = e.target.name

        setLogueo({
            ...logueo,
            [campo]:valor
        })
    }

    const validaGo = e =>{
        e.prevetDefault()
        console.log(logueo)
    }



    return(
        <div>
            <h1>LOGIN</h1>
            <input type="text" name="userName" placeholder="UserName" onChange={capturaInputLogIn}/>
            <input type="password" name="password" placeholder="PassWord"onChange={capturaInputLogIn}/>
            <button onChange={validaGo}>GO!</button>
            <Link to="/signup"> <p>Create Account</p></Link>
           
        </div>


    )



}

export default LogIn