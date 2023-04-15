import * as LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

(async () => {
  const ipfsId = "";
  if (!ipfsId.length) {
    throw new Error("No IpfsId");
  }
  const client = new LitJsSdk.LitNodeClientNodeJs([]);
  await client.connect();
  //  lit.mintGrantBurnWithLitAction(ipfsId);
})();
