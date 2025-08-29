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
        address creator;
        mapping(address => bool) voted;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount;

    mapping(address => bool) public members;
    uint public memberCount;

    uint public constant VOTING_PERIOD = 1 days;

    address public owner;

    modifier onlyMember() {
        require(members[msg.sender], "Not a DAO member");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() payable {
        owner = msg.sender;
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
        p.creator = msg.sender;
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

    // End voting early (only creator can do this)
    function endVoting(uint proposalId) external {
        Proposal storage p = proposals[proposalId];
        require(msg.sender == p.creator, "Only proposal creator can end voting");
        require(block.timestamp < p.deadline, "Voting already ended");
        p.deadline = block.timestamp; // closes voting immediately
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

    // Withdraw function (only owner)
    function withdraw(address payable to) external onlyOwner {
        uint bal = address(this).balance;
        require(bal > 0, "No funds to withdraw");
        (bool sent, ) = to.call{value: bal}("");
        require(sent, "Withdraw failed");
    }

    // Get DAO balance
    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
