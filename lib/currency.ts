export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
  }).format(amount);
};
