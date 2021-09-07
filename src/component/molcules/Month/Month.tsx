import React, {useState} from 'react';
import moment from 'moment';
import './style.css';

interface IMonth {
    nowDay:number
    nowWeek:number
    monthStorage:number
    yearStorage:number
    nowMonth:number
    nowYear:number
    onClickDayInMonth: () => void
    storage:any
}

const Month = ({nowDay,
  nowWeek,
  monthStorage,
  yearStorage,
  nowMonth,
  nowYear,
  onClickDayInMonth,
  storage}:IMonth) => {
  const m = moment();
  const [today, setToday] = useState(m.format('YYYYMMDD'));

  const Generate = () => {
    m.set('year', nowYear);
    m.set('month', nowMonth);
    const startWeek = m.clone().startOf('month').week();
    const endWeek = m.clone().endOf('month').week() === 1 ? 53 : m.clone().endOf('month').week();
    const calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
          <div className="month-row" key={week}>
            {
              Array(7).fill(0).map((n, i) => {
                const current = m.clone().week(week).startOf('week').add(n + i, 'day');
                const todaySelected = today === current.format('YYYYMMDD') ? 'month-selected' : '';
                const isSelected = (Number(nowDay) === Number(current.format('D')) && Number(yearStorage) === nowYear && monthStorage === nowMonth) ? 'monthSelected' : '';
                const isGrayed = current.format('MM') === m.format('MM') ? '' : 'month-grayed';
                const clicking = current.format('MM') === m.format('MM') ? onClickDayInMonth : ((e: any) => e.preventDefault());

                const day: any = [];
                if (current.format('MM') === m.format('MM')) {
                  {
                    Array(storage.length).forEach((v, n) => {
                      if (storage[n].year === Number(current.year())) {
                        if (storage[n].month === Number(current.month() + 1)) {
                          if (storage[n].day === Number(current.date())) {
                            day.push(storage[n]);
                          }
                        }
                      }
                    });
                  }
                }

                // for sorting
                function compare(a:any, b:any) {
                  const A = Number(a.startHours + a.startMinutes);
                  const B = Number(b.startHours + a.startMinutes);

                  let comparison = 0;
                  if (A > B) {
                    comparison = 1;
                  } else if (A < B) {
                    comparison = -1;
                  }
                  return comparison;
                }
                day.sort(compare);

                return (
                  <div onClick={clicking} className={`month-box  ${todaySelected} ${isGrayed} ${isSelected}`} key={i}>
                    <span>{current.format('D')}</span>
                    <div className='month-display' >
                      {Array(day.length).fill(0).map((v, n) => (
                        <div style={{display: 'block', width: '100%', height: '18px', position: 'relative'}}>
                          <div style={{marginLeft: '6px', marginTop: '4px', float: 'left', width: '10px', height: '10px', backgroundColor: day[n].color, borderRadius: '10px'}}></div>
                          <div style={{marginLeft: '6px', float: 'left', width: 'calc(100% - 71px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 600, color: 'black'}}>{day[n].title}</div>
                          <div style={{lineHeight: '1.5', float: 'right', marginRight: '6px', fontSize: '14px', fontWeight: 600, color: 'gray'}}>{day[n].startHours}:{day[n].startMinutes}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            }
          </div>,
      );
    }
    return calendar;
  };

  return (
    <div className='month-component'>
      <div>
        <span style={{color: 'black', fontSize: '30px', fontWeight: 500}}>{m.set('month', nowMonth).format('MMMM')}</span>
        <span style={{fontSize: '36px', color: 'red'}}>{nowYear}</span>
      </div>
      <div className="month-row">
        <div className="month-day">
          <span>SUN</span>
        </div>
        <div className="month-day">
          <span>MON</span>
        </div>
        <div className="month-day">
          <span>TUE</span>
        </div>
        <div className="month-day">
          <span>WED</span>
        </div>
        <div className="month-day">
          <span>THU</span>
        </div>
        <div className="month-day">
          <span>FRI</span>
        </div>
        <div className="month-day">
          <span>SAT</span>
        </div>
      </div>
      {Generate()}
    </div>
  );
};
export default Month;
