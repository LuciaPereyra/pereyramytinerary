import { Link } from "react-router-dom"
const Botones = () => {

    return (
            <div >
                <Link className="linkFlecha" to="/cities"
                    style={{ textDecoration: "none" }}>Go to Cities!
                    <svg xmlns="http://www.w3.org/2000/svg" width="17.519" height="25.24" viewBox="0 0 17.519 25.24">
                        <path id="arrow" d="M12.62,17.519a2.159,2.159,0,0,1-1.767-.876L.757,4.964a3.137,3.137,0,0,1,0-4.088,2.22,2.22,0,0,1,3.534,0l8.329,9.635L20.949.876a2.22,2.22,0,0,1,3.534,0,3.137,3.137,0,0,1,0,4.088l-10.1,11.679A2.159,2.159,0,0,1,12.62,17.519Z" transform="translate(0 25.24) rotate(-90)" fill="#ffffff"/>
                    </svg>
                    {/* <img src="./assets/flecha1.png" alt="" /> */}
                </Link>
            </div>
    )

}
export default Botones
