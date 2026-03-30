
const CheckoutItems = ({ items, cartItems, updatingId, updateQuantity, removeItem }) => {
 return (
  <>
   <div className="hidden lg:block overflow-x-auto border rounded-xl shadow-sm">
    <table className="w-full text-left">
     <thead className="bg-gray-100 sticky top-0 z-10">
      <tr>
       
       <th className="px-4 py-3 text-sm font-semibold">Product</th>
       <th className="px-4 py-3 text-sm font-semibold">Price</th>

       <th className="px-4 py-3 text-sm font-semibold">Quantity</th>
       <th className="px-4 py-3 text-sm font-semibold">Subtotal</th>
       <th className="px-4 py-3 text-sm font-semibold">Remove</th>
      </tr>
     </thead>
     <tbody>
      {items.map(item => {
      
      const cartItem = cartItems.find(i => i.product._id === item.product)
 if (!cartItem) return null

       return (
        <tr key={item.product} className="border-b hover:bg-gray-50 transition">

         <td className="px-4 py-3 flex items-center gap-4">
          <img src={cartItem?.product.image} alt={item.name} className="w-16 h-16 rounded object-cover shadow-sm" />
          <span className="font-medium">{item.name}</span>
         </td>
         <td className="px-4 py-3">Rs. {item.price}</td>
         <td className="px-4 py-3">
          <div className="flex items-center border rounded-lg w-fit">

           <button disabled={updatingId === item.product}
            onClick={() => updateQuantity(item.product, cartItem.quantity - 1, cartItem.product.stock)} className="px-3 py-1 text-lg hover:bg-gray-100 disabled:opacity-40">-</button>
           <span className="px-4">{cartItem.quantity}</span>
    <button disabled={updatingId === item.product} 
    
    onClick={() => updateQuantity(item.product, cartItem.quantity + 1, cartItem.product.stock)} 
    
    className="px-3 py-1 text-lg   hover:bg-gray-100 disabled:opacity-40">+</button>
          </div>
         </td>
  <td className="px-4 py-3 font-semibold">Rs. {(item.price * item.quantity).toFixed(2)}</td>
         <td className="px-4   py-3">


          <button disabled={updatingId === item.product} 
          
          onClick={() => removeItem(item.product)} className="text-red-500 hover:underline disabled:opacity-40">Remove</button>
         </td>
     </tr>
       )
      })}
     </tbody>
    </table>
   </div>

   <div className="lg:hidden flex flex-col gap-4">
    {items.map(item => {
     const cartItem = cartItems.find(i => i.product._id === item.product)
     
     if (!cartItem) return null
     return (
      <div key={item.product} className="border rounded-2xl p-4 shadow-sm">
       <div className="flex gap-4">
        <img src={cartItem?.product.image} alt={item.name} className="w-20 h-20 rounded 
        object-cover" />
        <div className="flex-1">
         <h2 className="font-semibold">{item.name}</h2>

         <p className="text-sm text-gray-500">Rs. {item.price}</p>
    <p className="text-sm font-medium mt-1">Rs. {(item.price * item.quantity).toFixed(2)}</p>
        </div>
       </div>

       <div className="flex justify-between items-center mt-4">
<div className="flex items-center border rounded-lg">
         <button disabled={updatingId === item.product}
         
         onClick={() => updateQuantity(item.product, cartItem.quantity - 1, cartItem.product.stock)} className="px-3     py-1 text-lg hover:bg-gray-100 disabled:opacity-40">-</button>
         <span className="px-4">{cartItem.quantity}</span>


         <button disabled={updatingId === item.product} 
onClick={() => updateQuantity(item.product, cartItem.quantity + 1, cartItem.product.stock)} className="px-3 py-1 text-lg hover:bg-gray-100 disabled:opacity-40">+</button>
        </div>
        <button
         disabled={updatingId === item.product} 
         onClick={() => removeItem(item.product)} 
         
    className="text-red-500 text-sm hover:underline    disabled:opacity-40">Remove</button>
       </div>
      </div>
     )
    })}
   </div>
  </>
 )
}

export default CheckoutItems