import type {FC} from "react";
import {SyncLoader} from "react-spinners";

interface LoadingProps {
  loading: boolean;
}

const Loader: FC<LoadingProps> = ({loading = false}) => {
  return (
    <SyncLoader
      color="#2f99df"
      loading={loading}
      aria-label="Loading Spinner"
      data-testId="loader"
    />
  );
};
export default Loader;
