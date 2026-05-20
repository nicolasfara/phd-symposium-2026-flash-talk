const { execSync } = require('child_process');
try {
  console.log(execSync('which google-chrome || which google-chrome-stable || which chromium-browser || which chromium').toString());
} catch (e) {
  console.log('Not found');
}
