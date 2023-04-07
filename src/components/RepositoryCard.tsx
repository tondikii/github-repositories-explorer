import type {FC} from "react";
import {Star as StarIcon} from "@mui/icons-material";

interface RepositoryCardProps {
  repository: {
    name: string;
    description: string | null;
    stargazers_count: number;
  };
  key: number;
}

const RepositoryCard: FC<RepositoryCardProps> = ({repository, key}) => {
  return (
    <div
      className="bg-gray-300 px-2 pt-4 pb-12 flex flex-row justify-between w-100"
      key={key}
      data-testId="repositoryCard"
    >
      <div className="flex flex-col items-start">
        <strong className="text-lg" data-testId="repositoryCardTitle">
          {repository?.name || "-"}
        </strong>
        <span
          className="text-sm font-medium text-justify"
          data-testId="repositoryCardDescription"
        >
          {repository?.description || "No description"}
        </span>
      </div>
      <div className="flex flex-row h-fit items-center px-1">
        <strong
          className="text-lg mr-1"
          data-testId="repositoryCardStargazerCount"
        >
          {repository?.stargazers_count}
        </strong>
        <div data-testId="repositoryCardStargazerIcon">
          <StarIcon className="font-bold w-6 h-6 text-black" />
        </div>
      </div>
    </div>
  );
};
export default RepositoryCard;
