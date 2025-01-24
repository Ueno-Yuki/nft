// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MYNFT is ERC721, ERC721URIStorage, Ownable {
  
  uint256 public tokenId;

  constructor(address initialOwner) Ownable(initialOwner) ERC721("MYNFT", "MNFT") {}

  function mint(string memory uri) public {
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);
    tokenId++;
  }

      function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
      return
        interfaceId == type(IERC721).interfaceId ||
        interfaceId == type(IERC721Metadata).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    function tokenURI (uint256 _tokenId) 
      public 
      view 
      override (ERC721, ERC721URIStorage)
      returns (string memory)
    {
      return super.tokenURI(_tokenId);
    }

  function burn() public {
    _burn(tokenId);
  }
}