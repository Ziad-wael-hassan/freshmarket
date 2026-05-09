import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchInput.trim())}`)
    }
  }

  const popularTags = [
    { label: 'Scarves' },
    { label: "Women's" },
    { label: "Men's" },
    { label: 'Electronics' },
    { label: 'New Arrivals' },
    { label: 'Sale', isSale: true },
  ]

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-trust">
            <div className="hero-trust__avatars">
              {/* Decorative social proof — not real user data */}
              <span className="avatar av-1">A</span>
              <span className="avatar av-2">J</span>
              <span className="avatar av-3">M</span>
            </div>
            <span className="hero-trust__text">Trusted by 10k+ shoppers</span>
          </div>

          <span className="hero-eyebrow">✦ Free shipping on your first order</span>

          <h1 className="hero-headline">
            Style that fits<br />
            every <em className="accent">moment.</em>
          </h1>

          <p className="hero-subtext">
            Explore thousands of styles — from women's scarves and shawls to men's fashion and electronics — all in one place.
          </p>

          <form className="hero-search" onSubmit={handleSearch}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search clothes, scarves, brands..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-btn">Search</button>
          </form>

          <div className="tags-row">
            <span className="tags-label">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag.label}
                className={`tag${tag.isSale ? ' tag-sale' : ''}`}
                onClick={() => navigate(`/products?keyword=${tag.label}`)}
              >
                {tag.label}
              </button>
            ))}
          </div>

          <div className="cta-row">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Shop Now →
            </button>
            <button className="btn-ghost" onClick={() => navigate('/categories')}>
              Browse Categories
            </button>
          </div>

          <div className="stats-bar">
            <div className="stat">
              <span className="stat__icon">👗</span>
              <span className="stat__number">10k+</span>
              <span className="stat__label">Products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__icon">🌍</span>
              <span className="stat__number">50+</span>
              <span className="stat__label">Brands</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat__icon">⭐</span>
              <span className="stat__number">4.9</span>
              <span className="stat__label">Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="panel-card">
            <img
              src="https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T26252s.jpg?im=Resize,width=750"
              alt="Luxury Fashion Editorial"
              className="panel-image"
            />
            <div className="panel-overlay">
              <span className="panel-eyebrow">Edition 01</span>
              <strong className="panel-title">New Collection</strong>
              <span className="panel-subtitle">Women's Scarves & Shawls</span>
            </div>
          </div>

          <div className="product-chip product-chip--1">
            <img
              src="https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=250&auto=format&fit=crop"
              alt="Floral Silk Scarf"
              className="product-chip__img"
            />
            <span className="product-chip__name">Floral Silk Scarf</span>
            <b className="product-chip__price">$149</b>
          </div>
          <div className="product-chip product-chip--2">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=250&auto=format&fit=crop"
              alt="Men's Jacket"
              className="product-chip__img"
            />
            <span className="product-chip__name">Men's Jacket</span>
            <b className="product-chip__price">$210</b>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
