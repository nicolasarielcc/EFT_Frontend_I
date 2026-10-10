import { useState } from 'react'

// Formulario de contacto con validación.
// Muestra mensajes de error si falta información (nombre, email, mensaje)
// o si el correo está mal ingresado.
export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(false)

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: undefined }))
    setExito(false)
  }

  // Expresión regular simple para validar el formato del correo.
  const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // Validación de los tres campos: obligatorios y formato de email.
  const validar = () => {
    const er = {}
    if (!form.nombre.trim()) er.nombre = 'El nombre es obligatorio.'
    if (!form.email.trim()) {
      er.email = 'El correo es obligatorio.'
    } else if (!emailValido(form.email.trim())) {
      er.email = 'El correo no es válido. Verifica el formato (ej. nombre@correo.cl).'
    }
    if (!form.mensaje.trim()) er.mensaje = 'El mensaje es obligatorio.'
    setErrores(er)
    return Object.keys(er).length === 0
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (!validar()) return
    setForm({ nombre: '', email: '', mensaje: '' })
    setExito(true)
  }

  return (
    <form className="row g-3" noValidate onSubmit={manejarSubmit}>
      <div className="col-md-6">
        <label htmlFor="contacto-nombre" className="form-label">Nombre</label>
        <input
          id="contacto-nombre"
          name="nombre"
          type="text"
          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <div className="col-md-6">
        <label htmlFor="contacto-email" className="form-label">Email</label>
        <input
          id="contacto-email"
          name="email"
          type="email"
          className={`form-control ${errores.email ? 'is-invalid' : ''}`}
          placeholder="tucorreo@correo.cl"
          value={form.email}
          onChange={manejarCambio}
        />
        {errores.email && <div className="invalid-feedback">{errores.email}</div>}
      </div>

      <div className="col-12">
        <label htmlFor="contacto-mensaje" className="form-label">Mensaje</label>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          rows="4"
          className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
          placeholder="Escribe tu mensaje…"
          value={form.mensaje}
          onChange={manejarCambio}
        ></textarea>
        {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">Enviar mensaje</button>

        {exito && (
          <div className="alert alert-success mt-3 mb-0" role="alert">
            Mensaje enviado correctamente. Te contactaremos pronto.
          </div>
        )}
      </div>
    </form>
  )
}