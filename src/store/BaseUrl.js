// BASE_URL.js
const DEV_URL = "/api";
const PROD_URL = "https://localheroes.vercel.app/api";

export const BASE_URL = import.meta.env.MODE === "development" ? DEV_URL : PROD_URL;
