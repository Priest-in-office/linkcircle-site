import js from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

// next/core-web-vitals bundles the React, React Hooks, jsx-a11y and Next.js rules;
// next/typescript adds typescript-eslint's recommended rules.
export default defineConfig([
  globalIgnores(['.next/**', 'out/**', 'dist/**', 'next-env.d.ts']),
  { files: ['**/*.{js,ts,tsx}'], extends: [js.configs.recommended] },
  ...nextVitals,
  ...nextTs,
  {
    // Replaces tsconfig's noUnusedLocals / noUnusedParameters, which would also
    // flag Next.js's generated .next/ types. An error, so `lint` fails on unused code.
    rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
])
