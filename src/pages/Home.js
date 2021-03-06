import React, { useEffect, useState } from "react";
import { Form, Tab, Table, TabList, Tag, Widget } from "web3uikit";
import { Link } from "react-router-dom";
import "./pages.css";
import {
  useMoralis,
  useMoralisWeb3Api,
  useWeb3ExecuteFunction,
} from "react-moralis";

const Home = () => {
  const [passRate, setpassRate] = useState(0);
  const [totalP, settotalP] = useState(0);
  const [counted, setcounted] = useState(0);
  const [voters, setvoters] = useState(0);
  const { Moralis, isInitialized } = useMoralis();
  const [proposals, setProposals] = useState();
  const web3Api = useMoralisWeb3Api();
  const [sub, setsub] = useState();
  const contractProcesor = useWeb3ExecuteFunction();

  // Function to create the proposal into the blockchain

  async function createProposal(newProposal) {
    let options = {
      contractAddress: "0x124Ca287f41661C965d52ccc78466684d44B061e",
      functionName: "createProposal",
      abi: [
        {
          inputs: [
            { internalType: "string", name: "_description", type: "string" },
            { internalType: "address[]", name: "_canVote", type: "address[]" },
          ],
          name: "createProposal",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      params: {
        _description: newProposal,
        _canVote: voters,
      },
    };

    await contractProcesor.fetch({
      params: options,
      onSuccess: () => {
        console.log("Proposal Successfully created");
        setsub(false);
      },
      onError: (e) => {
        setsub(false);
        alert(e.data.message);
      },
    });
  }

  //Gets the status if a Proposal was already counted
  async function getStatus(proposalId) {
    const proposalCounts = Moralis.Object.extend("ProposalsCounted");
    const query = new Moralis.Query(proposalCounts);
    // Gets the proposal that has the same `Id` and gets the first match (Unique identifier)
    query.equalTo("proposalId", proposalId);
    const result = await query.first();
    // console.log("result", result);

    if (result !== undefined) {
      if (result.attributes.result) {
        return { color: "green", text: "Passed" };
      } else {
        return { color: "red", text: "Rejected" };
      }
    } else {
      return { color: "blue", text: "Ongoing" };
    }
  }

  useEffect(() => {
    if (isInitialized) {
      async function getProposals() {
        const proposals = Moralis.Object.extend("Proposals");
        const query = new Moralis.Query(proposals);
        query.descending("uid_decimal");
        const results = await query.find();
        const table = await Promise.all(
          results.map(async (e) => [
            e.attributes.uid,
            e.attributes.description,
            <Link to="/proposal" state={{
              description: e.attributes.description,
              color: (await getStatus(e.attributes.uid)).color,
              text: (await getStatus(e.attributes.uid)).text,
              id: e.attributes.uid,
              proposer: e.attributes.proposer
              
              }}>

              <Tag
                color={(await getStatus(e.attributes.uid)).color}
                text={(await getStatus(e.attributes.uid)).text}
              />
            </Link>,
          ])
        ); 
        setProposals(table);
        settotalP(results.length);
      }

      async function getPassRate() {
        const proposalsCount = Moralis.Object.extend("ProposalsCounted");
        const query = new Moralis.Query(proposalsCount);
        const results = await query.find();
        let votesUp = 0;

        results.forEach((e) => {
          if (e.attributes.result) {
            votesUp++;
          }
        });
        setcounted(results.length);
        setpassRate((votesUp / results.length) * 100);
      }

      const fetchTokenIdOwners = async () => {
        const options = {
          address: "0x2953399124F0cBB46d2CbACD8A89cF0599974963",
          token_id:
            "43970464009901776444914858904527304823234795497029481751764904722192110977224",
          chain: "mumbai",
        };
        const tokenIdOwners = await web3Api.token.getTokenIdOwners(options);

        const addresses = tokenIdOwners.result.map((e) => e.owner_of);
        setvoters(addresses);        
      };

      fetchTokenIdOwners();
      getProposals();
      getPassRate();
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);

  return (
    <>
      <div className="content">
        <TabList defaultActiveKey={1} tabStyle="bulbUnion">
          <Tab tabKey={1} tabName="DAO">
            {proposals && (
              <div className="tabContent">
                Governance Overview
                <div className="widgets">
                  <Widget
                    info={totalP}
                    title="Proposal created"
                    style={{ width: "200%" }}
                  >
                    <div className="extraWidgetInfo">
                      <div className="extraTitle">Pass Rate</div>
                      <div className="progress">
                        <div
                          className="progressPercentage"
                          style={{ width: `${passRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </Widget>
                  <Widget info={voters.length} title="Elegible Voters"></Widget>
                  <Widget
                    info={totalP - counted}
                    title="Ongoing Proposals"
                  ></Widget>
                </div>
                Recent Proposals
                <div style={{ marginTop: "30px" }}>
                  <Table
                    columnsConfig="10% 70% 20%"
                    data={proposals}
                    header={[
                      <span>ID</span>,
                      <span>Description</span>,
                      <span>Status</span>,
                    ]}
                    pageSize={5}
                  ></Table>
                </div>
                <Form
                  buttonConfig={{
                    isLoading: sub,
                    loadingText: "Submitting proposal",
                    text: "Submit",
                    theme: "secondary",
                  }}
                  data={[
                    {
                      inputWidth: "100%",
                      name: "New Proposal",
                      type: "textarea",
                      validation: {
                        required: true,
                      },
                      value: "",
                    },
                  ]}
                  onSubmit={(e) => {
                    setsub(true);
                    createProposal(e.data[0].inputResult);
                  }}
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
