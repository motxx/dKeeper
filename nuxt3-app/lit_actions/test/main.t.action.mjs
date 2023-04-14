import {
  client,
  authSig,
  pkpPublicKey,
  getLitActionCode,
  errorLog,
} from "../utils.mjs";

const litActionCode = await getLitActionCode();

let res;

try {
  res = await client.executeJs({
    code: litActionCode,
    authSig,
    jsParams: {
      publicKey: pkpPublicKey,
      sigName: "main-action-sig",
      verifierActions: [
        {
          ipfsId: "QmWyfPMidMEWRiUNZUP6DjvPD7b1YnMtPsuh3x9wGSB2us",
          params: {},
        },
        {
          ipfsId: "QmPvewTbUeu74gCXMV4CqtFPhgRc1D7ZvsEjp5JZWsmKJW",
          params: {},
        },
      ],
    },
  });
  console.log(res);
} catch (e) {
  errorLog(e);
}
