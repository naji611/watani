import axios from "axios";

const baseUrl = "http://watani.runasp.net/api/v1/Authentication/register/users";

const jordanianUrl = `${baseUrl}/jordanian`;
const jordanianWomenChildUrl = `${baseUrl}/jordanian-women-child`;
const gazaSonsUrl = `${baseUrl}/gaza-son`;
const foreignUrl = `${baseUrl}/foreign`;
const loginUrl = (username, password) =>
  `http://watani.runasp.net/api/v1/Authentication/login?username=${username}&password=${password}`;

// General function to handle API calls with error handling
async function apiPostRequest(url, data) {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    if (error.response) {
      // Handle server-side errors (status codes)
      return {
        status: error.response.status,
        data: error.response.data, // Pass along error details
      };
    } else {
      // Handle network or other client-side errors
      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}

// Registration functions
export async function RegisterJordanian(data) {
  return await apiPostRequest(jordanianUrl, data);
}

export async function RegisterJordanianWomenChild(data) {
  return await apiPostRequest(jordanianWomenChildUrl, data);
}

export async function RegisterGazaSons(data) {
  return await apiPostRequest(gazaSonsUrl, data);
}

export async function RegisterForeign(data) {
  return await apiPostRequest(foreignUrl, data);
}

// Login function
export async function Login(username, password) {
  return await apiPostRequest(loginUrl(username, password), {});
}
