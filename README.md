# AdVenture Frontend 🎨

React web app for AdVenture - Transform your products into Instagram-worthy ads in seconds with AI.

## Overview

AdVenture is an intuitive web interface that lets users:
- Upload product images
- Describe their desired ad style
- Generate stunning Instagram creatives in real-time
- Refine results with iterative prompts
- Save and download their favorites

## Tech Stack

- **Framework:** React 18
- **UI Library:** Material-UI (MUI)
- **State Management:** React Hooks
- **Styling:** MUI sx prop + custom themes
- **Deployment:** Vercel

## Features

✨ **Smart Prompting** - AI understands your intent and optimizes prompts  
🎯 **Real-time Generation** - See results in 30-60 seconds  
🔄 **Iterative Refinement** - "Make it more colorful", "Add sunset" - watch it transform  
❤️ **Favorites System** - Save your best ads locally  
📱 **Responsive Design** - Works on desktop, tablet, mobile  
🎨 **Beautiful UI** - Glassmorphism design with animated blobs  
⚡ **Fast** - Optimized performance with lazy loading  

## Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/adventure-frontend.git
cd adventure-frontend

# Install dependencies
npm install

# Create .env.local
echo "REACT_APP_BACKEND_URL=http://localhost:8000" > .env.local

# Start development server
npm start
# Opens http://localhost:3000
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Test production build locally
npx serve -s build
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_BACKEND_URL` | Yes | Backend API URL (e.g., https://adventure-backend.railway.app) |

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project" → Select this repository
4. Add environment variable: `REACT_APP_BACKEND_URL`
5. Click "Deploy"
6. Vercel auto-deploys on every git push

**Costs:**
- Free tier: Unlimited deployments, 100GB bandwidth/month
- Typical usage: Always free

## Project Structure

```
src/
├── components/
│   ├── AdVenture.js              # Main component
│   ├── AdVentureUploadPanel.js   # Image upload UI
│   ├── AdVenturePromptSection.js # Prompt input & favorites
│   ├── AdVenturePreviewPanel.js  # Generated image display
│   └── adVentureStyles.js        # Shared styles
├── constants/
│   └── adVentureConstants.js     # Colors, sizes, limits
├── copy/
│   └── adVentureCopy.js          # All text content
├── theme/
│   └── adVentureTheme.js         # MUI theme config
└── App.js                        # Root component
```

## How It Works

```
1. User uploads product image
   ↓
2. Enters ad description ("Instagram lifestyle photo")
   ↓
3. Clicks "Generate Ad"
   ↓
4. Frontend sends image + prompt to backend
   ↓
5. Backend processes image, crafts optimized prompt
   ↓
6. FLUX AI model generates high-quality image
   ↓
7. Image displayed with refinement suggestions
   ↓
8. User can refine ("make it warmer") or save to favorites
```

## Key Features Explained

### Smart Intent Detection
The backend analyzes your prompt to understand:
- **Style:** Luxury, discount, minimal, vibrant
- **Product type:** Footwear, watch, perfume, electronics
- Crafts optimized prompt for best results

### Iterative Refinement
User says "make background warmer" → 
Backend generates new image with that refinement →
History tracked for transparency

### Favorites System
- Saves best images to browser (localStorage)
- Download individual images
- Remove from favorites anytime

### Responsive Design
- **Desktop:** Two-column layout (upload + preview)
- **Tablet:** Stacked layout with adjusted spacing
- **Mobile:** Full-width, optimized for touch

## Component Communication

```
AdVenture (main)
├── AdVentureUploadPanel
│   └── Image upload, validation, display
├── AdVenturePromptSection
│   ├── Prompt input (500 char max)
│   ├── Generate button
│   └── Favorites manager
└── AdVenturePreviewPanel
    ├── Generated image display
    ├── Error messages
    ├── Loading state with rotating messages
    └── Refinement suggestions + custom input
```

## Styling System

### Colors
- **Primary:** `#ec4899` (Pink)
- **Hover:** `#be185d` (Darker Pink)
- **Accent 1:** `#06b6d4` (Cyan)
- **Accent 2:** `#8b5cf6` (Violet)
- **Background:** Dark gradient (`#020617` → `#0f172a`)

### Design Pattern
- Glassmorphism: Semi-transparent panels with blur effect
- Animations: Floating blobs, smooth transitions
- Spacing: Consistent 8px/16px grid
- Typography: Space Grotesk (headings) + Poppins (body)

## Performance Optimizations

- ✅ Lazy loading images
- ✅ Debounced API calls
- ✅ Optimized re-renders with React.memo (when needed)
- ✅ CSS-only animations (no JS overhead)
- ✅ Minified production build

## Error Handling

User-friendly error messages for:
- ✅ Missing image/prompt
- ✅ Image too large (>5MB)
- ✅ API failures
- ✅ Network timeouts
- ✅ Backend errors

All errors show helpful, actionable messages.

## Accessibility

- ✅ ARIA labels on buttons
- ✅ Semantic HTML (buttons, forms)
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG standards
- ✅ Focus management

## Configuration

### Image Upload
- Max size: 5MB
- Accepted: PNG, JPG, GIF, WebP
- Auto-converted to PNG for processing

### Prompt
- Max length: 500 characters
- Real-time character counter
- No special validation (backend validates)

### Generation
- Timeout: 90 seconds
- Retry: Automatic on failure
- Loading messages rotate every 2 seconds

## Troubleshooting

### "Backend not responding"
- Check `REACT_APP_BACKEND_URL` in `.env.local`
- Verify backend is running/deployed
- Check browser console for CORS errors

### "Image too large"
- Reduce image size to <5MB
- Use JPG instead of PNG for compression
- Crop image to relevant section only

### "Generation failed"
- Check backend logs
- Verify Replicate account has credit
- Try different prompt (simpler is often better)

## Future Enhancements

- [ ] Instagram carousel ads (3-5 images)
- [ ] AI caption generation
- [ ] Custom style templates
- [ ] Video generation
- [ ] Direct Instagram posting
- [ ] User accounts with history
- [ ] Batch generation
- [ ] A/B testing different variations

## Contributing

Found a bug? Have a feature idea? Open an issue or submit a PR!

## License

MIT - Free to use and modify

## Support

- **Issues:** GitHub Issues
- **Docs:** See project structure above
- **Questions:** Check README first, then open issue

---

Transform your products into Instagram magic in seconds.

Visit live demo: [Your Vercel URL here]
