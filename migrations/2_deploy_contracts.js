var DigitalArt = artifacts.require("./DigitalArt.sol");
var ERC721 = artifacts.require("./ERC721.sol");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    try {
      await deployer.deploy(ERC721, "ERC721", "ERC721");

      await deployer.deploy(DigitalArt, "DigitalArtToken", "DT");

    } catch (err) {
      console.log(('Failed to Deploy Contracts', err))
    }
  })

}