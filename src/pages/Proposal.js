import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Blockie, Form, Icon, Table, Tag, Tooltip, Widget } from "web3uikit";
import "./pages.css";
import { useLocation } from "react-router"
import { useMoralis } from "react-moralis";



const Proposal = () => {

    const { state: proposalDetails } = useLocation()
    const { Moralis, isInitialized } = useMoralis()
    const [latestVote, setLatestVote] = useState();
    const [percUp, setPercUp] = useState(0);
    const [percDown, setPercDown] = useState(0);
    const [votes, setVotes] = useState([]);

  const [votes2, setvotes2] = useState([
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#268c41" size={24} svg="checkmark" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#268c41" size={24} svg="checkmark" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#d93d3d" size={24} svg="arrowCircleDown" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#d93d3d" size={24} svg="arrowCircleDown" />,
    ],
    [
      "0x4d2044D8D568c1644158625930De62c4AbBB004a",
      <Icon fill="#d93d3d" size={24} svg="arrowCircleDown" />,
    ],
  ]);

  useEffect(() => {

    if (isInitialized) {
      
      async function getVotes() {
        
        const VotesMoralis = Moralis.Object.extend("Votes");
        const query = new Moralis.Query(VotesMoralis);
        query.equalTo("proposalId", proposalDetails.id);
        query.descending("createdAt");
        const results = await query.find();
        if (results.length > 0) {
          setLatestVote(results[0].attributes);
          setPercDown(
            (
              (Number(results[0].attributes.votesDown) /
                (Number(results[0].attributes.votesDown) +
                  Number(results[0].attributes.votesUp))) *
              100
            ).toFixed(0)
          );
          setPercUp(
            (
              (Number(results[0].attributes.votesUp) /
                (Number(results[0].attributes.votesDown) +
                  Number(results[0].attributes.votesUp))) *
              100
            ).toFixed(0)
          );
        }


        const votesDirection = results.map((e,i) => [
          e.attributes.voter,
          <Icon
            fill={e.attributes.votedFor ? "#2cc40a" : "#d93d3d"}
            size={24}
            svg={e.attributes.votedFor ? "checkmark" : "arrowCircleDown"}
            key={i}
          />,
        ]);

        console.log("Votos antes",votes);
        console.log("votesDirection", votesDirection);
        setVotes(votesDirection);
        console.log("Termino el proceso",votes);
        console.log("Termino el proceso votesDirection", votesDirection);
 
        
      }

      getVotes();
      console.log("Despues",votes);
    }
    
    console.log("FINAL", votes);

  }, [isInitialized, proposalDetails.id]);

  return (
    <> 
      <div className="contentProposal">
          <div className="proposal">
            <Link to="/">
              <div className="backHome">
                <Icon fill="#ffffff" size={20} svg="chevronLeft"></Icon>
                Overview
              </div>
            </Link>
            <div>{proposalDetails.description}</div>
            <div className="proposalOverview">
              <Tag color={proposalDetails.color} text={proposalDetails.text}></Tag>
              <div className="proposer">
                <span>Proposed By</span>
                <Tooltip content={proposalDetails.proposer}>
                  <Blockie seed={proposalDetails.proposer}></Blockie>
                </Tooltip>
              </div>
            </div>
          </div>
          {latestVote && 
          <div className="widgets">
            <Widget info={latestVote.votesUp} title="Votes for">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{percUp}%</div>
                <div className="progress">
                  <div className="progressPercentage" style={{ width:`${percUp}%`}}></div>
                </div>
              </div>
            </Widget>
            <Widget info={latestVote.votesDown} title="Votes against">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{percDown}%</div>
                <div className="progress">
                  <div className="progressPercentage" style={{ width:`${percDown}%`}}></div>
                </div>
              </div>
            </Widget>
          </div>
          }
          <div className="votesDiv">
            <Table
              style={{ width: "60%"}}
              columnsConfig="90% 10%"
              data={votes}
              header={[<span>Address</span>, <span>Vote</span>]}
              pageSize={5}
            ></Table>
            <Form
              style={{
                width:"35%",
                height:"250px",
                border:"1px solid rgba(6,158,252,0.2)",
              }}
              buttonConfig={{
                isLoading:false,
                loadingText: "Casting Vote",
                text:"vote",
                theme:"secondary",
              }}
              data={[
                {
                  inputWidth:"100%",
                  name:"Cast Vote",
                  options:["For", "Against"],
                  type: "radios",
                  validation: {
                    required: true
                  },
                }
              ]}
              onSubmit={e => alert('Vote cast')}
            ></Form>
          </div>
     </div>
     <div className="voting"></div>
     <div className="">
              {votes}
     </div>
     <div className="">
              {votes2}
     </div>
    </>
  );
};

export default Proposal;
