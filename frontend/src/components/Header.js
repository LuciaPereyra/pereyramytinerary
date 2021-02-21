import { connect } from "react-redux"
import { Link } from "react-router-dom"
import authActions from "../redux/actions/authActions"

const Header = ({usuarioRegistrado,logoutUser}) => {
    if (usuarioRegistrado) {
        var links =
            <>
            <div className="contenedorUser" >
                <Link to="/login">
                    <div className="user" style={{
                        backgroundImage: `url(${usuarioRegistrado.urlPic})`,
                    }}></div>
                </Link>
                <Link to="/" onClick={() => logoutUser()}>
                    <p>LogOut, {usuarioRegistrado.firstName}</p>
                </Link>
            </div>

                <div className="menuNav">
                    <Link to="/home" style={{
                        textDecoration: "none"
                    }} ><p> Main </p>
                    </Link>
                    <Link to="/cities" style={{
                        textDecoration: "none"
                    }}><p>Cities</p>
                    </Link>
                </div>
            </>
    } else {
        var links =
            <>
                <Link to="/login">
                    <div className="user" style={{
                        backgroundImage: `url("./assets/unknowfem.png")`,
                    }}></div>
                </Link>
                <div className="menuNav">
                    <Link to="/home" style={{
                        textDecoration: "none"
                    }} ><p> Main </p>
                    </Link>
                    <Link to="/cities" style={{
                        textDecoration: "none"
                    }}><p>Cities</p>
                    </Link>
                </div>

            </>
    }
    return (
        <>
            <header>
                <nav>
                    <div className="header">
                        {links}

                    </div>
                </nav>
            </header>
        </>
    )
}

const mapStateToProps = state => {
    return {
        usuarioRegistrado: state.auth.usuarioRegistrado
    }
}
const mapDispatchToProps = {
    logoutUser: authActions.logoutUser

}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
