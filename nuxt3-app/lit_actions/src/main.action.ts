/**
 * NAME: main
 */

import { keccak256 } from "@ethersproject/keccak256";
import { VerifierAction } from "types";
//import { VerifierAction, VerificationFailed } from "types";

const createMessage = (actions: any[]) => {
  return (
    "Condition verifications:\n" +
    actions.map(
      (v) => `\nipfsId: ${v.ipfsId}\nparams: ${JSON.stringify(v.params)}\n`
    )
  );
};

const main = async (actions: VerifierAction[]) => {
  if (!actions.length) {
    return;
  }
  for (const action of actions) {
    if (!action.ipfsId.length || action.params == null) {
      return;
    }
  }

  const message = createMessage(actions);
  const messageBytes = new TextEncoder().encode(message);
  const hashedMessage = keccak256(messageBytes);

  for await (const action of actions) {
    const r = await Lit.Actions.call(action).catch((e: any) => {
      console.log("ERROR", e);
      return;
    });
    if (!r) {
      console.log("EMPTY");
      return;
    }
    if (!r.success) {
      return;
    }
    const { data, verified } = r.response;
    if (!r.verified) {
      return;
    }
    console.log("EXISTS", await r);
  }

  const toSign = [1, 2, 3]; //new TextEncoder().encode(hashedMessage);
  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });
};

main(verifierActions);
