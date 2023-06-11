import { ProductProps } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

function ProductCard(product: ProductProps) {
  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
          <Image src={product.picture.url} alt=""
            width={320} height={240}
          />
          <div className="p-2 flex justify-between items-baseline">
            <h2 className="text-lg font-bold">
              {product.title}
            </h2>
            <span>
              {product.price}
            </span>
          </div>
      </Link>
    </div>
  );
}

export default ProductCard
