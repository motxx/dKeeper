export type VerifierAction = {
  ipfsId: string;
  params: object;
};

export type VerifierResult = {
  data: string;
  verified: boolean;
};

export type VerifyLitConditionKeysArgs = {
  contractAddress: string;
  // proofId: string;
  ipfsIds: string[];
};

export type WalletMessage = {
  walletAddress: string;
  // proofId: string;
};

export type VerifyWalletSignatureArgs = {
  walletAddress: string;
  message: WalletMessage;
  signature: Uint8Array;
};

export class VerificationFailed extends Error {
  constructor(action: VerifierAction, message: string) {
    let paramsStr: string;
    try {
      paramsStr = JSON.stringify(action.params);
    } catch {
      paramsStr = "(JSON.stringify() failed)";
    }
    super(
      `Verification failed. ipfsId: ${action.ipfsId} params: ${paramsStr} error: ${message}`
    );
  }
}

export class InvalidSignature extends Error {
  // TODO
  constructor(action: VerifierAction, message: string) {
    let paramsStr: string;
    try {
      paramsStr = JSON.stringify(action.params);
    } catch {
      paramsStr = "(JSON.stringify() failed)";
    }
    super(
      `Verification failed. ipfsId: ${action.ipfsId} params: ${paramsStr} error: ${message}`
    );
  }
}
