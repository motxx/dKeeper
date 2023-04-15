// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";
import {LibKeeper} from "./LibKeeper.sol";

contract Keeper {
  address internal _registeredSigner;
  LibKeeper.Conditions internal _conditions;
  mapping(uint16 => bool) private _tempExists;

  constructor(address registeredSigner, LibKeeper.Conditions memory conditions) {
    _registeredSigner = registeredSigner;
    _conditions = conditions;
  }

  function _verifyConditions(LibKeeper.Conditions calldata conditions) internal returns (bool) {
    require(
      conditions.ipfsIds.length == _conditions.ipfsIds.length,
      "Keep: length mismatch"
    );

    _checkConditionsMatch(conditions);
    return _verifyAllConditionsChecked();
  }

  function _checkConditionsMatch(LibKeeper.Conditions calldata conditions) private {
    for (uint16 i = 0; i < conditions.ipfsIds.length; i++) {
      for (uint16 j = 0; j < _conditions.ipfsIds.length; j++) {
        if (LibKeeper._hashesMatch(conditions.ipfsIds[i], _conditions.ipfsIds[j])) {
          _tempExists[i] = true;
        }
      }
    }
  }

  function _verifyAllConditionsChecked() private returns (bool) {
    bool verified = true;

    for (uint16 i = 0; i < _conditions.ipfsIds.length; i++) {
      if (_tempExists[i]) {
        _tempExists[i] = false;
      } else {
        verified = false;
      }
    }

    return verified;
  }
}
