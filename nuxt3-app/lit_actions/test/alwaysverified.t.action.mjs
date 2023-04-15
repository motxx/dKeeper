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
    jsParams: {},
  });
  if (res.response.verified) {
    console.log("OK");
  } else {
    errorLog(res);
  }
} catch (e) {
  errorLog(e);
}
