export default class Product {
  constructor(id, group, price, total, title, groupName) {
    this.id = id
    this.group = group
    this.groupName = groupName
    this.title = title
    this.price = price
    this.total = total
  }
}
