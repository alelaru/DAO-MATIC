import { Table } from "web3uikit";
import "./tablevotes.css";


const TableVotes = ({data}) => {
    

    console.log(data);

    return (

        data.length
        ? 
            <div className="tableFoundation">
            <div className="tablefoundation2">
                <div className="tableDivider">
                    <div className="tableHeader" style={{"padding-left":"22px"}}><span>Address</span></div>
                    <div className="tableHeader"><span>Vote</span></div>
                    {data.map(e => {
                        return(
                            <>
                            <div className="lineDivider"></div>
                            <div className="addressUser" >
                                {e[0]}
                            </div>
                            <div className="voteDisplay">
                                {e[1]}
                            </div>
                            </>

                        )
                    })}
                </div>
                </div>
            </div>
        :
        <Table
        style={{ width: "60%" }}
        columnsConfig="90% 10%"
        data={data}
        header={[<span>Address</span>, <span>Vote</span>]}
        pageSize={5}
        />

      );
}
 
export default TableVotes;