<script setup lang="ts">
import inputDocument from "~/zk/data/inputDocument.json";
import { Issuer } from '../usecase/issuer';

const genders = ["Female", "Male", "Others"];
const countries = ["USA", "Canada", "Mexico", "Australia", "New Zealand", "United Kingdom", "France", "Germany", "Spain", "Italy", "Japan", "China", "India", "Brazil", "Argentina"];

const holderDid = ref("");
const givenName = ref("");
const familyName = ref("");
const gender = ref("");
const birthDate = ref("");
const country = ref("");

const createCredentialSubject = () => {
  return {
    credentialSubject: {
      id: `did:${holderDid.value}`,
      type: ['PermanentResident', 'Person'],
      givenName: givenName.value,
      familyName: familyName.value,
      gender: gender.value,
      "image": "data:image/png;base64,iVBORw0KGgokJggg==",
      "residentSince": "2015-01-01",
      "lprCategory": "C09",
      "lprNumber": "999-999-999",
      "commuterClassification": "C1",
      "birthCountry": country.value,
      birthDate: birthDate.value,
    }
  }
};

const issueCredential = async () => {
  if (holderDid.value === "" || givenName.value === "" || familyName.value === "" || gender.value === "" || birthDate.value === "" || country.value === "") {
  console.log(`Holder DID: ${holderDid.value}`);
  console.log(`Given Name: ${givenName.value}`);
  console.log(`Family Name: ${familyName.value}`);
  console.log(`Gender: ${gender.value}`);
  console.log(`Birth Date: ${birthDate.value}`);
  console.log(`Country: ${country.value}`);
  return;
}
  console.log("ok");
  const doc = {
    ...inputDocument,
    ...createCredentialSubject()
  };
  await new Issuer().issueCredential(doc);
};

</script>

<template>
  <section class="flex items-center justify-center flex-col h-full max-w-screen-xl mx-auto">
    <div class="w-full px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Issuer
      </h1>
      <h2 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 md:mb-8 tracking-tight">
        Create Verifiable Credential
      </h2>
      <div class="w-full max-w-lg">
        <div class="grid grid-cols-1 gap-6">
          <div>
            <form-input label="DID" placeholder="Enter holder DID" v-model="holderDid" id="grid-did" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <form-input  label="Given Name" placeholder="Enter given name" v-model="givenName" id="grid-given-name" />
            </div>
            <div>
              <form-input label="Family Name" placeholder="Enter family name" v-model="familyName" id="grid-family-name" />
            </div>
          </div>
          <div>
            <form-input label="Birth Date" id="grid-birth-date" type="date" placeholder="Enter your birth date" v-model="birthDate" />
          </div>
          <div>
            <form-select id="grid-birth-country" label="Country" :options="countries" v-model="country" defaultOption=""/>
          </div>
          <div>
            <form-select id="grid-birth-gender" label="Gender" :options="genders" v-model="gender" defaultOption=""/>
          </div>
          <div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="issueCredential">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>