function generateClockTimes() {
  const times = [];
  for (let hour = 8; hour < 9; hour++) {
    for (let minute = 0; minute < 60; minute++) {
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
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>
        .container {
          display: grid;
          width: 100%;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: [col-head] 1em ${generateClockTimes()
            .map((time) => `[time-${time}] 1fr`)
            .join("")};
        }
        .col-head {
          grid-row: 1/2;
        }
        .row-head {
          grid-column: 1/2;
        }
        ${["monday", "tuesday", "wednesday", "thursday", "friday"]
          .map((day, index) => {
            `.${day}, ::slotted(.${day}) {
            grid-column: ${index + 2} / ${index + 3}
          }`;
          })
          .join("")}
      </style>
      <div class="container">
        <div class="col-head monday">Mon</div>
        <div class="col-head tuesday">Tues</div>
        <div class="col-head monday">Weds</div>
        <div class="col-head">Thu</div>
        <div class="col-head">Fri</div>
        <slot></slot>
      </div>`;
  }
}

customElements.define("tt-week", TimetableWeek);
