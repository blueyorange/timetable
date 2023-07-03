class TimetableCarousel extends HTMLElement {
  constructor() {
    super();
    const template = document.querySelector("#tt-carousel").content;
    console.log(template);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.cloneNode(true));
  }
}

customElements.define("tt-carousel", TimetableCarousel);
