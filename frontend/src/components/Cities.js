import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import citiesActions from "../redux/actions/citiesActions"

export const Cities = (props) => {

    useEffect(() => { // hooks equiv func a componenteDidMount/DidUpdate y WillUnmount en comp de clase
        // función que se ejecuta cuando el componente se monta y cada vez que se actualiza
        props.allCities()
    }, [])

    const search = e => { // acá capturo el evento y modifico el estado de citiesFilter
        props.filtro(e.target.value)
    }

    return (

        <section>
            <div className="filter">
                <input onChange={search} type="text" placeholder="Search City" ></input>
            </div>
            {props.citiesFiltradas.length === 0 ?
                <Link to={`/`} style={{ textDecoration: "none" }}>
                    <div className="alert" style={{
                        backgroundImage: `url("../assets/fondoHuellas.jpg"`,
                        width: "40vw", height: "60vh"
                    }}>
                        <div className="alertTitle"><p>Oops! we still haven't traveled to that city</p></div>
                    </div> </Link>

                :
                <div className="contenedorCities">
                    {props.citiesFiltradas.map(({ cityName, cityPic, _id }) => { // Mapeo array de objetos con información de cada ciudad                      
                        return (

                            <Link key={_id} className="cities" to={`/city/${_id}`} style={{ textDecoration: "none" }}>
                                <div className="citiesImage" style={{
                                    backgroundImage: `url("${cityPic}")`
                                }}><p className="citiesTitle">{cityName} </p>
                                </div>
                            </Link>

                        )
                    })}
                </div>
            }
        </section>
    )
}

const mapStateToProps = state => {
    // objeto con las propiedades que reciben las props del state (reducer)
    return {
        listaCities: state.cities.listaCities,
        citiesFiltradas: state.cities.citiesFiltradas
    }
}
const mapDispatchToProps = {
    //objeto con las propiedades que reciben las props de las funciones en action 
    allCities: citiesActions.allCities,
    filtro: citiesActions.filter
}


export default connect(mapStateToProps, mapDispatchToProps)(Cities)



// REACT SE ASEGURA QUE EL DOM SE HA ACTUALIZADO ANTES DE LLEVAR A CABO LAS HOOKS
// ESTA función que pasamos es nuestro efecto Y Dentro de nuestro efecto actualizamos Usando la API del navegador 
// Cuando React renderiza nuestro componente, recordará este efecto y lo ejecutará después de actualizar el DOM.
//Esto sucede en cada renderizado, incluyendo el primero.
//recordar que STATE ES UN OBJETO QUE PERMITE DINAMIZAR A REACT EL RENDERIZADO
//