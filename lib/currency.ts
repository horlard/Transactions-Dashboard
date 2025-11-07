export const formatCurrency = (
  amount: number,
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    ...options,
  }).format(amount);
};
