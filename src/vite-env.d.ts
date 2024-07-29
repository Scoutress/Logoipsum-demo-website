/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  // add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
