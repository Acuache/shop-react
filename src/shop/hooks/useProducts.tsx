import { useQuery } from "@tanstack/react-query"
import { getProductsAction } from "../actions/getProducts.actions"
import { useLocation, useParams, useSearchParams } from "react-router"

export const useProducts = () => {
  const { pathname } = useLocation()
  // TODO: viene lógica
  const [searchParams] = useSearchParams()
  const { gender } = useParams()

  let limit = Number(searchParams.get('limit') ?? '9')
  if (pathname.includes('/admin/products')) limit = 6

  const page = Number(searchParams.get('page') ?? '1')
  const offset = (page - 1) * limit
  const sizes = searchParams.get('sizes')?.slice(1) ?? ''

  const price = searchParams.get('price') ?? 'any'

  let minPrice = undefined
  let maxPrice = undefined

  const query = searchParams.get('q') ?? undefined

  switch (price) {
    case 'any':
      break
    case '0-50':
      minPrice = 0
      maxPrice = 50
      break
    case '50-100':
      minPrice = 50
      maxPrice = 100
      break
    case '100-200':
      minPrice = 100
      maxPrice = 200
      break
    case '200+':
      minPrice = 200
      maxPrice = undefined
      break
  }

  return useQuery({
    queryKey: ['products', { limit, page, sizes, gender, minPrice, maxPrice, query }],
    queryFn: () => getProductsAction({
      limit: isNaN(limit) ? 9 : limit,
      offset: isNaN(offset) ? 0 : offset,
      sizes,
      gender: gender ?? '',
      minPrice,
      maxPrice,
      query
    })
  })
}
