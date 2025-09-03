import { useState } from "react";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_ESP32_API_URL || "";

export default function Home() {
  const [espUrl, setEspUrl] = useState(DEFAULT_API_URL);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Fonction pour actionner le relais
  const actionRelais = async (num: number, state: "on" | "off") => {
    setLoading(true);
    setStatus("Envoi...");
    try {
      const res = await fetch(`${espUrl}/api/relay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num, state }),
      });
      const data = await res.json();
      if (data.success) setStatus(`Relais ${num} ${state === "on" ? "allumé" : "éteint"}`);
      else setStatus(`Erreur: ${data.error || "inconnue"}`);
    } catch (err) {
      setStatus("Erreur de connexion !");
    }
    setLoading(false);
  };

  return (
    <main style={{
      maxWidth: 450,
      margin: "auto",
      padding: 32,
      fontFamily: 'Arial, sans-serif',
      background: "#f8f8f8",
      borderRadius: 12,
      marginTop: 40
    }}>
      <h2>Contrôle ESP32 (Relais)</h2>

      <label>
        URL de l'ESP32 (ngrok ou autre) :
        <input
          type="text"
          value={espUrl}
          onChange={e => setEspUrl(e.target.value)}
          placeholder="https://xxxx.ngrok-free.app"
          style={{
            width: "100%",
            marginTop: 6,
            marginBottom: 18,
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16
          }}
        />
      </label>

      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button
          disabled={loading}
          onClick={() => actionRelais(1, "on")}
        >Allumer Relais 1</button>
        <button
          disabled={loading}
          onClick={() => actionRelais(1, "off")}
        >Éteindre Relais 1</button>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
        <button
          disabled={loading}
          onClick={() => actionRelais(2, "on")}
        >Allumer Relais 2</button>
        <button
          disabled={loading}
          onClick={() => actionRelais(2, "off")}
        >Éteindre Relais 2</button>
      </div>

      <div style={{
        marginTop: 24,
        minHeight: 32,
        color: "#222",
        fontWeight: "bold"
      }}>
        {status}
      </div>
    </main>
  );
}
