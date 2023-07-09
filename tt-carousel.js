import "./tt-week.js";

class TimetableCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        :host {
          width: 100%;
        }
        * {
          box-sizing: border-box;
        }
        .slider {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          text-align: center;
          overflow: hidden;
        }
        .slides {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          flex-grow: 1;
          height: 100%;
        }
        ::slotted(*) {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 100%;
          transition: transform 0.3s;
          position: relative;
          display: flex;
          justify-content: center;
        }
        nav {
          display: flex;
          justify-content: center;
          padding: 1em;
        }
        nav > a {
          text-decoration: none;
          color: black;
          padding: 0.6em 1em;
          background-color: white;
          margin: 0 1em;
          border-radius: 1em;
        }
        nav > a:hover {
          background-color: #fee;
        }
      </style>
`;
  }
  connectedCallback() {
    const slotElement = this.shadowRoot.querySelector("slot");
    const navElement = this.shadowRoot.querySelector("nav");
    // make a jump link for each week
    slotElement.assignedElements().forEach((weekEl) => {
      const linkEl = document.createElement("a");
      linkEl.setAttribute("href", `#${weekEl.id}`);
      linkEl.textContent = weekEl.getAttribute("data-name");
      navElement.appendChild(linkEl);
    });
  }
}

customElements.define("tt-carousel", TimetableCarousel);
