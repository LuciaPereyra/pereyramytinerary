import axios from "axios"
// las acciones de cities vivirán en una función que retorna las acciones las cuales se ejecutarán en el reducer

const citiesActions = {
    
    allCities: () => {
        return async (dispatch, getState) => {
            // ejecuta código async y termina despachando la acción 
           const data = await axios.get("http://localhost:4000/api/cities")
           dispatch({type: "ALL_CITIES", payload:data.data.respuesta})
        }

    } ,
    
    filter: (input) => {
    //paso por parám value de input en cities, y despacho action a reducer  
        return (dispatch,getState) => {
            dispatch({type:"FILTER_CITY", payload: input})
        }
    },

}
export default citiesActions 

