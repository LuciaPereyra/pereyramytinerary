import axios from "axios"

const itineraryActions = {
    itinerariesById: (id) => {
        return async (dispatch, getState) => {
            const data = await axios.get("http://localhost:4000/api/itinerary/"+ id)
            dispatch({type:"ALL_ITINERARIES", payload: data.data.respuesta})
        }
    }


}

export default itineraryActions