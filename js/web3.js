const contractABI = []; // Replace with the actual ABI of your smart contract
const contractAddress = 'oxfdg3g2hg0rsrt7bh4m4'; // Replace with the actual address of your smart contract
function isWalletInstalled() {
return typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined' && window.web3.currentProvider.isTrust);
}
function setStatusMessage(message) {
const statusMessage = document.getElementById('statusMessage');
statusMessage.textContent = message;
}
const claim = document.getElementById('claim');
claim.addEventListener('click', handleClaim);  
    
async function handleClaim() {
if (!isWalletInstalled()) {
alert('Please install MetaMask or Trust Wallet to claim.');
return;
}
try {
await ethereum.enable(); // For MetaMask
const accounts = await ethereum.request({ method: 'eth_accounts' });
const selectedAddress = accounts[0];
const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(contractABI, contractAddress);
setStatusMessage('Processing claim...');
await contract.methods.claim().send({ from: selectedAddress });
setStatusMessage('Coins claimed successfully!');
} catch (error) {
console.error(error);
setStatusMessage('An error occurred while claiming coins.');
}
}
