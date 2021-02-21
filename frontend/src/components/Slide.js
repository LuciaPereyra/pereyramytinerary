const Slide = ({ item }) => {

  return (
    <>
      {item.map((ciudad, index) => { // mapeo cada objeto de cada array mapeado
        return (

          <div key={index} className="cajaCarousel" style={{
            backgroundImage: `url(${ciudad.src})`,
            // width: "38vw", height: "40vh"
          }}><p>{ciudad.altText}</p>
          </div>
        )
      })
      }
    </>
  )
}



export default Slide



























// const Slice = (lafoto) => {
//     const {enlace}=lafoto
//     console.log({enlace})
//     return (
//         <>
//              <img className="fotosCarrousel"src={enlace} alt={enlace}/>

//         </>
//     )
// }

// export default Slice

// este complemento tiene tres array de 4 objetos con fotografías y pasa props a Carousel 

// tener en cuenta STATE Y PROPS

// `` 


// componentes de clase (van con Class) ya casi no se implementan

// import React from "react"

// export default class App extends React.Component {

//     saludar() { // método (funcion) saludar que arroje hola cuando le hagan onClick
//       alert("hola")

//     }
//     render() {
//         return (
//             <>
//             <button onClick={this.saludar}><h1>Haceme Click</h1></button> 
//             </>
//         )
//     }

// (para referenciar un método va this. "de esta instancia aplica el método saludar")
// entre llaves para escribir código JS (recordar lenguaje JSX)


// COMPONENTE FUNCIONAL (CON FUNCION) // ya no se necesario el this. porque es funcional 

// const Bla = () => { // componente Slice con función de flecha 
//     const saludar = () { // funcion saludar que retorna un botton que al hacer click dispara alert de esa funcion (destructurada sin this) 
//         alert("Chau")
//     }

//     return ( 
//         <>
//             <button onClick={saludar}>Haceme Click! </button>
//         </>
//     )

// }
