import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 45_000,
  fullyParallel: false,
  reporter: [['list'], ['html', { outputFolder: 'artifacts/playwright-report', open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:5173', trace: 'retain-on-failure', video: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    { command: 'npm.cmd run dev:api', url: 'http://127.0.0.1:3000/api/health', reuseExistingServer: true, timeout: 120_000 },
    { command: 'npm.cmd run dev', url: 'http://127.0.0.1:5173', reuseExistingServer: true, timeout: 120_000 },
  ],
});
