import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Itineraries = (props) => { // props URL 
    const [itinerary, setItinerary] = useState({}) // mi estado inicia en un objeto vacío
    console.log(itinerary)

    useEffect(() => {
        const id = props.match.params.id // captura id que le pasan por url (cuando hacen click en la foto)
        fetch("http://localhost:4000/api/city/" + id)
            .then(response => response.json())
            .then(data => setItinerary(data.respuesta))
            .catch(error => console.log(error))
    }, [])

    return (
        <section className="section" style={{
            backgroundImage: `url("../assets/fondoacua.jpg")`
        }}>
            <div className="contenedorCity">
                <div className="cityImage" style={{
                    backgroundImage: `url("${itinerary.cityPic}")`                    
                }}><p className="cityTitle">{itinerary.cityName}</p>


                </div>
                <div className="alert" style={{
                    backgroundImage: `url("../assets/fondoHuellas.jpg"`,
                    width: "40vw", height: "40vh"
                }}>
                    {!itinerary.cityActivity && (
                        <div className="alertTitle"> <p >Oops! we don't have itineraries to show yet</p> </div>
                    )}
                </div>
                <Link className="linkItineraries" to="/cities"
                    style={{ textDecoration: "none" }}> <img src="../assets/Arrowleft.png" alt="" />Back to Cities!

                </Link>
            </div>
        </section>
    )
}

export default Itineraries


// paso las props propias del componente Itineraries, todas las url las tienen
 // el id que llega a las props es el indicado en el Route


//  data.map(info => { // mapeo data 
// if (info._id === id) { // comparo el _id de cada objeto dentro de mi array con el id que me pasan por url
//     setItinerary(info) // carga resultado al valor de var itinerary por medio de la funcion 
// }