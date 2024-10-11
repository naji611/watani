import axios from "axios";

const baseUrl = "http://watani.runasp.net/api/v1/Authentication/register/users";

const jordanianUrl = `${baseUrl}/jordanian`;
const jordanianWomenChildUrl = `${baseUrl}/jordanian-women-child`;
const gazaSonsUrl = `${baseUrl}/gaza-son`;
const foreignUrl = `${baseUrl}/foreign`;
const loginUrl = (username, password) =>
  `http://watani.runasp.net/api/v1/Authentication/login?username=${username}&password=${password}`;

export async function RegisterJordanian(data) {
  const response = await axios.post(jordanianUrl, data);

  return response;
}

export async function RegisterJordanianWomenChild(data) {
  const response = await axios.post(jordanianWomenChildUrl, data);

  return response;
}

export async function RegisterGazaSons(data) {
  const response = await axios.post(gazaSonsUrl, data);

  return response;
}

export async function RegisterForeign(data) {
  const response = await axios.post(foreignUrl, data);

  return response;
}
export async function Login(username, password) {
  try {
    const response = await axios.post(loginUrl(username, password));

    return response;
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
}
