type BadgeProps = {
  text: string;
};
const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="glass py-2 px-4 rounded-lg" aria-label={`${text} badge`}>
      {text}
    </div>
  );
};

export default Badge;
