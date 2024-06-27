import { useNavigate } from "react-router-dom";

export const NpcNameFilter = ({ setSearchTerm }) => {
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Characters"
        className="character-search-bar"
      />
    </div>
  );
};
