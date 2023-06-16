import CartTable from "@/components/CartTable";
import Page from "@/components/Page";
import { fetchjson } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

function Cart (){
  const query = useQuery({queryKey: ['cartItems'], queryFn: async () => {
    try {
      return await fetchjson("/api/cart");
    } catch (err) {
      return undefined;
    }
  }})
  const cartItems = query.data;
  console.log(cartItems)
  return(
    <Page title="Cart">
      {cartItems && <CartTable cartItems={cartItems}/>}
    </Page>
  )
}

export default Cart

