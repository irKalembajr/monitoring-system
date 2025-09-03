import type { NextApiRequest, NextApiResponse } from "next";
import { setRelay } from "../../lib/esp32";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { num, state } = req.body;
  if (
    typeof num !== "number" ||
    (state !== "on" && state !== "off")
  ) {
    return res.status(400).json({ error: "Invalid parameters" });
  }
  try {
    const response = await setRelay(num, state);
    res.status(200).json({ success: true, data: response.data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
