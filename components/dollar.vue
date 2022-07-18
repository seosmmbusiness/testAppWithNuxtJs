<template>
  <div class="w-full">
    <label for="name">Цена Доллара:</label>
    <input
      id="name"
      v-model="dollar"
      type="number"
      name="name"
      min="0.01"
      max="200"
      class="border px-2 text-right"
      step="0.01"
    />
  </div>
</template>

<script>
export default {
  computed: {
    dollar: {
      get() {
        return this.$store.state.dollar
      },
      set(value) {
        this.$store.commit('setDollar', value)
      }
    }
  }
}
</script>
