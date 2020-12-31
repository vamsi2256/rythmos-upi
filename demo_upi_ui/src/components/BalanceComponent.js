function BalanceComponent(props){
    
    return(
        <div>
            <h3>{props.name}</h3>
            <h4>Balance:{props.balance}</h4>
        </div>
    )
}
export default BalanceComponent