import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Itinerary from "./Itinerary"
import itineraryActions from "../redux/actions/itineraryActions"


export const City = (props) => { // props URL 

    const { listaCities, listItineraries, itinerariesById } = props

    const [city, setCity] = useState([])
    const id = props.match.params.id// captura id que le pasan por url (cuando hacen click en la foto)

    useEffect(() => {
        const cityFind = listaCities.find(item => item._id === id)
        setCity(cityFind)
        itinerariesById(id)
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        listaCities.length === 0 && props.history.push('/cities')
    }, [])



    return (
        <section className="section" >
            <div className="contenedorCity">
                <div className="cityImage" style={{
                    backgroundImage: `url("${city.cityPic}")`
                }}><p className="cityTitle">{city.cityName}</p>
                </div>
                <h5 className="titleAvailable">Available MYtineraries: </h5>

                {(listItineraries.length === 0) ?

                    <div className="alert" style={{
                        backgroundImage: `url("../assets/fondoHuellas.jpg"`,
                        width: "40vw", height: "40vh"
                    }}>  <div className="alertTitle"> <p>Oops! there are no itineraries to show</p></div>
                    </div>

                    : <div className="itinerary">
                        {listItineraries.map(itineraries => <Itinerary key={itineraries._id} itineraries={itineraries} id={id} />)}

                    </div>
                }

                <Link className="linkItineraries" to="/cities"
                    style={{ textDecoration: "none" }}> <img src="../assets/Arrowleft.png" alt="" />Back to Cities!
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
