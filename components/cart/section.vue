<template>
  <section class="w-full">
    <div class="text-2xl font-bold">Корзина</div>
    <div v-if="cart.length === 0">Корзина пуста</div>
    <div v-else><CartTable :cart="cart" /></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      cart: 'getProductsInCart'
    })
  }
}
</script>

<style lang="postcss">
.table {
  @apply w-full my-2;
}
</style>
