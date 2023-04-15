import { Airdrop__factory } from "typechain";
import { BbsBlsSignature } from "../zk/bbs-bls-signature";
import { Web3 } from "../web3/web3";
import { Lit } from "lit/lit";

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
    videoId: string,
  ) => {
    if (!this.credential) {
      return null;
    }
    const bbsBls = await BbsBlsSignature.connect();
    const proof = await bbsBls.deriveProof(
      this.credential,
      nameDisclosure,
      genderDisclosure,
      countryDisclosure,
    );
    console.log(proof);
    this.presentation = proof;

    const lit = await Lit.connect();
    const sig = await lit.authorization(proof, videoId);
    console.log("Authorization result:\n", sig);
    this.signature = sig.signature;

    return this.signature;
  };

  claim = async () => {
    if (!this.signature) {
      alert("Signature not created yet.\nCreate presentation first");
      return;
    }
    const web3 = await Web3.connectWallet();
    const signer = await web3.signer;
    const addr = await web3.getAddress();
    const airdrop = Airdrop__factory.connect(Holder.contract, signer);
    airdrop.claim({
      payee: addr,
      conditions: {
        ipfsIds: [
          "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
          "QmWU8ZUGaTp4LdstmXobZTL8TfuzpFgAojSADwYoxWKF1t",
        ],
      },
      signature: {
        signer: "0x199BD7856801338571d1323503A16aE1b4d52d60",
        signature: this.signature!,
      }
    })
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
