import { useState } from "react"
import { connect } from "react-redux"
import itineraryActions from "../redux/actions/itineraryActions"

const Comment = (props)=>{
  
    const [comment, setComment] = useState([])

const addComment = e => { // acá capturo el evento 
    const valor = e.target.value
    const campo = e.target.name
    setComment({
        ...comment,
        id:props.commentt,
        [campo]: valor
    })
    }
   
const validaComment = async e => {
    e.preventDefault()
    
    await props.commentarie(comment)
}

return(
    <div className="comments">
        {props.listItineraries.map(com=>{
            return(
                <>
                    <h3>{com.comments.comments}</h3>
                </>
            )

        })}
        <input onChange={addComment}  type="text" name="comment" placeholder="Add comment" ></input>
        <button onClick={validaComment}>Send comment</button>

    </div>
)
}


const mapStateToProps = state => {
    return {
        usuarioRegistrado: state.auth.usuarioRegistrado,
        listItineraries: state.itinerary.listaItinerarios,
        // comentario: state.itinerary.comentarios
    }
}

const mapDispatchToProps = {
    commentarie:itineraryActions.itineraryComment
}
export default connect(mapStateToProps,mapDispatchToProps)(Comment)
// capturar comentario, pasarlo con metodo post al back para agregar (actions en itinerary) ruta /comment
// eso se va a guardar en model itinerary
// cómo relacionar user registrado con comment