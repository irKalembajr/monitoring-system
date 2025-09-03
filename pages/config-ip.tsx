import { useState } from "react";

export default function ConfigIP() {
  const [ip, setIp] = useState("");
  const [savedIp, setSavedIp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("ESP32_IP", ip);
    setSavedIp(ip);
  };

  return (
    <div style={{maxWidth:400,margin:"auto",padding:30}}>
      <h2>Configurer l'IP de l'ESP32</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex: 192.168.1.42"
          value={ip}
          onChange={e => setIp(e.target.value)}
          style={{width:"100%",padding:8,marginBottom:10}}
        />
        <button type="submit">Enregistrer</button>
      </form>
      {savedIp && <div>IP enregistrée : <b>{savedIp}</b></div>}
    </div>
  );
}
