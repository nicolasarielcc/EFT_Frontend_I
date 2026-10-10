// Pie de página con información del sitio y enlaces. Se organiza con Flexbox/CSS Grid.
export default function Footer() {
  return (
    <footer id="contacto-info" className="bg-dark text-white py-4 mt-auto">
      <div className="container pie-contenido">
        <div>
          <h6 className="text-uppercase fw-bold">GameStore</h6>
          <p className="small mb-0">Tu tienda online de videojuegos favorita.</p>
        </div>
        <div>
          <h6 className="text-uppercase fw-bold">Síguenos</h6>
          <ul className="list-unstyled small mb-0">
            <li><a className="text-white-50 text-decoration-none" href="#inicio">Instagram</a></li>
            <li><a className="text-white-50 text-decoration-none" href="#inicio">Facebook</a></li>
            <li><a className="text-white-50 text-decoration-none" href="#inicio">X / Twitter</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-uppercase fw-bold">Contacto</h6>
          <p className="small mb-0">contacto@gamestore.cl</p>
          <p className="small mb-0">+56 9 1234 5678</p>
        </div>
      </div>
      <div className="text-center small py-2 border-top border-secondary">
        &copy; 2026 GameStore — Desarrollo Frontend I (PFY2201). Todos los derechos reservados.
      </div>
    </footer>
  )
}