import { useState } from 'react'

// Barra de navegación con Bootstrap 5.
// El menú usa una lista no ordenada (ul/li) para reforzar la semántica de la navegación.
// Cada enlace de categoría filtra el catálogo (prop onSelectCategoria).
export default function Navbar({ categorias, categoriaActiva, onSelectCategoria, onBuscar }) {
  const [consulta, setConsulta] = useState('')

  const manejarBusqueda = (valor) => {
    setConsulta(valor)
    onBuscar(valor)
  }

  // Cierra el menú colapsado en móviles al seleccionar una opción.
  const seleccionar = (categoria) => {
    onSelectCategoria(categoria)
    const menu = document.getElementById('menuPrincipal')
    const panel = window.bootstrap ? window.bootstrap.Collapse.getOrCreateInstance(menu) : null
    if (menu && menu.classList.contains('show')) panel?.hide()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#inicio">
          GameStore
        </a>

        {/* Botón hamburguesa (colapsa el menú en móviles) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuPrincipal"
          aria-controls="menuPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${categoriaActiva === 'Todos' ? 'active' : ''}`}
                href="#inicio"
                onClick={() => seleccionar('Todos')}
              >
                Inicio
              </a>
            </li>

            {/* Categorías: filtran el catálogo (visible en el listado) */}
            {categorias.map((cat) => (
              <li className="nav-item" key={cat}>
                <a
                  className={`nav-link ${categoriaActiva === cat ? 'active' : ''}`}
                  href="#catalogo"
                  onClick={() => seleccionar(cat)}
                >
                  {cat}
                </a>
              </li>
            ))}

            <li className="nav-item">
              <a className="nav-link" href="#contacto">
                Contacto
              </a>
            </li>
          </ul>

          {/* Búsqueda en vivo por nombre */}
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar juego…"
              aria-label="Buscar videojuego"
              value={consulta}
              onChange={(e) => manejarBusqueda(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  )
}