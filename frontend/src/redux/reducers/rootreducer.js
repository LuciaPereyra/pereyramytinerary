import {combineReducers} from "redux"
import citiesReducer from "./citiesReducer"
import itineraryReducer from "./itineraryReducer"
import authReducer from "./authReducer"

const rootReducer = combineReducers({
    cities: citiesReducer,
    itinerary: itineraryReducer,
    auth: authReducer

})

export default rootReducer