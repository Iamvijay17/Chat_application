export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = 'api/v1/auth';
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update_profile`;
export const UPDATE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/update_profile_image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove_profile_image`;