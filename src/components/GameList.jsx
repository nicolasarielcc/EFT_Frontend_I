import GameCard from './GameCard.jsx'

// Lista de videojuegos: recibe la lista (ya filtrada) por props y la renderiza en una grilla.
// La grilla usa Bootstrap (col-12 / col-sm-6 / col-lg-4) => diseño responsivo.
export default function GameList({ juegos, onEliminar }) {
  if (juegos.length === 0) {
    return (
      <p className="text-center text-muted py-4">
        No hay videojuegos que coincidan con la búsqueda o categoría seleccionada.
      </p>
    )
  }

  return (
    <div className="row g-4">
      {juegos.map((juego) => (
        <div className="col-12 col-sm-6 col-lg-4" key={juego.id}>
          <GameCard juego={juego} onEliminar={onEliminar} />
        </div>
      ))}
    </div>
  )
}