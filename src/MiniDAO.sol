// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MinimalDAO {
    struct Proposal {
        uint id;
        string description;
        uint deadline;
        uint yesVotes;
        uint noVotes;
        bool executed;
        address payable recipient;
        uint amount;
        mapping(address => bool) voted;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount;

    mapping(address => bool) public members;
    uint public memberCount;

    uint public constant VOTING_PERIOD = 3 days;

    modifier onlyMember() {
        require(members[msg.sender], "Not a DAO member");
        _;
    }

    constructor() payable {
        members[msg.sender] = true;
        memberCount++;
    }

    // Join DAO by depositing at least 0.1 ETH
    function joinDAO() external payable {
        require(msg.value >= 0.1 ether, "Need at least 0.1 ETH");
        require(!members[msg.sender], "Already a member");
        members[msg.sender] = true;
        memberCount++;
    }

    // Create a proposal to send ETH from treasury
    function createProposal(string calldata description, address payable recipient, uint amount) 
        external onlyMember 
    {
        require(amount <= address(this).balance, "Not enough funds");
        proposalCount++;
        Proposal storage p = proposals[proposalCount];
        p.id = proposalCount;
        p.description = description;
        p.deadline = block.timestamp + VOTING_PERIOD;
        p.recipient = recipient;
        p.amount = amount;
    }

    // Vote on a proposal
    function vote(uint proposalId, bool support) external onlyMember {
        Proposal storage p = proposals[proposalId];
        require(block.timestamp < p.deadline, "Voting ended");
        require(!p.voted[msg.sender], "Already voted");

        p.voted[msg.sender] = true;

        if (support) {
            p.yesVotes++;
        } else {
            p.noVotes++;
        }
    }

    // Execute proposal if passed
    function executeProposal(uint proposalId) external onlyMember {
        Proposal storage p = proposals[proposalId];
        require(block.timestamp >= p.deadline, "Voting not ended");
        require(!p.executed, "Already executed");
        require(p.yesVotes > p.noVotes, "Proposal not passed");

        p.executed = true;
        (bool sent, ) = p.recipient.call{value: p.amount}("");
        require(sent, "Transfer failed");
    }

    // Deposit ETH into DAO treasury
    function deposit() external payable {}

    // Get DAO balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
