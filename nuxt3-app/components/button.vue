<template>
  <button :class="classes" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  computed: {
    classes() {
      return [
        'text-white',
        'font-bold',
        'py-2',
        'px-4',
        'rounded',
        'focus:outline-none',
        'focus:shadow-outline',
        'hover:bg-gray-700',
        this.class,
      ]
        .filter(Boolean)
        .join(' ')
    },
  },
}
</script>
