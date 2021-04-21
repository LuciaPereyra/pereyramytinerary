import { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";

const LogIn = ({ loginUser }) => {
    const [logueo, setLogueo] = useState({})
    const [err, setErr] = useState([])
    const [hidden, setHidden] = useState(true)

    const capturaInputLogIn = e => {
        const valor = e.target.value
        const campo = e.target.name
        setLogueo({
            ...logueo,
            [campo]: valor
        })
    }
    const enterKeyboard = e => {
        //El numero 13 seria la tecla enter, si fue presionada envio la validacion
        //como si fuera el boton sign in
        if (e.charCode === 13) {
            validaGo(e)
        }
    }
    const validaGo = async e => {
        e.preventDefault()
        if (logueo.userName === "" || logueo.pasword === "") {
            alert("Complete all fields")
            return false
        }
        setErr([])
        const response = await loginUser(logueo)
        // paso la nueva cuenta a través de la función registerUser que despacha mi userAction
        if (response && !response.success) {
            setErr([response.mensaje])
        } else {
            alert(`Hi ${logueo.userName} !`, 3000)
        }
    }
    const responseGoogle = async (response) => {
        if (response.error) {
            console.log(response.error)
            alert('Error in Google authentication', 3000)
        } else {
            const response = await loginUser({
                userName: response.profileObj.email,
                password: `Aa${response.profileObj.googleId}`,
                google: 'true'
            })

            if (response && !response.success) {
                setErr([response.mensaje])
            } else {
                alert(`Hi${logueo.userName} !`, 3000)
            }
        }
    }

    return (
        <div className="formContainer">
        <div className="form">
            <h1>LOGIN</h1>
            <input type="text" name="userName" placeholder="UserName (*)" onChange={capturaInputLogIn} />
            <div className="inputDiv">
                <input onKeyPress={enterKeyboard} type={hidden ? "password" : " text"} name="password" placeholder="Password" onChange={capturaInputLogIn} />
                < FaEye className="eye" onClick={() => setHidden(!hidden)} />
            </div>
            <button onClick={validaGo}>GO!</button>
            <GoogleLogin
                clientId="754177178799-o1hb0r394koiniduanlj695jlpec4gvg.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <p>Don't have account? Create one here!</p>
            <Link to="/signup"> <p>Create Account</p></Link>
        </div>
        </div>
    )
}

const mapDispatchToProps = {
    loginUser: authActions.loginUser
}

export default connect(null, mapDispatchToProps)(LogIn)