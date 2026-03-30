import Button from '../ui/Button'

const OrderSummary = ({subtotal,shipping,total,discount,onCheckoutClick,disabled,checkoutPage = false,loadingButton = false}) => (
  <div className={`border 
  rounded-xl  p-6   shadow-lg bg-white  w-full ${checkoutPage ? '' : 'lg:w-1/3'}`}>
    <h2 className="text-xl font-bold 
    mb-4">Order Summary</h2>


    <div className="flex justify-between mb-2">
      <span>Subtotal</span>

<span>Rs. {subtotal.toFixed(2)}</span>
    </div>

 <div className="flex justify-between mb-2 text-green-600">
      <span>{checkoutPage ? 'Discount (Bulk + Offer)' : 'Estimated Discount'}</span>
       <span>- Rs. {discount.toFixed(2)}</span>
    </div>

    <div className="flex justify-between mb-2">
      <span>{checkoutPage ? 'Shipping' : 'Estimated Shipping'}</span>

      <span className={shipping === 0 ?  'text-green-600' : ''}>
        {shipping === 0 ? 'Free' : `Rs. ${shipping}`}

      </span>
    </div>

    <div className="flex justify-between   font-bold text-lg mb-4">
      <span>Total</span>
 <span>Rs. {total.toFixed(2)}</span>
    </div>
<p className="text-sm text-green-600   mb-2">You saved Rs. {discount.toFixed(2)}</p>

    <p className="text-xs text-gray-500 mb-4">Free shipping on orders above Rs. 3000</p>


    <Button
      onClick={onCheckoutClick}

      loading={loadingButton}

      disabled={disabled}
      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white py-3 rounded-xl"
    >
        
          {checkoutPage ? 'Place Order (Cash on Delivery)' : 'Proceed to Checkout'}
    </Button>
  </div>
)

export default OrderSummary