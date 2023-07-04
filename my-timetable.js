function Week(week, days) {
  this.week = week;
  this.days = days;
  return { week, days };
}

function Day(day, lessons) {}

export default timetable = [
  {
    week: "A",
    days: [
      {
        day: "Monday",
        lessons: [{ start: "" }],
      },
    ],
  },
];
