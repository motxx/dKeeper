<script setup lang="ts">
import { Holder } from "../usecase/holder";
import { Web3 } from "../web3/web3";

const name = ref("Taro");
const gender = ref("Female");
const country = ref("Japan");
const discloseOptions = ["Deny", "Allow"];

const holderDID = ref("");
const nameDisclosure = ref("Deny");
const genderDisclosure = ref("Deny");
const countryDisclosure = ref("Deny");

const credential = ref("");
const presentation = ref("");

const holder = new Holder();

const fetchCredential = async () => {
  const vc = await holder.fetchCredential(holderDID.value);
  if (!vc) {
    return;
  }
  credential.value = JSON.stringify(vc, null, 4);
  name.value = (vc as any).credentialSubject.givenName + " " + (vc as any).credentialSubject.familyName;
  gender.value = (vc as any).credentialSubject.gender;
  country.value = (vc as any).credentialSubject.birthCountry;
};

const createPresentation = async () => {
  const res = await holder.createPresentation(
    nameDisclosure.value === "Allow",
    genderDisclosure.value === "Allow",
    countryDisclosure.value === "Allow",
  );
  if (res) {
    presentation.value = JSON.stringify(res, null, 4);
  }
};

const execute = async () => {
  Web3.verifySignatureTest();
};

</script>

<template>
  <section class="flex items-center justify-center flex-col h-full max-w-screen-xl mx-auto">
    <div class="w-full px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Authorization
      </h1>
      <!-- Fetch VC -->
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Step1. Fetch Verifiable Credential
      </h2>
      <div class="w-full max-w-lg flex flex-col">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-did">
              DID
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-did" type="text" placeholder="Enter holder DID" v-model="holderDID">
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3 mb-6 md:mb-0">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="fetchCredential">
              Fetch
            </button>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6" v-if="credential">
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-decrypted-data">
              Fetched Data
            </label>
            <auto-height-textarea v-model="credential" id="grid-decrypted-data" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readonly />
          </div>
        </div>
      </div>
      <!-- Create VP -->
      <div v-if="credential">
        <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
          Step2. Create Verifiable Presentation
        </h2>

        <!-- VC ACL -->
        <div class="w-full max-w-lg flex flex-col">
          <span class="mb-8">1. Select columns allowed to disclose.</span>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                Name
              </label>
              <div class="flex">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" v-model="name" readonly>
                <div class="relative ml-2 w-40">
                  <select v-model="nameDisclosure" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country">
                    <option v-for="option in discloseOptions" :value="option" :key="option">{{ option }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.293 6.293a1 1 0 00-1.414-1.414L10 12.586 6.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                Gender
              </label>
              <div class="flex">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" v-model="gender" readonly>
                <div class="relative ml-2 w-40">
                  <select v-model="genderDisclosure" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country">
                    <option v-for="option in discloseOptions" :value="option" :key="option">{{ option }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.293 6.293a1 1 0 00-1.414-1.414L10 12.586 6.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-country">
                Country
              </label>
              <div class="flex">
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-username" type="text" v-model="country" readonly>
                <div class="relative ml-2 w-40">
                  <select v-model="countryDisclosure" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-country">
                    <option v-for="option in discloseOptions" :value="option" :key="option">{{ option }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.293 6.293a1 1 0 00-1.414-1.414L10 12.586 6.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l7-7z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Real-time ACL -->
          <div class="w-full max-w-lg flex flex-col">
            <span class="mb-8">2. Add real-time verification columns.</span>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-youtube-video-id">
                  YouTube Video Id
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-youtube-video-id" type="text" placeholder="Enter YouTube Video Id">
              </div>
            </div>
          </div>

          <!-- VP Button -->
          <div class="flex flex-wrap -mx-3 mb-6 mt-auto">
            <div class="w-full px-3">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="createPresentation">
                Create Presentation
              </button>
            </div>
          </div>

          <!-- Derived Proof -->
          <div class="flex flex-wrap -mx-3 mb-6" v-if="presentation">
            <div class="w-full px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-presentation">
                Presentation (Derived Proof)
              </label>
              <auto-height-textarea v-model="presentation" id="grid-presentation" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" readonly />
            </div>
          </div>

        </div>

        <!-- Execute -->
        <div v-if="presentation">
          <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
            Step3. Execute dApp
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
