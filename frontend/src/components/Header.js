import { connect } from "react-redux"
import { Link } from "react-router-dom"
import authActions from "../redux/actions/authActions"

const Header = (props) => {
    if (props.usuarioRegistrado) {
        var links =
            <>
                <Link to="/login">
                    <div className="user" style={{
                        backgroundImage: `url(${props.usuarioRegistrado.picture})`,
                        width: "50px", height: "50px"
                    }}></div>
                </Link>
                <Link to="/" className="header" style={{
                    textDecoration: "none"
                }} onClick={() => props.logoutUser()}><p>LogOut, {props.usuarioRegistrado.userName}</p></Link> 
                <Link to="/home" style={{
                    textDecoration: "none"
                }} ><p> Main </p>
                </Link>
                <Link to="/cities" style={{
                    textDecoration: "none"
                }}><p>Cities</p>
                </Link>
            </>
    } else {
        var links =
            <>
                <Link to="/login">
                    <div className="user" style={{
                        backgroundImage: `url("./assets/unknowfem.png")`,
                        width: "50px", height: "50px"
                    }}></div>
                </Link>
                <Link to="/home" style={{
                    textDecoration: "none"
                }} ><p> Main </p>
                </Link>
                <Link to="/cities" style={{
                    textDecoration: "none"
                }}><p>Cities</p>
                </Link>
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

export default connect(mapStateToProps,mapDispatchToProps)(Header)
