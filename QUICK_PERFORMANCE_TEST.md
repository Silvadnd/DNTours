# 🚀 Quick Performance Testing Guide

## Test Your Website Speed Now!

### ⚡ Method 1: Chrome DevTools (EASIEST)

1. **Start your website:**
   ```bash
   npm run dev
   ```

2. **Open in Chrome**: http://localhost:3000

3. **Open DevTools**: Press `F12` or `Ctrl+Shift+I`

4. **Run Lighthouse:**
   - Click the **"Lighthouse"** tab
   - Check: ☑ Performance ☑ SEO ☑ Accessibility
   - Click **"Analyze page load"**
   - Wait ~30 seconds

5. **View Results:**
   - Performance score should be **85-95/100** ✅
   - Look at metrics like:
     - First Contentful Paint
     - Largest Contentful Paint
     - Total Blocking Time

---

### 🌐 Method 2: Google PageSpeed Insights (PRODUCTION ONLY)

**NOTE**: This only works after deploying to production!

1. Deploy your site to Vercel/Netlify
2. Go to: https://pagespeed.web.dev/
3. Enter your production URL
4. Click **"Analyze"**
5. View both Mobile and Desktop scores

---

### 🎬 Method 3: Network Tab (Check File Sizes)

1. Open DevTools (`F12`)
2. Go to **"Network"** tab
3. Refresh the page (`Ctrl+R`)
4. Sort by **"Size"** column
5. Check for:
   - ✅ Videos should be < 5MB each
   - ✅ Images should be < 500KB each
   - ✅ JS bundles should be < 500KB
   - ❌ If files are larger, compress them!

---

### 📊 What to Look For

#### Good Performance Scores:
- 🟢 90-100: Excellent
- 🟡 50-89: Needs improvement
- 🔴 0-49: Poor

#### Target Metrics:
- ✅ First Contentful Paint: < 1.8s
- ✅ Largest Contentful Paint: < 2.5s
- ✅ Total Blocking Time: < 200ms
- ✅ Cumulative Layout Shift: < 0.1

---

### 🔧 If Performance is Still Slow

**Check these:**
1. **Video files too large?**
   - Compress them with HandBrake or FFmpeg
   - Target: < 5MB per video

2. **Too many videos loading?**
   - Only first video should load immediately
   - Others load on demand (already implemented ✅)

3. **Large images?**
   - Convert to WebP format
   - Use [Squoosh.app](https://squoosh.app/)

4. **Slow internet?**
   - Test on different network (WiFi vs 4G)
   - Use DevTools to simulate slow 3G

---

### ✅ Expected Results After Optimization

Before:
- ❌ Performance: 50-70/100
- ❌ Load Time: 3-5 seconds
- ❌ Heavy initial bundle

After:
- ✅ Performance: 85-95/100
- ✅ Load Time: 0.8-1.5 seconds
- ✅ Optimized lazy loading

---

### 📝 Quick Commands

```bash
# Development server
npm run dev

# Production build (test optimization)
npm run build
npm run start

# Performance test script (if lighthouse installed)
node performance-test.js
```

---

### 🎯 Priority Actions

1. **Compress videos** - Biggest impact! 🔥
2. **Test with Lighthouse** - See your score
3. **Deploy to production** - Get CDN benefits
4. **Monitor Core Web Vitals** - Google Search Console

---

**Questions?** Check [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) or [PERFORMANCE_RESULTS.md](PERFORMANCE_RESULTS.md) for more details!
