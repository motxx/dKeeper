import {
  client,
  authSig,
  pkpPublicKey,
  getLitActionCode,
  errorLog,
} from "../utils.mjs";

import presentation from "./data/proof.json" assert { type: "json" };

const litActionCode = await getLitActionCode();

const signatures = await client.executeJs({
  code: litActionCode,
  authSig,
  jsParams: {
    publicKey: pkpPublicKey,
    sigName: "sig1",
    verifierActions: [
      {
        // verifyzk.action.js
        ipfsId: "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
        params: {
          presentation: JSON.stringify(presentation),
        },
      },
      {
        // alwaysverified.action.js
        ipfsId: "QmUrgYBdJpDZFN9efrrwgwYziMCPhwihTgofVBMfYkMUgp",
        params: {},
      },
    ],
  },
});

const sig = signatures.sig1;
console.log(sig);
