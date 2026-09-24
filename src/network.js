/*
 * =========================================================
 * ZEPPCORE NETWORK
 * =========================================================
 *
 * HTTP networking helpers for Zepp OS.
 *
 * IMPORTANT:
 *
 * Zepp's Fetch API is a SIDE SERVICE API.
 *
 * That means:
 *
 *   app-side/index.js   -> can use network()
 *   page/index.page.js  -> should NOT perform HTTP requests
 *
 * The functions in this file are safe to import anywhere,
 * but actual requests must run where Zepp's global fetch()
 * is available.
 *
 *
 * Examples:
 *
 * import {
 *   get,
 *   getJSON,
 *   postJSON,
 *   buildURL
 * } from "zeppcore";
 *
 *
 * const weather =
 *   await getJSON(
 *     "https://example.com/weather"
 *   );
 *
 *
 * const result =
 *   await postJSON(
 *     "https://example.com/api",
 *     {
 *       name: "Divan"
 *     }
 *   );
 *
 *
 * =========================================================
 */


/* =========================================================
 * NETWORK AVAILABILITY
 * ========================================================= */


/**
 * Check whether Zepp's Fetch API is available.
 *
 * This is useful because ZeppCore can be imported from both
 * Device App and Side Service code.
 *
 * Returns:
 *
 * true  = fetch() exists
 * false = fetch() does not exist
 */
export function isNetworkAvailable() {
  return (
    typeof fetch ===
    "function"
  );
}


/**
 * Throw a useful error when network access is attempted
 * from an environment that does not expose fetch().
 */
export function assertNetworkAvailable() {
  if (
    !isNetworkAvailable()
  ) {
    throw new Error(
      "ZeppCore network requests require the Zepp OS Side Service."
    );
  }

  return true;
}


/* =========================================================
 * URL HELPERS
 * ========================================================= */


/**
 * Build a URL with query parameters.
 *
 * Example:
 *
 * buildURL(
 *   "https://api.example.com/weather",
 *   {
 *     latitude: -26.2041,
 *     longitude: 28.0473,
 *     hourly: "temperature_2m"
 *   }
 * );
 *
 * Result:
 *
 * https://api.example.com/weather?latitude=-26.2041&...
 */
