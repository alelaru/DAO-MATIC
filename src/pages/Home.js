import React, { useEffect, useState } from "react";
import { Form, Tab, Table, TabList, Widget } from "web3uikit";
import "./pages.css";


const Home = () => {
 
  return (
    <>
      <div className="content">
        <TabList defaultActiveKey={3} tabStyle="bulbUnion">
          <Tab tabKey={1} tabName="DAO">
            <div className="tabContent">
              Governance Overview
              <div className="widgets">
                <Widget
                  info={52}
                  title="Proposal created"
                  style={{ width: "200%"}}
                ></Widget>
                <Widget info={243} title="Elegible Voters"></Widget>
                <Widget info={5} title="Ongoing Proposals"></Widget>
              </div>
            </div>
          </Tab>
          <Tab tabKey={2} tabName="Forum"></Tab>
          <Tab tabKey={3} tabName="Docs"></Tab>
        </TabList>
      </div>
    </>
  );
};

export default Home;
