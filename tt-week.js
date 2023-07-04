function generateClockTimes(start = 6, end = 18, step = 5) {
  const times = [];
  for (let hour = start; hour < end; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}${formattedMinute}`;
      times.push(time);
    }
  }

  return times;
}

class TimetableWeek extends HTMLElement {
  constructor() {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    super();
    const startHour = 8;
    const endHour = 18;
    const stepMin = 5;
    const times = generateClockTimes(startHour, endHour, stepMin);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
        .container {
          display: grid;
          width: 100%;
          height: 100%;
          grid-template-columns: auto repeat(5,1fr);
          grid-template-rows: [col-head] 1em ${times
            .map((time) => `[time-${time}] 1fr `)
            .join("")};
        }
        slot {
          height: 100%;
        }
        .col-head {
          grid-row: 1/2;
        }
        .row-head {
          grid-column: 1/2;
        }
        ${days
          .map((day, index) => {
            return `.${day}, ::slotted(.${day}) {
            grid-column: ${index + 2} / ${index + 3}
          }`;
          })
          .join("")}
        .gridline {
          z-index: 1;
          grid-column: 2 / 7;
        }
        .gridline-major {
          grid-column: 1/7;
          border-top: 1px solid grey;
        }
        .gridline-minor {
          border-top: 1px solid lightgrey;
        }
        .time {
          grid-column: 1/2;
          height: 0;
          overflow: visible;
          background-color: #444;
        }
      </style>
      <div class="container">
        <div class="col-head monday">Mon</div>
        <div class="col-head tuesday">Tues</div>
        <div class="col-head wednesday">Weds</div>
        <div class="col-head thursday">Thu</div>
        <div class="col-head friday">Fri</div>
        ${times
          .map((time, index, times) => {
            if (/[0-2]\d00/.test(time)) {
              console.log(time);
              return /*html*/ `<div class="gridline gridline-major" style="grid-row: time-${time}/time-${
                times[index + 1]
              };"></div><time datetime="${time}" class="time" style="grid-row: time-${time}/time-${
                times[index + 1]
              };">${time}</time>`;
            } else {
              return /*html*/ `<div class="gridline gridline-minor" style="grid-row: time-${time}/time-${
                times[index + 1]
              };"></div>`;
            }
          })
          .join("")}
        <slot></slot>
      </div>`;
  }
}

customElements.define("tt-week", TimetableWeek);
