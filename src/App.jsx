import { useState, useEffect, useCallback } from 'react'

import Navbar from './components/Navbar.jsx'
import GameList from './components/GameList.jsx'
import AddGameForm from './components/AddGameForm.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'

// Categorías disponibles (se usan para el filtro del navbar y el formulario).
export const CATEGORIAS = ['Aventura', 'Carreras', 'Shooter', 'Deportes', 'RPG', 'Estrategia']

// Portadas disponibles para los videojuegos nuevos que se agregan.
export const PORTADAS = [
  'img/zelda-botw.svg', 'img/minecraft.svg', 'img/mario-kart.svg', 'img/gran-turismo.svg',
  'img/call-of-duty.svg', 'img/overwatch.svg', 'img/fifa.svg', 'img/nba2k.svg',
  'img/witcher.svg', 'img/elden-ring.svg', 'img/age-of-empires.svg', 'img/civilization.svg',
]

export default function App() {
  // state: lista de videojuegos (se carga de forma dinámica con fetch).
  const [juegos, setJuegos] = useState([])

  // state: categoría activa del filtro y texto de búsqueda.
  const [categoria, setCategoria] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  // state: estados de carga (indicador) y error (mensaje + botón reintentar).
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)

  // Carga dinámica de los videojuegos desde un archivo JSON local (Fetch API).
  const cargarJuegos = useCallback(async () => {
    setCargando(true)
    setError(false)
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}data/juegos.json`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const datos = await res.json()
      setJuegos(datos)
    } catch (err) {
      // Si la carga falla, se muestra un mensaje amigable y un botón de reintento.
      console.error('No se pudieron cargar los videojuegos:', err)
      setError(true)
    } finally {
      setCargando(false)
    }
  }, [])

  // useEffect: ejecuta la carga solo cuando el componente se monta.
  useEffect(() => {
    cargarJuegos()
  }, [cargarJuegos])

  // Agregar un juego nuevo a la lista (state dinámico).
  const agregarJuego = (juego) => {
    setJuegos((prev) => [...prev, { ...juego, id: Date.now() }])
  }

  // Eliminar un juego de la lista por su id.
  const eliminarJuego = (id) => {
    setJuegos((prev) => prev.filter((j) => j.id !== id))
  }

  // Lista filtrada: combina el filtro por categoría con la búsqueda por nombre.
  const juegosFiltrados = juegos.filter((juego) => {
    const porCategoria = categoria === 'Todos' || juego.categoria === categoria
    const porNombre = juego.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
    return porCategoria && porNombre
  })

  return (
    <>
      <header>
        <Navbar
          categorias={CATEGORIAS}
          categoriaActiva={categoria}
          onSelectCategoria={setCategoria}
          onBuscar={setBusqueda}
        />
      </header>

      <main>
        {/* Sección Inicio — hero con el catálogo */}
        <section id="inicio" className="bg-dark text-white text-center py-5">
          <div className="container">
            <h1 className="display-5 fw-bold">GameStore</h1>
            <p className="lead mb-0">
              Tu tienda online de videojuegos. Explora, filtra por categoría y elige tu próxima aventura.
            </p>
          </div>
        </section>

        {/* Sección Catálogo — filtra y renderiza las tarjetas dinámicamente */}
        <section id="catalogo" className="py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h2 className="h3 mb-0">Catálogo de videojuegos</h2>
              <span className="badge text-bg-secondary">Categoría: {categoria}</span>
            </div>

            {cargando && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" aria-label="Cargando catálogo">
                  <span className="visually-hidden">Cargando…</span>
                </div>
                <p className="mt-2 text-muted">Cargando videojuegos…</p>
              </div>
            )}

            {error && (
              <div className="alert alert-warning text-center" role="alert">
                <p className="mb-2">No se pudieron cargar los videojuegos. Inténtalo nuevamente.</p>
                <button className="btn btn-primary btn-sm" onClick={cargarJuegos}>
                  Reintentar carga
                </button>
              </div>
            )}

            {!cargando && !error && (
              <GameList juegos={juegosFiltrados} onEliminar={eliminarJuego} />
            )}
          </div>
        </section>

        {/* Sección Agregar — state dinámico (permite sumar videojuegos a la lista) */}
        <section id="agregar" className="py-5 bg-light">
          <div className="container">
            <h2 className="h3 mb-3">Agregar un videojuego</h2>
            <p className="text-muted">
              El estado de la aplicación permite incorporar nuevos productos al catálogo de forma dinámica.
            </p>
            <AddGameForm categorias={CATEGORIAS} portadas={PORTADAS} onAgregar={agregarJuego} />
          </div>
        </section>

        {/* Sección Contacto — formulario validado */}
        <section id="contacto" className="py-5">
          <div className="container">
            <h2 className="h3 mb-3">Contacto</h2>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}