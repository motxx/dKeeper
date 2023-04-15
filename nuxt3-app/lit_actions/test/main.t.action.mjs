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
        ipfsId: "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
        params: {
          presentation: JSON.stringify(presentation),
        },
      },
      /*
      {
        ipfsId: "QmPvewTbUeu74gCXMV4CqtFPhgRc1D7ZvsEjp5JZWsmKJW",
        params: {},
      },
      */
    ],
  },
});

const sig = signatures.sig1;
console.log(sig);
