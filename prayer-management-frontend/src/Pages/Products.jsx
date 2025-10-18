// Products.jsx
import { FestivalProducts } from "../data/FestivalProducts";

export default function Products() {
  return (
    <section className="products">
      <h2>Festival Products</h2>

      <div className="festival-grid">
        {FestivalProducts.map((p) => (
          <article key={p.id} className="product-card">
            <div className="product-media">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = "/fallback-product.png"; }}
              />
            </div>

            <div className="product-body">
              <h3 className="product-title">{p.title}</h3>
              <p className="product-price">₹{p.price}</p>
              {p.desc && <p className="product-desc">{p.desc}</p>}
            </div>

            <div className="product-actions">
              <a
                className="btn primary"
                href={p.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buy ${p.title} on external store`}
              >
                Buy on Flipkart/Amazon
              </a>
              {/* Optional secondary link:
              <a className="btn ghost" href={p.buyUrl} target="_blank" rel="noopener noreferrer">
                Details
              </a>
              */}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
