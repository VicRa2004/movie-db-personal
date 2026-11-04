import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

/**
 * Función para paginar. Versión simplificada.
 * Aveces es mejor simplificar.
 * @author Victor12
 */
function calcularPaginacion(pagina: number, totalPaginas: number) {
  // Cuando un elemento tiene menos de 5, comienza en el 1
  if ([1, 2, 3].includes(pagina)) {
    return {
      inicio: 1,
      total: totalPaginas > 5 ? 5 : totalPaginas,
    }
  }

  // Si esta al final(o casi al final) y es mayor de 5, muestra las ultimas 5
  // Ejem: totalPaginas=10; [6,7,8,9,10]
  if (totalPaginas == pagina || totalPaginas - 1 == pagina) {
    return {
      inicio: totalPaginas - 4,
      total: 5,
    }
  }

  // En los demas casos, solo restamos 2 a la pagina, para que quede en medio
  return {
    inicio: pagina - 2,
    total: 5,
  }
}

interface PaginationPeliculaProps {
  page?: number
  totalPages: number
  siguiente: () => void
  atras: () => void
  irAPagina: (page: number) => void
}

export const Paginacion = ({
  page = 1,
  totalPages,
  siguiente,
  atras,
  irAPagina,
}: PaginationPeliculaProps) => {
  if (totalPages == 0) return null

  const { inicio, total } = calcularPaginacion(page, totalPages)

  const numerosPaginas = new Array(total).fill(0).map((_, i) => {
    return inicio + i
  })

  return (
    <Pagination>
      <PaginationContent>
        {page != 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => (page != 1 ? atras() : undefined)}
            />
          </PaginationItem>
        )}
        {numerosPaginas.map((v, i) => (
          <PaginationItem
            key={i}
            className={v == page ? 'bg-primary rounded-full text-white' : ''}
          >
            <PaginationLink onClick={() => irAPagina(v)}>{v}</PaginationLink>
          </PaginationItem>
        ))}

        {totalPages != page && (
          <PaginationItem>
            <PaginationNext
              onClick={() => (page != totalPages ? siguiente() : undefined)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