export function buildURL(
  baseURL,
  params = {}
) {
  if (
    typeof baseURL !==
    "string"
  ) {
    throw new TypeError(
      "buildURL requires a string URL"
    );
  }


  const entries =
    Object.entries(
      params
    );

  if (
    entries.length === 0
  ) {
    return baseURL;
  }


  const query = entries
    .filter(
      ([, value]) =>
        value !== undefined &&
        value !== null
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");


  if (!query) {
    return baseURL;
  }


  const separator =
    baseURL.includes("?")
      ? (
          baseURL.endsWith("?") ||
          baseURL.endsWith("&")
            ? ""
            : "&"
        )
      : "?";


  return (
    baseURL +
    separator +
    query
  );
}


/**
 * Convert a parameter object into a query string.
 *
 * Example:
 *
 * encodeQuery({
 *   page: 1,
 *   limit: 20
 * });
 *
 * Returns:
 *
 * page=1&limit=20
 */
export function encodeQuery(
  params = {}
) {
  return Object.entries(
    params
  )
    .filter(
      ([, value]) =>
        value !== undefined &&
        value !== null
    )
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
}


/* =========================================================
 * REQUEST CORE
 * ========================================================= */


/**
 * Perform a raw HTTP request.
 *
 * Supported options:
 *
 * {
 *   method: "GET",
 *   headers: {},
 *   body: ...
 * }
 *
 * Zepp's Fetch API supports:
 *
 *   url
 *   method
 *   headers
 *   body
 *
 * The native response is returned unchanged.
 *
 * Example:
 *
 * const response =
 *   await request(
 *     "https://example.com"
 *   );
 */
export async function request(
  url,
  options = {}
) {
  assertNetworkAvailable();


  if (
    typeof url !==
    "string"
  ) {
    throw new TypeError(
      "request requires a string URL"
    );
  }


  const {
    method = "GET",
    headers = {},
    body
  } = options;


  const requestOptions = {
    url,
    method:
      String(method)
        .toUpperCase(),
    headers
  };


  if (
    body !== undefined
  ) {
    requestOptions.body =
      body;
  }


  return fetch(
    requestOptions
  );
}


/**
 * GET request.
 */
export function get(
  url,
  options = {}
) {
  return request(
    url,
    {
      ...options,
      method: "GET"
    }
  );
}


/**
 * POST request.
 */
export function post(
  url,
  body,
  options = {}
) {
  return request(
    url,
    {
      ...options,
      method: "POST",
      body
    }
  );
}


/**
 * PUT request.
 */
export function put(
  url,
  body,
  options = {}
) {
  return request(
    url,
    {
      ...options,
      method: "PUT",
      body
    }
  );
}


/**
 * PATCH request.
 */
export function patch(
  url,
  body,
  options = {}
) {
  return request(
    url,
    {
      ...options,
      method: "PATCH",
      body
    }
  );
}


/**
 * DELETE request.
 */
export function del(
  url,
  options = {}
) {
  return request(
    url,
    {
      ...options,
      method: "DELETE"
    }
  );
}


/* =========================================================
 * JSON REQUESTS
 * ========================================================= */


/**
 * Create standard JSON headers.
 *
 * Returns a new object so callers can safely modify it.
 */
export function jsonHeaders(
  extra = {}
) {
  return {
    "Content-Type":
      "application/json",
    ...extra
  };
}


/**
 * Convert a JavaScript value into a JSON HTTP body.
 */
export function jsonBody(
  data
) {
  return JSON.stringify(
    data
  );
}


/**
 * POST JSON.
 *
 * Example:
 *
 * const result =
 *   await postJSON(
 *     "https://example.com/api",
 *     {
 *       hello: "world"
 *     }
 *   );
 */
export async function postJSON(
  url,
  data,
  options = {}
) {
  const response =
    await post(
      url,
      jsonBody(data),
      {
        ...options,

        headers:
          jsonHeaders(
            options.headers
          )
      }
    );


  return parseJSONResponse(
    response
  );
}


/**
 * PUT JSON.
 */
export async function putJSON(
  url,
  data,
  options = {}
) {
  const response =
    await put(
      url,
      jsonBody(data),
      {
        ...options,

        headers:
          jsonHeaders(
            options.headers
          )
      }
    );


  return parseJSONResponse(
    response
  );
}


/**
 * PATCH JSON.
 */
export async function patchJSON(
  url,
  data,
  options = {}
) {
  const response =
    await patch(
      url,
      jsonBody(data),
      {
        ...options,

        headers:
          jsonHeaders(
            options.headers
          )
      }
    );


  return parseJSONResponse(
    response
  );
}


/**
 * GET JSON.
 *
 * Example:
 *
 * const weather =
 *   await getJSON(
 *     buildURL(
 *       "https://api.example.com/weather",
 *       {
 *         city: "Johannesburg"
 *       }
 *     )
 *   );
 */
export async function getJSON(
  url,
  options = {}
) {
  const response =
    await get(
      url,
      options
    );


  return parseJSONResponse(
    response
  );
}


/**
 * DELETE and parse the returned body as JSON.
 */
export async function deleteJSON(
  url,
  options = {}
) {
  const response =
    await del(
      url,
      options
    );


  return parseJSONResponse(
    response
  );
}


/* =========================================================
 * RESPONSE HELPERS
 * ========================================================= */


/**
 * Extract the body from a native Zepp Fetch response.
 *
 * Zepp documentation notes that response.body may be:
 *
 *   object
 *   string containing JSON
 *
 * This helper normalizes the easy cases.
 */
export function getResponseBody(
  response
) {
  if (
    response ===
    null ||
    response ===
    undefined
  ) {
    return undefined;
  }


  return response.body;
}


/**
 * Convert a response body into text.
 *
 * If the body is already a string, it is returned directly.
 *
 * If it is an object, JSON.stringify() is used.
 */
export function responseText(
  response
) {
  const body =
    getResponseBody(
      response
    );


  if (
    body ===
    undefined ||
    body ===
    null
  ) {
    return "";
  }


  if (
    typeof body ===
    "string"
  ) {
    return body;
  }


  return JSON.stringify(
    body
  );
}


/**
 * Parse the response body as JSON.
 *
 * Handles both:
 *
 *   body = object
 *
 * and:
 *
 *   body = '{"hello":"world"}'
 */
export function responseJSON(
  response,
  defaultValue = null
) {
  const body =
    getResponseBody(
      response
    );


  if (
    body ===
    undefined ||
    body ===
    null
  ) {
    return defaultValue;
  }


  if (
    typeof body ===
    "object"
  ) {
    return body;
  }


  if (
    typeof body !==
    "string"
  ) {
    return defaultValue;
  }


  try {
    return JSON.parse(
      body
    );
  } catch {
    return defaultValue;
  }
}


/**
 * Parse a response body as JSON.
 *
 * Unlike responseJSON(), this throws when invalid JSON
 * is returned.
 */
export function responseJSONStrict(
  response
) {
  const body =
    getResponseBody(
      response
    );


  if (
    typeof body ===
    "object"
  ) {
    return body;
  }


  if (
    typeof body ===
    "string"
  ) {
    return JSON.parse(
      body
    );
  }


  throw new Error(
    "Response body is not valid JSON data."
  );
}


/* =========================================================
 * HIGH-LEVEL REQUEST HELPERS
 * ========================================================= */


/**
 * GET a URL and return its text body.
 */
export async function getText(
  url,
  options = {}
) {
  const response =
    await get(
      url,
      options
    );


  return responseText(
    response
  );
}


/**
 * POST a string/text body and return text.
 */
export async function postText(
  url,
  text,
  options = {}
) {
  const response =
    await post(
      url,
      String(text),
      options
    );


  return responseText(
    response
  );
}


/**
 * GET and parse JSON.
 *
 * This is the recommended helper for most REST APIs.
 */
export async function requestJSON(
  url,
  options = {}
) {
  const response =
    await request(
      url,
      options
    );


  return responseJSON(
    response
  );
}


/**
 * GET text with a fallback value.
 */
export async function getTextSafe(
  url,
  defaultValue = "",
  options = {}
) {
  try {

    return await getText(
      url,
      options
    );

  } catch {

    return defaultValue;

  }
}


/**
 * GET JSON with a fallback value.
 */
export async function getJSONSafe(
  url,
  defaultValue = null,
  options = {}
) {
  try {

    return await getJSON(
      url,
      options
    );

  } catch {

    return defaultValue;

  }
}


/**
 * POST JSON with a fallback value.
 */
export async function postJSONSafe(
  url,
  data,
  defaultValue = null,
  options = {}
) {
  try {

    return await postJSON(
      url,
      data,
      options
    );

  } catch {

    return defaultValue;

  }
}


/* =========================================================
 * API BUILDER
 * ========================================================= */


/**
 * Create a small reusable API client.
 *
 * Example:
 *
 * const api =
 *   createAPI(
 *     "https://example.com/api",
 *     {
 *       Authorization:
 *         "Bearer TOKEN"
 *     }
 *   );
 *
 *
 * const users =
 *   await api.getJSON(
 *     "/users"
 *   );
 */
export function createAPI(
  baseURL,
  defaultHeaders = {}
) {

  function resolveURL(
    path
  ) {
    if (
      /^https?:\/\//i.test(
        path
      )
    ) {
      return path;
    }


    if (
      baseURL.endsWith("/") &&
      path.startsWith("/")
    ) {
      return (
        baseURL +
        path.slice(1)
      );
    }


    if (
      !baseURL.endsWith("/") &&
      !path.startsWith("/")
    ) {
      return (
        baseURL +
        "/" +
        path
      );
    }


    return (
      baseURL +
      path
    );
  }


  function mergeOptions(
    options = {}
  ) {
    return {
      ...options,

      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    };
  }


  return {

    /**
     * Base URL.
     */
    baseURL,


    /**
     * GET raw response.
     */
    get(
      path,
      options = {}
    ) {
      return get(
        resolveURL(path),
        mergeOptions(options)
      );
    },


    /**
     * GET JSON.
     */
    getJSON(
      path,
      options = {}
    ) {
      return getJSON(
        resolveURL(path),
        mergeOptions(options)
      );
    },


    /**
     * GET text.
     */
    getText(
      path,
      options = {}
    ) {
      return getText(
        resolveURL(path),
        mergeOptions(options)
      );
    },


    /**
     * POST raw body.
     */
    post(
      path,
      body,
      options = {}
    ) {
      return post(
        resolveURL(path),
        body,
        mergeOptions(options)
      );
    },


    /**
     * POST JSON.
     */
    postJSON(
      path,
      data,
      options = {}
    ) {
      return postJSON(
        resolveURL(path),
        data,
        mergeOptions(options)
      );
    },


    /**
     * PUT JSON.
     */
    putJSON(
      path,
      data,
      options = {}
    ) {
      return putJSON(
        resolveURL(path),
        data,
        mergeOptions(options)
      );
    },


    /**
     * PATCH JSON.
     */
    patchJSON(
      path,
      data,
      options = {}
    ) {
      return patchJSON(
        resolveURL(path),
        data,
        mergeOptions(options)
      );
    },


    /**
     * DELETE.
     */
    delete(
      path,
      options = {}
    ) {
      return del(
        resolveURL(path),
        mergeOptions(options)
      );
    },


    /**
     * DELETE and parse JSON.
     */
    deleteJSON(
      path,
      options = {}
    ) {
      return deleteJSON(
        resolveURL(path),
        mergeOptions(options)
      );
    }
  };
}


