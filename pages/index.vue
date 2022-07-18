<template>
  <div>
    <div
      class="flex flex-col items-center justify-center w-full max-w-5xl px-2 py-4 m-auto"
    >
      <Dollar />
      <ProductSection />
      <hr />
      <CartSection />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    // Load data
    this.loadData()

    // Reload data && random dollar
    setInterval(() => {
      // Generate random float number between 20 and 80 and make it be
      const randomDollar = (Math.random() * (80 - 20) + 20).toFixed(2)
      // Update data
      this.loadData()
      // Update Dollar
      this.$store.commit('setDollar', randomDollar)
    }, 15000)
  },

  methods: {
    ...mapActions(['loadData'])
  }
}
</script>
