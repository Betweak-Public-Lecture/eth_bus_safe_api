var Web3 = require("web3");

var product_contract = require("../build/contracts/bus_safe.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var smartcontract = new web3.eth.Contract(
  product_contract.abi,
  product_contract.networks['5777'].address
);

module.exports = {
  web3,
  smartcontract
}