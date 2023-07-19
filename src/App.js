import React, { useState } from "react";
import "./App.css";
const ethers = require("ethers"); 

function App() {
    const [minted, setMinted] = useState(false);
    const [loading, setLoading] = useState(false);

    const mintNFT= async () => {
        try {
            setLoading(true);
            // Connect to Ethereum provider
            const provider=new ethers.providers.Web3Provider(window.ethereum);
            // Request access to user's Ethereum account
            await window.ethereum.enable();
            // Get the signer (current user)
            const signer=provider.getSigner();
            // Load the smart contract
            const contractAddress="0x12A0E3e6A3B0a80f582B01f222B483E0Ca6313E4"; 
            const contractABI=[
                {
                  "inputs": [],
                  "stateMutability": "nonpayable",
                  "type": "constructor"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "approved",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "Approval",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "operator",
                      "type": "address"
                    },
                    {
                      "indexed": false,
                      "internalType": "bool",
                      "name": "approved",
                      "type": "bool"
                    }
                  ],
                  "name": "ApprovalForAll",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "_fromTokenId",
                      "type": "uint256"
                    },
                    {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "_toTokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "BatchMetadataUpdate",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": false,
                      "internalType": "uint256",
                      "name": "_tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "MetadataUpdate",
                  "type": "event"
                },
                {
                  "anonymous": false,
                  "inputs": [
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "indexed": true,
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "Transfer",
                  "type": "event"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "approve",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                    }
                  ],
                  "name": "balanceOf",
                  "outputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "getApproved",
                  "outputs": [
                    {
                      "internalType": "address",
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "owner",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "operator",
                      "type": "address"
                    }
                  ],
                  "name": "isApprovedForAll",
                  "outputs": [
                    {
                      "internalType": "bool",
                      "name": "",
                      "type": "bool"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "recipient",
                      "type": "address"
                    },
                    {
                      "internalType": "string",
                      "name": "tokenURI",
                      "type": "string"
                    }
                  ],
                  "name": "mintNFT",
                  "outputs": [
                    {
                      "internalType": "uint256",
                      "name": "",
                      "type": "uint256"
                    }
                  ],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [],
                  "name": "name",
                  "outputs": [
                    {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "ownerOf",
                  "outputs": [
                    {
                      "internalType": "address",
                      "name": "",
                      "type": "address"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "safeTransferFrom",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    },
                    {
                      "internalType": "bytes",
                      "name": "data",
                      "type": "bytes"
                    }
                  ],
                  "name": "safeTransferFrom",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "operator",
                      "type": "address"
                    },
                    {
                      "internalType": "bool",
                      "name": "approved",
                      "type": "bool"
                    }
                  ],
                  "name": "setApprovalForAll",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "bytes4",
                      "name": "interfaceId",
                      "type": "bytes4"
                    }
                  ],
                  "name": "supportsInterface",
                  "outputs": [
                    {
                      "internalType": "bool",
                      "name": "",
                      "type": "bool"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [],
                  "name": "symbol",
                  "outputs": [
                    {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "tokenURI",
                  "outputs": [
                    {
                      "internalType": "string",
                      "name": "",
                      "type": "string"
                    }
                  ],
                  "stateMutability": "view",
                  "type": "function"
                },
                {
                  "inputs": [
                    {
                      "internalType": "address",
                      "name": "from",
                      "type": "address"
                    },
                    {
                      "internalType": "address",
                      "name": "to",
                      "type": "address"
                    },
                    {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                    }
                  ],
                  "name": "transferFrom",
                  "outputs": [],
                  "stateMutability": "nonpayable",
                  "type": "function"
                }
            ];
            const contract=new ethers.Contract(contractAddress, contractABI, signer);
            // Call the mintNFT function on the contract
            const tx=await contract.mintNFT(signer.getAddress(), "https://gateway.pinata.cloud/ipfs/QmUWzgNHVEU6UZWkFL8WAxcokcjdE5pKza7VM6USPB8SNC");
            // Wait for the transaction to be mined
            await tx.wait();
            setMinted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Flashy NFT Mint Website</h1>
            {minted ? (
                <p>Congratulations! Your NFT has been minted.</p>
            ) : (
                <button onClick={mintNFT} disabled={loading}>
                    {loading ? "Minting..." : "Mint NFT"}
                </button>
            )}
        </div>
    );
}

export default App;