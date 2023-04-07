import type {FC} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ExpandMore as ExpandMoreIcon} from "@mui/icons-material";
import RepositoryCard from "./RepositoryCard";

interface UserCardProps {
  user: {
    login: string | null;
    repositories:
      | {
          name: string;
          description: string | null;
          stargazers_count: number;
        }[]
      | null;
  };
  key: number;
}

const UserCard: FC<UserCardProps> = ({key, user}) => {
  return (
    <Accordion
      className="bg-gray-200 shadow-none rounded-none"
      key={key}
      data-testId="userCard"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="font-bold w-9 h-9 text-black" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="font-semibold" data-testId="userCardLogin">
          {user?.login}
        </span>
      </AccordionSummary>
      <AccordionDetails className="bg-white">
        <div className="flex flex-col space-y-3 mt-1">
          {user?.repositories?.map(
            (
              repository: {
                name: string;
                description: string | null;
                stargazers_count: number;
              },
              idx2: number
            ) => (
              <RepositoryCard repository={repository} key={idx2} />
            )
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
export default UserCard;
