import type {FC} from "react";
import InputUsername from "./InputUsername";
import ButtonSearch from "./ButtonSearch";

interface FormSearchProps {
  onSubmit: (e: React.SyntheticEvent) => void;
  onChangeForm: (e: React.FormEvent<HTMLInputElement>) => void;
  disabled: boolean;
  loading: boolean;
}

const FormSearch: FC<FormSearchProps> = ({
  onSubmit,
  onChangeForm,
  disabled,
  loading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      data-testid="formSearch"
      className="w-100 flex flex-col"
    >
      <InputUsername onChange={onChangeForm} />
      <ButtonSearch disabled={disabled} loading={loading} />
    </form>
  );
};
export default FormSearch;
