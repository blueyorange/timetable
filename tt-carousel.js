class TimetableCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        * {
          box-sizing: border-box;
        }
        .slider {
          width: 100%;
          text-align: center;
          overflow: hidden;
        }
        slot {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
        }
        ::slotted(*) {
          scroll-snap-align: start;
          flex-shrink: 0;
          width: 100%;
          height: 500px;
          transition: transform 0.5s;
          position: relative;
          display: flex;
          justify-content: center;
        }
      </style>
      <div class="slider">
        <nav>
          <a href="#slide-1">1</a>
          <a href="#slide-2">2</a>
        </nav>
        <div class="slides"><slot></slot></div>
      </div>`;
  }
  connectedCallback() {
    const slotElement = this.shadowRoot.querySelector("slot");
    const slottedElements = slotElement.assignedElements({ flatten: true });
    console.log(slottedElements);
  }
}

customElements.define("tt-carousel", TimetableCarousel);
