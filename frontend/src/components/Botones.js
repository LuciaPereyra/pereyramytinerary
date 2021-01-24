import { Link } from "react-router-dom"
const Botones = () => {

    return (
        <>
            <div className="flecha">
                <Link className="linkFlecha" to="/cities"
                    style={{ textDecoration: "none" }}>Go to travel!
                    <img src="./assets/flecha1.png" alt="" />
                </Link>
             
            </div>
        </>
    )

}
export default Botones


// practica de Props en componente funcional Botones y su padre Section 