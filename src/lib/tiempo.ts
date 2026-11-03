export const minutosAHoras = (minutos: number) => {
  return `${Math.floor(minutos / 60)}hr ${minutos % 60}min`
}
