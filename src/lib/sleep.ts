export const sleep = async (miliseconds: number): Promise<void> => {
  new Promise((resolve) => setTimeout(resolve, miliseconds));
};
