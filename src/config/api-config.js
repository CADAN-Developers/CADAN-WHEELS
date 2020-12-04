let backendHost;

const apiVersion = "v1";

const hostname = window && window.location && window.location.hostname;

if(hostname === 'cadanback.herokuapp.com') {
  backendHost = 'https://cadanback.herokuapp.com';
} else if(hostname === 'staging.realsite.com') {
  backendHost = 'https://cadanback.herokuapp.com';
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;
// export const API_ROOT = `${backendHost}`;