import { ethers } from "ethers";
declare global {
  interface Window {
    ethereum?: any;
  }
}
/**
 * Web3 client connecting to MetaMask's infra nodes.
 */
export class Web3 {
  private constructor(
    public provider: ethers.BrowserProvider,
    public signer: ethers.JsonRpcSigner,
  ) {
  }

  /**
   * Factory to create a client connected to the web3.
   * @returns A client instance connected to the web3.
   */
  public static async connectWallet(): Promise<Web3> {
    if (!window.ethereum) {
      throw new Error("Metamask not installed");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Web3(provider, signer);
  }

  /**
   * Gets the wallet address.
   * @returns A promise for the wallet address.
   */
  public async getAddress() {
    return await this.signer.getAddress();
  }

  public static test() {
    const abiCorder = new ethers.AbiCoder();
//    const res = abiCorder.encode(["uint256", "uint256"], [1, 2]);
    const res = abiCorder.decode(
      ["address","uint256"],
      "0x000000000000000000000000383c5ae80f96e5147f735fe354bb8803ec30f97c0000000000000000000000000000000000000000000000000000000000000001",
    );
    console.log(res);
  }
}
