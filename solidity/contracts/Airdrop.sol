// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "./SampleERC20.sol";

struct Signature {
  address signer;
  bytes signature;
}

struct ClaimArg {
  address payee;
  Signature signature;
}

bytes32 constant CLAIM_ARG_TYPEHASH = keccak256("ClaimArg(address payee)");

struct PreConditions {
  string[] ipfsIds;
}

contract Airdrop {
  address private _registeredSigner;
  PreConditions private _conditions;
  SampleERC20 private _token;

  constructor(address registeredSigner, PreConditions memory conditions) {
    _registeredSigner = registeredSigner;
    _conditions = conditions;
    _token = new SampleERC20(address(this));
    _token.approve(address(this), type(uint256).max);
  }

  function claim(ClaimArg calldata arg)
    external
  {
    require(SignatureChecker.isValidSignatureNow(
      arg.signature.signer,
      hashStruct(arg),
      arg.signature.signature
    ), "Airdrop: invalid signature");
    _token.transferFrom(address(this), arg.payee, 1);
  }

  function hashStruct(ClaimArg memory arg)
    public
    pure
    returns (bytes32 hash)
  {
    return keccak256(abi.encode(CLAIM_ARG_TYPEHASH, arg.payee));
  }
}
