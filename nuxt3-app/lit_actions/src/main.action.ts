/**
 * NAME: main
 */

import { keccak256 } from "@ethersproject/keccak256";
import { VerifierAction } from "types";

const createMessage = (actions: any[]) => {
  return (
    "Condition verifications:\n" +
    actions.map(
      (v) => `\nipfsId: ${v.ipfsId}\nparams: ${JSON.stringify(v.params, Object.keys(v.params).sort())}\n`
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

  {
    const r = await Lit.Actions.call(actions[0]).catch((e: any) => {
      return null;
    });
    if (!r) {
      return null;
    }
    const json = JSON.parse(r);
    if (!json.verified) {
      return null;
    }
  }

  if (actions.length > 0) {
    const r = await Lit.Actions.call(actions[1]).catch((e: any) => {
      return null;
    });
    if (!r) {
      return null;
    }
    const json = JSON.parse(r);
    if (!json.verified) {
      return null;
    }
  }

  const message = createMessage(actions);
  const messageBytes = new TextEncoder().encode(message);
  const hashedMessage = keccak256(messageBytes);
  const toSign = new TextEncoder().encode(hashedMessage);
  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });
};

main(verifierActions);
