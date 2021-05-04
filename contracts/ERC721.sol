// "SPDX-License-Identifier: UNLICENSED" 
/**
 * The DigitalArt ERC721 Token
 * @notice smart contract based on  - Learn Ethereum by author brian wu
 * @author cchavez 
 */ 
pragma solidity ^0.8.4;

abstract contract ERC721 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) public view virtual returns (uint256 balance);
    function ownerOf(uint256 tokenId) public view virtual returns (address owner);

    function approve(address to, uint256 tokenId) public virtual;
    function getApproved(uint256 tokenId) public view virtual returns (address operator);

    function setApprovalForAll(address operator, bool _approved) public virtual;
    function isApprovedForAll(address owner, address operator) public view virtual returns (bool);

    function transferFrom(address from, address to, uint256 tokenId) public virtual;
    function safeTransferFrom(address from, address to, uint256 tokenId) public virtual;

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual;
}
