import type { PeliculaDetalleAPI } from '#/features/peliculas_api/peliculas.api.types'
import { Link } from '@tanstack/react-router'
import { IframeYoutube } from '../IframeYoutube'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { PeliculaAPICard } from './PeliculaAPICard'
import { RepartoCard } from './RepartoCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface PeliculaContentProps {
  pelicula: PeliculaDetalleAPI
}

const fmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const PeliculaContent = ({ pelicula }: PeliculaContentProps) => {
  return (
    <main>
      <section className="flex flex-wrap w-full gap-2 p-2 justify-center">
        <img className="h-100" src={pelicula.posterUrl || ''} alt="" />
        <IframeYoutube
          className="w-full max-w-xl"
          urlYoutube={pelicula.trailerYoutubeUrl || ''}
        />
        <div className="border-3 border-primary rounded-lg flex-1 min-w-0 p-10 flex justify-center items-center">
          <p>{pelicula.descripcion}</p>
        </div>
      </section>
      <section className="flex bg-primary p-4 gap-2 justify-start items-center">
        {pelicula.plataformasStreamingMX.length ? (
          <>
            <span className="text-lg font-bold text-white">Disponible en:</span>
            {pelicula.plataformasStreamingMX.map((plataforma) => (
              <img
                className="h-15 rounded-lg"
                src={plataforma.logoUrl || ''}
                alt=""
              />
            ))}
          </>
        ) : (
          <span className="text-lg font-bold text-white">
            No disponible en plataformas de streming en este momento
          </span>
        )}
      </section>
      <section className="flex p-5 gap-4">
        <div className="flex-1 border-2 rounded-md p-4">
          <h2 className="text-xl text-primary font-semibold">
            Acerca de este filme
          </h2>

          <Accordion type="multiple" defaultValue={['item-1']}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Reparto</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                {pelicula.repartoPrincipal.map((reparto) => (
                  <RepartoCard
                    actor={reparto.nombre}
                    personaje={reparto.personaje}
                    avatar={reparto.fotoUrl}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Estadisticas</AccordionTrigger>
              <AccordionContent className="text-md font-light flex flex-col">
                <p>Director: {pelicula.director}</p>
                <p>Fecha de estreno: {pelicula.fechaDeLanzamiento}</p>
                <p>Presupuesto: {fmt.format(pelicula.presupuesto)}</p>
                <p>Recaudación: {fmt.format(pelicula.recaudacion)}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Generos</AccordionTrigger>
              <AccordionContent className="flex gap-2">
                {pelicula.generos.map((genero) => (
                  <Link to=".">
                    <Badge>{genero.nombre}</Badge>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="">
          <ScrollArea className="rounded-md border-2 p-4">
            <h2 className="text-xl font-semibold text-primary">
              Tambien te podria gustar
            </h2>

            {pelicula.recomendaciones.map((recomendacion) => (
              <PeliculaAPICard pelicula={recomendacion} />
            ))}
          </ScrollArea>
        </div>
      </section>
    </main>
  )
}
