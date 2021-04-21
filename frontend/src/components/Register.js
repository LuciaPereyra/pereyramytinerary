import { connect } from "react-redux"
import { useState } from "react"
import authActions from "../redux/actions/authActions"
import GoogleLogin from 'react-google-login'
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom"


const countries = require('../data/dataContryNames.json')

const Register = ({ registerUser }) => {

    const [newCount, setNewCount] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        country: '',
        google: 'false'
    })
    const [errores, setErrores] = useState([])
    const [hidden, setHidden] = useState(true)

    const failedInputs = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        country: null,
        useremailExist: null
    }

    const capturaInputRegister = e => {
        const valor = e.target.value
        const campo = e.target.name
        setNewCount({
            ...newCount,
            [campo]: valor
        })
    }

    const validaInputRegister = async e => {
        e.preventDefault()// previene que no recargue página
        if (newCount.firstName === '' || newCount.lastName === '' || newCount.userName === '' || newCount.email === '' || newCount.password === '' || newCount.country === '') {
            alert('Complete all fields', 3000)
            return false
            // se va de la función y no sigue
        }
        setErrores([])
        const response = await registerUser(newCount)
        // paso la nueva cuenta a través de la función registerUser que despacha mi userAction
        if (response && !response.success) {
            response.response.map(error => {
                failedInputs[error.label] = error.message
                return false
            })
            setErrores(failedInputs)
        }
    }

    const responseGoogle = async (response) => {
        if (response.error) {
            alert('Error in Google authentication', 3000)
        } else {
            const response = await registerUser({
                firstName: response.profileObj.givenName,
                lastName: response.profileObj.familyName,
                userName: response.profileObj.email,
                email: response.profileObj.email,
                password: `Aa${response.profileObj.googleId}`,
                urlPic: response.profileObj.imageUrl,
                country: 'Argentina',
                google: 'true'
            })
            if (response && !response.success) {
                setErrores(response.errores.details)
            } else {
                alert('Create account', 3000)
            }
        }
    }
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            validaInputRegister()
        }
    }


    return (
        <div className="formContainer">
            <h1>Create Account</h1>
            <div className="form">

                <small>{errores.firstName}</small>
                <input type="text" name="firstName" placeholder="FirstName " onChange={capturaInputRegister} />
                <small>{errores.lastName}</small>
                <input type="text" name="lastName" placeholder="LastName" onChange={capturaInputRegister} />
                <small>{errores.userName || errores.useremailExist}</small>
                <input type="text" name="userName" placeholder="UserName" onChange={capturaInputRegister} />
                <small>{errores.email}</small>
                <input type="text" name="email" placeholder="Email" onChange={capturaInputRegister} />
                <div className="inputDiv">
                    <small>{errores.password}</small>
                    <input type="password" name="password" placeholder="Password" type={hidden ? 'password' : 'text'} onKeyDown={pressEnter} onChange={capturaInputRegister} />
                    < FaEye className="eye" onClick={() => setHidden(!hidden)} />
                </div>
                <small>{errores.urlPic}</small>
                <input type="text" name="urlPic" placeholder="Picture" onChange={capturaInputRegister} />
                <select onChange={capturaInputRegister} name="country">
                    <option value='' disabled selected>Select Country</option>
                    {countries.map((country, i) => {
                        return (
                            <option key={i} value={country.value}>{country.label}</option>
                        )
                    })}
                </select>

                <button onClick={validaInputRegister}>Register</button>
                <Link to="/login"> <p>Do you have a registered Google account?</p></Link>
                <GoogleLogin
                    clientId="754177178799-o1hb0r394koiniduanlj695jlpec4gvg.apps.googleusercontent.com"
                    buttonText='Sign in with Google'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>

        </div>
    )
}




const mapDispatchToProps = {
    registerUser: authActions.registerUser
}



export default connect(null, mapDispatchToProps)(Register)
