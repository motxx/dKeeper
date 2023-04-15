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

  {
    const r = await Lit.Actions.call(actions[0]).catch((e: any) => {
      return null;
    });
    if (!r || !r.success) {
      return null;
    }
    const { data, verified } = r.response;
    if (!verified) {
      return null;
    }
  }

  if (actions.length > 0) {
    const r = await Lit.Actions.call(actions[1]).catch((e: any) => {
      return null;
    });
    if (!r || !r.success) {
      return null;
    }
    const { data, verified } = r.response;
    if (!verified) {
      return null;
    }
  }

  // TODO: Loop lots of actions.
  /*
  console.log("start");
  const promises = //Promise.all(
    actions.map(async (action: VerifierAction, i) => {
      const r = await Lit.Actions.call(action).catch((e: any) => {
        return null;
      });
      console.log("I'm ", i);
      if (!r || !r.success) {
        return null;
      }
      const { data, verified } = r.response;
      if (!verified) {
        return null;
      }
      return data;
    });
  );
  for await (const promise of promises) {
    const res = await promise();
    if (res === null) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  console.log("end");
  */

  const toSign = new TextEncoder().encode(hashedMessage);
  const sigShare = await LitActions.signEcdsa({
    toSign,
    publicKey,
    sigName,
  });
};

main(verifierActions);
