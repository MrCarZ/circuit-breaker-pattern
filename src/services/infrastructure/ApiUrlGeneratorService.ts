export const ApiUrlGeneratorService = (urlPath: string) =>
  `${import.meta.env.VITE_SERVER_URL}/${urlPath}`;
