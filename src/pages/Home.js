import React, { useEffect, useState } from "react";
import { Form, Tab, Table, TabList, Tag, Widget } from "web3uikit";
import { Link } from "react-router-dom";
import "./pages.css";


const Home = () => {

  const [proposals, setProposals] = useState(

    [
      [
        1,
        <div>Should we start a Moralis hamburger chain?</div>,
        <Tag color="green" text="Passed" />,
      ],
      [
        2,
        "Should we accept Elon Musks $44billion offer for our DAO?",
        <Link to="/proposal" state={"hello"}>
          <Tag color="red" text="Rejected" />
        </Link>,
      ],
      [
        3,
        "Do you want a Web3 Slack tutorial?",
        <Tag color="blue" text="Ongoing" />,
      ],
      [
        4,
        "Are you interested in Xbox/Console web3 tutorials?",
        <Tag color="blue" text="Ongoing" />,
      ],
      [
        5,
        "Would you attend a Moralis Builder get together in Miami?",
        <Tag color="blue" text="Ongoing" />,
      ],
  ]

  );
 
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
                >
                  <div className="extraWidgetInfo">
                    <div className="extraTitle">Pass Rate</div>
                    <div className="progress">
                      <div className="progressPercentage" style={{ width: `${60}%`}}></div>
                    </div>
                  </div>

                </Widget>
                <Widget info={243} title="Elegible Voters"></Widget>
                <Widget info={5} title="Ongoing Proposals"></Widget>
              </div>
              Recent Proposals
                <div style={{marginTop: "30px"}}>
                  <Table
                    columnsConfig="10% 70% 20%"
                    data={proposals}
                    header={[
                      <span>ID</span>,
                      <span>Description</span>,
                      <span>Status</span>

                    ]}
                    pageSize={5}
                  ></Table>
                </div>


                <Form
                  buttonConfig={{
                    isLoading: false,
                    loadingText: "Submitting proposal",
                    text: "Submit",
                    theme: "secondary",
                  }}
                  data={[
                    {
                      inputWidth:"100%",
                      name: "New Proposal",
                      type: "textarea",
                      validation: {
                        required: true,
                      },
                      value:"",
                    }
                  ]}
                  onSubmit={(e) => alert("Proposal submitted")}
                  title="Create a new proposal"
                ></Form>

            </div>
          </Tab>
          <Tab tabKey={2} tabName="Forum"></Tab>
          <Tab tabKey={3} tabName="Docs"></Tab>
        </TabList>
      </div>
      <div className="voting"></div>
    </>
  );
};

export default Home;
