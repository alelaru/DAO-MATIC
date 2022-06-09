import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Blockie, Form, Icon, Table, Tag, Tooltip, Widget } from "web3uikit";
import "./pages.css";
import { useLocation } from "react-router"

const Proposal = () => {

    const { state: proposalDetails } = useLocation()

  const [votes, setvotes] = useState([
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
          <div className="widgets">
            <Widget info={10} title="Votes for">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{75}%</div>
                <div className="progress">
                  <div className="progressPercentage" style={{ width:`${25}%`}}></div>
                </div>
              </div>
            </Widget>
            <Widget info={30} title="Votes against">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{25}%</div>
                <div className="progress">
                  <div className="progressPercentage" style={{ width:`${75}%`}}></div>
                </div>
              </div>
            </Widget>
          </div>
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
    </>
  );
};

export default Proposal;
