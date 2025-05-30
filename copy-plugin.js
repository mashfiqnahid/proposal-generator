const fs = require('fs-extra');
const path = require('path');

// Get the destination path from the command line
const destPath = process.argv[2];

if (!destPath) {
  console.error('❌ Error: Destination path is required.\nUsage: node copyBuild.js <destination-path>');
  process.exit(1);
}

const buildDir = path.resolve(__dirname, 'build');

// Copy React build output
try {
  fs.copySync(buildDir, destPath);
  console.log(`✅ Build copied to: ${destPath}`);
} catch (err) {
  console.error('❌ Copy failed:', err);
}
