interface Window {
  electronAPI: {
    selectDirectory: (apiKey: string) => Promise<void>;
  };
}
