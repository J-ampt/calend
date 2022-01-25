import React, { useState }  from "react";
import {
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    startOfDay,
    addDays,
    add,
  }  from 'date-fns';

  function takeMonth(start) {
    let month = [];
    let date = start;
  
    function lastDayOfRange(range) {
      return range[range.length - 1][6];
    }
  
    return function () {
      const weekGen = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());
  
      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }
  
      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);
  
      return range;
    };
  }

  function takeWeek(start) {
    let date = startOfWeek(startOfDay(start));
  
    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }


function Calendar() {
    const [date, setSelectedDate] = useState(new Date());

    const todayDate = new Date();
    const day_name = todayDate.toLocaleString('en-us', {weekday:'long'});
    const monthWeeks = takeMonth(date)();
    const day_list = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    const changeDate = (month) => {
      setSelectedDate(add(date, {months: month}));
    }

    return(
      <div className="main is-flex">
        <div className="main_date">
            <p>{day_name}</p>
            <p className="date_count">{todayDate.getDate()}</p>
        </div>
        <div className="month">
           
            <p>{date.toLocaleString('en-us', {month:'long',year:'numeric'})}</p>
            

            <div className="is-flex">{day_list.map((day,index) => <div className="month_day" key={index}>{day}</div>)}</div>
            {
                monthWeeks.map((week, index)=>(
                    <div className="is-flex" key={index}>
                        {week.map((day, index)=>(
                        <div className="month_day" key={index}>{day.getMonth() === date.getMonth() ? day.getDate() : ''}</div>
                ))}
                    </div>
                ))
            }
            <div className="nav_but">
            <p onClick={() => changeDate(-1)}>LEFT</p>
            <p onClick={() => changeDate(1)}>RIGHT</p>
            </div>
        </div>
    </div>
  )
}


export default Calendar;