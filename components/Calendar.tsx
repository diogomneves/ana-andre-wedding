const WEEKDAYS = ["S", "T", "Q", "Q", "S", "S", "D"];

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function Calendar({ year, month, day, time }: { year: number; month: number; day: number; time: string }) {
  const first = new Date(Date.UTC(year, month - 1, 1));
  const offset = (first.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const monthName = capitalize(new Intl.DateTimeFormat("pt-PT", { month: "long", timeZone: "UTC" }).format(first));
  const weekday = capitalize(
    new Intl.DateTimeFormat("pt-PT", { weekday: "long", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day))),
  );

  return (
    <div className="calendar-card paper" data-reveal>
      <p className="cal-month">{monthName}</p>
      <p className="cal-year">{year}</p>

      <div className="cal-grid" role="img" aria-label={`${weekday}, ${day} de ${monthName} de ${year}`}>
        {WEEKDAYS.map((label, index) => (
          <span className="cal-head" key={index}>{label}</span>
        ))}
        {Array.from({ length: offset }, (_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const value = index + 1;
          return (
            <span className={value === day ? "cal-day is-day" : "cal-day"} key={value} style={{ "--n": value } as React.CSSProperties}>
              {value}
            </span>
          );
        })}
      </div>

      <p className="cal-caption">{weekday} · {time}</p>
    </div>
  );
}
