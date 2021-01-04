function BalanceComponent(props){
    
    return(
        <div className="show-balance">
            <strong><p className="name">{props.name}</p></strong>
            <p className="balance">Balance: {props.balance}</p>
        </div>
    )
}
export default BalanceComponent