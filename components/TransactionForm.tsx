"use client";

import { Transaction } from "@/lib/types";
import type React from "react";

import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/InputField";
import Textarea from "./ui/Textarea";
import { NumericFormat } from "react-number-format";

import SelectField from "./ui/SelectField";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  onCancel: () => void;
  transaction?: Transaction;
}

export default function TransactionForm({
  onSubmit,
  onCancel,
  transaction,
}: TransactionFormProps) {
  const [description, setDescription] = useState(
    transaction?.description || ""
  );
  const [amount, setAmount] = useState(transaction?.amount.toString() || "");
  const [type, setType] = useState<"credit" | "debit">(
    transaction?.type || "credit"
  );
  const [date, setDate] = useState(
    transaction?.date || new Date().toISOString().split("T")[0]
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!amount || Number.parseFloat(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      description: description.trim(),
      amount: Number.parseFloat(amount),
      type,
      date,
    });

    setDescription("");
    setAmount("");
    setType("credit");
    setDate(new Date().toISOString().split("T")[0]);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        <div>
          <NumericFormat
            customInput={Input}
            label="Amount (NGN)"
            value={amount}
            onValueChange={(values) => setAmount(values.value)}
            placeholder="0.00"
            thousandSeparator=","
            allowLeadingZeros={false}
            error={errors.amount}
          />
        </div>

        <div>
          <SelectField
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as "credit" | "debit")}
            error={errors.type}
            options={[
              { value: "credit", label: "Credit (Income)" },
              { value: "debit", label: "Debit (Expense)" },
            ]}
          />
        </div>

        <div>
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
          />
        </div>
        <div className="md:col-span-2">
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter transaction description"
            error={errors.description}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {transaction ? "Edit" : "Add"} Transaction
        </Button>
      </div>
    </form>
  );
}
