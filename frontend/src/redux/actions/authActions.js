import axios from "axios"

const authActions = {
    registerUser: (newCount) => {
        return async (dispatch, getState) => {
            try {
                const data = await axios.post("http://localhost:4000/api/user/signup", newCount)
                console.log(data)
                if (data.data.success === false) {
                    var errors = []
                    data.data.errores && data.data.errores.details.map(error => {
                        switch (error.path[0]) {
                            case 'firstName':
                                errors.push({ label: error.context.label, message: "The Firstname must have a minimum of 2 characters and a maximum of 10 characters" })
                                break;
                            case 'lastName':
                                errors.push({ label: error.context.label, message: "The Lastname must have a minimum of 2 characters and a maximum of 10 characters" })
                                break;
                            case 'userName':
                                errors.push({ label: error.context.label, message: "The Username must match your email" })
                                break;
                            case 'email':
                                errors.push({ label: error.context.label, message: "The email must contain at least one at and one domain" })
                                break;
                            case 'password':
                                errors.push({ label: error.context.label, message: "The password must have at least 6 to 8 characters and an uppercase and a lowercase letter" })
                                break;
                            case 'country':
                                errors.push({ label: error.context.label, message: "You must select a country" })
                                break;
                            case 'useremailExist':
                                errors.push({ label: error.context.label, message: "La derección de mail ya está registrada" })
                                break;
                            default:
                                return false
                        }
                        return false
                    })
                }// si no pasa de acá, la acción no se despacha
                dispatch({ type: "USER_LOG", payload: data.data })
                alert('Create account')
            } catch (err) {
                return ({ success: false, response: errors })
            }
        }
    },

    logoutUser: () => {
        // limpia estado de redux cuando se desloguea
        return (dispatch, getState) => {
            dispatch({ type: "LOG_OUT" })
            alert('See you letter!')
        }
    },

    logFromLocalStorage: (firstName, urlPic, token, idUser) => {
        return (dispatch, getState) => {
            dispatch({ type: "USER_LOG", payload: { response: { firstName, urlPic, token, idUser } } })
        }
    },
    loginUser: (logueo) => {
        return async (dispatch, getState) => {
            const token = getState().usuarioRegistrado ? getState().usuarioRegistrado.token : ""
            try {
                const data = await axios.post("http://localhost:4000/api/user/login", logueo, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                if (!data.data.success) {
                    return data.data
                }// si no pasa de acá, la acción no se despacha
                dispatch({ type: "USER_LOG", payload: data.data })
            } catch (err) {
                if (err.response.status === 401) {
                    alert("No está autorizado a crear nuevo usuario")
                }
            }
        }
    },
}
export default authActions