import React, { useEffect, useState } from "react"


export const Itineraries = (props) => {
    const [itinerary, setItinerary] = useState({}) // mi estado inicia en un objeto vacío


    useEffect(() => {
        const id = parseInt(props.match.params.id) // captura id que le pasan por url (cuando hacen click en la foto)
        fetch("http://localhost:4000/api/city/" + id)
            .then(response => response.json())
            .then(data => setItinerary(data.respuesta))

    }, [])

    return (
        <div>
            <h1>Oops! we don't have itineraries to show yet</h1>
            <h1>{itinerary.cityName}</h1>
            <img src={itinerary.cityPic} style={{
                width: "40vw", height: "30vh"
            }} alt="" />
        </div>
    )
}

export default Itineraries


// paso las props propias del componente Itineraries, todas las url las tienen
 // el id que llega a las props es el indicado en el Route


//  data.map(info => { // mapeo data 
// if (info._id === id) { // comparo el _id de cada objeto dentro de mi array con el id que me pasan por url
//     setItinerary(info) // carga resultado al valor de var itinerary por medio de la funcion 
// }