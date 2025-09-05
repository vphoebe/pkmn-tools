// eslint.config.js
import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import prettier from "eslint-plugin-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: ["node_modules", ".next", "dist", "build", "coverage"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "@next/next": nextPlugin,
      prettier,
      "react-hooks": reactHooks,
    },
    rules: {
      // ESLint core
      ...js.configs.recommended.rules,

      // TypeScript
      ...tseslint.configs.recommendedTypeChecked[0].rules,
      ...tseslint.configs.stylisticTypeChecked[0].rules,

      // Next.js recommended + Core Web Vitals
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,

      ...reactHooks.configs.recommended.rules,

      // Prettier (make ESLint show Prettier issues as errors)
      "prettier/prettier": "error",

      // Overrides / project-specific tweaks
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
]
