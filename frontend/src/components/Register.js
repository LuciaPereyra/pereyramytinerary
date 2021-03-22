import { connect } from "react-redux"
import { useState } from "react"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'


const paises = ["Argentina", "Brasil", "Uruguay", "Perú", "Alemania", "Canadá"]

const Register = (props) => {

    const [newCount, setCount] = useState({
        userName: "", password:"", firstName:"", email:""
    })
    const [err, setErr] = useState([])

    const capturaInputRegister = e => {
        const valor = e.target.value
        const campo = e.target.name
        setCount({
            ...newCount,
            [campo]: valor
        })
    }

    const validaInputRegister = async e => {
        e.preventDefault()// previene que no recargue página
        if (newCount.userName === "" || newCount.firstName === "" || newCount.email === "" || newCount.password === "") {
            alert("Todos los campos son obligatorios para continuar")
            return false
            // se va de la función y no sigue
        }

        setErr([])
        const responseBE = await props.registerUser(newCount)
        // paso la nueva cuenta a través de la función registerUser que despacha mi userAction
        if (responseBE && !responseBE.success) {
            setErr(responseBE.errores.details)
        } else {
            alert("Usuario creado")
        }

    }
    const responseGoogle = async (response) => {
        if (response.error) {
            alert("Hubo un error con la autenticación en Google")
        } else {
            const responseBE = await props.registerUser({
                userName: response.profileObj.email,
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                email: response.profileObj.email,
                password: response.profileObj.googleId,
                urlPic: response.profileObj.imageUrl,
                country: response.profileObj.givenName
            })
            if (responseBE && !responseBE.success) {
                setErr(responseBE.errores.details)
            } else {
                alert("Usuario creado")
            }
        }
    }


    return (
        <div className="form">
            <h1>Create Account</h1>
            <input type="text" name="firstName" placeholder="FirstName (*)" onChange={capturaInputRegister} />
            <input type="text" name="lastName" placeholder="LastName" onChange={capturaInputRegister} />
            <input type="text" name="userName" placeholder="UserName (*)" onChange={capturaInputRegister} />
            <input type="text" name="email" placeholder="Email (*)" onChange={capturaInputRegister} />
            <input type="password" name="password" placeholder="Password (*)" onChange={capturaInputRegister} />
            <input type="text" name="urlPic" placeholder="Picture (*)" onChange={capturaInputRegister} />
            <select onChange={capturaInputRegister} name="country">
                <option value="" disabled selected>Select Country</option>
                {paises.map(pais => {
                    return (
                        <option value={pais}>{pais}</option>
                    )
                })}
            </select>

            <button onClick={validaInputRegister}>Register</button>
            <p>Do you have a registered Google account?</p>
            <GoogleLogin
                clientId="754177178799-o1hb0r394koiniduanlj695jlpec4gvg.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <div className="form">
                {err.map(error => <h2>{error.message}</h2> )} 
                
 
            </div>    

        </div>
    )
    // errores del validator, se cae la app
    // otro error es que cuando genera nuevo usuario desde google se rompe todo :(

    // esto debe enviarse a la DB

}

const mapStateToProps = state => {
    return {
        usuarioRegistrado: state.auth.usuarioRegistrado
    }
}

const mapDispatchToProps = {
    registerUser: authActions.registerUser
}



export default connect(mapStateToProps, mapDispatchToProps)(Register)
