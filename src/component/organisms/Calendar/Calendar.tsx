import React, { useEffect } from "react";
import * as S from "./style";
import moment from "moment";

interface ICalendar {
  nowDay: number;
  nowWeek: number;
  nowMonth: number;
  nowYear: number;
  monthStorage: number;
  yearStorage: number;
  storage: any;
  onClickLeft: () => void;
  onClickRight: () => void;
  onClickDay: any;
  onClickWeek: any;
  setMonth: any;
  setYear: any;
}

const Calendar = ({
  nowDay,
  nowWeek,
  nowMonth,
  nowYear,
  monthStorage,
  yearStorage,
  storage,
  onClickLeft,
  onClickRight,
  onClickDay,
  onClickWeek,
  setMonth,
  setYear,
}: ICalendar) => {
  const m = moment();
  const Generate = () => {
    m.set("year", nowYear);
    m.set("month", nowMonth);
    const startWeek = m.clone().startOf("month").week();
    const endWeek =
      m.clone().endOf("month").week() === 1
        ? 53
        : m.clone().endOf("month").week();
    const calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      const thisWeekConst = Number(m.format("w")) === week ? "today" : "";
      const weekSelected =
        Number(nowWeek) === week &&
        Number(yearStorage) === nowYear &&
        monthStorage === nowMonth
          ? "selected"
          : "";
      calendar.push(
        <S.Row key={week}>
          <S.Cw
            onClick={onClickWeek}
            className={`${thisWeekConst} ${weekSelected}`}
          >
            {week}
          </S.Cw>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              const current = m
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");
              const todaySelect =
                m.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "today"
                  : "";
              const isSelected =
                Number(nowDay) === Number(current.format("D")) &&
                Number(yearStorage) === nowYear &&
                monthStorage === nowMonth
                  ? "selected"
                  : "";
              const clicking =
                current.format("MM") === m.format("MM")
                  ? onClickDay
                  : (e: any) => e.preventDefault();
              const isGrayed =
                current.format("MM") === m.format("MM") ? "" : "grayed";

              const day: any = [];
              if (current.format("MM") === m.format("MM")) {
                Array(storage.length).forEach((v, n) => {
                  if (storage[n].year === Number(nowYear)) {
                    if (storage[n].month === Number(nowMonth + 1)) {
                      if (storage[n].day === current.date()) {
                        if (day.length < 3) {
                          day.push(storage[n]);
                        }
                      }
                    }
                  }
                });
              }

              return (
                <S.Box
                  onClick={clicking}
                  className={`${todaySelect} ${isGrayed} ${isSelected}`}
                  key={i}
                >
                  {current.format("D")}
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      width: "33px",
                      height: "10px",
                      pointerEvents: "none",
                    }}
                  >
                    {Array(day.length)
                      .fill(0)
                      .map((v, n) => {
                        return (
                          <div
                            style={{
                              marginLeft: "1px",
                              marginRight: "1px",
                              borderRadius: "6px",
                              width: "6px",
                              height: "6px",
                              backgroundColor: day[n].color,
                              display: "inline-block",
                            }}
                          ></div>
                        );
                      })}
                  </div>
                </S.Box>
              );
            })}
        </S.Row>
      );
    }
    return calendar;
  };

  useEffect(() => {
    setYear(Number(m.set("year", nowYear).format("YYYY")));
    setMonth(Number(m.set("month", nowMonth).format("MMMM")));
  }, []);

  return (
    <S.Calendar>
      <S.Body>
        <span style={{ fontSize: "32px", fontWeight: 600 }}>
          {m.set("month", nowMonth).format("MMMM")}
        </span>
        <span style={{ fontSize: "32px", color: "red", fontWeight: 600 }}>
          {nowYear}
        </span>
        <button style={{ marginLeft: "10px" }} onClick={onClickRight}>
          &gt;
        </button>
        <button onClick={onClickLeft}>&lt;</button>
      </S.Body>
      <div>
        <S.Row>
          <S.Day style={{ borderRight: "1px solid gray", color: "gray" }}>
            <span>CW</span>
          </S.Day>
          <S.Day>
            <span>SUN</span>
          </S.Day>
          <S.Day>
            <span>MON</span>
          </S.Day>
          <S.Day>
            <span>TUE</span>
          </S.Day>
          <S.Day>
            <span>WED</span>
          </S.Day>
          <S.Day>
            <span>THU</span>
          </S.Day>
          <S.Day>
            <span>FRI</span>
          </S.Day>
          <S.Day>
            <span>SAT</span>
          </S.Day>
        </S.Row>
        {Generate()}
      </div>
    </S.Calendar>
  );
};
export default Calendar;
