export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";    
export const USER_URL = "/api/users";
export const ORDER_URL = "/api/orders";
export const MENU_URL = "/api/menu";

export const STRIPE_URL = "/api/stripe";
