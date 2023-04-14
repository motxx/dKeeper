// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SampleERC20 is ERC20 {
  constructor(address initialWallet)
    ERC20("SampleERC20", "Sample")
  {
    _mint(initialWallet, 1000);
  }
}
