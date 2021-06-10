export const toReal  = money => {
  if (!money || typeof money !== 'number') return null;

  return money.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};