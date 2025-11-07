export interface IObject {
  [key: string]: string | number | boolean | null | undefined | unknown;
}

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
};
