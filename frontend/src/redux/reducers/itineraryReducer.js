const initialState = {
    listaItinerarios: [],
}

const itineraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_ITINERARIES":
            return {
                ...state,
                listaItinerarios: action.payload
            }
        case "ITIN_COMMENT":
            return {
                ...state,
                listaItinerarios: state.listaItinerarios.map(comment => comment._id === action.payload._id ? action.payload : comment),
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