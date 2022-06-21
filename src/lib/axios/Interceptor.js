import axios from "axios";

import { notification } from "antd";
import { STATUS_ERROR } from "api/ApiStatus";
import { ENP_REFRESH_TOKEN } from "api/EndPoint";

import LocalStorageService from "services/LocalStorage";

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    if (!config.url.match("auth")) {
      config.headers = {
        Authorization: "Bearer " + LocalStorageService.getAuthToken(),
      };
    }
    config.baseURL = process.env.REACT_APP_BACKEND_URL;

    return config;
  },
  function (error) {
    handleError(error.response?.status);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.request.responseURL);
    if (response?.data?.message)
      notification.success({
        message: "Success",
        description: response?.data?.message || "",
        placement: "bottomLeft",
      });
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const originalRequest = error.config;
    //  there is any previous get token request
    if (
      (error.response?.status === 400 ||
        error.response?.status === 401 ||
        error.response?.status === 403) &&
      !LocalStorageService.getAuthToken()
    ) {
      handleError(error.response?.status, error.message);
      window.history.pushState({}, "", "/login?isWarning=true");
      window.history.go();
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const refreshToken = LocalStorageService.getRefreshToken();
      // make new axios call to get new auth token
      return axiosInstance.post(ENP_REFRESH_TOKEN, refreshToken).then((res) => {
        if (res.status === 201) {
          LocalStorageService.setAuthToken(res.data);
          // axiosInstance.defaults.headers.common["Authorization"] =
          //   "Bearer " + LocalStorageService.getAuthToken();
          axiosInstance.config.header = {
            Authorization: "Bearer " + LocalStorageService.getAuthToken(),
          };
          return axiosInstance(originalRequest);
        }
      });
    }
    handleError(error.response?.status, error.response?.data.message);
    return Promise.reject(error);
  }
);

function handleError(code = 0, message) {
  switch (code) {
    case STATUS_ERROR.HTTP_401_CREDENTIAL_NOT_FOUND:
      message = "Unauthenticated, try login again";
      // TODO: turn on next line to rediect to login page if auth_token exprired
      break;
    case STATUS_ERROR.HTTP_400_BAD_REQUEST:
      // message = "Bad request, recheck information ";
      break;
    case STATUS_ERROR.HTTP_404_NOT_FOUND:
      // message = "Item not found";
      break;
    case STATUS_ERROR.HTTP_500_INTERNAL_SERVER_ERROR:
      message = "Internal server error, please contact administrator";
      break;
    default:
      // if you want to use a default message instead of browser error message for unhandled error
      // message = "Unexpected error";
      break;
  }
  notification.error({
    message: "Error",
    description: message,
    placement: "bottomLeft",
  });
}

export { axiosInstance as axios };
