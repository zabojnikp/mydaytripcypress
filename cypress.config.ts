import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://website.staging.mydaytrip.net/',
  }
})
