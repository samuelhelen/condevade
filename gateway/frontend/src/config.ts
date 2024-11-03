// TODO: add some more path to the url both here and in the gateway.
// extract the PORT.

// For running with docker compose up --build
// nginx proxies to service1, therefore localhost here:
export const BASE_URL = "http://localhost:8198/api";
// For separate running and testing
// export const BASE_URL = "http://localhost:8199/api";
