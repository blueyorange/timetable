class TimetableWeek extends HTMLElement {
  constructor() {
    super();
    const template = document.querySelector("#tt-week").content;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.cloneNode(true));
  }
}

customElements.define("tt-week", TimetableWeek);
