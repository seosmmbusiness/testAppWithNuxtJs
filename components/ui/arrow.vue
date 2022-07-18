<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    focusable="false"
    :width="size"
    :height="size"
    :class="generateClass"
    class="transition-all ease-in-out transform fill-current"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        d="M4 15l8-8l8 8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <rect x="0" y="0" :width="size" :height="size" fill="rgba(0, 0, 0, 0)" />
  </svg>
</template>

<script>
// just a component from another project.
const degObject = {
  '-180': '-rotate-180',
  '-90': '-rotate-90',
  '-45': '-rotate-45',
  0: 'rotate-0',
  45: 'rotate-45',
  90: 'rotate-90',
  180: 'rotate-180'
}

export default {
  props: {
    rotate: {
      type: Boolean,
      required: false,
      default: false
    },
    deg: {
      validator: (val) => {
        return val && val in degObject ? val : '0'
      },
      required: false,
      default: 0
    },
    rotateDeg: {
      validator: (val) => {
        return val && val in degObject ? val : '90'
      },
      required: false,
      default: 90
    },
    size: {
      type: Number,
      required: false,
      default: 20
    },
    classes: {
      type: String,
      default: ''
    }
  },
  computed: {
    generateClass() {
      return this.$props.rotate
        ? degObject[`${this.$props.rotateDeg}`]
        : degObject[`${this.$props.deg}`]
    }
  }
}
</script>
