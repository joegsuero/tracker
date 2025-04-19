// Tipos para los comandos del servidor
type ServerStatus = {
  running: boolean;
};

type ServerControlResult = {
  success: boolean;
  wasAlreadyInState: boolean;
};
