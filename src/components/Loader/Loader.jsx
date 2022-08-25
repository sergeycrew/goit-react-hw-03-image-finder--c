import { FallingLines } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <FallingLines
      color="blue"
      width="100"
      visible={true}
      ariaLabel="falling-lines-loading"
      height={200}
      width={200}
      timeout={300}
    />
  );
};
