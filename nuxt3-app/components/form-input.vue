<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <div>
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" :for="id">{{ label }}</label>
    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" :id="id" :type="type" :placeholder="placeholder" :value="modelValue" @input="(e: any) => emit('update:modelValue', e.target.value)">
  </div>
</template>