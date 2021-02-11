// componente Itinerario, renderizo info itinerario.
// por Props de su padre city le llega la lista de itinerario relacionado por ID city
import Comment from "./Comment"
import itineraryActions from '../redux/actions/itineraryActions'
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

const Itinerary = (props) => {

    const [visible, setVisible] = useState(false)
    const button = () => setVisible(!visible)

    const sumaLike = async () => {
        await props.favItinerary(props.itineraries._id, props.usuarioRegistrado.token)
        props.itinerariesById(props.id)
    }
    const restaLike = async () => {
        await props.unfavItinerary(props.itineraries._id, props.usuarioRegistrado.token)
        props.itinerariesById(props.id)
    }


    return (
        <div className="containerItinerary">
            <div className="containerImg">
                <div className="userImg" style={{
                    backgroundImage: `url("${props.itineraries.userPic}")`, width: "12vw", height: "12vh"
                }}> </div>{props.itineraries.userName}</div>
            <div className="containerTextItin">
                <div className="itinTitle">{props.itineraries.title}</div>

                <div className="itinLikes">

                    {props.usuarioRegistrado
                        ? props.itineraries.likes.find(userLike => userLike === props.usuarioRegistrado.id)
                            ? <p><i onClick={sumaLike} className="fas fa-heart"></i>{props.itineraries.likes}</p>
                            : <p><i onClick={restaLike} className="far fa-heart"></i>{props.itineraries.likes}</p>
                            : <p><i onClick={() => alert("Debes loguearte para favear")} className="far fa-heart"></i>{props.itineraries.likes}</p>
                        }
                      
                    <div>Hours: {(props.itineraries.hours)}</div>
                    <div>Price: {Array(props.itineraries.price).fill(<i className="fas fa-money-bill-wave"></i>)}</div>
                </div>

                <div className="itinhashtag">{props.itineraries.hashtag.map(hash => <p>{hash}</p>)}</div>
            </div>

            {visible &&
                <>
                    <div className="activities">
                        <div className="titleActivity">Activities</div>
                        <div className="containerActi">
                            {props.itineraries.activities.map(item => {
                                return (
                                    <div key={item._id} className="actiImg" style={{
                                        backgroundImage: `url("${item.activityImage}")`, width: "20vw", height: "33vh"
                                    }}><p>{item.activityTitle}</p></div>
                                )
                            })}
                            <div className="comments">
                                {props.itineraries.comments.map(commentt => <Comment key={commentt._id} commentt={props.id} />)}
                            </div>

                        </div>
                    </div>
                </>
            }
            <button onClick={button}>{!visible ? "View All" : "Close"}</button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        usuarioRegistrado: state.auth.usuarioRegistrado

    }
}

const mapDispatchToProps = {
    favItinerary: itineraryActions.favItinerary,
    unfavItinerary: itineraryActions.unfavItinerary,
    itinerariesById: itineraryActions.itinerariesById
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)


