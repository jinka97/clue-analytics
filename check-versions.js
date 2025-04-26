import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

// Read package.json
const packageJsonPath = './package.json';
const packageJsonRaw = readFileSync(packageJsonPath, 'utf-8');
const packageJson = JSON.parse(packageJsonRaw);

const requiredVersions = {
  'react-router-dom': '^6.30.0',
  'vite': '^5.4.9',
};

let hasError = false;
let updated = false;

Object.keys(requiredVersions).forEach((dep) => {
  const expected = requiredVersions[dep];
  const actual = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
  if (!actual) {
    console.error(`❌ Dependency ${dep} is missing in package.json`);
    hasError = true;
  } else if (actual !== expected) {
    console.warn(`⚠️ Dependency ${dep} has incorrect version. Expected: ${expected}, Actual: ${actual}`);
    console.log(`Fixing ${dep} version to ${expected}...`);
    if (packageJson.dependencies[dep]) {
      packageJson.dependencies[dep] = expected;
    } else if (packageJson.devDependencies[dep]) {
      packageJson.devDependencies[dep] = expected;
    }
    updated = true;
  }
});

if (hasError) {
  console.error('❌ Critical errors found. Please manually fix package.json.');
  process.exit(1);
}

if (updated) {
  // Write the updated package.json back to disk
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
  console.log('✅ Updated package.json with correct dependency versions.');

  // Run npm install to ensure dependencies are installed with the correct versions
  console.log('Running npm install to update dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies updated successfully.');
  } catch (error) {
    console.error('❌ Failed to run npm install. Please run it manually.');
    process.exit(1);
  }
} else {
  console.log('✅ All dependency versions are correct.');
}
