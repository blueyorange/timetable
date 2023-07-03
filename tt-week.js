function generateClockTimes() {
  const times = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let minute = 0; minute <= 60; minute += 5) {
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
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
        .container {
          display: grid;
          width: 100%;
          height: 100%;
          grid-template-columns: repeat(${days.length},1fr);
          grid-template-rows: [col-head] 1em ${generateClockTimes()
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
      </style>
      <div class="container">
        <div class="col-head">Mon</div>
        <div class="col-head">Tues</div>
        <div class="col-head">Weds</div>
        <div class="col-head">Thu</div>
        <div class="col-head">Fri</div>
        <slot></slot>
      </div>`;
  }
}

customElements.define("tt-week", TimetableWeek);
