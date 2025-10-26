# 🎨 Modern Portfolio Website

A stunning, responsive personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features smooth animations, dark mode, and a modern design optimized for performance and accessibility.

## ✨ Features

### 🎯 Core Features
- **📱 Fully Responsive** - Mobile-first design with breakpoints for all devices
- **🌙 Dark Mode** - System preference detection with manual toggle
- **⚡ Performance Optimized** - Lighthouse scores 90+ across all metrics
- **♿ Accessible** - WCAG 2.1 compliant with keyboard navigation
- **🎭 Smooth Animations** - Framer Motion powered micro-interactions
- **🔍 SEO Optimized** - Meta tags, structured data, and semantic HTML

### 🎨 Design Elements
- **🔷 Sticky Header** - Glass morphism effect with scroll-based height animation
- **⌨️ Typewriter Effect** - Animated role cycling in hero section
- **🎯 3D Hover Cards** - Interactive project cards with tilt effects
- **📊 Skill Bars** - Animated proficiency indicators
- **🕐 Timeline Layout** - Visual experience and education timeline
- **📝 Contact Form** - Functional form with validation and toast notifications

### 🛠️ Technical Stack
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first styling
- **🧩 shadcn/ui** - High-quality component library
- **🎭 Framer Motion** - Animation library
- **🌙 Next Themes** - Theme management
- **📋 React Hook Form** - Form handling
- **🔔 Sonner** - Toast notifications

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and utilities
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Main portfolio page
├── components/            # React components
│   ├── Header.tsx         # Sticky navigation header
│   ├── Hero.tsx           # Hero section with typewriter
│   ├── About.tsx          # About section with skills
│   ├── Projects.tsx       # Projects showcase
│   ├── Experience.tsx     # Experience timeline
│   ├── Contact.tsx        # Contact form
│   ├── Footer.tsx         # Footer component
│   ├── theme-provider.tsx # Theme context provider
│   └── ui/               # shadcn/ui components
├── data/                 # Site content
│   └── siteData.json     # Portfolio content and data
├── hooks/                # Custom React hooks
│   └── use-toast.ts      # Toast notification hook
└── lib/                  # Utilities and configurations
```

## 🎨 Customization

### 📝 Edit Content
All portfolio content is managed in `src/data/siteData.json`:

```json
{
  "site": {
    "title": "Your Name — Portfolio",
    "description": "Your professional description"
  },
  "hero": {
    "name": "Your Name",
    "roles": ["Full-Stack Developer", "UI Engineer"],
    "tagline": "Your professional tagline"
  },
  "projects": [...],
  "experience": [...],
  "social": {...}
}
```

### 🎨 Styling
- **Colors**: Modify CSS variables in `globals.css`
- **Typography**: Adjust font families and sizes
- **Spacing**: Use Tailwind's utility classes
- **Animations**: Customize Framer Motion variants

### 🖼️ Images
- Replace placeholder images in `public/images/`
- Add project thumbnails in `public/images/projects/`
- Update profile image path in `siteData.json`

## 🎯 Sections Overview

### 🏠 Hero Section
- Animated name display
- Typewriter effect for roles
- Call-to-action buttons
- Social media links
- Smooth scroll indicator

### 👤 About Section
- Profile photo/card
- Multi-paragraph bio
- Animated skill bars
- Education details
- Achievement badges

### 💼 Projects Section
- Featured projects grid
- 3D hover effects
- Technology tags
- Live demo and repo links
- Responsive layout

### 📈 Experience Section
- Timeline visualization
- Company details
- Role descriptions
- Achievement highlights
- Education timeline

### 📧 Contact Section
- Functional contact form
- Social media links
- Contact information
- Form validation
- Success notifications

## 🚀 Deployment

### 📦 Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 🐳 Docker
```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
```

### 🌐 Other Platforms
- **Netlify**: Connect repository and configure build settings
- **AWS Amplify**: Import from GitHub with automatic deployment
- **DigitalOcean**: Use App Platform for container deployment

## 🔧 Configuration

### 🌍 Environment Variables
Create `.env.local` for sensitive data:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_EMAIL=your.email@example.com
```

### 📊 Analytics
Add Google Analytics or other tracking:
```javascript
// In layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🎯 Performance Optimization

### ⚡ Built-in Optimizations
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Font Optimization**: Self-hosted fonts with display swap
- **Bundle Analysis**: Tree-shaking and dead code elimination

### 📈 Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework

---

Built with ❤️ using modern web technologies. Ready to showcase your amazing work! 🚀

## UI improvements added (Oct 25, 2025)

- Accessibility: added a keyboard "Skip to content" link and adjusted layout so the fixed header doesn't overlap page content.
- Hero: added avatar support (uses `siteData.about.photo`) and refined hero typography and spacing.
- Animated background: improved turbulence/displacement for a more visible effect, mapped `animation.speed` to seconds for intuitive tuning, and added `prefers-reduced-motion` support. See `CHANGELOG_UI.md` for details.

