import { client, authSig, getLitActionCode, errorLog } from "../utils.mjs";

const litActionCode = await getLitActionCode();
console.log(litActionCode);

try {
  const r = await client.executeJs({
    code: litActionCode,
    authSig,
    jsParams: {
      videoId: "E35poTWzWZA",
      threshold: 10000,
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
