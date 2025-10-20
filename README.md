# E-Commerce Phone Website

A modern, responsive e-commerce website for selling phones and electronic devices, built with HTML, CSS, and vanilla JavaScript.

## 📋 Features

### Homepage (index.html)

- **Header Section**

  - Responsive navigation menu
  - Search functionality with suggestions
  - Shopping cart with counter
  - Location selector
  - User profile/login
  - Dropdown menus for product categories

- **Banner Slider**

  - Auto-sliding banner with navigation controls
  - Dot indicators for slide position
  - Smooth transitions

- **Filter Section**

  - Brand filters with logo images
  - Price range filters
  - Product type filters (AI Laptop, Gaming, Office, etc.)
  - RAM and Storage filters
  - Sorting options (Featured, Best Seller, Price, etc.)

- **Product List**

  - Grid layout with responsive design
  - Product cards with:
    - Images with hover zoom effect
    - Product name and specifications
    - Price with discount information
    - Rating and sales count
    - Comparison functionality
  - Load more functionality
  - Preloader animation

- **Footer**
  - Product category links
  - Company information
  - Certification badges
  - Copyright information

### Product Detail Page (product-detail.html)

- **Product Header**

  - Product name and SKU
  - Rating and review count

- **Image Gallery**

  - Main image slider with 5+ images
  - Thumbnail navigation
  - Keyboard and touch/swipe support
  - Slideshow counter
  - "Love this" (favorite) button

- **Product Information**

  - **Left Column:**

    - Image gallery
    - Warranty information
    - Store availability checker (city/district selection)
    - Related products carousel (Cases, Chargers, Cables, Screen Protectors)
    - Detailed product description with table of contents

  - **Right Column:**
    - EDU student discount banner
    - Price display with discount
    - Storage/RAM selection (128GB, 256GB, 512GB, 1TB)
    - Color selection (4 color options)
    - Store stock checker button
    - Member and student special offer buttons
    - "Buy Now" and "Installment Payment" buttons
    - Promotional offers
    - Payment method offers
    - Technical specifications table

### JavaScript Functionality

- **Main Script (script.js)**

  - Header interactions (location, cart, search)
  - Banner slider automation
  - Filter and sort functionality
  - Product comparison (max 3 items)
  - Load more products
  - Notification system
  - Keyboard shortcuts (Ctrl+K for search, Esc to close)
  - Lazy loading for images

- **Product Detail Script (product-detail.js)**
  - Image slider with keyboard/touch support
  - Thumbnail navigation
  - Love/favorite toggle
  - Version (storage) selection with price update
  - Color selection
  - Store availability filtering by city/district
  - Related products tabs and loading
  - Content expansion ("Read more")
  - Various action buttons (buy, installment, etc.)

### CSS Styling (style.css & product-detail.css)

- **Modern Design**

  - Clean and professional layout
  - Smooth animations and transitions
  - Hover effects for interactive elements
  - Custom scrollbars

- **Responsive Design**

  - Mobile-first approach
  - Breakpoints: 480px, 768px, 1024px
  - Adaptive grid layouts
  - Touch-friendly interface

- **Color Scheme**
  - Primary: #2377E8 (Blue)
  - Secondary: #D70018 (Red for prices)
  - Accent: #FF6B00 (Orange for CTAs)
  - Backgrounds: #F8F8F8, White

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - can run directly from file system

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Navigate to `product-detail.html` to view the product detail page

### File Structure

```
ecommerce-phone/
├── index.html              # Homepage
├── product-detail.html     # Product detail page
├── css/
│   ├── style.css          # Main stylesheet
│   └── product-detail.css # Product detail stylesheet
├── js/
│   ├── script.js          # Main JavaScript
│   └── product-detail.js  # Product detail JavaScript
└── README.md              # This file
```

## 🎨 Design Features

### Homepage

- Sticky header that stays visible while scrolling
- Dropdown menus with custom scrollbars
- Filter section with brand logos and icons
- Product grid with hover effects
- Responsive footer with multiple columns

### Product Detail Page

- Professional image gallery with zoom
- Interactive option selection (storage, color)
- Real-time price updates
- Store availability checker
- Related products carousel
- Expandable product description
- Multiple call-to-action buttons

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Desktop** (1024px and above)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Vanilla JavaScript, no frameworks
- **SVG**: Scalable icons
- **Web APIs**: IntersectionObserver for lazy loading

## ✨ Key Features

1. **No Dependencies**: Pure HTML, CSS, and JavaScript
2. **Fast Loading**: Optimized images and lazy loading
3. **SEO Friendly**: Semantic HTML structure
4. **Accessible**: ARIA labels and keyboard navigation
5. **Cross-browser**: Works on all modern browsers
6. **Performance**: Smooth animations (60fps)

## 🎯 Fake Data

The project uses fake/demo data for:

- Product listings (8 laptop products)
- Store locations (4 cities, multiple districts)
- Related products (cases, chargers, cables, screen protectors)
- Promotional offers
- Technical specifications

## 🔜 Future Enhancements

Potential features to add:

- Backend integration with database
- User authentication and accounts
- Real shopping cart functionality
- Payment gateway integration
- Product reviews and ratings system
- Wishlist functionality
- Order tracking
- Advanced search filters
- Product recommendations AI
- Live chat support

## 📄 License

This is a demo project created for educational purposes.

## 👤 Author

Created as a demonstration of modern web development techniques.

## 🙏 Acknowledgments

- Product images from various sources (demo purposes)
- Icon designs inspired by modern e-commerce websites
- Vietnamese language and currency for local market

---

**Note**: This is a static website demonstration. All product data, prices, and store information are fictional and for demonstration purposes only.
# ecommerce-smartphone
