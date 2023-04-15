import { client, authSig, getLitActionCode, errorLog } from "../utils.mjs";

import presentation from "./data/proof.json" assert { type: "json" };

const litActionCode = await getLitActionCode();
console.log(litActionCode);

try {
  const r = await client.executeJs({
    code: litActionCode,
    authSig,
    jsParams: {
      presentation: JSON.stringify(presentation),
    },
  });

  console.log("----------------------------------------");
  console.log(r);

  const { data, verified } = r.response;
  console.log("data:", JSON.parse(data));
  console.log("verified:", verified);

  if (verified) {
    console.log("OK");
  } else {
    errorLog(r);
  }
} catch (e) {
  errorLog(e);
}
