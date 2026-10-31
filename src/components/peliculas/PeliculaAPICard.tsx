import type { PeliculaAPI } from '#/features/peliculas_api/peliculas.api.types.ts'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PeliculasAPIProps {
  pelicula: PeliculaAPI
}

export function PeliculaAPICard({ pelicula }: PeliculasAPIProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={'https://image.tmdb.org/t/p/w1280' + pelicula.backdropPath}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge className="bg-primary text-white" variant="ghost">
            {pelicula.voteAverage}
          </Badge>
        </CardAction>
        <CardTitle>{pelicula.titulo}</CardTitle>
        <CardDescription className="line-clamp-3">
          {pelicula.descripcion}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Ver mas</Button>
      </CardFooter>
    </Card>
  )
}
