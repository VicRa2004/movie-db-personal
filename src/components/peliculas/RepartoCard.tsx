import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface RepartoCardProps {
  actor: string
  personaje: string
  avatar?: string | null
  id?: number
}

export const RepartoCard = ({ actor, personaje, avatar }: RepartoCardProps) => {
  return (
    <div className="flex justify-start gap-3 items-center">
      <Avatar>
        <AvatarImage src={avatar || ''} />
        <AvatarFallback>{personaje}</AvatarFallback>
      </Avatar>
      <h4 className="text-lg">
        {actor} - {personaje}
      </h4>
    </div>
  )
}
