// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MiniDAO.sol";

contract DAOTest is Test {
    MinimalDAO dao;

    function setUp() public {
        dao = new MiniDAO();
    }

    function testCreateProposal() public {
        dao.createProposal("Test Proposal");
        (string memory desc,,) = dao.getProposal(0);
        assertEq(desc, "Test Proposal");
    }

    function testVoteAndExecute() public {
        dao.createProposal("Proposal #1");
        dao.vote(0);
        dao.executeProposal(0);

        (,uint256 votes, bool executed) = dao.getProposal(0);
        assertEq(votes, 1);
        assertTrue(executed);
    }
}
