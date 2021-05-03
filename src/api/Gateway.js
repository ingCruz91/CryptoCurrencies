import Axios from 'axios';

export const getRequestApiClient = async (endpoint: string) => {
  let error = null;
  let data = null;

  try {
    console.log(endpoint);
    const response = await Axios.get(endpoint);
    data = response.data;
  } catch (err) {
    error = errorHandler(err, 603);
  }
  return {
    data,
    error,
  };
};

const errorHandler = (err, code: number) => {
  if (err.response) {
    const message = err.response.data.errors
      ? err.response.data.errors.detail
      : err.response.headers.server || err.response.headers.via;
    statusCode = err.response.status;
    statusText = `Response: ${message} (${err.response.status})`;
    raw = {
      message,
      type: 'response',
      headers: err.config.headers,
      params: err.config.params,
      url: err.config.url,
      data: err.config.data,
      method: err.config.method,
    };
  } else if (err.request) {
    statusCode = err.request.status;
    statusText = `Request: ${err.request._response} (${err.request.status})`;
    raw = {
      message: err.request._response,
      type: 'request',
      headers: err.config.headers,
      params: err.config.params,
      url: err.config.url,
      data: err.config.data,
      method: err.config.method,
    };
  } else {
    statusCode = code;
    statusText = `General: ${err.message}`;
    raw = {
      message: err.message,
      type: 'general',
    };
    // console.log(`err(${JSON.stringify(err.message)})`)
  }

  return {
    statusCode,
    statusText,
    raw,
  };
};
