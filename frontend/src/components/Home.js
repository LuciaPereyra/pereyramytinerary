import Botones from "./Botones"
import Carousell from "./Carousell"

const Home = () => {
    return (
        <>
            <section>
                <div className="imgSection" style={{
                    backgroundImage: `url("./assets/fondoiti2.jpg")`,
                    width: "100vw", height: "600px"
                }}>
                    <div className="logo" style={{
                        backgroundImage: `url("./assets/logoblanmytinerary.png" )`,
                        width: "550px", height: "250px"
                    }}></div>

                </div>

                <div className="contenedorBoton">
                    <Botones />
                    <div className="tituloPopular" style={{
                        backgroundImage: `url("./assets/bannersection.jpg" )`,
                        width: "100vw", height: "30vh"
                    }}></div>
                    <Carousell />
                </div>
            </section>
        </>
    )
}

export default Home

