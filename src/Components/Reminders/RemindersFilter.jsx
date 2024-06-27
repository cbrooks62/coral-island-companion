import { useNavigate } from "react-router"

export const RemindersFilter = ({currentUser, setSearchTerm, setShowOpenOnly}) => {
    const navigate = useNavigate()
  return (
    <div className="filter-bar">
        <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            type="text"
            placeholder="Search Reminders"
            className="reminder-search"
          />
          <>
    
          <button
            className="button-current"
            onClick={() => {
              setShowOpenOnly(true);
            }}
          >
            Current Reminders
          </button>
          <button
            className="button-completed"
            onClick={() => {
              setShowOpenOnly(false);
            }}
          >
            Completed Reminders
          </button>
        </>

    </div>
  )
}
