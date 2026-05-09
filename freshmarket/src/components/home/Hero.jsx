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
    { label: 'Scarves', icon: '🧣' },
    { label: "Women's", icon: '👗' },
    { label: "Men's", icon: '👔' },
    { label: 'Electronics', icon: '💻' },
    { label: 'New Arrivals', icon: '🎁' },
    { label: 'Sale', icon: '🔥' },
  ]

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        {/* Left Column */}
        <div className="hero__left">
          <span className="hero__eyebrow">✦ Free shipping on your first order</span>
          
          <h1 className="hero__headline">
            Style that fits<br />
            every <em className="highlight">moment.</em>
          </h1>

          <p className="hero__sub">
            Explore thousands of styles — from women's scarves and shawls to men's fashion and electronics — all in one place.
          </p>

          <form className="hero__search" onSubmit={handleSearch}>
            <span className="search__icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search clothes, scarves, brands..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>

          <div className="hero__tags">
            <span className="tags__label">Popular:</span>
            {popularTags.map((tag) => (
              <button 
                key={tag.label} 
                className="tag"
                onClick={() => navigate(`/products?keyword=${tag.label}`)}
              >
                {tag.icon} {tag.label}
              </button>
            ))}
          </div>

          <div className="hero__ctas">
            <button className="btn btn--primary" onClick={() => navigate('/products')}>
              Shop Now →
            </button>
            <button className="btn btn--secondary" onClick={() => navigate('/categories')}>
              Browse Categories
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero__right">
          <div className="visual-panel">
            {/* Background glow */}
            <div className="visual-panel__glow"></div>
            
            {/* Central display: a large rounded rectangle showing a styled product mockup */}
            <div className="visual-panel__frame">
              {/* Main product display — CSS styled box representing a scarf/product card */}
              <div className="visual-panel__product-hero">
                <div className="product-hero__swatch swatch--1"></div>
                <div className="product-hero__swatch swatch--2"></div>
                <div className="product-hero__swatch swatch--3"></div>
                <span className="product-hero__label">New Collection</span>
                <span className="product-hero__sublabel">Women's Scarves & Shawls</span>
              </div>
            </div>
            
            {/* Floating product cards — pure HTML/CSS, animated */}
            <div className="float-card float-card--1">
              🧣 Floral Silk Scarf · <strong>$149</strong>
            </div>
            <div className="float-card float-card--2">
              👗 Casual Dress · <strong>$89</strong>
            </div>
            <div className="float-card float-card--3">
              👔 Men's Jacket · <strong>$210</strong>
            </div>
            
            {/* Rating badge */}
            <div className="rating-badge">⭐ 4.9 · Trusted by 10k+ shoppers</div>

            {/* Free shipping badge */}
            <div className="delivery-badge">🚚 Free Shipping Available</div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat">
          <span className="stat__icon">👗</span>
          <span className="stat__number">10k+</span>
          <span className="stat__label">Products</span>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat">
          <span className="stat__icon">🌍</span>
          <span className="stat__number">50+</span>
          <span className="stat__label">Brands</span>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat">
          <span className="stat__icon">⭐</span>
          <span className="stat__number">4.9</span>
          <span className="stat__label">Rating</span>
        </div>
      </div>
    </div>
  )
}

export default Hero
