# 🌙 Dark Mode Implementation Guide

## Overview

Dark mode has been successfully implemented for the admin portal of the Graduate Tracking System. This feature allows administrators to toggle between light and dark themes for better viewing comfort.

## Features

✅ **Automatic Detection** - Detects system theme preference on first load
✅ **Manual Toggle** - Moon/Sun icon button in the header for easy switching
✅ **Persistent Storage** - Theme preference saved in localStorage
✅ **Smooth Transitions** - Elegant theme switching without page reload
✅ **Complete Coverage** - All UI components support dark mode

## How to Use

### For Admin Users

1. **Login to Admin Portal**
   - Navigate to the admin dashboard at `http://localhost:5173/dashboard`

2. **Toggle Dark Mode**
   - Look for the Moon/Sun icon in the header (top-right, next to notifications)
   - Click the icon to switch between light and dark modes
   - Moon icon = Switch to dark mode
   - Sun icon = Switch to light mode

3. **Theme Persistence**
   - Your theme preference is automatically saved
   - The selected theme will be remembered on next login
   - Works across browser sessions

## Technical Implementation

### Files Created/Modified

#### New Files
- `frontend/src/contexts/ThemeContext.tsx` - Theme provider and context

#### Modified Files
- `frontend/src/main.tsx` - Wrapped app with ThemeProvider
- `frontend/src/components/layout/Header.tsx` - Added dark mode toggle button
- `frontend/src/components/layout/MainLayout.tsx` - Updated background classes
- `frontend/src/components/layout/Sidebar.tsx` - Updated color classes

### How It Works

1. **ThemeContext Provider**
   ```tsx
   import { ThemeProvider } from '@/contexts/ThemeContext';
   
   // Wrap your app
   <ThemeProvider>
     <App />
   </ThemeProvider>
   ```

2. **Using Theme in Components**
   ```tsx
   import { useTheme } from '@/contexts/ThemeContext';
   
   function MyComponent() {
     const { theme, toggleTheme } = useTheme();
     
     return (
       <button onClick={toggleTheme}>
         {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
       </button>
     );
   }
   ```

3. **CSS Variables**
   - Light and dark mode colors are defined in `index.css`
   - Uses Tailwind CSS classes that automatically adapt to theme
   - Color scheme defined using HSL values for consistency

### Color Scheme

#### Light Mode
- Background: White (`hsl(0 0% 100%)`)
- Foreground: Dark Gray (`hsl(240 10% 3.9%)`)
- Primary: Blue (`hsl(221.2 83.2% 53.3%)`)

#### Dark Mode
- Background: Dark Gray (`hsl(240 10% 3.9%)`)
- Foreground: White (`hsl(0 0% 98%)`)
- Primary: Blue (`hsl(221.2 83.2% 53.3%)`)

## Customization

### Changing Dark Mode Colors

Edit `frontend/src/index.css`:

```css
.dark {
  --background: 240 10% 3.9%;        /* Main background */
  --foreground: 0 0% 98%;             /* Main text color */
  --card: 240 10% 3.9%;               /* Card background */
  --primary: 221.2 83.2% 53.3%;      /* Primary color */
  /* ... other colors */
}
```

### Adding Dark Mode to New Components

Use Tailwind's theme-aware classes:

```tsx
// Instead of hardcoded colors
<div className="bg-white text-gray-900">

// Use theme-aware classes
<div className="bg-background text-foreground">

// For cards
<div className="bg-card text-card-foreground">

// For borders
<div className="border border-border">
```

## Browser Compatibility

✅ Chrome 76+
✅ Firefox 67+
✅ Safari 12.1+
✅ Edge 79+

## Accessibility

- **Contrast Ratio**: All color combinations meet WCAG AA standards
- **Keyboard Navigation**: Toggle accessible via keyboard (Tab + Enter)
- **Screen Readers**: Button labeled with appropriate ARIA attributes
- **System Preference**: Respects `prefers-color-scheme` media query

## Testing

1. **Manual Testing**
   ```bash
   # Start the frontend
   cd frontend
   npm run dev
   
   # Open browser and test:
   # 1. Toggle dark mode button
   # 2. Refresh page - theme should persist
   # 3. Check all pages for proper colors
   ```

2. **System Preference Testing**
   - Change your OS theme (Windows/Mac dark mode)
   - Clear browser localStorage
   - Reload the app - should match OS theme

3. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify smooth transitions
   - Check for any visual glitches

## Troubleshooting

### Issue: Theme not persisting after refresh

**Solution**: Check browser localStorage permissions
```javascript
// Open browser console
localStorage.getItem('theme')
// Should return 'light' or 'dark'
```

### Issue: Some components not updating

**Solution**: Ensure components use theme-aware Tailwind classes
```tsx
// Bad
className="bg-white"

// Good
className="bg-background"
```

### Issue: Flash of wrong theme on load

**Solution**: The ThemeProvider checks localStorage before rendering, but if you see a flash:
1. Ensure ThemeProvider is at the top level
2. Check that initial theme detection runs before DOM render

## Future Enhancements

- [ ] Add theme option in Settings page
- [ ] Add custom color themes (blue, green, purple)
- [ ] Add high contrast mode for accessibility
- [ ] Sync theme across multiple browser tabs
- [ ] Add theme transition animation options
- [ ] Extend dark mode to Graduate Portal

## Support

For issues or questions about dark mode:
- Check the console for errors
- Verify all dependencies are installed
- Ensure you're using the latest code version
- Report bugs via GitHub Issues

---

**Last Updated**: November 22, 2025
**Version**: 1.0.0
**Status**: ✅ Fully Implemented for Admin Portal
