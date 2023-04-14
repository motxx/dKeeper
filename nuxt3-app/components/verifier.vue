<script setup lang="ts">
import { Verifier } from "../usecase/verifier";

const presentation = ref("");

const createPresentation = async () => {
  presentation.value = await new Verifier().createPresentation();
};

const execute = async () => {
  console.log("execute");
};

</script>

<template>
  <section class="flex items-center justify-center flex-col h-full max-w-screen-xl mx-auto">
    <div class="w-full px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Verifier - Airdrop dApp
      </h1>
      <!-- Create VP -->
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Create Verifiable Presentation
      </h2>
      <div class="w-full max-w-lg flex flex-col">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-did">
              DID
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-did" type="text" placeholder="Enter holder DID">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6 mt-auto">
          <div class="w-full px-3">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createPresentation">
              Create Presentation
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6" v-if="presentation">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-presentation-data">
              Presentation Data
            </label>
            <textarea v-model="presentation" id="grid-presentation-data" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readonly></textarea>
          </div>
        </div>
      </div>
      <!-- Execute -->
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Execute dApp
      </h2>
      <div class="w-full max-w-lg flex flex-col">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contract">
              Contract Address
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-contract" type="text" placeholder="Enter contract address">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6 mt-auto">
          <div class="w-full px-3">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="execute">
              Execute
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  border: none;
}

.btn:hover {
  filter: brightness(90%);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
}

.fa-plus,
.fa-minus {
  font-size: 1rem;
}

.fa-plus:before {
  content: '\f067';
}

.fa-minus:before {
  content: '\f068';
}
</style>
