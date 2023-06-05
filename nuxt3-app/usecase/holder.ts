//import { Airdrop__factory } from "../typechain";
import { BbsBlsSignature } from "../zk/bbs-bls-signature";
import { Web3 } from "../web3/web3";
import { Lit } from "../lit/lit";
import { InterfaceAbi, ethers } from "ethers";
import ABI from "./Airdrop.json";

export class Holder {
  static contract = "0xA0e8Fe42bBD490858e4Ff7d5967a7ED477e3a59E";

  credential: object | null = null;
  presentation: object | null = null;
  signature: string | null = null;

  fetchCredential = async (did: string) => {
    this.credential = await this.load(did);
    return this.credential;
  };

  createPresentation = async (
    nameDisclosure: boolean,
    genderDisclosure: boolean,
    countryDisclosure: boolean,
    videoId: string
  ) => {
    if (!this.credential) {
      return null;
    }
    const bbsBls = await BbsBlsSignature.connect();
    const proof = await bbsBls.deriveProof(
      this.credential,
      nameDisclosure,
      genderDisclosure,
      countryDisclosure
    );
    console.log(proof);
    this.presentation = proof;

    const lit = await Lit.connect();
    const sig = await lit.authorization(proof, videoId).catch((e) => {
      //
    });
    //console.log("Authorization result:\n", sig);
    try {
      this.signature = sig.signature;
    } catch (e) {}

    return this.presentation; //this.signature ?? "";
  };

  claim = async () => {
    /*
    if (!this.signature) {
      alert("Signature not created yet.\nCreate presentation first");
      return;
    }
    */
    const web3 = await Web3.connectWallet();
    const signer = await web3.signer;
    const addr = "0x383c5aE80F96E5147F735FE354Bb8803eC30F97c";
    const airdrop = new ethers.Contract(
      Holder.contract,
      ABI.abi as InterfaceAbi,
      signer
    );
    await airdrop.claim([
      addr,
      {
        ipfsIds: [
          "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
          "QmWU8ZUGaTp4LdstmXobZTL8TfuzpFgAojSADwYoxWKF1t",
        ],
      },
      {
        signer:
          "0x041463c0d75c9d1a254a0750228079eb7129fce053eb3ebe663896006cbad8c8321aaf5470c54b2eb43a3452616fb733ead681ca42bf96d01d4b0da30940894beb",
        signature:
          "0xe0299d560856b8c011fa602b182b10a53ab9638a5a355f059e3bc86880d3ced825043806b34b620803c2e99300e7d43f9bfb1090cb24e96315b286b0cd5dd3541c",
      },
    ]);
  };

  load = async (did: string) => {
    const key = `signedDocument-${did}`;
    const serializedValue = window.localStorage.getItem(key);
    if (serializedValue) {
      return JSON.parse(serializedValue);
    }
    return null;
  };
}
