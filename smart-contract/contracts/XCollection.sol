// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title XCollection NFT
 * @dev NFT collection where each token can have unique metadata
 */
contract XCollection is ERC721, Ownable {
    string private _defaultTokenURI;
    uint256 private _tokenId;
    uint256[] private _tokenIds;
    mapping(uint256 => string) private _tokenURIMap;

    event DefaultTokenURIChanged(string newTokenURI);
    event TokenURIChanged(uint256 tokenId, string newTokenURI);
    event TokenMinted(address indexed to, uint256 indexed tokenId);

    /**
     * @dev Constructor to initialize the contract with a name, symbol, and base URI.
     * @param name The name of the ERC721 token.
     * @param symbol The symbol of the ERC721 token.
     * @param initialDefaultTokenURI The initial default URI for retrieving token metadata.
     */
    constructor(
        string memory name,
        string memory symbol,
        string memory initialDefaultTokenURI
    ) ERC721(name, symbol) Ownable(msg.sender) {
        _defaultTokenURI = initialDefaultTokenURI;
        _tokenId = 1;
    }

    /**
     * @dev Mints a new token with the given ID and assigns it to the specified address.
     * @param to The address to which the new token will be assigned.
     */
    function mint(address to) external {
        _safeMint(to, _tokenId);
        _tokenIds.push(_tokenId);

        emit TokenMinted(to, _tokenId);

        _tokenId += 1;
    }

    /**
     * @dev Function to update the default URI for retrieving token metadata.
     * Can only be called by the owner of the contract.
     * @param newTokenURI The new default URI.
     */
    function setDefaultTokenURI(string memory newTokenURI) external onlyOwner {
        _defaultTokenURI = newTokenURI;
        emit DefaultTokenURIChanged(newTokenURI);
    }

    /**
     * @dev Function to set the token URI for retrieving token metadata.
     * Token URI can only be set once by the owner of the contract
     * @param tokenId the token ID which URI will be changed.
     * @param tokenId The new token URI.
     */
    function setTokenURI(
        uint256 tokenId,
        string memory newTokenURI
    ) external onlyOwner {
        require(
            bytes(_tokenURIMap[tokenId]).length == 0,
            "Token URI has been initialized"
        );
        _tokenURIMap[tokenId] = newTokenURI;
        emit TokenURIChanged(tokenId, newTokenURI);
    }

    /**
     * @dev public function to return all the minted NFT
     * @return all token ids.
     */
    function allTokenIds() public view returns (uint256[] memory) {
        return _tokenIds;
    }

    /**
     * @dev public function to get final token URI
     * @return The token URI.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        if (bytes(_tokenURIMap[tokenId]).length == 0) {
            return _defaultTokenURI;
        }

        return _tokenURIMap[tokenId];
    }
}
