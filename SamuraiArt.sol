
// File: Quirkies.sol


pragma solidity 0.8.11;





contract Quirkies is Ownable, ERC721, ReentrancyGuard {
    uint256 public nftPrice = 0.05 ether;
    uint256 public totalSupply = 0;

    uint256 public nftLimit = 5000;
    uint256 public reserved = 50;
    uint256 public capWhitelist = 2;
    uint256 public capPublic = 5;

    bool public saleWhitelist = false;
    bool public salePublic = false;

    bytes32 public merkleRoot;

    string public baseURI = "";

    mapping(address => uint256) public presaleAddresses;

    constructor(string memory _initURI, bytes32 _merkleRoot)
        ERC721("Quirkies", "QRKS")
    {
        baseURI = _initURI;
        merkleRoot = _merkleRoot;
    }


    function mintTicket(uint[] 2Dtoburn) external {
       samurai2D Sam2D = samurai2D(0xc8D2bf842b9f0b601043fb4fd5F23d22b9483911);
        require( Sam2d.balanceOf(msg.sender) >= 10 , "not enough SamuraiCats to claim a ticket");
        for ( uint i = 0 ; i < 2Dtoburn.length; i++ ) {
        require(Sam2d.ownerOf(2Dtoburn[i]) == msg.sender, 'some of intems not owned');
        Sam2D.transferFrom(msg.sender, owner, 2Dtoburn[i]);
        }
        _safeMint(msg.sender, 1); 
    }

    function mint(uint256 _amount) public payable nonReentrant {
        require(salePublic == true, "Quirkies: Not Started");
        require(_amount <= capPublic, "Quirkies: Amount Limit");
        require(
            totalSupply + _amount <= (nftLimit - reserved),
            "Quirkies: Sold Out"
        );
        _mint(_amount);
    }

    function mintWhitelist(uint256 _amount, bytes32[] calldata proof)
        public
        payable
        nonReentrant
    {
        require(saleWhitelist == true, "Quirkies: Not Started");
        require(
            MerkleProof.verify(
                proof,
                merkleRoot,
                keccak256(abi.encodePacked(_msgSender()))
            ),
            "Quirkies: Not Whitelisted"
        );
        require(
            presaleAddresses[_msgSender()] + _amount <= capWhitelist,
            "Quirkies: Amount Limit"
        );
        _mint(_amount);
        presaleAddresses[_msgSender()] += _amount;
    }


    function _mint(uint256 _amount) internal {
        require(tx.origin == msg.sender, "Quirkies: Self Mint Only");
        require(
            totalSupply + _amount <= (nftLimit - reserved),
            "Quirkies: Sold Out"
        );
        require(msg.value == nftPrice * _amount, "Quirkies: Incorrect Value");
        for (uint256 i = 0; i < _amount; i++) {
            _safeMint(_msgSender(), totalSupply);
            totalSupply++;
        }
    }

    function reserve(address[] calldata _tos) external onlyOwner nonReentrant {
        require(totalSupply + _tos.length <= nftLimit, "Quirkies: Sold Out");
        for (uint256 i = 0; i < _tos.length; i++) {
            _safeMint(_tos[i], totalSupply);
            totalSupply++;
            if (reserved > 0) {
                reserved--;
            }
        }
    }

    function tokensOfOwnerByIndex(address _owner, uint256 _index)
        public
        view
        returns (uint256)
    {
        return tokensOfOwner(_owner)[_index];
    }

    function tokensOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 _tokenCount = balanceOf(_owner);
        uint256[] memory _tokenIds = new uint256[](_tokenCount);
        uint256 _tokenIndex = 0;
        for (uint256 i = 0; i < totalSupply; i++) {
            if (ownerOf(i) == _owner) {
                _tokenIds[_tokenIndex] = i;
                _tokenIndex++;
            }
        }
        return _tokenIds;
    }

    function withdraw() public payable onlyOwner {
        uint256 _balance = address(this).balance;
        address TEAM5 = 0x1350BAA348fC0139999C40e5b80FdC26617E3F67;
        address TEAM4 = 0xec19a74D69329C531B133b6Ad752F5EdebDbdBC5;
        address TEAM3 = 0x74faad5e1f9a5B8427F33D5c8924870c949488f7;
        address TEAM2 = 0x761C9BDE27449415C924C64528BFaA01fbC68A6D;
        address TEAM1 = 0x816639f88d7f5405b0CCB0582908b388a1e2c8Bd;

        (bool t5tx, ) = payable(TEAM5).call{value: (_balance * 10) / 100}("");
        require(t5tx, "Quirkies: Transfer 5 Failed");

        (bool t4tx, ) = payable(TEAM4).call{value: (_balance * 5) / 100}("");
        require(t4tx, "Quirkies: Transfer 4 Failed");

        (bool team3tx, ) = payable(TEAM3).call{value: (_balance * 5) / 100}("");
        require(team3tx, "Quirkies: Transfer 3 Failed");

        (bool team2tx, ) = payable(TEAM2).call{value: (_balance * 5) / 100}("");
        require(team2tx, "Quirkies: Transfer 2 Failed");

        (bool _team1tx, ) = payable(TEAM1).call{value: address(this).balance}(
            ""
        );
        require(_team1tx, "Quirkies: Transfer 1 Failed");
    }

    function toggleSaleWhitelist() public onlyOwner {
        saleWhitelist = !saleWhitelist;
    }

    function toggleSalePublic() public onlyOwner {
        salePublic = !salePublic;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setNftPrice(uint256 _nftPrice) public onlyOwner {
        nftPrice = _nftPrice;
    }

    function setNftLimit(uint256 _nftLimit) public onlyOwner {
        nftLimit = _nftLimit;
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function contractURI() public view returns (string memory) {
        return string(abi.encodePacked(baseURI, "contract"));
    }
}