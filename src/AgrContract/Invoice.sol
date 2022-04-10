// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract InvoiceContract { 

    event CreateInvoice(
        bytes32 indexed invoiceId,
        address indexed invoiceOwner,
        bytes32 invoiceDataId,
        uint256 indexed tokenId
    ); 
 
    struct invoice {
        address invoiceOwner;
        bytes32 invoiceDataId;
        uint256 tokenId;
    } 
     
     mapping(bytes32 => invoice) invoiceRegistry; 

    function createInvoice(string calldata _invoiceUri, uint256 tokenId)
        external
    {
        address _owner = msg.sender;
        uint256 _tokenId = tokenId;
        bytes32 _invcId = keccak256(abi.encode(_invoiceUri));
        bytes32 _invoiceId = keccak256(abi.encodePacked(_owner, _invcId)); 
        invoiceRegistry[_invoiceId].invoiceOwner = _owner;
        invoiceRegistry[_invoiceId].invoiceDataId = _invcId;
        invoiceRegistry[_invoiceId].tokenId = _tokenId; 
        emit CreateInvoice(_invoiceId, _owner, _invcId, _tokenId);
    }

    function getinvoice(bytes32 _invoiceId)
        public
        view
        returns (
            address,
            bytes32,
            uint256
        )
    {
        return (
            invoiceRegistry[_invoiceId].invoiceOwner,
            invoiceRegistry[_invoiceId].invoiceDataId,
            invoiceRegistry[_invoiceId].tokenId
        );
    } 
}