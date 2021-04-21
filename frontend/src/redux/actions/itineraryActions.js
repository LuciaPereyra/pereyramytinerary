import axios from "axios"
import { MdInsertDriveFile } from "react-icons/md"

const itineraryActions = {
  itinerariesById: (id) => {
    return async (dispatch, getState) => {
      const data = await axios.get(`https://mytineraryy.herokuapp.com/api/itinerary/${id}`)
      dispatch({ type: "ALL_ITINERARIES", payload: data.data.respuesta })
    }
  },

  addFav: (id) => {
    console.log(id + " entra en action Addfav")
    return async (dispatch, getState) => {
      const token = getState().auth.usuarioRegistrado ? getState().auth.usuarioRegistrado.token : ""
      try {
        const data = await axios.put(`http://localhost:4000/api/itinerary/like/${id}`, {},
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        dispatch({ type: 'FAV_ITINERARY', payload: data.data.response })
        if (!data.data.response.success) {
          return data.data.response
        }
      } catch (error) {
        if (error.response === 401)
          alert("No está autorizado a crear nuevo usuario")
      }
    }
  },

  unFav: (id) => {
    console.log(id + "action unfav")
    return async (dispatch, getState) => {
      const token = getState().auth.usuarioRegistrado ? getState().auth.usuarioRegistrado.token : ""
      try {
        const data = await axios.put(`http://localhost:4000/api/itinerary/unlike/${id}`, {},
          { headers: { Authorization: `Bearer ${token}` } })
        dispatch({ type: 'FAV_ITINERARY', payload: data.data.response })
        if (!data.data.response.success) {
          return data.data.response
        }
      } catch (error) {
        if (error.response === 401) {
          alert("No está autorizado a crear nuevo usuario")
        }
      }
    }
  },

  itineraryComment: (newComment) => {
    return async (dispatch, getState) => {
      const token = getState().auth.usuarioRegistrado ? getState().auth.usuarioRegistrado.token : ""
      try {
        const data = await axios.put(`http://localhost:4000/api/itinerary`, { newComment }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch({ type: "ITIN_COMMENT", payload: data.data.response })
        if (!data.data.response.success) {
          return data.data.response
        }
      } catch (error) {
        if (error.response === 401) {
          alert("No está autorizado a crear nuevo usuario")
        }
      }
    }
  },


}

export default itineraryActions