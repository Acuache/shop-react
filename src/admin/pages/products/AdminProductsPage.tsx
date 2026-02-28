import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { currencyFormatter } from "@/lib/currency-formatter"
import { useProducts } from "@/shop/hooks/useProducts"
import { PlusIcon } from "lucide-react"
import { Link, useSearchParams } from "react-router"

export const AdminProductsPage = () => {
  const { data, isFetching } = useProducts()
  const [searchParams] = useSearchParams()

  if (isFetching) return <span>Cargando Datos...</span>
  const limit = Number(searchParams.get('limit') || '6')
  let offset = (Number(searchParams.get('page') || '1') - 1) * limit

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y adminitrar tus productos."
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to='/admin/products/new'>
            <Button>
              <PlusIcon /> Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>
      <Table className="bg-white  shadow-xs border border-gray-200  mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data?.products.map((product) => {
              ++offset
              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{offset}</TableCell>
                  <TableCell>
                    <img src={product.images[0]} alt="Product" className="size-20 object-cover rounded-md" />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{currencyFormatter(product.price)}</TableCell>
                  <TableCell>{product.gender}</TableCell>
                  <TableCell>{product.stock} stock</TableCell>
                  <TableCell>{product.sizes.join(', ')}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/admin/products/${product.id}`} className="cursor-pointer">Editar</Link>
                  </TableCell>
                </TableRow>
              )
            })
          }

        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />

    </>
  )
}
