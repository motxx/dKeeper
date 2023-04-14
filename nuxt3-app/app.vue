<script setup lang="ts">
import { Lit } from "@/lit/lit";

let lit: Lit;
const tweet = ref("");

onMounted(async () => {
  window.global = window;
});

const signForSetContribution = async () => {
  const pkpPubkey =
    "0x0429019952f9c02b86ee4312b1f8f208c338e4b9485bdc2421e653ba4f8ac8b459dce76c13b0434b6b782fcb216f83f867b8819c44761e4dce381cb765db07f1e2";
  const member = "0x383c5aE80F96E5147F735FE354Bb8803eC30F97c";
  return await lit.setContribution(pkpPubkey, member, tweet.value);
};

const walletAddress = ref("");

const connectWallet = async () => {
  if (window.ethereum) {
    lit = await Lit.connect();
    walletAddress.value = "0x2f0C01465D38Fc4A31c95B7e74a4c80BE6d87bBe";
    const result = await signForSetContribution();
    console.log(result);
  } else {
    console.log("Metamask is not installed.");
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <app-header :connectWallet="connectWallet" :walletAddress="walletAddress" />
    <app-main />
  </div>
</template>

<style scoped>
body {
}
</style>
