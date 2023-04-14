const abiCorder = new ethers.utils.AbiCoder();

async function getContribution() {
  const url =
    "https:/" +
    `/e88nrugq1m.execute-api.ap-northeast-1.amazonaws.com/chatgpt?input=${encodedUserInput}`;
  const resp = await fetch(url);
  const contribution = +(await resp.json());
  console.log("contribution", contribution);
  return contribution >= 50 ? 1 : 0;
}

const createEncodedMessage = (member, contribution) => {
  const typestr =
    "SetContributionArg(address contributor,uint256 contribution)";
  const typehash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(typestr));
  const encoded = abiCorder.encode(
    ["bytes32", "address", "uint256"],
    [typehash, member, contribution]
  );
  //  const u8 = ethers.utils.arrayify(encoded);
  //  console.log("u8", u8);
  //  console.log("encoded", encoded);
  return encoded;
};

async function getIpInfo() {
  const headers = new Headers();
  headers.append("User-Agent", "curl/7.72.0");
  const ipURL = "https:/" + "/ipinfo.io";
  const r = await fetch(ipURL, {
    headers,
  });
  return await r.json();
}

const main = async () => {
  const contribution = 10; //await getContribution();
  // console.log("contribution =>", contribution);
  if (contribution === undefined || contribution === null) {
    throw new Error("no contribution");
  }
  const toSign = createEncodedMessage(member, contribution);
  const resp = await Lit.Actions.call({
    // ECDSA署名を得るコード
    ipfsId: "QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm",
    params: {
      toSign,
      publicKey: pkpPubkey,
      sigName,
    },
  });

  const ipInfo = await getIpInfo();

  LitActions.setResponse({
    response: JSON.stringify({
      ipInfo,
      contribution: contribution,
    }),
  });
};

main();
