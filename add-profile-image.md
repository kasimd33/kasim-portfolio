# Add Your Profile Image

## Steps to add your profile photo:

1. **Save your image**: Take the image you provided (IMG-20251016-WA0009.jpg) and save it as `profile.jpg`

2. **Place it in the correct directory**: 
   ```
   D:\KasimPortfolio2\public\images\profile.jpg
   ```

3. **The image is already configured** in your portfolio to use `/images/profile.jpg`

## Alternative: Use the current image directly

If you want to keep the original filename, update the path in `src/data/siteData.json`:

```json
"photo": "/images/IMG-20251016-WA0009.jpg"
```

## Image Optimization Tips:
- Recommended size: 400x400px or larger (square aspect ratio works best)
- Format: JPG or WebP for best performance
- File size: Keep under 500KB for fast loading

Your image will appear in:
- Hero section (small avatar next to your name)
- About section (larger profile photo)