const initialState = {
    listaItinerarios: [],
    comentario:[]
   
}

const itineraryReducer = (state = initialState, action) => {
    switch(action.type){
        case "ALL_ITINERARIES":
            return {
                ...state,
                listaItinerarios:action.payload
            }
            case "ITIN_COMMENT":
                return{
                    ...state,
                    comentario:action.payload
                }
                case 'FAV_ITINERARY':
                    return {
                      ...state,
                      itinerary: action.payload
                    }
        default:
            return state 
    } 

}

export default itineraryReducer