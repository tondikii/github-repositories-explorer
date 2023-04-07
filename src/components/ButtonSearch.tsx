import type {FC} from "react";

interface ButtonSearchProps {
  disabled: boolean;
  loading: boolean;
}

const ButtonSearch: FC<ButtonSearchProps> = ({disabled, loading}) => {
  return (
    <button
      type="submit"
      data-testId="buttonSearch"
      disabled={disabled}
      className={`${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {loading ? "Loading..." : "Search"}
    </button>
  );
};
export default ButtonSearch;
