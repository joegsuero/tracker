// src/components/ServerControl.tsx
import React, { useState, useEffect } from "react";
import { checkServerStatus, toggleServer } from "../services/serverControls";

const ServerControl: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await checkServerStatus();
        setIsRunning(status);
      } catch (error) {
        console.error("Error checking server status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const result = await toggleServer();
      if (result.success) {
        setIsRunning(!isRunning);
      }
    } catch (error) {
      console.error("Error toggling server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Checking server status...</div>;
  }

  return (
    <div>
      <p>Server status: {isRunning ? "Running" : "Stopped"}</p>
      <button onClick={handleToggle} disabled={isLoading}>
        {isRunning ? "Stop Server" : "Start Server"}
      </button>
    </div>
  );
};

export default ServerControl;
