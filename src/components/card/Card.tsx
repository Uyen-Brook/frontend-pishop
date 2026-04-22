interface CardProps {
  children: React.ReactNode;
  extra?: string;
}

const Card: React.FC<CardProps> = ({ children, extra }) => {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-md dark:bg-gray-800 ${extra}`}
    >
      {children}
    </div>
  );
};

export default Card;
