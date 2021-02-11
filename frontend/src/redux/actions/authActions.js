import axios from "axios"

const authActions = {

    registerUser: (newCount) => {
        return async (dispatch, getState) => {
            const data = await axios.post("http://localhost:4000/api/user/signup", newCount)
            if (!data.data.success) {
                return data.data
            }// si no pasa de acá, la acción no se despacha
            dispatch({ type: "USER_LOG", payload: data.data })
        }
    },

    logoutUser: () => {
        // limpia estado de redux cuando se desloguea
        return (dispatch, getState) => {
            dispatch({ type: "LOG_OUT" })
        }
    },

    logFromLocalStorage: (userName,picture,token) =>{
        return(dispatch,getState) =>{
            dispatch({type:"USER_LOG",payload:{response:{userName,picture,token}}})

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
                // error 401 unauthorized 
                // esto se mudará a comments, el passport protegerá eso. 
            }
        }

    },
    // itineraryComment:(comment,id)=>{
    //     return async (dispatch, getState) => {
    //         console.log(getState().usuarioRegistrado)
    //         const token = getState().usuarioRegistrado ? getState().usuarioRegistrado.token : ""

    //         try{
    //             const data = await axios.post("http://localhost:4000/api/itinerary/comment/",{comment},+id, {
    //             headers: {
    //                 Authorization:"Bearer " + token
    //             }
    //         })

    //         if(!data.data.respuesta.success) {
    //             return data.data.respuesta
    //         }

    //         dispatch({type:"USER_LOG", payload: data.data.respuesta})
    //         }catch (err) {
    //             if (err.respuesta === 401) {
    //                 alert("No está autorizado a crear nuevo usuario")
    //             }
    //             // error 401 unauthorized 
    //             // esto se mudará a comments, el passport protegerá eso. 
    //         }
            
    //     }

    // }
}
        export default authActions

// newCount viaja al backend, entra a la ruta asignada con método post, consulta al controlador de origen, aplica middleware: destructura body y valida,
// si todo ok dara respuesta con success, errores que LLEGARÁ AL FRONT en la PAYLOAD, como respuesta.data (en axios respuesta viene dentro de prop data)
// si pasa evaluación de ACTIONS, viaja al reducer 