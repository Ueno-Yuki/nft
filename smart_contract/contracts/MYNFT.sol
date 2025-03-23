// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MYNFT is ERC721Enumerable, Ownable {

  string public baseExtension = '.json';
  // 最大発行数
  uint256 public MAX_SUPPLY = 30;
  // NFTの値段
  uint256 public PRICE = 0.0001 ether;
  // 1回の最大購入数
  uint256 public MAX_PER_MINT = 3;
  // saleの開始制御用
  bool public paused = true;

  string public baseURI;

  constructor() Ownable(msg.sender) ERC721("MYNFT", "MNFT") {
    setBaseURI('');
  }

  function mint(uint256 _mintAmount) public payable {
    if ( paused ) revert('the contract is paused.');
    uint256 supply = totalSupply();
    if ( !(_mintAmount > 0) ) revert('Please specify 1 or more.');
    if ( _mintAmount > MAX_PER_MINT) revert('max min amount per session exceeded.');
    if ( supply + _mintAmount > MAX_SUPPLY ) revert('max NFT limit exceeded.');
    if ( msg.sender != owner() ) {
      if ( msg.value < PRICE * _mintAmount ) revert('insufficient funds.');
    }

    _safeMint(msg.sender, _mintAmount);
  }

  // =================================
  // 複数人ミント用
  // =================================
  function airdropMint(address[] calldata _airdropAddresses, uint256[] memory _userMintAmount) public onlyOwner {
    uint256 supply = totalSupply();
    uint256 _mintAmount = 0;
    for ( uint256 i = 0; i < _userMintAmount.length; i++ ) {
      _mintAmount += _userMintAmount[i];
    }
    if ( !(_mintAmount > 0) ) revert('Please specify 1 or more.');
    if ( supply + _mintAmount > MAX_SUPPLY ) revert('max NFT limit exceeded.');

    for ( uint256 i = 0; i < _airdropAddresses.length; i++ ) {
      _safeMint(_airdropAddresses[i], _userMintAmount[i]);
    }
  }

  // ================================
  // 設定変数変更用メソッド
  // ================================
  function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
    return string(abi.encodePacked(ERC721.tokenURI(_tokenId), baseExtension));
  }
  function setPrice(uint _newCost)public onlyOwner{
    PRICE = _newCost;
  }
  function setBaseURI(string memory _newBaseURI) public onlyOwner{
      baseURI = _newBaseURI;
  }
  function setPause(bool _state)public onlyOwner{
      paused = _state;
  }
  function setMaxSupply(uint _newMaxSupply)public onlyOwner{
      MAX_SUPPLY = _newMaxSupply;
  }
  // 設定変数変更用メソッド ここまで
  // ================================

  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }

  function _startTokenId() internal view virtual returns(uint256) {
    return 1;
  }
  
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }
}