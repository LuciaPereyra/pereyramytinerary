import { Link } from "react-router-dom"
const Header = () => {
    return (
        <>
            <header>
                <div className="header">
                    <Link to="/">
                        <div className="user" style={{
                            backgroundImage: `url("./assets/unknowfem.png")`,
                            width: "50px", height: "50px"
                        }}></div>
                    </Link>
                    <nav>
                        <Link to="/home" style={{
                            textDecoration: "none"
                        }} ><p> Main </p>
                        </Link>
                        <Link to="/cities" style={{
                            textDecoration: "none"
                        }}><p>Cities</p>
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header
