import { useState } from "react";
import "./main.css";
import Entries from "../entries/Entries";
import { FaChevronLeft } from "react-icons/fa6";
import LLM from "../llm/LLM";

const Main = () => {
  const [currentView, setCurrentView] = useState<React.ReactNode | null>(null);

  const features = [
    {
      title: "Notes",
      description: "Write and organize your personal notes",
      icon: "📝",
      component: <NotesApp />,
    },
    {
      title: "Calendar",
      description: "Organize your events and your schedule",
      icon: "📅",
      component: <CalendarApp />,
    },
    {
      title: "Finance",
      description: "Manage your income and expenses",
      icon: "💰",
      component: <FinanceApp />,
    },
    {
      title: "LLM Chat",
      description:
        "Interact with your own personal data and learn about yourself with the help of AI",
      icon: "🤖",
      component: <LLMChatApp />,
    },
    {
      title: "Settings",
      description: "Set your preferences for the personal tracker application",
      icon: "⚙️",
      component: <SettingsApp />,
    },
  ];

  if (currentView) {
    return (
      <>
        <div className="view-container">
          <button
            onClick={() => setCurrentView(null)}
            className="back-button"
            title="Go back from module"
          >
            <FaChevronLeft />
          </button>
        </div>
        {currentView}
      </>
    );
  }

  return (
    <div className="main-container">
      <h1 className="main-title">Personal Tracker</h1>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={() => setCurrentView(feature.component)}
            className="feature-card"
          >
            <div className="card-content">
              <div className="card-icon">{feature.icon}</div>
              <h2 className="card-title">{feature.title}</h2>
              <p className="card-description">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componentes placeholder (igual que antes)
const NotesApp = () => <Entries />;

const CalendarApp = () => (
  <div className="app-container">
    <h2 className="app-title">Calendario</h2>
    <p>Aquí iría tu componente de calendario...</p>
  </div>
);

const FinanceApp = () => (
  <div className="app-container">
    <h2 className="app-title">Finanzas Personales</h2>
    <p>Aquí iría tu componente de finanzas...</p>
  </div>
);

const LLMChatApp = () => <LLM />;

const SettingsApp = () => (
  <div className="app-container">
    <h2 className="app-title">Configuración</h2>
    <p>Aquí iría tu componente de configuración...</p>
  </div>
);

export default Main;
