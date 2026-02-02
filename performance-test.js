/**
 * Performance Testing Script for DN Tours Website
 * Run this script to test your website's loading performance
 */

import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { writeFileSync } from 'fs';

const url = 'http://localhost:3000'; // Change to your production URL when deployed

async function runLighthouse() {
  console.log('🚀 Starting performance test for DN Tours...\n');
  
  const chrome = await launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port
  };

  try {
    const runnerResult = await lighthouse(url, options);

    // Get the report
    const reportHtml = runnerResult.report;
    writeFileSync('lighthouse-report.html', reportHtml);

    // Get scores
    const scores = runnerResult.lhr.categories;
    
    console.log('📊 Performance Test Results:\n');
    console.log(`⚡ Performance:    ${(scores.performance.score * 100).toFixed(0)}/100`);
    console.log(`♿ Accessibility:  ${(scores.accessibility.score * 100).toFixed(0)}/100`);
    console.log(`✅ Best Practices: ${(scores['best-practices'].score * 100).toFixed(0)}/100`);
    console.log(`🔍 SEO:           ${(scores.seo.score * 100).toFixed(0)}/100\n`);

    // Performance metrics
    const metrics = runnerResult.lhr.audits;
    console.log('🎯 Key Performance Metrics:\n');
    console.log(`First Contentful Paint:  ${metrics['first-contentful-paint'].displayValue}`);
    console.log(`Largest Contentful Paint: ${metrics['largest-contentful-paint'].displayValue}`);
    console.log(`Time to Interactive:     ${metrics['interactive'].displayValue}`);
    console.log(`Speed Index:            ${metrics['speed-index'].displayValue}`);
    console.log(`Total Blocking Time:    ${metrics['total-blocking-time'].displayValue}`);
    console.log(`Cumulative Layout Shift: ${metrics['cumulative-layout-shift'].displayValue}\n`);

    console.log('📄 Full report saved to: lighthouse-report.html\n');

    // Performance recommendations
    if (scores.performance.score < 0.9) {
      console.log('⚠️  Performance Recommendations:');
      console.log('   - Consider compressing video files');
      console.log('   - Enable caching headers');
      console.log('   - Optimize images further');
      console.log('   - Use a CDN for static assets\n');
    } else {
      console.log('✅ Excellent performance! Your site is fast.\n');
    }

  } catch (error) {
    console.error('Error running Lighthouse:', error);
  } finally {
    await chrome.kill();
  }
}

// Simple fallback test if Lighthouse is not installed
async function simplePerformanceTest() {
  console.log('🔍 Running simple performance check...\n');
  console.log('To run full Lighthouse test, install dependencies:');
  console.log('npm install --save-dev lighthouse chrome-launcher\n');
  
  console.log('Manual Performance Checklist:');
  console.log('✅ 1. Open DevTools (F12) → Lighthouse tab');
  console.log('✅ 2. Run "Performance" and "SEO" audits');
  console.log('✅ 3. Check Network tab for large files (> 1MB)');
  console.log('✅ 4. Verify images are loading in WebP/AVIF format');
  console.log('✅ 5. Check Coverage tab for unused CSS/JS');
  console.log('✅ 6. Test on mobile device or mobile view');
}

// Run the appropriate test
if (require.main === module) {
  // Check if lighthouse is available
  try {
    require.resolve('lighthouse');
    runLighthouse();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    simplePerformanceTest();
  }
}
