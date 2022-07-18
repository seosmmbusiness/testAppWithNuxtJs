import data from '~/static/data.json'
import names from '~/static/names.json'
import Product from '~/models'

function getIndexOfItemIfExists(array, id) {
  return array.findIndex((obj) => obj.id === id)
}

export const state = () => {
  return {
    products: [],
    dollar: 60,
  }
}

export const mutations = {
  setDollar(state, payload) {
    let value

    // if got empty - make default
    if (payload === '') {
      payload = 60
    }

    value = Number(payload)
    if (value < 0.01) value = 0.01
    if (value > 200) value = 200
    state.dollar = value
  },

  setProducts(state, [payload, name]) {
    payload.forEach((element) => {
      // create a virtual product.
      const updatedProduct = new Product(
        element.T,
        element.G,
        element.C,
        element.P,
        name[element.G].B[element.T].N,
        name[element.G].G
      )

      // check if product with same ID exists
      const productExistsIndex = getIndexOfItemIfExists(
        state.products,
        updatedProduct.id
      )

      // if product doesn't exists push new, else update existed for possible price change
      if (productExistsIndex === -1) {
        // make 0 in cart
        updatedProduct.quantityInCart = 0
        // push product to product array
        state.products.push(updatedProduct)
      } else {
        // find an existed product and update with new data
        state.products[productExistsIndex] = Object.assign(
          state.products[productExistsIndex],
          updatedProduct
        )
      }
    })
  },

  update(state, payload) {
    const productIndex = getIndexOfItemIfExists(
      state.products,
      payload.product.id
    )
    const product = state.products[productIndex]

    // if got empty - make default
    if (payload.value === '') {
      payload.value = product.quantityInCart
    }

    const value = Number(payload.value)

    if (value > product.total) {
      alert(`Максимальное количество: ${product.total}`)
      product.quantityInCart = product.total
    } else if (value === 0) {
      confirm('Удалить с корзины?')
        ? (product.quantityInCart = 0)
        : (product.quantityInCart = 1)
    } else if (value < 0) {
      product.quantityInCart = 0
    } else {
      product.quantityInCart = value
    }
  },
}

export const actions = {
  // Added to Actions cause it possibly can be async operation. Same for cart.
  async loadData({ commit }) {
    let tempData = {}
    let tempNames = {}

    // to emulate async request for future
    try {
      tempData = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data)
        }, 100)
      })
      tempNames = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(names)
        }, 100)
      })
    } catch (err) {
      //   console.warn(err)
    }

    commit('setProducts', [tempData.Value.Goods, tempNames])
  },
}

export const getters = {
  // Sort Products by Groups and Get Group Name
  getGroupIdAndName(state) {
    const res = {}
    state.products.forEach((el) => {
      res[el.group] = el.groupName
    })
    return res
  },

  // Get all products using cached getter
  getCartFinalPrice(state, getters) {
    return +getters.getProductsInCart
      .reduce((acc, item) => acc + +item.price * +item.quantityInCart, 0)
      .toFixed(2)
  },

  // Get products in cart
  getProductsInCart(state) {
    return state.products.filter((item) => item.quantityInCart > 0)
  },

  // Get Prdoducts by group
  getProductsByGroup: (state) => (groupId) => {
    return state.products.filter((item) => item.group === groupId)
  },
}
