import React, { useEffect, useState } from "react";
import { Form, Tab, Table, TabList, Tag, Widget } from "web3uikit";
  import { Link } from "react-router-dom";
import "./pages.css";
import { useMoralis } from "react-moralis";


const Home = () => {

  const [passRate, setpassRate] = useState(0);
  const [totalP, settotalP] = useState();
  const [counted, setcounted] = useState();
  const {Moralis, isInitialized} = useMoralis();
  const [proposals, setProposals] = useState();


//Gets the status if a Proposal was already counted
  async function getStatus(proposalId){
    const proposalCounts = Moralis.Object.extend("ProposalsCounted")
    const query = new Moralis.Query(proposalCounts);
    // Gets the proposal that has the same `Id` and gets the first match (Unique identifier)
    query.equalTo("uid", proposalId)
    const result = await query.first()

    if(result !== undefined){
      if(result.attributes.result){
        return { color: "red", text: "Passed"}
      }
      else{
        return { color: "red", text: "Rejected"}
      }
    }
    else{
      return { color: "blue", text: "Ongoing"}
    }
  }


  useEffect(() => {
    
    if(isInitialized){
      
      async function getProposals(){
        const proposals = Moralis.Object.extend("Proposals")
        const query = new Moralis.Query(proposals)
        query.descending("uid_decimal")
        const results = await query.find()
        console.log(results);
        const table = await Promise.all(
          results.map(async e => [
            e.attributes.uid,
            e.attributes.description,
            <Link to="/proposal"
              state={{
                description: e.attributes.description,
                color: (await getStatus(e.attributes.uid)).color,
                text: (await getStatus(e.attributes.uid)).text,
                id: e.attributes.uid,
                proposer: e.attributes.proposer
              }}
            >
              <Tag
                color= {(await getStatus(e.attributes.uid)).color}
                text=  {(await getStatus(e.attributes.uid)).text}
              ></Tag>
            </Link>,
          ]))
        setProposals(table)
        settotalP(results.length)
      }

      async function getPassRate(){
        const proposalsCount = Moralis.Object.extend("ProposalsCounted")
        const query = new Moralis.Query(proposalsCount)
        const results = await query.find()
        let votesUp = 0;

        results.forEach((e) => {
          if(e.attributes.result){
            votesUp++;
          }
        })
        setcounted(results.length)
        setpassRate((votesUp / results.length) * 100)
      }


      getProposals()
      getPassRate()

    }

  }, [isInitialized]);
 
  return (
    <>
      <div className="content">
        <TabList defaultActiveKey={3} tabStyle="bulbUnion">
          <Tab tabKey={1} tabName="DAO">
            {proposals && (
            <div className="tabContent">
              Governance Overview
              <div className="widgets">
                <Widget
                  info={totalP}
                  title="Proposal created"
                  style={{ width: "200%"}}
                >
                  <div className="extraWidgetInfo">
                    <div className="extraTitle">Pass Rate</div>
                    <div className="progress">
                      <div className="progressPercentage" style={{ width: `${passRate}%`}}></div>
                    </div>
                  </div>
                </Widget>
                <Widget info={243} title="Elegible Voters"></Widget>
                <Widget info={totalP-counted} title="Ongoing Proposals"></Widget>
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
            )}
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
