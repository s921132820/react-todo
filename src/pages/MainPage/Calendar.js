import React, { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

function Calendar({todoList}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startWeek = startOfWeek(startMonth);
  const endWeek = endOfWeek(endMonth);
  

  const days = [];
  let day = startWeek;

  while (day <= endWeek) {
    days.push(day);
    day = addDays(day, 1);
  }

  // 날짜에 해당하는 작업이 있는지 확인
  const isTodoForDay = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return todoList.some((todo) => todo.date === formattedDate); // todoList에서 해당 날짜와 일치하는 작업이 있는지 확인
  };


  return (
    <div>
      <div className="current-time">
        <p>Today {format(currentTime, "yyyy-MM-dd HH:mm:ss")}</p>
      </div>
      <div className="calendar-wrap">
        <div className="calendar">
          <div className="header">
            <button onClick={() => setCurrentMonth(addDays(currentMonth, -30))}>{"<"}</button>
            <h2>{format(currentMonth, "yyyy년 MM월")}</h2>
            <button onClick={() => setCurrentMonth(addDays(currentMonth, 30))}>{">"}</button>
          </div>
          <div className="grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="day-name">{day}</div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                className={`day ${isSameMonth(day, startMonth) ? "" : "disabled"} ${isSameDay(day, selectedDate) ? "selected" : ""}`}
                onClick={() => setSelectedDate(day)}
              >
                {format(day, "d")}
                {isTodoForDay(day) && <span className="todo-dot">●</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;