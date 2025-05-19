# CNK ceneka | Real Estate Website

A modern, responsive real estate website built with React, TypeScript, and Tailwind CSS. This project showcases property listings, company information, and provides a seamless bilingual experience in Spanish and English.

![CNK ceneka Screenshot](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)

## Features

- 🏠 Property Listings with Detailed Views
- 🌐 Bilingual Support (Spanish/English)
- 📱 Fully Responsive Design
- 💬 WhatsApp Integration
- 📝 Contact Form
- 🖼️ Image Gallery with Animations
- 🗺️ Location Information
- 👥 Team and Company Information
- ⭐ Client Testimonials

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cnk-ceneka.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/         # React components
├── contexts/          # React contexts (Language)
├── App.tsx            # Main App component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

### Key Components

- `Home`: Main landing page component
- `PropertyDetail`: Individual property view
- `FeaturedProperties`: Property listings
- `Contact`: Contact form
- `LanguageContext`: Bilingual support
- `WhatsAppButton`: Direct messaging integration

## Customization

### Adding New Properties

Add new properties in the `FeaturedProperties.tsx` file:

```typescript
export const properties = [
  {
    id: number,
    title: string,
    price: string,
    image: string,
    beds: number,
    baths: number,
    sqft: number,
    description: string,
    features: string[],
    location: string,
    images: string[]
  }
]
```

### Language Support

Add new translations in `LanguageContext.tsx`:

```typescript
const translations = {
  es: {
    // Spanish translations
  },
  en: {
    // English translations
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

CNK ceneka - contacto@cnkceneka.com

## Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Built with [Vite](https://vitejs.dev)# fron-end-cnk-ceneka
