import { formatCLP } from '../utils/format.js'

// Tarjeta individual de videojuego (componente Bootstrap Card).
// Recibe el juego por props y notifica al padre cuando debe eliminarse.
export default function GameCard({ juego, onEliminar }) {
  return (
    <article className="card h-100 shadow-sm juego-card">
      <img
        src={`${import.meta.env.BASE_URL}${juego.imagen}`}
        className="card-img-top"
        alt={`Portada de ${juego.nombre}`}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge text-bg-primary align-self-start">{juego.categoria}</span>
        <h5 className="card-title mt-2">{juego.nombre}</h5>
        <p className="card-text flex-grow-1">{juego.descripcion}</p>
        <p className="card-text fw-bold fs-5 mb-2">{formatCLP(juego.precio)}</p>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onEliminar(juego.id)}
        >
          Quitar del catálogo
        </button>
      </div>
    </article>
  )
}