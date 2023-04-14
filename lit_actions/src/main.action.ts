/**
 * NAME: main
 */

import { ethers } from "ethers";
import { VerifierAction, VerificationFailed } from "types";

const createMessage = (actions: VerifierAction[]) => {
  return (
    "Condition verifications:\n" +
    actions.map(
      (v) => `\nipfsId: ${v.ipfsId}\nparams: ${JSON.stringify(v.params)}\n`
    )
  );
};

const main = async (actions: VerifierAction[]) => {
  if (!actions.length) {
    throw new Error("No verifierActions");
  }

  const hashedMessage = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(createMessage(actions))
  );

  const toSign = new TextEncoder().encode(hashedMessage);

  for (const action of actions) {
    await Lit.Actions.call(action).catch((e: any) => {
      throw new VerificationFailed(action, e.message);
    });
  }

  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });

  return sigShare;
};

main(verifierActions);
