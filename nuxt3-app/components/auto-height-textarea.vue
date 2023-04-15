<template>
  <textarea
    ref="textarea"
    :style="{ height: `${height}px` }"
    @input="adjustHeight"
    v-bind="$attrs"
    v-model="value"
  ></textarea>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['modelValue'],
  data() {
    return {
      height: 50,
      value: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.value = newValue;
    },
    value(newValue) {
      this.$emit('update:modelValue', newValue);
      this.adjustHeight();
    },
  },
  methods: {
    adjustHeight() {
      const el = this.$refs.textarea;
      el.style.height = 'auto';
      this.height = Math.max(el.scrollHeight, 50);
    },
  },
  mounted() {
    this.adjustHeight();
  },
};
</script>
