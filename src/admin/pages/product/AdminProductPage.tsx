import { useNavigate, Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  // Lógica de los productos
  const { data: product, isLoading, isError, mutation } = useProduct(id ?? '')

  const title = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const subtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmitForm = async (productLike: Partial<Product> & { files?: File[] }) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Producto actualizado correctamente', {
          position: 'top-right'
        })
        navigate(`/admin/products/${data.id}`)
      },
      onError: (error) => {
        console.log(error)
        toast.error('Error al actualizar el producto')
      }
    })
  }


  if (isError) return <Navigate to='/admin/products' />
  if (isLoading) return <CustomFullScreenLoading />


  if (!product) {
    return <Navigate to='/admin/products' />
  }

  return <ProductForm
    title={title}
    subTitle={subtitle}
    product={product}
    onSubmit={handleSubmitForm}
    isPending={mutation.isPending}
  />
};