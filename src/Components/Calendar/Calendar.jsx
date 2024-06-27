export const Calendar = () => {
  return (
    <div>
      <header className="calendar-header">
        <img src="src/Images/Headers/Calendar-header1.png" />
      </header>
      <div className="calendar-container">
        <div className="spring-calendar">
          <img
            src={"src/Images/Calendar/Spring.png"}
            alt="Spring Calendar"
          />
        </div>
        <div>
          <img
            className="summer-calendar"
            src={"src/Images/Calendar/Summer.png"}
            alt="Summer Calendar"
          />
        </div>
        <div>
          <img
            className="fall-calendar"
            src={"src/Images/Calendar/Fall.png"}
            alt="Fall Calendar"
          />
        </div>
        <div>
          <img
            className="winter-calendar"
            src={"src/Images/Calendar/Winter.png"}
            alt="Winter Calendar"
          />
        </div>
      </div>
    </div>
  );
};
