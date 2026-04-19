import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const predictHeartRisk = async (formData) => {
  const payload = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, Number(value)])
  );

  const response = await axios.post(`${API_BASE_URL}/predict`, payload);
  return response.data;
};