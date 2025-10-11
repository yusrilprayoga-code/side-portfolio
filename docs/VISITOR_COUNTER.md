# 👥 Live Visitor Counter

Real-time visitor counter badge yang tampil di pojok kiri bawah website.

---

## 🎯 Features

### **Simple Version** (`LiveVisitorCounter.tsx`)
✅ **Tanpa database** - Pure client-side
✅ **Simulasi realistis** - Random 1-15 visitors
✅ **Auto-update** - Setiap 10-30 detik
✅ **Smooth animations** - Scale & fade effects
✅ **Hover tooltip** - Info tambahan saat hover

### **Advanced Version** (`LiveVisitorCounterWithAPI.tsx`)
✅ **API tracking** - Real visitor count dari server
✅ **Session management** - Track unique visitors
✅ **Peak count** - Lihat peak visitors
✅ **Auto-cleanup** - Remove inactive visitors (2 min timeout)
✅ **Heartbeat system** - Update setiap 30 detik

---

## 📱 Display

### Position & Style
```
┌─────────────────────────────┐
│                             │
│                             │
│                             │
│                             │
│  ┌────────────────┐         │
│  │ ⚫ 👥 5 online │ ← Badge │
│  └────────────────┘         │
└─────────────────────────────┘
  Bottom-left corner
  Z-index: 9998
```

### Visual Elements
- **Green gradient badge** with pulse animation
- **Live dot indicator** with ping effect
- **User icon** from lucide-react
- **Count number** with smooth transitions
- **Hover tooltip** with additional stats

---

## 🔄 Switching Versions

### Currently Using: **Simple Version** (No API)

To switch to **API version** with real tracking:

```tsx
// src/app/layout.tsx
import LiveVisitorCounterWithAPI from "@/components/LiveVisitorCounterWithAPI";

// Replace
<LiveVisitorCounter />

// With
<LiveVisitorCounterWithAPI />
```

---

## 🛠️ API Endpoints (Advanced Version)

### `GET /api/visitors`
Get current visitor count
```javascript
const response = await fetch('/api/visitors');
const { count, timestamp } = await response.json();
```

### `POST /api/visitors`
Register/update visitor session
```javascript
await fetch('/api/visitors', {
  method: 'POST',
  body: JSON.stringify({ sessionId: 'unique_id' }),
});
```

### `DELETE /api/visitors`
Remove visitor on page unload
```javascript
await fetch('/api/visitors', {
  method: 'DELETE',
  body: JSON.stringify({ sessionId: 'unique_id' }),
});
```

---

## ⚙️ Configuration

### Simple Version Settings

```typescript
// src/components/LiveVisitorCounter.tsx

// Visitor range (line 19-23)
const baseCount = 1;
const randomVariation = Math.floor(Math.random() * 5); // 0-4

// Update interval (line 31)
Math.random() * 20000 + 10000  // 10-30 seconds

// Min/Max visitors (line 36)
Math.max(1, Math.min(15, newCount))  // Keep 1-15
```

### API Version Settings

```typescript
// src/components/LiveVisitorCounterWithAPI.tsx

// Heartbeat interval (line 51)
setInterval(updateVisitorCount, 30000); // 30 seconds

// src/app/api/visitors/route.ts

// Inactive timeout (line 13)
if (now - timestamp > 120000) // 2 minutes

// Cleanup interval (line 16)
}, 300000); // 5 minutes
```

---

## 🎨 Customization

### Change Colors

```tsx
// From green to blue
className="bg-gradient-to-r from-blue-500 to-cyan-500"

// Border color
className="border border-blue-400/30"
```

### Change Position

```tsx
// Bottom-right instead of bottom-left
className="fixed bottom-4 right-4 z-[9998]"

// Top-right
className="fixed top-20 right-4 z-[9998]"
```

### Change Size

```tsx
// Larger badge
className="px-5 py-3 rounded-full"
<Users className="w-5 h-5" />
<span className="text-base">

// Smaller badge
className="px-3 py-1.5 rounded-full"
<Users className="w-3 h-3" />
<span className="text-xs">
```

---

## 🧪 Testing

### Test Simple Version
1. Open website
2. Watch counter change every 10-30 seconds
3. Hover to see tooltip

### Test API Version
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Test endpoints
curl http://localhost:3000/api/visitors

# Open multiple tabs/browsers
# Count should increase
```

### Test in Production
```javascript
// Browser console
setInterval(async () => {
  const res = await fetch('/api/visitors');
  const data = await res.json();
  console.log('Visitors:', data.count);
}, 5000);
```

---

## 🚀 Production Considerations

### For High Traffic Sites

Replace in-memory Map with **Redis/Upstash**:

```typescript
// Install: npm install @upstash/redis
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Store visitor
await redis.setex(`visitor:${sessionId}`, 120, Date.now());

// Get count
const keys = await redis.keys('visitor:*');
const count = keys.length;
```

### Environment Variables
```env
# .env.local
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

---

## 📊 Analytics Integration

Track visitor patterns:

```typescript
// Add to API route
import { track } from '@vercel/analytics';

track('visitor_count', {
  count: activeVisitors.size,
  timestamp: Date.now(),
});
```

---

## 🐛 Troubleshooting

### Counter Not Updating
- Check browser console for errors
- Verify API endpoint is accessible
- Check session ID is being generated

### Count Always 1
- Multiple tabs/browsers needed to test
- Check visitor cleanup timeout (might be too short)
- Verify Map is persisting between requests

### Badge Hidden
- Check z-index conflicts
- Verify bottom-left corner not blocked by other elements
- Check if cookie banner overlapping (adjust position)

---

## 🎯 Z-Index Hierarchy

```
Cookie Consent:     z-9999  (highest)
Live Visitor:       z-9998
Online Indicator:   z-10000 (toast)
Sidebar:            z-100
```

---

## 📈 Performance

### Simple Version
- **0 KB** data transfer
- **Minimal CPU** - setTimeout only
- **No server load**
- Perfect for portfolios

### API Version
- **~100 bytes** per heartbeat (every 30s)
- **Minimal server load** - in-memory Map
- **Auto-cleanup** - no memory leaks
- Suitable for production

---

## 🎉 Benefits

✅ **Social Proof** - Show site is active
✅ **Engagement** - Users feel part of community
✅ **Modern UI** - Professional look
✅ **Lightweight** - No heavy dependencies
✅ **Customizable** - Easy to modify
✅ **Privacy-friendly** - No user tracking

---

**Current Version:** Simple (No API)  
**Created:** 2025-01-11  
**Status:** ✅ Active
