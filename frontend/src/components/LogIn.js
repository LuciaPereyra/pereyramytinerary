import { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'

const LogIn = ({loginUser}) => {
    const [logueo, setLogueo] = useState({})
    const [err, setErr] = useState([])


    const capturaInputLogIn = e => {
        const valor = e.target.value
        const campo = e.target.name
        setLogueo({
            ...logueo,
            [campo]: valor
        })
    }


    const validaGo = async e => {
        e.preventDefault()
        if (logueo.userName === "" || logueo.pasword === "") {
            alert("Completar todos los campos con (*)")
            return false
        }
        setErr([])
        const responseBe = await loginUser(logueo)
        // paso la nueva cuenta a través de la función registerUser que despacha mi userAction
        if (responseBe && !responseBe.success) {
            setErr([responseBe.mensaje])
        } else {
            alert("Bienvenido/a" + " " + logueo.userName)
       
        }

    }
    const responseGoogle = async (response) => {
        if (response.error) {
            alert("Hubo un error con la autenticación en Google")
        } else {
            const responseBe = await loginUser({
                userName: response.profileObj.email,
                password: response.profileObj.googleId,
            })

            if (responseBe && !responseBe.success) {
                setErr([responseBe.mensaje])
            } else {
                alert("Bienvenido/a ")
            }
        }
    }


    return (
        <div className="form">
            <h1>LOGIN</h1>
            <input type="text" name="userName" placeholder="UserName (*)" onChange={capturaInputLogIn} />
            <input type="password" name="password" placeholder="Password (*)" onChange={capturaInputLogIn} />
            <button onClick={validaGo}>GO!</button>

            <div className="form">
                {err.map(error => <h2>{error}</h2>)}
            </div>
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


    )



}
const mapStateToProps = state => {
    return {
        usuarioLogueado: state.auth.usuarioRegistrado
    }
}

const mapDispatchToProps = {
    loginUser: authActions.loginUser
}



export default connect(mapStateToProps, mapDispatchToProps)(LogIn)