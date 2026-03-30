const calculatePrices = (items) => {
  let subtotal = 0
  let bulkDiscount = 0

  items.forEach(item => {

    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    if (item.quantity > 3) {
      bulkDiscount += itemTotal * 0.05
    }
  })

let totalDiscount = bulkDiscount

  if (subtotal > 5000) {

    totalDiscount += subtotal * 0.1
  }

  const afterDiscount = subtotal - totalDiscount


  const shipping = afterDiscount > 3000 ? 0 : 200

  const total = afterDiscount + shipping

  return {
    subtotal,
    
    discount: totalDiscount,
    shipping,
    total,
  }
}

module.exports = { calculatePrices }