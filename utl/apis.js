import axios from "axios";
const complaintsUrl = (id) =>
  `http://watani.runasp.net/api/v1/Complaints/category/${id}/subjects`;
const baseUrl = "http://watani.runasp.net/api/v1/Authentication/register/users";
const feedbackUrl = "http://watani.runasp.net/api/v1/Feedbacks";
const jordanianUrl = `${baseUrl}/jordanian`;
const jordanianWomenChildUrl = `${baseUrl}/jordanian-women-child`;
const gazaSonsUrl = `${baseUrl}/gaza-son`;
const foreignUrl = `${baseUrl}/foreign`;
const loginUrl = (username, password) =>
  `http://watani.runasp.net/api/v1/Authentication/login?username=${username}&password=${password}`;
const takeComplainUrl = "http://watani.runasp.net/api/v1/Complaints";

const changePassUrl =
  "http://watani.runasp.net/api/v1/Authentication/change-password";

const fetchComplaintsStatusUrl = "http://watani.runasp.net/api/v1/Complaints";

const forgetPasswordUrl =
  "http://watani.runasp.net/api/v1/Authentication/reset-password-token";

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

export async function Feedback(opinion, userId) {
  return await apiPostRequest(feedbackUrl, { opinion, userId });
}

export async function fetchComplaints(complaintId, token) {
  try {
    const response = await axios.get(complaintsUrl(complaintId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}
export async function TakeComplaint(data, token) {
  try {
    const response = await axios.post(takeComplainUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      console.log(error);
      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}

export async function ChangePassword(data, token) {
  try {
    const response = await axios.post(changePassUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      console.log(error);
      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}

export async function FetchComplaintsStatus(token, userId) {
  try {
    const response = await axios.get(fetchComplaintsStatusUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params: { userId }, // Include userId as a query parameter
    });
    return response.data; // Return only the data part of the response
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      console.log(error);
      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}
export async function ForgetPassword(email) {
  try {
    const response = await axios.get(forgetPasswordUrl, {
      params: { email },
    });
    return response.data; // Return only the data part of the response
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      console.log(error);
      return {
        status: 500,
        data: { message: "An unknown error occurred" },
      };
    }
  }
}
