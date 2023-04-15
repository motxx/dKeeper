import {
  client,
  authSig,
  pkpPublicKey,
  getLitActionCode,
  errorLog,
} from "../utils.mjs";

import presentation from "./data/proof.json" assert { type: "json" };
import jsonldStableStringify from "jsonld-stable-stringify";

const litActionCode = await getLitActionCode();

const result = await client.executeJs({
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
          presentation: jsonldStableStringify(presentation),
        },
      },
      {
        // youtubeviewcount.action.js
        ipfsId: "QmWU8ZUGaTp4LdstmXobZTL8TfuzpFgAojSADwYoxWKF1t",
        params: {
          videoId: "E35poTWzWZA",
          threshold: 10000,
        },
      },
      /*
      {
        // alwaysverified.action.js
        ipfsId: "QmUrgYBdJpDZFN9efrrwgwYziMCPhwihTgofVBMfYkMUgp",
        params: {},
      },
      */
    ],
  },
});

console.log(result);
const signatures = result.signatures;
console.log("signatures: ", signatures);
const sig = signatures.sig1;
const dataSigned = sig.dataSigned;
console.log({
  sig,
  dataSigned
});

