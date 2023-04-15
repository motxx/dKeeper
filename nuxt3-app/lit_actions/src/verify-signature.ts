/**
 * NAME: verify-signature
 *
 * @argument walletAddress
 * @argument message
 * @argument signature
 */
import { ethers } from "ethers";
import {
  VerifyLitConditionKeysArgs,
  VerifyWalletSignatureArgs,
  WalletMessage,
} from "types";

// TODO: https://lit-accs-debugger.vercel.app/
const createEVMContractConditions = (
  conditionKeys: VerifyLitConditionKeysArgs
) => {
  return [
    {
      contractAddress: conditionKeys.contractAddress,
      functionName: "verifyLitConditionKeys",
      functionParams: [conditionKeys.ipfsIds],
      functionAbi: {
        constant: true,
        inputs: [
          {
            name: "ipfsIds",
            type: "string[]",
          },
        ],
        name: "verifyLitConditionKeys",
        outputs: [
          {
            name: "verified",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      chain: "mumbai",
      returnValueTest: {
        key: "verified",
        comparator: "==",
        value: "true",
      },
    },
  ];
};

// TODO: Use EIP712
// EIP191
const toEIP191Message = (_message: WalletMessage) => {
  const rawMessage = `addres:${_message.walletAddress}\nproofId:${_message.proofId}`;
  const rawMessageLength = new Blob([rawMessage]).size;
  return ethers.utils.toUtf8Bytes(
    "\x19Ethereum Signed Message:\n" + rawMessageLength + rawMessage
  );
};

const verifyEIP191Signature = async ({
  walletAddress,
  message,
  signature,
}: VerifyWalletSignatureArgs) => {
  try {
    const recovered = ethers.utils.verifyMessage(
      toEIP191Message(message),
      signature
    );
    return recovered == walletAddress;
  } catch {
    console.log("failed to recover");
    throw new Error("");
  }
};

const verifyLitConditionKeys = async ({
  contractAddress,
  proofId,
  ipfsIds,
}: VerifyLitConditionKeysArgs) => {
  console.log("Not impl yet");
  return true;
};

export const verify = async (
  conditionKeys: VerifyLitConditionKeysArgs,
  walletSignature: VerifyWalletSignatureArgs
) => {
  await verifyEIP191Signature(walletSignature);
  await verifyLitConditionKeys(conditionKeys);
};

// verify(conditionKeys, walletSignature);
