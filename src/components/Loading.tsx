import type {FC} from "react";
import {SyncLoader} from "react-spinners";

interface LoadingProps {
  loading: boolean;
}

const Loading: FC<LoadingProps> = ({loading = false}) => {
  return (
    <SyncLoader
      color="#2f99df"
      loading={loading}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loading;
