// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title XShoeNFT
 * @dev A simple ERC721 contract with a static base URI.
 */
contract XShoeNFT is ERC721, Ownable {
    string private _tokenURI;
    uint256 private _tokenId;
    uint256[] private tokenIds;

    event TokenURIChanged(string newTokenURI);
    event TokenMinted(address indexed to, uint256 indexed tokenId);

    /**
     * @dev Constructor to initialize the contract with a name, symbol, and base URI.
     * @param name The name of the ERC721 token.
     * @param symbol The symbol of the ERC721 token.
     * @param initialTokenURI The static URI for retrieving token metadata.
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory initialTokenURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _tokenURI = initialTokenURI;
        _tokenId = 1;
    }

    /**
     * @dev Mints a new token with the given ID and assigns it to the specified address.
     * @param to The address to which the new token will be assigned.
     */
    function mint(address to) external {
        _safeMint(to, _tokenId);
        tokenIds.push(_tokenId);

        emit TokenMinted(to, _tokenId);

        _tokenId += 1;
    }

    /**
     * @dev Function to update the base URI for retrieving token metadata.
     * Can only be called by the owner of the contract.
     * @param newTokenURI The new base URI.
     */
    function setTokenURI(string memory newTokenURI) external onlyOwner {
        _tokenURI = newTokenURI;
        emit TokenURIChanged(newTokenURI);
    }

    /**
     * @dev public function to return the static token URI for retrieving token metadata.
     * @return The base URI.
     */
    function tokenURI() public view returns (string memory) {
        return _tokenURI;
    }

    /**
     * @dev public function to return all the minted NFT
     * @return all token ids.
     */
    function allTokenIds() public view returns (uint256[] memory) {
        return tokenIds;
    }

    /**
     * @dev public function to override token URI to static token URI for retrieving token metadata.
     * @return The base URI.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _tokenURI;
    }

    /**
     * @dev Internal function to override the base URI for retrieving token metadata.
     * @return The base URI.
     */
    function _baseURI() internal view override returns (string memory) {
        return _tokenURI;
    }
}
