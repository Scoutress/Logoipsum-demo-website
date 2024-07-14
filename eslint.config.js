import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        window: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": ["warn"],
      indent: ["warn", 2],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "no-var": ["error"],
      curly: ["error", "all"],
      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: true },
      ],
      "no-undef": ["error"],
      "consistent-return": ["error"],
      "no-trailing-spaces": ["error"],
      "eol-last": ["error", "always"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "space-before-blocks": ["error", "always"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "comma-dangle": ["error", "always-multiline"],
      "no-mixed-spaces-and-tabs": "off",
    },
  },
  {
    ignores: ["node_modules/**/*"],
  },
  pluginJs.configs.recommended,
];
