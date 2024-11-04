interface DividerProps {
  style?: string;
}

const Divider = ({ style }: DividerProps) => {
  return <hr className={`w-full border border-gray-100 ${style && style}`} />;
};

export default Divider;
