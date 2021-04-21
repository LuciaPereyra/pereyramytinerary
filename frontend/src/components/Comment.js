import { useEffect,useState } from "react"
import { connect } from "react-redux"
import itineraryActions from "../redux/actions/itineraryActions"

const Comment = ({commentt,listItineraries})=>{
    useEffect(()=>{

    },[])

    return(
        <div className="comments">
         <div className="comment"style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div className="userPic"  style={{backgroundImage: `url("${commentt.userPic}")`}}></div>
            <p className="userName" style={{fontWeight: 'bold'}}>{`${commentt.userName} say :`}</p>
            <p className="content" style={{marginTop: 0, marginLeft: 6}}>{commentt.comment}</p>
        </div>
    
      </div>
)
}


const mapStateToProps = state => {
    return {
        usuarioRegistrado: state.auth.usuarioRegistrado,
        listItineraries: state.itinerary.listaItinerarios,
    }
}

const mapDispatchToProps = {
    commentarie:itineraryActions.itineraryComment
}
export default connect(mapStateToProps,mapDispatchToProps)(Comment)
