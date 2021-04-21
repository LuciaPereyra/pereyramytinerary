import Comment from "./Comment";
import itineraryActions from '../redux/actions/itineraryActions';
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MdSend, MdAttachMoney, MdTimer } from "react-icons/md";
import { Alert } from 'reactstrap';


const Itinerary = (props) => {
    const { commentarie, usuarioRegistrado, itineraries, addFav, itinerariesById, unFav, id } = props
    // id= cityId
    // _id= idItinerario

    const [visible, setVisible] = useState(false)
    const [newComment, setNewComment] = useState('')
    const button = () => setVisible(!visible)

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [])


    const sumaLike = async (e) => {
        e.preventDefault()
        console.log("sumalike")
        await addFav(itineraries._id)
        itinerariesById(id)
    }

    const restaLike = async (e) => {
        e.preventDefault()
        console.log("restalike")
        await unFav(itineraries._id)
        itinerariesById(id)
    }

    const addComments = (e) => { // acá capturo el evento 
        e.preventDefault()
        setNewComment(
            (e.target.value)
        )
    }

    const sendComment = async e => {
        e.preventDefault()

        await commentarie({
            idItinerary: itineraries._id,
            comment: newComment,
        })
        setNewComment('')
    }

    const alerta = () => {
        console.log("llega funcion?np")
        return (

            <Alert color="primary">
                Debes loguearte para dejar tu Like!
            </Alert>
        )
    }

    return (
        <div className="containerItinerary">
            <div className="containerImg">
                <div className="userImg" style={{
                    backgroundImage: `url("${itineraries.userPic}")`
                }}> </div>{itineraries.userName}</div>
            <div className="containerTextItin">
                <div className="itinTitle">{itineraries.title}</div>

                <div className="itinLikes">

                    {usuarioRegistrado
                        ? itineraries.likes.length !== 0
                            ? itineraries.likes.map((userLike, i) => {
                                if (userLike === usuarioRegistrado.idUser) {
                                    return <div><i onClick={restaLike} className="fas fa-heart"></i>{itineraries.likes.length}</div>
                                }
                                else {
                                    if (i === itineraries.likes.length)
                                        return <div><i onClick={sumaLike} className="far fa-heart"></i>{itineraries.likes.length}</div>
                                }
                            })
                            : <div><i onClick={sumaLike} className="far fa-heart"></i>{itineraries.likes.length}</div>
                        : <div><i onClick={() => alerta()} className="far fa-heart"></i>{itineraries.likes.length}</div>
                    }

                    <div><MdTimer className="MdTimer" /> : {(itineraries.hours)}</div>
                    <div>Price: {Array(itineraries.price).fill(<MdAttachMoney className="MdAttachMoney" />)}</div>
                </div>

                <div className="itinhashtag">{itineraries.hashtag.map(hash => <p>{hash}</p>)}</div>
            </div>

            {visible &&
                <>
                    <div className="activities">
                        <div className="titleActivity">Activities</div>
                        <div className="containerActi">
                            {itineraries.activities.map(item => {
                                return (
                                    <div key={item._id} className="actiImg" style={{
                                        backgroundImage: `url("${item.activityImage}")`,
                                    }}><p>{item.activityTitle}</p></div>
                                )
                            })}
                            <div className="container">
                                <p>See comments: </p>
                                {itineraries.comments.map((commentt, i) => <Comment key={i} commentt={commentt} />)}
                                <div className="contain">
                                    <input onChange={addComments} type="text" name="comment" placeholder="Add comment" ></input>
                                    <MdSend onClick={sendComment} />
                                </div>

                            </div>

                        </div>
                    </div>
                </>
            }
            <button className="buttonBack" onClick={button}>{!visible ? "View All" : "Close"}</button>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        usuarioRegistrado: state.auth.usuarioRegistrado,
        comentario: state.itinerary.comentarios

    }
}

const mapDispatchToProps = {
    addFav: itineraryActions.addFav,
    unFav: itineraryActions.unFav,
    itinerariesById: itineraryActions.itinerariesById,
    commentarie: itineraryActions.itineraryComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)


