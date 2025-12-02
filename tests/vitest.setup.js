// 🎯 CRITICAL FIX: Direct Node.js Module Interception
// This is required because Vitest's configuration hooks are being bypassed 
// by the raw 'require' or 'import' call inside Vuetify's source code.
// This code uses Node's CommonJS 'require.extensions' to hook into module loading.

// Store the original handler for .css files, if one exists
const originalRequire = require.extensions['.css'];

// Define a new require extension handler for .css files
require.extensions['.css'] = (module, filename) => {
  // Check if the file being loaded is inside node_modules and is a CSS asset
  if (filename.includes('node_modules') && (filename.endsWith('.css') || filename.endsWith('.scss'))) {
    // Immediately export an empty object, effectively mocking the file content
    module.exports = {};
  } else if (originalRequire) {
    // If it's a non-mocked CSS file outside node_modules, use the original handler
    originalRequire(module, filename);
  } else {
    // Default fallback: return empty module
    module.exports = {};
  }
};

// Apply the same interception handler for SCSS files
require.extensions['.scss'] = require.extensions['.css']; 

// --- BEGIN ORIGINAL VUETIFY SETUP CODE ---

import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

// Import your Vuetify plugin file
import vuetify from '../src/plugins/vuetify'; 

// Initialize the full Vuetify instance
const v = createVuetify(vuetify);

// Configure Vue Test Utils to use the full Vuetify instance globally
config.global.plugins.push(v);

/*// Add this block inside the 'testProperties' object:
resolve: {
    mainFields: ['module', 'main'],
},*/