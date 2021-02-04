import {combineReducers} from "redux"
import citiesReducer from "./citiesReducer"
import itineraryReducer from "./itineraryReducer"
import usersReducer from "./usersReducer"

const rootReducer = combineReducers({
    cities: citiesReducer,
    itinerary: itineraryReducer,
    user: usersReducer

})

export default rootReducer