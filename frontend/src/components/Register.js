import { useState } from "react"


const Register =()=>{
    const [newCount, setCount] = useState({})
    
    const capturaInputRegister = e => {
        const valor = e.target.value
        const campo = e.target.name
        setCount({
            ...newCount,
            [campo]: valor
        })
        console.log(newCount)

    }

    const validaInputRegister = e =>{
        e.preventDefault()// previene que no recargue página
       console.log(newCount) 

    }
    return(
        <div>
            <h1>Create Account</h1>
            <input type="text" name="firstName" placeholder="FirstName" onChange={capturaInputRegister}/>
            <input type="text" name="lastName" placeholder="LastName" onChange={capturaInputRegister}/>
            <input type="text" name="userName" placeholder="UserName" onChange={capturaInputRegister}/>
            <input type="text" name="email" placeholder="Email" onChange={capturaInputRegister}/>
            <input type="passWord" name="passWord" placeholder="PassWord" onChange={capturaInputRegister}/>
            <input type="text" name="urlPic" placeholder="Picture" onChange={capturaInputRegister}/>
            <input type="select" name="country" placeholder="Country" onChange={capturaInputRegister}/>
            <button onChange={validaInputRegister}>Register</button>            
           
        </div>
    )

    // esto debe enviarse a la DB

    



}

export default Register