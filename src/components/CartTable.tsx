import { CartItem } from "@/pages/api/cart"

function buildCart(cartItems: CartItem[]){
  let total = 0.0
  const items = [];
  for(const cartItem of cartItems){
    const itemTotal = cartItem.product.price * cartItem.quantity;
    total += itemTotal;
    items.push({...cartItem, total: itemTotal})
  }

  return { items, total }
}

function CartTable({cartItems} : any){
  const cart = buildCart(cartItems)
  return(
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((cartItem: CartItem) => (
            <tr key={cartItem.id}>
              <td className="px-4 py-2">{cartItem.product.title}</td>
              <td className="px-4 py-2 text-right">{cartItem.product.price}</td>
              <td className="px-4 py-2 text-right">{cartItem.quantity}</td>
              <td className="px-4 py-2 text-right">{cartItem.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CartTable