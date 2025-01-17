const outputs: string[] = [];

export const addOutput = (output: string) => {
  outputs.push(output);
  return outputs; // Retourner les sorties mises à jour
};
