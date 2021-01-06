function DisplayComponent(props){
    return(
        <div >
            <h3 className={props.className}>{props.msg}</h3>
        </div>
        
    )
}
export default DisplayComponent