export const defaultValues = {
  integer: '693',
  decimal: '0',
};

export const calcR = (int: string, dec: string) => {
  const ret = Number(Number(int) + ((Number(dec) / (10 ** String(dec).length))));
  return ret
};