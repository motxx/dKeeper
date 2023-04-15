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
  //  const resultPromises = actions.map((action) => Lit.Actions.call(action));
  const result = await Lit.Actions.call(actions[0]).catch((e: any) => {
    console.log("ERROR", e);
    return;
  });
  if (!result) {
    console.log("EMPTY");
    return;
  }
  console.log("EXISTS", result);
  /*
  const results = await Promise.all(resultPromises);
  for (const r of results) {
    if (!r.success) {
      return;
    }
    const { data, verified } = r.response;
    if (!r.verified) {
      return;
    }
  }
  */
  const toSign = [1, 2, 3]; //new TextEncoder().encode(hashedMessage);
  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });
};

main(verifierActions);
