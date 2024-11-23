interface DividerProps {
  style?: string;
}

const Divider = ({ style }: DividerProps) => {
  return <hr className={`w-full border border-gray-100 dark:border-gray-800 ${style && style}`} />;
};

export default Divider;
