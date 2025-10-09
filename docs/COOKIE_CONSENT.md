# Cookie Consent Banner Preview

## Visual Design

### Banner (Bottom of screen)
```
┌─────────────────────────────────────────────────────┐
│ 🍪 We Value Your Privacy                            │
│                                                      │
│ We use cookies to enhance your browsing experience, │
│ analyze site traffic, and personalize content.      │
│ Learn more                                           │
│                                                      │
│ [Accept All] [Necessary Only] [⚙️ Customize]    [×] │
└─────────────────────────────────────────────────────┘
```

### Settings Modal (Center overlay)
```
┌───────────────────────────────────────────┐
│ 🛡️ Cookie Preferences                 [×] │
├───────────────────────────────────────────┤
│ Manage your cookie preferences...         │
│                                            │
│ ✅ Necessary Cookies        [ON] Required │
│ □  Analytics Cookies        [OFF]         │
│ □  Marketing Cookies        [OFF]         │
│ □  Functional Cookies       [OFF]         │
│                                            │
│                  [Cancel] [Save Preferences] │
└───────────────────────────────────────────┘
```

## User Flow

1. **First Visit**
   - Banner slides up from bottom after 1 second
   - User sees 3 options

2. **Accept All**
   - All cookies enabled
   - Banner closes
   - Preference saved to localStorage

3. **Necessary Only**
   - Only essential cookies
   - Banner closes immediately

4. **Customize**
   - Modal opens with 4 categories
   - User toggles preferences
   - Saves custom settings

5. **Return Visit**
   - Banner does NOT show
   - Preferences loaded from localStorage
   - Can change via footer/settings

## Technical Details

### LocalStorage Structure
```json
{
  "cookie-consent": {
    "necessary": true,
    "analytics": false,
    "marketing": false,
    "functional": false
  },
  "cookie-consent-date": "2025-01-09T12:00:00Z"
}
```

### Event Dispatching
```javascript
// Listen for consent changes
window.addEventListener('cookieConsentChanged', (e) => {
  const prefs = e.detail;
  
  if (prefs.analytics) {
    // Enable Google Analytics
    gtag('config', 'GA_MEASUREMENT_ID');
  }
  
  if (prefs.marketing) {
    // Enable Facebook Pixel
    fbq('init', 'FB_PIXEL_ID');
  }
});
```

## Integration Examples

### Google Analytics (Optional)
```tsx
// src/app/layout.tsx
import Script from 'next/script';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      const prefs = JSON.parse(consent);
      if (prefs.analytics) {
        // Load Google Analytics
        window.gtag('config', 'GA_ID');
      }
    }
  }, []);
  
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
```

### Netlify Analytics (Automatic)
- No code changes needed
- Respects cookie consent
- Enable in Netlify Dashboard

## Styling

### Colors
- Primary: Orange (#F97316)
- Background: White / Gray-900 (dark)
- Text: Gray-900 / Gray-100 (dark)
- Border: Gray-200 / Gray-700 (dark)

### Animations
- Slide-up: 0.3s ease-out
- Fade-in: 0.2s ease-out
- Hover effects: 0.2s transitions

### Responsive
- Mobile: Full width banner
- Desktop: Max-width 7xl container
- Modal: Max-width 2xl, centered

## Compliance

✅ GDPR Compliant (EU)
✅ CCPA Ready (California)
✅ LGPD Compatible (Brazil)

### Required Elements
- ✅ Clear explanation of cookie usage
- ✅ Link to privacy policy
- ✅ Option to reject non-essential
- ✅ Easy access to preferences
- ✅ Granular control over categories
- ✅ Persistent storage of choice

## Testing Checklist

- [ ] Banner shows on first visit
- [ ] Banner hidden after consent
- [ ] Preferences save to localStorage
- [ ] Settings modal opens/closes
- [ ] All checkboxes work
- [ ] Dark mode looks good
- [ ] Mobile responsive
- [ ] Animations smooth
- [ ] Privacy policy link works
- [ ] Can change preferences later
