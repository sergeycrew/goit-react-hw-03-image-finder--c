import { FallingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <FallingLines
      color="blue"
      visible={true}
      ariaLabel="falling-lines-loading"
      height={200}
      width={200}
    />
  );
};
