export const Calendar = () => {
  return (
    <div>
      <header className="calendar-header"></header>
      <div className="calendar-container">
        <img
          className="spring-calendar"
          src={"src/Images/Spring.png"}
          alt="Spring Calendar"
        />
        <img
          className="summer-calendar"
          src={"src/Images/Summer.png"}
          alt="Summer Calendar"
        />
        <img
          className="fall-calendar"
          src={"src/Images/Fall.png"}
          alt="Fall Calendar"
        />
        <img
          className="winter-calendar"
          src={"src/Images/Winter.png"}
          alt="Winter Calendar"
        />
      </div>
    </div>
  );
};
