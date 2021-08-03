type Emoji = {
  label?: string;
  symbol: string;
};

export default function Emoji({ label, symbol }: Emoji) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ?? ''}
      aria-hidden={label ? 'false' : 'true'}
    >
      {symbol}
    </span>
  );
}
