<script setup lang="ts">
import { Lit } from "@/lit/lit";

const tweet = ref("");

onMounted(async () => {
  window.global = window;
});

const walletAddress = ref("");

const connectWallet = async () => {
  if (window.ethereum) {
    const lit = await Lit.connect();
    (window as any).lit = lit;
    walletAddress.value = "0x2f0C01465D38Fc4A31c95B7e74a4c80BE6d87bBe";
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
