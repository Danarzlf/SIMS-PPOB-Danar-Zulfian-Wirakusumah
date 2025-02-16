// Base URL
const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

// API Endpoint
export const API_ENDPOINT = {
  // Auth
  AUTH_REGISTRATION: `${BASE_URL}/registration`, // [POST] Registration User
  AUTH_LOGIN: `${BASE_URL}/login`, // [POST] Login User

  // Profile
  GET_PROFILE: `${BASE_URL}/profile`, // [GET] GET Profile
  PUT_UPDATE_PROFILE: `${BASE_URL}/profile/update`, // [PUT] Update Profile
  PUT_UPDATE_IMAGE_PROFILE: `${BASE_URL}/profile/image`, // [PUT] Update Image Profile

  // Module Information
  GET_BANNER: `${BASE_URL}/banner`, // [GET] GET Banner
  GET_SERVICES: `${BASE_URL}/services`, // [GET] GET Services

  // Module Transaction
  GET_BALANCE: `${BASE_URL}/balance`, // [GET] GET Balance
  POST_TOPUP: `${BASE_URL}/topup`, // [POST] POST Topup
  POST_TRANSACTION: `${BASE_URL}/transaction`, // [POST] POST Transaction
  GET_HISTORY_TRANSACTION: `${BASE_URL}/transaction/history`, // [GET] GET History Transaction
};
