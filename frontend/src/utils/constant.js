export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = 'api/v1/auth';

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update_profile`;
export const UPDATE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/update_profile_image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove_profile_image`;
export const LOGOUT_ROUTES = `${AUTH_ROUTES}/logout`;


export const CONTACTS_ROUTES = 'api/v1/contacts';
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;
export const GET_DM_CONTACT_ROUTES = `${CONTACTS_ROUTES}/get_contacts_dm`;


export const MESSAGES_ROUTES = 'api/v1/messages';
export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get_messages`;
export const UPLOAD_FILE_ROUTES = `${MESSAGES_ROUTES}/upload_file`;