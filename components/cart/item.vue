<template>
  <div class="item-cart">
    <div class="title">{{ product.title }}</div>
    <div class="prices">
      <div class="w-28">{{ price }} / шт</div>
      <div class="flex flex-col w-28">
        <div class="flex flex-nowrap gap-1">
          <input
            id="quantity"
            v-model="quantity"
            type="number"
            name="quantity"
            min="1"
            class="border text-right px-1 w-20"
            :max="product.total"
            step="1"
          />
          <label for="quantity"> шт</label>
        </div>
        <div v-if="product.total <= 2" class="limited">
          Количество ограничено
        </div>
      </div>

      <div class="w-32">
        {{ (price * product.quantityInCart).toFixed(2) }}
      </div>
    </div>

    <div @click="update({ product, value: 0 })">
      <UiMoveToTrash class="trash-btn" />
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
  computed: {
    price() {
      return (this.product.price * this.$store.state.dollar).toFixed(2)
    },

    quantity: {
      get() {
        return this.product.quantityInCart
      },
      set(value) {
        this.$store.commit('update', { product: this.product, value })
      }
    }
  },
  methods: {
    ...mapMutations(['update'])
  }
}
</script>

<style lang="postcss">
.item-cart {
  @apply py-2 px-2 flex justify-center items-center;
  & .title {
    @apply flex-grow w-full px-2;
  }
  & .prices {
    @apply flex flex-col gap-2 items-center text-right flex-nowrap xl:flex-row;
  }
  & .limited {
    @apply border text-xs w-28 border-red-300 border-dashed justify-center items-center text-center py-1 px-2 my-1;
  }
  & .trash-btn {
    @apply block mx-2 w-8 h-8 cursor-pointer text-black hover:text-red-500;
  }
}
</style>
