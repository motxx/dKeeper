<script setup lang="ts">
import { Holder } from "../usecase/holder";

const zkAlgorithms = ["JSON-LD ZKP with BBS+", "ZK-SNARKs"];

const fetchedCredential = ref("");

const fields = ref([{ sbtAddress: '' }])

const addField = () => {
  fields.value.push({ sbtAddress: '' })
}

const removeField = () => {
  if (fields.value.length > 1) {
    fields.value.pop()
  }
}

const fetchCredential = async () => {
  const res = await new Holder().fetchCredential();
  fetchedCredential.value = res;
}

const createPresentation = async () => {
  console.log("present");
}
</script>

<template>
  <section class="flex items-center justify-center flex-col h-full max-w-screen-xl mx-auto">
    <div class="w-full px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Holder
      </h1>
      <!-- Fetch VC -->
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Fetch Verifiable Credential
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
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="fetchCredential">
              Fetch
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6" v-if="fetchedCredential">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-decrypted-data">
              Fetched Data
            </label>
            <textarea v-model="fetchedCredential" id="grid-decrypted-data" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readonly></textarea>
          </div>
        </div>
      </div>
      <!-- Create VP -->
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Create Verifiable Presentation
      </h2>
      <div class="w-full max-w-lg flex flex-col">
        <div v-for="(field, index) in fields" :key="index" class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mbg-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" :for="'grid-sbt-' + index">
              SBT Address
            </label>
            <input v-model="field.sbtAddress" :id="'grid-sbt-' + index" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Enter SBT address">
          </div>
        </div>
        <div class="w-full max-w-lg flex justify-between mb-6">
          <div class="btn-group">
            <button class="btn btn-primary" type="button" @click="addField" title="Add another SBT address">
              <i class="fas fa-plus"></i>
            </button>
            <button class="btn btn-danger" type="button" @click="removeField" :disabled="fields.length === 1" title="Remove the last SBT address">
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-country">
              ZK algorithm
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country">
                <option value="">Select a ZK algorithm</option>
                <option v-for="algorithm in zkAlgorithms" :value="algorithm" :key="algorithm">{{ algorithm }}</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.293 6.293a1 1 0 00-1.414-1.414L10 12.586 6.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6 mt-auto">
          <div class="w-full px-3">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createPresentation">
              Create Presentation
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