// src/utils/handleResponse.js
export const handleResponse = (res, status, data) => {
  // If data contains an error, set it accordingly
  const response = status >= 400 ? { status, error: data.error } : { status, data };
  res.status(status).json(response);
};
