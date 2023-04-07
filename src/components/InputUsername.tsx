import type {FC} from "react";

interface InputUsernameProps {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputUsername: FC<InputUsernameProps> = ({onChange}) => {
  return (
    <input
      onChange={onChange}
      name="username"
      type="text"
      placeholder="Enter username"
      className="mb-4"
      data-testId="inputUsername"
    />
  );
};
export default InputUsername;
