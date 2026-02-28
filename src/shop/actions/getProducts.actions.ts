import { tesloApi } from "@/api/tesloApi";
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const getProductsAction = async (
  option: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, query } = option;

  const { data } = await tesloApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q: query,
    },
  });

  const products = data.products.map((product) => ({
    ...product,
    images: product.images.map((img) => `${BASE_URL}/files/product/${img}`),
  }));
  return {
    ...data,
    products,
  };
};
