import { Link } from "react-router-dom"
import { useEffect, useState } from "react"



export const Cities = () => {
    const [cities, setCities] = useState([]) // se carga el componente, se monta, inicia con var cities en un array vacío
    useEffect(() => { // las hooks fetchean el backend, éste contesta con la info de la base de datos
        fetch("http://localhost:4000/api/cities") //  fetchea mi backend
            .then(response => response.json()) // recibo rta y la convierto a objeto js
            .then(data => setCities(data.respuesta))
    }, [])

    return (

        <div className="cities">
            {cities.map(({ cityName, cityPic, _id }) => { // Mapeo array de objetos con información de cada ciudad
                return (
                    <>
                        <div className="city">
                            <div className="citiesImage" style={{
                                backgroundImage: `url("${cityPic}")`
                            }}><div className="citiesTitle">{cityName}</div>
                            </div>
                            <div className="citiesButton">
                                <Link to={`/city/${_id}`} style={{ textDecoration: "none" }}>ver más</Link>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>

    )
}

export default Cities



// REACT SE ASEGURA QUE EL DOM SE HA ACTUALIZADO ANTES DE LLEVAR A CABO LAS HOOKS
// ESTA función que pasamos es nuestro efecto Y Dentro de nuestro efecto actualizamos Usando la API del navegador 
// Cuando React renderiza nuestro componente, recordará este efecto y lo ejecutará después de actualizar el DOM. Esto sucede en cada renderizado, incluyendo el primero.
//recordar que STATE ES UN OBJETO QUE PERMITE DINAMIZAR A REACT EL RENDERIZADO
//