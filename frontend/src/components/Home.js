import Botones from "./Botones"
import Carousell from "./Carousell"

const Home = () => {
    return (
        <>
            <div className="imgSection" style={{
                backgroundImage: `url("./assets/fondoLanding.jpg")`,
            }}>
                <div className="logo" style={{
                    backgroundImage: `url("./assets/logomytinerary1.png" )`,
                }}>
                </div>
                    <div className="callHome">
                        <Botones />
                    </div>
            </div>

            <div className="txtPopular">
                <h5>Popular Mytineraries</h5>
                <Carousell />
            </div>
        </>
    )
}

export default Home

