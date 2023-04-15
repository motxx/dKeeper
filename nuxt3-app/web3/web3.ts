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
    public signer: ethers.JsonRpcSigner
  ) {}

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
}
