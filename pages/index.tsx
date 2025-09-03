import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [switchState, setSwitchState] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRelay = async (num: number, state: "on" | "off") => {
    setLoading(true);
    try {
      await axios.post("/api/relay", { num, state });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = async (state: boolean) => {
    setLoading(true);
    setSwitchState(state);
    try {
      await axios.post("/api/switch", { state: state ? "on" : "off" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 32 }}>
      <h1>Contrôle à distance ESP32</h1>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => handleRelay(1, "on")} disabled={loading}>Relais 1 ON</button>
        <button onClick={() => handleRelay(1, "off")} disabled={loading}>Relais 1 OFF</button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => handleRelay(2, "on")} disabled={loading}>Relais 2 ON</button>
        <button onClick={() => handleRelay(2, "off")} disabled={loading}>Relais 2 OFF</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <label>
          Switch
          <input
            type="checkbox"
            checked={switchState}
            onChange={e => handleSwitch(e.target.checked)}
            disabled={loading}
            style={{ marginLeft: 12 }}
          />
        </label>
      </div>
      {loading && <p>Attente...</p>}
    </div>
  );
}
