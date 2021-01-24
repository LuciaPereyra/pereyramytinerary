import { Link } from "react-router-dom"
import { useEffect, useState } from "react"



export const Cities = () => {
    const [cities, setCities] = useState([]) // se carga el componente, se monta, inicia con var cities en un array vacío
    const [citiesFilter, setCitiesFilter] = useState("") 
    const [resultsFilter, setResultsFilter] = useState([])
    const [alert, setAlert] = useState(false)

    useEffect(() => { // las hooks fetchean el backend, éste contesta con la info de la base de datos
        fetch("http://localhost:4000/api/cities") //  fetchea mi backend
            .then(response => response.json()) // recibo rta y la convierto a objeto js
            .then(data => {
                setCities(data.respuesta)
                setResultsFilter(data.respuesta)

            })
    }, [])


    useEffect(() => {
        const resultEnd = cities.filter(city => city.cityName.toLowerCase().indexOf(citiesFilter.toLowerCase().trim()) === 0)
        // guardo filtro en cities, comparando en cada vuelta la DB con lo ingresado por input, primer ocurrencia pasando todo a minusculas, sin espacios

        setResultsFilter(resultEnd)
        resultEnd.length === 0 ? setAlert(true) : setAlert(false)
        // modifico estado de var Alert, en base al resultado del filtro, si es 0 true, sino false y renderiza mensaje Alert


    }, [cities, citiesFilter])

    const search = e => { // acá capturo el evento y modifico el estado de citiesFilter
        setCitiesFilter(e.target.value)
    }

    return (

        <section className="section" className="section" style={{
            backgroundImage: `url("../assets/fondoacua.jpg")`
        }}>
            <div className="filter">
                <input onChange={search} type="text" placeholder="Search City" ></input>
            </div>
            <div className="contenedorCities">
                {!alert ?
                    resultsFilter.map(({ cityName, cityPic, _id}) => { // Mapeo array de objetos con información de cada ciudad

                        return (
                            <>
                                <Link key={_id} className="cities" to={`/city/${_id}`} style={{ textDecoration: "none" }}>
                                    <div  className="citiesImage" style={{
                                        backgroundImage: `url("${cityPic}")`
                                    }}><p className="citiesTitle">{cityName} </p>

                                    </div>
                                </Link>
                            </>
                        )
                    })

                    : <div className="alert" style={{
                        backgroundImage: `url("../assets/fondoHuellas.jpg"`,
                        width: "40vw", height: "60vh"
                    }}><div className="alertTitle"><p>Oops! we still haven't traveled to that city</p></div>
                    </div>
                }

            </div>
        </section>
    )
}


export default Cities



// REACT SE ASEGURA QUE EL DOM SE HA ACTUALIZADO ANTES DE LLEVAR A CABO LAS HOOKS
// ESTA función que pasamos es nuestro efecto Y Dentro de nuestro efecto actualizamos Usando la API del navegador 
// Cuando React renderiza nuestro componente, recordará este efecto y lo ejecutará después de actualizar el DOM. Esto sucede en cada renderizado, incluyendo el primero.
//recordar que STATE ES UN OBJETO QUE PERMITE DINAMIZAR A REACT EL RENDERIZADO
//