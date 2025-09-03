import axios from "axios";

const ESP32_BASE_URL = process.env.ESP32_BASE_URL || "http://192.168.1.100"; // Remplace par l’IP réelle de ton ESP32

export async function setRelay(num: number, state: "on" | "off") {
  const url = `${ESP32_BASE_URL}/api/relay`;
  return axios.post(url, { num, state });
}

export async function setSwitch(state: "on" | "off") {
  const url = `${ESP32_BASE_URL}/api/switch`;
  return axios.post(url, { state });
}
