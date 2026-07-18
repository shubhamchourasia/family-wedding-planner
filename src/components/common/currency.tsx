interface CurrencyProps {
  value: number;
  className?: string;
}

export function Currency({
  value,
  className = "",
}: CurrencyProps) {
  return (
    <span className={className}>
      {new Intl.NumberFormat(
        "en-IN",
        {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }
      ).format(value)}
    </span>
  );
}