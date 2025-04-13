import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
const LLM = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const response: string = await invoke("ask_question", {
      prompt: prompt,
    });
    setResponse(response);
  };

  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h2 className="app-title">Chat con LLM</h2>
      <textarea
        className="title-input"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        placeholder="Aqui va el prompt"
        style={{
          marginBottom: "15px",
        }}
      >
        {prompt}
      </textarea>
      <button
        className="save-button"
        onClick={(e) => {
          e.preventDefault();
          handleAsk();
        }}
      >
        Enviar
      </button>
      <label
        htmlFor=""
        style={{
          marginTop: "15px",
        }}
      >
        {response}
      </label>
    </div>
  );
};

export default LLM;
