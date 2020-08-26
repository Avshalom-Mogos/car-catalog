export const numberWithCommas = (str: string) => {
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
