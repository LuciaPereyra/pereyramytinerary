import axios from "axios"

const itineraryActions = {
    itinerariesById: (id) => {
        return async (dispatch, getState) => {
            const data = await axios.get("https://mytineraryy.herokuapp.com/api/itinerary/"+ id)
            dispatch({type:"ALL_ITINERARIES", payload: data.data.respuesta})
        }
    },
  
    favItinerary: (id, token) => {
        return async (dispatch, getState) => {
          try {
            const data = await axios.post(`https://mytineraryy.herokuapp.com/api/itinerary/like/${id}`, {token}, 
            { headers: { Authorization: `Bearer ${token}` }})
            dispatch({type: 'FAV_ITINERARY', payload: data.data.respuesta})
          } catch (error) {
            console.log(error)
          }
        }
      },
    
      unfavItinerary: (id, token) => {
        return async (dispatch, getState) => {
          try {
            const data = await axios.post(`https://mytineraryy.herokuapp.com/api/itinerary/unlike/${id}`, {token}, 
            { headers: { Authorization: `Bearer ${token}`}})
            dispatch({type: 'FAV_ITINERARY', payload: data.data.respuesta})
          } catch (error) {
            console.log(error)
          }
        }
      },

      itineraryComment:({id,comment}) => {
        return async (dispatch, getState) => {
            const token = getState().auth.usuarioRegistrado ? getState().auth.usuarioRegistrado.token : ""
            try{
                const data = await axios.put(`https://mytineraryy.herokuapp.com/api/itinerary`,{id,comment}, {
                    headers: {
                        Authorization:"Bearer " + token
                    }
                })
                console.log(data)
            if(!data.data.respuesta.success) {
                return data.data.respuesta
            }
            dispatch({type:"ITIN_COMMENT", payload: data.data.respuesta.success})
            }catch (err) {
                if (err.response === 401) {
                    alert("No está autorizado a crear nuevo usuario")
                }
                // error 401 unauthorized 
                // esto se mudará a comments, el passport protegerá eso. 
            }   
        }
    },


}

export default itineraryActions