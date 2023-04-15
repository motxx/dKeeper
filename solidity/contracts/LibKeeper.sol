// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library LibKeeper {
  struct Signature {
    address signer;
    bytes signature;
  }

  struct Conditions {
    string[] ipfsIds;
  }

  function _hashesMatch(string memory id1, string memory id2) internal pure returns (bool) {
    return keccak256(bytes(id1)) == keccak256(bytes(id2));
  }
}
