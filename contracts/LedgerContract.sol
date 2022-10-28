// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract LedgerContract{

    event  AddTransaction(address recipient, uint taskId);

    struct Transaction {
        uint id;
        address username;
        string taskText;
    }

    Transaction[] private tasks;

    // Map Transactions to user
    mapping(uint256 => address) taskToOwner;

    // Add Transaction Function
    function addTransaction(string memory taskText) external {
        uint taskId = tasks.length;
        tasks.push(Transaction(taskId, msg.sender, taskText));
        taskToOwner[taskId] = msg.sender;
        emit  AddTransaction(msg.sender, taskId);
    }

    // Fetch My Transactions
    function fetchMyTransactions() external view returns (Transaction[] memory) {
        Transaction[] memory temporary = new Transaction[](tasks.length);
        uint counter = 0;
        for(uint i=0; i<tasks.length; i++) {
            if(taskToOwner[i] == msg.sender) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }

        Transaction[] memory result = new Transaction[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }



}