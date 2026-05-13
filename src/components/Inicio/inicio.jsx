import './inicio.css';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="inicio">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Bienvenido a TalentoTech</h1>
          <p className="hero-subtitle">Descubre los mejores productos de tecnología a los mejores precios</p>
          <Link to="/productos" className="hero-btn">Ver Productos</Link>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Características Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Envío Rápido</h3>
            <p>Entrega en 24-48 horas a cualquier parte del país</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Compra Segura</h3>
            <p>Métodos de pago seguros y protegidos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Cambios Garantizados</h3>
            <p>30 días para cambiar tu producto sin costo</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Excelente Atención</h3>
            <p>Soporte al cliente 24/7 disponible para ti</p>
          </div>
        </div>
      </section>

      {/* Promoción Section */}
      <section className="promocion">
        <div className="promocion-content">
          <h2>Oferta Especial del Mes</h2>
          <p>Descuento de hasta 20% en productos seleccionados</p>
          <Link to="/productos" className="promocion-btn">Aprovechar Oferta</Link>
        </div>
      </section>

      {/* Categorías Section */}
      <section className="categorias">
        <h2 className="categorias-title">Nuestras Categorías</h2>
        <div className="categorias-grid">
          <div className="categoria-card">
            <div className="categoria-icon">📷</div>
            <h3>Cámaras</h3>
            <p>Captura tus momentos especiales</p>
          </div>
          <div className="categoria-card">
            <div className="categoria-icon">🖥️</div>
            <h3>Monitores</h3>
            <p>Visualización de alta definición</p>
          </div>
          <div className="categoria-card">
            <div className="categoria-icon">🖱️</div>
            <h3>Accesorios</h3>
            <p>Mejora tu experiencia</p>
          </div>
          <div className="categoria-card">
            <div className="categoria-icon">💻</div>
            <h3>Notebooks</h3>
            <p>Potencia y portabilidad</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>¿Listo para comprar?</h2>
        <p>Explora nuestro catálogo completo de productos tecnológicos</p>
        <div className="cta-buttons">
          <Link to="/productos" className="cta-btn cta-primary">Ver Catálogo</Link>
          <Link to="/alta" className="cta-btn cta-secondary">Agregar Producto</Link>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
