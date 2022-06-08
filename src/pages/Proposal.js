import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Blockie, Icon, Tag, Tooltip, Widget } from "web3uikit";
import "./pages.css";

const Proposal = () => {

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
            <div>Should we accept Elon Musks offer for our DAO?</div>
            <div className="proposalOverview">
              <Tag color={"red"} text={"Rejected"}></Tag>
              <div className="proposer">
                <span>Proposed By</span>
                <Tooltip content={"0x1C60e929102F7fb2e49E7f52e6AbAdF42484a0c5"}>
                  <Blockie seed="0x1C60e929102F7fb2e49E7f52e6AbAdF4248412e5"></Blockie>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="widgets">
            <Widget info={30} title="Votes for">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{75}%</div>
                <div className="progress">
                  <div className="progressPercentage" style={{ width:`${75}%`}}></div>
                </div>
              </div>
            </Widget>
            <Widget info={10} title="Votes against">
              <div className="extraWidgetInfo">
                <div className="extraTitle">{25}%</div>
                <div className="progress">
                  <div className="progressPercentage" style={{ width:`${25}%`}}></div>
                </div>
              </div>
            </Widget>
          </div>
     </div>
    </>
  );
};

export default Proposal;
