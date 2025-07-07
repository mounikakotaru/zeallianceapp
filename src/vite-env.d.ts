/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_NOTAPI_KEY: string;
  // add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
