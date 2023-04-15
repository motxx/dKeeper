// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import "./SampleERC20.sol";
import {Keeper} from "./Keeper.sol";
import {LibKeeper} from "./LibKeeper.sol";

contract Airdrop is Keeper {
  struct ClaimArg {
    address payee;
    LibKeeper.Conditions conditions;
    LibKeeper.Signature signature;
  }

  bytes32 constant CLAIM_ARG_TYPEHASH = keccak256(
    abi.encodePacked(
      "ClaimArg(address payee,(string[] ipfsIds),(address signer,bytes signature))"
    )
  );

  SampleERC20 private _token;

  constructor(address registeredSigner, LibKeeper.Conditions memory conditions)
    Keeper(registeredSigner, conditions)
  {
    _token = new SampleERC20(address(this));
    _token.approve(address(this), type(uint256).max);
  }

  function _verifySignature(ClaimArg calldata arg) private {
    require(
      arg.signature.signer == _registeredSigner,
      "Keep: signer is not valid"
    );
    /*
    require(
      SignatureChecker.isValidSignatureNow(
        arg.signature.signer,
        _hashStruct(arg),
        arg.signature.signature
      ),
      "Keep: signature is not valid"
    );
    require(
      _verifyConditions(arg.conditions),
      "Keep: condition verification failed"
    );
    */
  }

  function claim(ClaimArg calldata arg) external {
    _verifySignature(arg);
    _token.transferFrom(address(this), arg.payee, 1);
  }

  function _hashStruct(ClaimArg calldata arg) internal pure returns (bytes32 hash) {
    return keccak256(
      abi.encode(
        CLAIM_ARG_TYPEHASH,
        arg.payee,
        arg.conditions.ipfsIds,
        arg.signature
      )
    );
  }
}
