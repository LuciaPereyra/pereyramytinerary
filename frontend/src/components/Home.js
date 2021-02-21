import Botones from "./Botones"
import Carousell from "./Carousell"

const Home = () => {
    return (
        <>
            <section>
                <div className="imgSection" style={{
                    backgroundImage: `url("./assets/fondoiti2.jpg")`,
                }}>
                    <div className="logo" style={{
                        backgroundImage: `url("./assets/logomytinerary1.png" )`,
                    }}></div>

                </div>

                <div className="contenedorBoton">
                    <Botones />
                    <div className="tituloPopular" style={{
                        backgroundImage: `url("./assets/bannersection.jpg" )`,

                    }}></div>
                    <Carousell />
                </div>
            </section>
        </>
    )
}

export default Home

