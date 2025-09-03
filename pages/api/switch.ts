import type { NextApiRequest, NextApiResponse } from "next";
import { setSwitch } from "../../lib/esp32";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { state } = req.body;
  if (state !== "on" && state !== "off") {
    return res.status(400).json({ error: "Invalid parameters" });
  }
  try {
    const response = await setSwitch(state);
    res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
