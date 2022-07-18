<template>
  <div class="item">
    <div class="title" @click="decrement(product)">
      {{ product.title }} ({{ product.total }})
    </div>
    <div class="price" :class="css" @click="increment(product)">
      {{ price }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      css: 'bg-transparent'
    }
  },
  computed: {
    price() {
      return (this.product.price * this.$store.state.dollar).toFixed(2)
    }
  },
  watch: {
    // Check for price updates
    price(newPrice, oldPrice) {
      // could make here switch case, but if works few times faster https://jsfiddle.net/some/HKdug/
      if (+newPrice < +oldPrice) {
        this.css = 'bg-green-300'
        setTimeout(() => {
          this.css = 'bg-green-100'
        }, 400)
      } else if (+newPrice > +oldPrice) {
        this.css = 'bg-red-300'
        setTimeout(() => {
          this.css = 'bg-red-100'
        }, 400)
      } else {
        this.css = 'bg-transparent'
      }
    }
  },
  methods: {
    ...mapMutations(['update']),
    increment(product) {
      this.update({ product, value: product.quantityInCart + 1 })
    },
    decrement(product) {
      this.update({ product, value: product.quantityInCart - 1 })
    }
  }
}
</script>

<style lang="postcss">
.item {
  @apply w-full flex flex-nowrap justify-center items-center border;
  & .title {
    @apply flex h-full transition flex-grow items-center cursor-pointer px-1 py-1 hover:bg-red-100 hover:bg-opacity-50;
  }
  & .price {
    @apply w-28 flex flex-shrink-0 h-full transition justify-center items-center bg-gray-100 cursor-pointer  hover:bg-green-100 hover:bg-opacity-50;
  }
}
</style>
