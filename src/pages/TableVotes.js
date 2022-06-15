import "./tablevotes.css";


const TableVotes = ({data}) => {
    

    console.log(data);

    return (
        <div className="tableFoundation">
            <div className="tablefoundation2">
                <div className="tableDivider">
                    <div className="tableHeader" style={{"padding-left":"22px"}}><span>Address</span></div>
                    <div className="tableHeader"><span>Vote</span></div>
                    <div className="lineDivider"></div>
                    {data.map(e => {
                        return(
                            <>
                            <div className="addressUser" >
                                {e[0]}
                            </div>
                            <div className="voteDisplay">
                                {e[1]}
                            </div>
                            <div className="lineDivider"></div>
                            </>

                        )
                    })}
                </div>
            </div>
        </div>

      );
}
 
export default TableVotes;