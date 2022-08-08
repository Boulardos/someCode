
   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

//@author Ben BK
//@title ma collection de NFT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

contract NFTERC721A is Ownable, ERC721A, PaymentSplitter {

    using Strings for uint;

    enum Step {
        Before,
        WhitelistSale,
        PublicSale,
        Free,
        SoldOut,
        Reveal
    }

    string public baseURI;

    Step public sellingStep;

    uint private constant MAX_SUPPLY = 7777;
    uint private constant MAX_WHITELIST = 2777;
    uint private constant MAX_PRESALE = 2000;
    uint private constant MAX_PUBLIC = 4900;
    uint private constant MAX_GIFT = 100;

    uint public wlSalePrice = 0.25 ether;
    uint public presalePrice = 0.20 ether
    uint public publicSalePrice = 0.3 ether;

    bytes32 public merkleRootWhitelist;
    bytes32 public merkleRootPresale;
    bytes32 public merkleRootFreeMint;

    uint public saleStartTime = 1646737200;

    mapping(address => uint) public amountNFTsperWalletWhitelistSale;
    mapping(address => uint) public amountNFTsperPresale;
    mapping(address => uint) public amountNFTsperPublicsale;
    mapping(address => bool) public freeMintUsed;
    mapping(address => uint) public freeMintsRemaining;

    uint private teamLength;

    constructor(address[] memory _team, uint[] memory _teamShares, bytes32 _merkleRoot, string memory _baseURI) ERC721A("Nom de la collection", "SYMBOL")
    PaymentSplitter(_team, _teamShares) {
        merkleRoot = _merkleRoot;
        baseURI = _baseURI;
        teamLength = _team.length;
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    function whitelistMint(uint _quantity, bytes32[] calldata _proof) external payable callerIsUser {
        uint price = wlSalePrice;
        require(price != 0, "Price is 0");
        require(currentTime() >= saleStartTime, "Whitelist Sale has not started yet");
        require(currentTime() < saleStartTime + 300 minutes, "Whitelist Sale is finished");
        require(sellingStep == Step.WhitelistSale, "Whitelist sale is not activated");
        require(isListed(merkleRootWhitelist, msg.sender, _proof), "Not whitelisted");
        require(amountNFTsperWalletWhitelistSale[msg.sender] + _quantity <= 5, "You can only get 5 NFT on the Whitelist Sale");
        _quantity = _quantity >= 4 ? _quantity + 1 : _quantity;
        require(totalSupply() + _quantity <= MAX_WHITELIST, "Max supply exceeded");
        require(msg.value == price * _quantity, "Not enought funds");
        amountNFTsperWalletWhitelistSale[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);
    }

    function PresaleMint(uint _quantity, bytes32[] calldata _proof) external payable callerIsUser {
        uint price = presalePrice;
        require(price != 0, "Price is 0");
        require(currentTime() >= saleStartTime, "Whitelist Sale has not started yet");
        require(currentTime() < saleStartTime + 300 minutes, "Whitelist Sale is finished");
        require(sellingStep == Step.PresaleMint, "Presale is not activated");
        require(isListed(merkleRootPresale, msg.sender, _proof), "Not in Premint list");
        require(amountNFTsperPresale[msg.sender] + _quantity <= 5, "You can only get 5 NFT on the PreSale");
        _quantity = _quantity >= 3 ? _quantity + 1 : _quantity;
        require(totalSupply() + _quantity <= MAX_PRESALE, "Max supply exceeded");
        require(msg.value == price * _quantity, "Not enought funds");
        amountNFTsperPresale[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);
    }
    function publicSaleMint(uint _quantity) external payable callerIsUser {
        uint price = publicSalePrice;
        require(price != 0, "Price is 0");
        require(sellingStep == Step.PublicSale, "Public sale is not activated");
        require(totalSupply() + _quantity <= MAX_SUPPLY - MAX_GIFT, "Max supply exceeded");
        require(amountNFTsperPublicsale[msg.sender] + _quantity <= 10, "You can only get 10 NFT on the PublicSale");
        require(msg.value == price * _quantity, "Not enought funds");
        amountNFTsperPublicsale[msg.sender] += _quantity;
        _safeMint(msg.sender, _quantity);
    }

    function freeMint(uint amount, uint totalAllocation, bytes32 leaf, bytes32[] memory proof) external payable callerIsUser{
        // require(sellingStep == Step.Free, "Free Mint is not activated");

        // Verify that (leaf, proof) matches the Merkle root
        // require(verify(freeMintMerkleRoot, leaf, proof), "Not a valid leaf in the Merkle tree");
        require(isListed(merkleRootFreeMint, msg.sender, _proof), "free mint not allowed");
        // Verify that (msg.sender, amount) correspond to Merkle leaf
        require(keccak256(abi.encodePacked(msg.sender, totalAllocation)) == leaf, "Sender and amount don't match Merkle leaf");
        require(alapcaca2d.balanceOf(msg.sender) 
        // Create storage element tracking user mints if this is the first mint for them
        if (!freeMintUsed[msg.sender]) {        
            freeMintUsed[msg.sender] = true;
            freeMintsRemaining[msg.sender] = totalAllocation;
        } else if (freeMintsRemaining[msg.sender] > totalAllocation){
            freeMintsRemaining[msg.sender] = totalAllocation;
        }

        // Require nonzero amount
        require(amount > 0, "Can't mint zero");

        // Check proper amount sent
        require(msg.value == 0, "Send proper ETH amount");

        require(freeMintsRemaining[msg.sender] >= amount, "Can't mint more than remaining allocation");

        freeMintsRemaining[msg.sender] -= amount;
        _safeMint(msg.sender, amount);
    }
    
    function gift(address _to, uint _quantity) external onlyOwner {
        require(sellingStep > Step.PublicSale, "Gift is after the public sale");
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Reached max Supply");
        _safeMint(_to, _quantity);
    }

    function setSaleStartTime(uint _saleStartTime) external onlyOwner {
        saleStartTime = _saleStartTime;
    }

    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function currentTime() internal view returns(uint) {
        return block.timestamp;
    }

    function setStep(uint _step) external onlyOwner {
        sellingStep = Step(_step);
    }

    function tokenURI(uint _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    //Whitelist
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function isListed(bytes32 root, address _account, bytes32[] calldata _proof) internal view returns(bool) {
        return _verify(root, leaf(_account), _proof);
    }

    function leaf(address _account) internal pure returns(bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    function _verify(bytes32 root, bytes32 _leaf, bytes32[] memory _proof) internal view returns(bool) {
        return MerkleProof.verify(_proof, root, _leaf);
    }

    //ReleaseALL
    function releaseAll() external {
        for(uint i = 0 ; i < teamLength ; i++) {
            release(payable(payee(i)));
        }
    }

    receive() override external payable {
        revert('Only if you mint');
    }

}
