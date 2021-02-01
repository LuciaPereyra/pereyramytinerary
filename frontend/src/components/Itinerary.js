import { connect } from "react-redux"

import React, { useEffect, useState } from "react"

const Itinerary = (props) => {
    console.log(props)

    const [visible, setVisible] = useState(false)

    const button = () => setVisible(!visible)
    return (
        <div className="containerItinerary">
            <div className="containerImg">
                <div className="userImg" style={{
                    backgroundImage: `url("${props.itineraries.userPic}")`, width: "12vw", height: "12vh"
                }}> </div>{props.itineraries.userName}</div>
            <div className="containerTextItin">
                <div className="itinTitle">{props.itineraries.title}</div>

                <div className="itinLikes">
                    {/* <div class="far fa-grin-hearts">{props.itineraries.likes}</div> */}
                    <div>Likes: {Array(props.itineraries.likes).fill(<i class="far fa-grin-hearts"></i>)}</div>
                    <div>Hours: {(props.itineraries.hours)} Hs.</div>
                    <div>Price: {Array(props.itineraries.price).fill(<i className="fas fa-money-bill-wave"></i>)}</div>
                </div>

            </div>
                <div className="itinhashtag">{props.itineraries.hashtag.map(hash =><p>{hash}</p>)}</div>

            {visible &&
                <>
                    <div className="activities">
                    <div className="titleActivity">Activities</div>
                    <div className="containerActi">
                        {props.itineraries.activities.map(item => {
                            return (
                                <div className="actiImg" style={{
                                    backgroundImage: `url("${item.activityImage}")`, width: "20vw", height: "30vh"
                                }}><p>{}</p></div>
                                )
                            })}
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
        listItineraries: state.itinerary.listaItinerarios
    }
}
export default connect(mapStateToProps)(Itinerary)