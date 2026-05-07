export default function StaticUnavailable() {
  return (
    <div style={{ padding: 32, textAlign: 'center' }}>
      <h1>Ruta no disponible en la versión estática</h1>
      <p>Esta página requiere datos dinámicos y solo está disponible en el backend.</p>
    </div>
  );
}
