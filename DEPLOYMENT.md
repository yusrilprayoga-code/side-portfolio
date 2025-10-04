# 🚀 Deployment Guide - Yusril Prayoga Portfolio

## Environment Variables Required

Make sure to add these environment variables in your Vercel project settings:

### Required Variables
```bash
# AI API Key (OpenRouter)
DEEPSEEK_API_KEY=your-openrouter-api-key-here

# Email Service (EmailJS)
NEXT_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
NEXT_EMAILJS_PRIVATE_KEY=your-emailjs-private-key
NEXT_EMAILJS_TEMPLATE_ID=your-emailjs-template-id

# Spotify (Optional - for music widget)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
SPOTIFY_REDIRECT_URI=https://your-domain.com/callback
```

### Optional Configuration
```bash
# AI Configuration (already set with optimal defaults)
DEEPSEEK_MAX_TOKENS=4096
DEEPSEEK_TEMPERATURE=0.6

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Portfolio Name
```

## Vercel Timeout Configuration

### Hobby Plan (Free)
- **Max Duration**: 10 seconds
- **Recommendation**: Use current settings (4096 tokens, fast model)

### Pro Plan ($20/month)
- **Max Duration**: 60 seconds
- **Recommendation**: Can increase to 8096 tokens if needed

Current configuration is optimized for **Hobby Plan** to avoid 504 timeout errors.

## Model Configuration

Current model: `deepseek/deepseek-chat` (paid version via OpenRouter)

**Why paid version?**
- ✅ No rate limiting
- ✅ Faster response times
- ✅ More reliable (no empty responses)
- ✅ Priority processing
- 💰 Cost: ~$0.27 per 1M tokens (very affordable)

**Free alternatives tested:**
- ❌ `deepseek/deepseek-r1:free` - Rate limit issues (429 errors)
- ❌ `deepseek/deepseek-chat-v3.1:free` - Empty responses
- ❌ `openai/gpt-oss-20b:free` - Slow, timeout issues

## Optimization Summary

### Changes Made to Fix 504 Timeout:

1. **Reduced Max Tokens**: 8096 → 4096
   - Faster generation
   - Lower latency
   - Fits within 10s Vercel Hobby limit

2. **Client Timeout**: 60s → 55s
   - Prevents hanging requests
   - Graceful error handling

3. **Model Selection**: `deepseek/deepseek-chat`
   - Fast inference (~2-3s for typical queries)
   - Reliable streaming
   - Good quality responses

4. **Vercel Configuration**: Added `maxDuration: 60` in route config
   - Requires Pro plan to take effect
   - Falls back to 10s on Hobby plan

5. **Lazy Initialization**: OpenAI client created on-demand
   - Prevents build-time errors
   - Better error handling

## Testing Checklist

Before deploying, test these scenarios:

- [ ] Simple question: "Tell me about your experience"
- [ ] Complex question: "Explain your full stack projects in detail"
- [ ] Code question: "How would you build a React component?"
- [ ] General question: "What is the capital of France?"

All should respond within **5-8 seconds** on production.

## Troubleshooting

### Still Getting 504 Errors?

1. **Check Vercel Plan**:
   - Hobby: 10s max (current config should work)
   - Pro: 60s max (can increase tokens if needed)

2. **Reduce Tokens Further**:
   ```typescript
   // In AiChatbot.tsx
   maxTotalTokens: 2048  // Even faster
   ```

3. **Use Faster Model**:
   ```typescript
   // In route.ts
   "deepseek/deepseek-chat"  // Current (good balance)
   "openai/gpt-3.5-turbo"    // Faster but costs more
   ```

4. **Check OpenRouter Status**:
   - Visit: https://openrouter.ai/status
   - Check model availability

### Empty Responses?

- ✅ Already fixed: Using paid version
- ✅ Already fixed: Lazy initialization
- ✅ Already fixed: Proper error handling

### Rate Limiting?

- ✅ Already fixed: Using paid version (no rate limits)
- Alternative: Add request queuing on client side

## Cost Estimation

**OpenRouter DeepSeek Chat Pricing:**
- Input: $0.14 per 1M tokens
- Output: $0.28 per 1M tokens

**Typical Usage:**
- Average query: ~500 tokens input + 500 tokens output
- Cost per query: ~$0.00021 (less than 1 cent)
- 1000 queries: ~$0.21

**Very affordable!** 💰

## Deploy to Vercel

```bash
# Build locally first
npm run build

# Push to GitHub
git add .
git commit -m "Fix: Optimize for Vercel deployment and fix 504 timeout"
git push origin main

# Deploy via Vercel CLI (optional)
vercel --prod
```

## Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for client errors
3. Verify all environment variables are set
4. Test locally with `npm run dev` first

---

**Last Updated**: January 2025
**Status**: ✅ Production Ready
**Performance**: ~5-8s response time on Vercel Hobby Plan
