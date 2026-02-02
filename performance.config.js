module.exports = {
  testURL: 'http://localhost:3000',
  performanceMetrics: {
    firstContentfulPaint: '< 1.8s',
    largestContentfulPaint: '< 2.5s',
    timeToInteractive: '< 3.5s',
    totalBlockingTime: '< 300ms',
    cumulativeLayoutShift: '< 0.1'
  },
  lighthouse: {
    performance: '>= 85',
    accessibility: '>= 90',
    bestPractices: '>= 90',
    seo: '>= 95'
  }
};
