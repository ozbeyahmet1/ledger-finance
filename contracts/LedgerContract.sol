// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract LedgerContract{

    event  AddTransaction(address recipient, uint taskId);
    event AddAsset(address recipient, uint taskId);

    struct Transaction {
        uint id;
        address username;
        string data;
    }

    struct Asset {
        uint id;
        address username;
        string data;
    }


    Transaction[] private transactions;
    Asset[] private assets;

    // Map Transactions to user
    mapping(uint256 => address) transactionToOwner;

     // Map Assets to user
    mapping(uint256 => address) assetToOwner;

    // Add Transaction Function
    function addTransaction(string memory data) external {
        uint taskId = transactions.length;
        transactions.push(Transaction(taskId, msg.sender, data));
        transactionToOwner[taskId] = msg.sender;
        emit  AddTransaction(msg.sender, taskId);
    }

    // Fetch My Transactions
    function fetchMyTransactions() external view returns (Transaction[] memory) {
        Transaction[] memory temporary = new Transaction[](transactions.length);
        uint counter = 0;
        for(uint i=0; i<transactions.length; i++) {
            if(transactionToOwner[i] == msg.sender) {
                temporary[counter] = transactions[i];
                counter++;
            }
        }

        Transaction[] memory result = new Transaction[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

  // Add Asset Function
    function addAsset(string memory data) external {
        uint assetId = assets.length;
        assets.push(Asset(assetId, msg.sender, data));
        assetToOwner[assetId] = msg.sender;
        emit  AddAsset(msg.sender, assetId);
    }

    // Fetch My Assets
    function fetchMyAssets() external view returns (Asset[] memory) {
        Asset[] memory temporary = new Asset[](assets.length);
        uint counter = 0;
        for(uint i=0; i<assets.length; i++) {
            if(assetToOwner[i] == msg.sender) {
                temporary[counter] = assets[i];
                counter++;
            }
        }

        Asset[] memory result = new Asset[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

}