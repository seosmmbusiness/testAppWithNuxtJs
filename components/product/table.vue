<template>
  <div>
    <div class="header group" @click="handleClick()">
      <UiArrow
        :rotate="show"
        :deg="90"
        :rotate-deg="180"
        :size="18"
        class="mx-2 group-hover:text-red-500"
      />
      <div class="group-hover:text-red-500">{{ groupName }}</div>
    </div>
    <div v-if="show" class="data">
      <ProductItem
        v-for="(item, index) in products"
        :key="index"
        :product="item"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groupName: {
      type: String,
      required: true
    },
    groupId: {
      type: Number,
      required: true
    },
    open: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    products() {
      return this.$store.getters.getProductsByGroup(this.$props.groupId)
    }
  },

  mounted() {
    // check for default open status
    this.show = this.$props.open
  },

  methods: {
    handleClick() {
      this.show = !this.show
    }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  @apply flex items-center w-full bg-gray-300 text-xl font-bold px-2 py-2 cursor-pointer;
}
.data {
  @apply grid grid-cols-1 xl:grid-cols-2;
}
</style>
