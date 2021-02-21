const initialState={
    usuarioRegistrado:null
}
const authReducer = (state=initialState, action) => {
    switch(action.type){
        case"USER_LOG":
        localStorage.setItem("firstName", action.payload.response.firstName)
        localStorage.setItem("urlPic", action.payload.response.urlPic)
        localStorage.setItem("token", action.payload.response.token)
        console.log("llegué al reducer")
        return {
            ...state,
            usuarioRegistrado:action.payload.response
        }
        case "LOG_OUT":
            localStorage.clear()
            return {
                ...state,
                usuarioRegistrado: null
            }
            
            default:
                return state
            }
            
        }

export default authReducer

// switch: action.type (rta del backend)
// achicamos código, unificando actions con USER_LOG, evitamos otro case 
