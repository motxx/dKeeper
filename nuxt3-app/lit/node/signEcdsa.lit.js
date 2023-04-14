const main = async () => {
  // this Lit Action simply requests an ECDSA signature share from the Lit Node
  // LitActions内で、TSSのECDSA署名を得ることができる
  const resp = await Lit.Actions.call({
    // ECDSA署名を得るコード
    ipfsId: "QmRwN9GKHvCn4Vk7biqtr6adjXMs7PzzYPCzNCRjPFiDjm",
    params: {
      // this is the string "Hello World" for testing
      toSign: [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100],
      publicKey:
        "0x02e5896d70c1bc4b4844458748fe0f936c7919d7968341e391fb6d82c258192e64",
      sigName: "childSig",
    },
  });

  console.log("results: ", resp);
  LitActions.setResponse({response: resp});
};

main();
