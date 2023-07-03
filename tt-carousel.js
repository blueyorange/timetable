import "./tt-week.js";

class TimetableCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
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
          flex-grow: 0;
          justify-content: center;
        }
        .slides {

        }
      </style>
      <div class="slider">
        <nav></nav>
        <div class="slides"><slot></slot></div>
      </div>`;
  }
  connectedCallback() {
    const slotElement = this.shadowRoot.querySelector("slot");
    const navElement = this.shadowRoot.querySelector("nav");
    slotElement.assignedElements().forEach((weekEl) => {
      const linkEl = document.createElement("a");
      //   linkEl.onclick = this.scrollToWeek;
      linkEl.setAttribute("href", `#${weekEl.id}`);
      linkEl.innerHTML = weekEl.id;
      navElement.appendChild(linkEl);
    });
  }
  //   scrollToWeek(e) {
  //     e.preventDefault();
  //     document.querySelector(e.target.getAttribute("href")).scrollIntoView({
  //       behaviour: "smooth",
  //       block: "nearest",
  //       inline: "start",
  //     });
  //   }
}

customElements.define("tt-carousel", TimetableCarousel);