/* =========================================================
 * COMMON HTTP HEADER HELPERS
 * ========================================================= */


/**
 * Create JSON request headers.
 */
export function createJSONHeaders(
  extra = {}
) {
  return {
    Accept:
      "application/json",

    "Content-Type":
      "application/json",

    ...extra
  };
}


/**
 * Create a plain API request header object.
 */
export function createHeaders(
  extra = {}
) {
  return {
    ...extra
  };
}


/* =========================================================
 * URL ENCODING
 * ========================================================= */


/**
 * Encode a normal URL component.
 */
export function encodeURL(
  value
) {
  return encodeURIComponent(
    String(value)
  );
}


/**
 * Decode a URL component.
 */
export function decodeURL(
  value
) {
  return decodeURIComponent(
    String(value)
  );
}


/* =========================================================
 * COMMON API PATTERNS
 * ========================================================= */


/**
 * Build a GET endpoint from a base URL and query object.
 *
 * Example:
 *
 * const url =
 *   apiURL(
 *     "https://api.example.com/weather",
 *     {
 *       latitude: -26.2,
 *       longitude: 28.0
 *     }
 *   );
 */
export function apiURL(
  url,
  query = {}
) {
  return buildURL(
    url,
    query
  );
}


/**
 * Build a JSON POST configuration object.
 *
 * Useful when you want to inspect or modify the request
 * before passing it to request().
 */
export function createJSONRequest(
  method,
  data,
  headers = {}
) {
  return {
    method:
      String(method)
        .toUpperCase(),

    headers:
      createJSONHeaders(
        headers
      ),

    body:
      JSON.stringify(
        data
      )
  };
}


/* =========================================================
 * EXPORT DEFAULT API OBJECT
 * ========================================================= */


/**
 * Convenient grouped API.
 *
 * Example:
 *
 * import network from "zeppcore";
 *
 * network.getJSON(...);
 */
const network = {

  isNetworkAvailable,
  assertNetworkAvailable,

  buildURL,
  encodeQuery,

  request,
  get,
  post,
  put,
  patch,
  del,

  getText,
  postText,

  getJSON,
  postJSON,
  putJSON,
  patchJSON,
  deleteJSON,

  requestJSON,

  getTextSafe,
  getJSONSafe,
  postJSONSafe,

  getResponseBody,
  responseText,
  responseJSON,
  responseJSONStrict,

  jsonHeaders,
  jsonBody,

  createAPI,

  createHeaders,
  createJSONHeaders,

  encodeURL,
  decodeURL,

  apiURL,
  createJSONRequest

};


export default network;