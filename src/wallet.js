import Web3 from 'web3'



// console.log('Web3:', Web3)
// console.log('window.ethereum', window.ethereum)
console.log('Web3.givenProvider', Web3.givenProvider)
console.log('Web3.currentProvider', Web3.currentProvider)
// set the provider of web3
// if (typeof web3 !== 'undefined') {
//   console.debug('current provider', web3.currentProvider)
//   const web31 = new Web3(web3.currentProvider)
//   console.log('ss', web31,web3.version.api,web3.eth.accounts)
// } else {
//   alert('No currentProvider for web3')
// }

const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8546', null, {})
console.log('web3:', web3)




let accounts = web3.eth.accounts
console.log('account',accounts)
let coinbase = web3.eth.coinbase()
console.log('coinbase',coinbase)
web3.version.getNetwork((err, netId) => {
  switch (netId) {
    case "1":
      console.log('This is mainnet')
      break
    case "2":
      console.log('This is the deprecated Morden test network.')
      break
    case "3":
      console.log('This is the ropsten test network.')
      break
    case "4":
      console.log('This is the Rinkeby test network.')
      break
    case "42":
      console.log('This is the Kovan test network.')
      break
    default:
      console.log('This is an unknown network.')
  }
})
