const initialState = {
    listaItinerarios: []    
}

const itineraryReducer = (state = initialState, action) => {
    switch(action.type){
        case "ALL_ITINERARIES":
            return {
                ...state,
                listaItinerarios:action.payload
            }
        default:
            return state 
    } 

}

export default itineraryReducer