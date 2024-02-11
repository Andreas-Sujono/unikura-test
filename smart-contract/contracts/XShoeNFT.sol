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
    }

    /**
     * @dev Return the base URI for retrieving token metadata.
     * @return The base URI.
     */
    function _baseURI() internal view override returns (string memory) {
        return _tokenURI;
    }

    /**
     * @dev Mints a new token with the given ID and assigns it to the specified address.
     * @param to The address to which the new token will be assigned.
     * @param tokenId The ID of the new token.
     */
    function mint(address to, uint256 tokenId) external {
        _safeMint(to, tokenId);
        emit TokenMinted(to, tokenId);
    }

    /**
     * @dev Overrides the ERC721 tokenURI function to return the static base URI concatenated with the token ID.
     * @param tokenId The ID of the token.
     * @return The URI for the given token.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        return _tokenURI;
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
}
