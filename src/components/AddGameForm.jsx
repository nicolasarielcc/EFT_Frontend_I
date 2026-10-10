import { useState } from 'react'

// Formulario para agregar un videojuego al catálogo.
// Valida los campos y, si todo es correcto, notifica al padre con onAgregar.
export default function AddGameForm({ categorias, portadas, onAgregar }) {
  const [form, setForm] = useState({
    nombre: '',
    categoria: categorias[0],
    precio: '',
    descripcion: '',
    imagen: portadas[0],
  })
  const [errores, setErrores] = useState({})
  const [exito, setExito] = useState(false)

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrores((prev) => ({ ...prev, [name]: undefined }))
    setExito(false)
  }

  // Validación: ningún campo puede quedar vacío y el precio debe ser un número positivo.
  const validar = () => {
    const er = {}
    if (!form.nombre.trim()) er.nombre = 'El nombre es obligatorio.'
    if (form.precio === '' || Number(form.precio) <= 0) er.precio = 'El precio debe ser un número mayor a 0.'
    if (!form.descripcion.trim()) er.descripcion = 'La descripción es obligatoria.'
    setErrores(er)
    return Object.keys(er).length === 0
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    if (!validar()) return
    onAgregar({
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      precio: Number(form.precio),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen,
    })
    setForm({ nombre: '', categoria: categorias[0], precio: '', descripcion: '', imagen: portadas[0] })
    setExito(true)
  }

  return (
    <form className="row g-3" noValidate onSubmit={manejarSubmit}>
      <div className="col-md-6">
        <label htmlFor="juego-nombre" className="form-label">Nombre</label>
        <input
          id="juego-nombre"
          name="nombre"
          type="text"
          className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
          value={form.nombre}
          onChange={manejarCambio}
        />
        {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
      </div>

      <div className="col-md-6">
        <label htmlFor="juego-categoria" className="form-label">Categoría</label>
        <select
          id="juego-categoria"
          name="categoria"
          className="form-select"
          value={form.categoria}
          onChange={manejarCambio}
        >
          {categorias.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <label htmlFor="juego-precio" className="form-label">Precio (CLP)</label>
        <input
          id="juego-precio"
          name="precio"
          type="number"
          min="1"
          className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
          value={form.precio}
          onChange={manejarCambio}
        />
        {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
      </div>

      <div className="col-md-8">
        <label htmlFor="juego-descripcion" className="form-label">Descripción</label>
        <input
          id="juego-descripcion"
          name="descripcion"
          type="text"
          className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
          value={form.descripcion}
          onChange={manejarCambio}
        />
        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
      </div>

      <div className="col-12">
        <label htmlFor="juego-imagen" className="form-label">Portada</label>
        <select id="juego-imagen" name="imagen" className="form-select" value={form.imagen} onChange={manejarCambio}>
          {portadas.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">Agregar videojuego</button>
        {exito && (
          <div className="alert alert-success mt-3 mb-0" role="alert">
            Videojuego agregado al catálogo correctamente.
          </div>
        )}
      </div>
    </form>
  )
}