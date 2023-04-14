<script setup lang="ts">
const props = defineProps<{
  connectWallet: () => {},
  walletAddress: string,
}>();
const walletAddressShort = computed(() => {
  if (!props.walletAddress) {
    return null
  }
  return `${props.walletAddress.slice(0, 6)}...${props.walletAddress.slice(-4)}`
})
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
  <header class="flex justify-between items-center p-6 bg-gradient-to-b from-gray-800 to-gray-600 text-white relative">
    <div class="flex items-center">
      <button class="mr-8">
        <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18"></path>
        </svg>
      </button>
      <h1 class="text-2xl font-bold mr-4 text-white">Web3 Verifiable Credentials</h1>
      <h2 class="text-xs text-gray-400 mt-1">powered by LitProtocol</h2>
    </div>
    <button class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md absolute top-6 right-6 z-10" @click="connectWallet">
      <template v-if="!walletAddress.length">
        Connect Wallet
      </template>
      <template v-else>
        {{ walletAddressShort }}
      </template>
    </button>
    <div class="absolute inset-0 bg-gray-800 opacity-50 rounded-lg z-0"></div>
  </header>
</template>