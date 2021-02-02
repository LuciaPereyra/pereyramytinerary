import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Itinerary from "./Itinerary"
import itineraryActions from "../redux/actions/itineraryActions"


export const City = (props) => { // props URL 

    const [city, setcity] = useState([])

    useEffect(() => {
        const id = props.match.params.id// captura id que le pasan por url (cuando hacen click en la foto)
        const cityFind = props.listaCities.find(item => item._id === id)
        setcity(cityFind) 
        props.itinerariesById(id)
    }, [props])



    return (
        <section className="section" style={{
            backgroundImage: `url("../assets/fondoacua.jpg")`
        }}>
            <div className="contenedorCity">
                <div className="cityImage" style={{
                    backgroundImage: `url("${city.cityPic}")`
                }}><p className="cityTitle">{city.cityName}</p>
                </div>
                <h5 className="titleAvailable">Available MYtineraries: </h5>

                {(props.listItineraries.length === 0) ?

                    <div className="alert" style={{
                        backgroundImage: `url("../assets/fondoHuellas.jpg"`,
                        width: "40vw", height: "40vh"
                    }}>  <div className="alertTitle"> <p>Oops! we don't have itineraries to show yet</p></div>
                    </div>

                    : <div className="itinerary">
                        {props.listItineraries.map(itineraries => <Itinerary key={itineraries._id}itineraries={itineraries} />)}

                    </div>
                }

                <Link className="linkItineraries" to="/cities"
                    style={{ textDecoration: "none" }}> <img src="../assets/Arrowleft.png" alt=""/>Back to Cities!
                </Link>
            </div>
        </section>
    )
}
const mapStateToProps = state => {
    return {
        listaCities: state.cities.citiesFiltradas,
        listItineraries: state.itinerary.listaItinerarios
    }
}
const mapDispatchToProps = {
    itinerariesById: itineraryActions.itinerariesById
}

export default connect(mapStateToProps, mapDispatchToProps)(City)

// paso las props propias del componente Itineraries, todas las url las tienen
 // el id que llega a las props es el indicado en el Route

//  data.map(info => { // mapeo data 
// if (info._id === id) { // comparo el _id de cada objeto dentro de mi array con el id que me pasan por url
//     setItinerary(info) // carga resultado al valor de var itinerary por medio de la funcion 
// }