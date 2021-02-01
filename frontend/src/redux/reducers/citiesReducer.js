// reducer para mis cities 

const initialState ={
    listaCities:[],
    citiesFiltradas:[],

} // objeto que contiene mi estado inicial 

const citiesReducer = (state = initialState, action) => {

    // condicional switch para evaluar qué action llega y en base a eso qué hará el reducer
    switch(action.type) { // evalua a partir del tipo de la action: action.type
         case "ALL_CITIES":
          
             return{
                 ...state,
                 listaCities: action.payload,
                 citiesFiltradas: action.payload             
             }
             break
             case "FILTER_CITY" :
                 return {
                    ...state,
                    citiesFiltradas: state.listaCities.filter(city => city.cityName.toLowerCase().indexOf(action.payload.toLowerCase().trim()) === 0)
                  }
                  break
             default:
                return state
    }
}


export default citiesReducer 

 