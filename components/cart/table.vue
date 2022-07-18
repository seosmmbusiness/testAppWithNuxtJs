<template>
  <div class="w-full">
    <div v-for="(item, idx) in cart" :key="idx" class="my-1 border">
      <div class="grid grid-cols-1">
        <CartItem :product="item" />
      </div>
    </div>

    <div class="w-full flex px-2 py-2 justify-end items-center gap-2">
      <div class="text-xl font-bold">Итого:</div>

      <div class="text-xl group text-right">
        {{ total }} RUB
        <div class="text-xs font-light">{{ getCartFinalPrice }} USD</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getCartFinalPrice: 'getCartFinalPrice'
    }),
    total() {
      return (this.getCartFinalPrice * this.$store.state.dollar).toFixed(2)
    }
  }
}
</script>
