<template>
  <section class="w-full">
    <ProductTable
      v-for="(groupName, groupId, idx) in getGroupIdAndName"
      :key="idx"
      :group-id="+groupId"
      :group-name="groupName"
      :open="idx === 0 ? true : false"
      class="table"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getGroupIdAndName: 'getGroupIdAndName'
    })
  }
}
</script>

<style lang="postcss">
.table {
  @apply w-full my-2;
}
</style>
