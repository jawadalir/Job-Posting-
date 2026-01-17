const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Paths
const backendPath = path.join(__dirname, 'backend');
const frontendPath = path.join(__dirname, 'frontend');

console.log(`${colors.cyan}${colors.bright}Starting Job Posting Application...${colors.reset}\n`);

// Determine which command to run based on NODE_ENV or argument
const mode = process.argv[2] === 'prod' ? 'prod' : 'dev';

// Start Backend Server
const backendCommand = mode === 'dev' 
  ? `npm run dev --prefix ${backendPath}`
  : `npm start --prefix ${backendPath}`;

const backend = spawn(backendCommand, [], {
  shell: true,
  stdio: 'inherit',
  env: { ...process.env }
});

// Start Frontend Server  
const frontendCommand = `npm start --prefix ${frontendPath}`;

const frontend = spawn(frontendCommand, [], {
  shell: true,
  stdio: 'inherit',
  env: { ...process.env }
});

// Handle process exit
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}Shutting down servers...${colors.reset}`);
  backend.kill();
  frontend.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log(`\n${colors.yellow}Shutting down servers...${colors.reset}`);
  backend.kill();
  frontend.kill();
  process.exit();
});

// Handle errors
backend.on('error', (error) => {
  console.error(`${colors.red}Backend error:${colors.reset}`, error);
});

frontend.on('error', (error) => {
  console.error(`${colors.red}Frontend error:${colors.reset}`, error);
});

// Handle exit codes
backend.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`${colors.red}Backend exited with code ${code}${colors.reset}`);
    frontend.kill();
    process.exit(code);
  }
});

frontend.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`${colors.red}Frontend exited with code ${code}${colors.reset}`);
    backend.kill();
    process.exit(code);
  }
});

console.log(`${colors.green}✓ Backend server starting...${colors.reset}`);
console.log(`${colors.green}✓ Frontend server starting...${colors.reset}\n`);
console.log(`${colors.cyan}Backend: http://localhost:5000${colors.reset}`);
console.log(`${colors.cyan}Frontend: http://localhost:3000${colors.reset}\n`);
console.log(`${colors.yellow}Press Ctrl+C to stop both servers${colors.reset}\n`);

