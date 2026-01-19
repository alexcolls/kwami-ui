var V = Object.defineProperty;
var B = (h, o, t) => o in h ? V(h, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[o] = t;
var n = (h, o, t) => B(h, typeof o != "symbol" ? o + "" : o, t);
const C = class C {
  constructor(o) {
    /** Unique identifier for this component instance */
    n(this, "id");
    n(this, "props");
    n(this, "element", null);
    n(this, "listeners", []);
    this.props = o, this.id = `kwami-${++C.counter}`;
  }
  /**
   * Convenience method to render HTML and hydrate in one step.
   * Renders the component into the container and attaches event listeners.
   * @param container The container element to mount into.
   * @returns The root element of the component.
   */
  mount(o) {
    o.innerHTML = this.render();
    const t = o.firstElementChild;
    return this.hydrate(t), t;
  }
  /**
   * Attaches event listeners and initializes behavior for the component.
   * This method should be called after the component's HTML has been inserted into the DOM.
   * @param element The root element of the component.
   */
  hydrate(o) {
    this.element = o, this.element.setAttribute("data-kwami-id", this.id), this.onHydrate();
  }
  /**
   * Lifecycle method called during hydration.
   * Override this to attach event listeners.
   */
  onHydrate() {
  }
  /**
   * Helper method to add event listeners with automatic cleanup tracking.
   * Use this instead of direct addEventListener calls.
   * @param el The element to attach the listener to.
   * @param type The event type (e.g., 'click', 'input').
   * @param handler The event handler function.
   */
  addListener(o, t, e) {
    o.addEventListener(t, e), this.listeners.push({ el: o, type: t, handler: e });
  }
  /**
   * Cleans up the component by removing all event listeners and references.
   * Call this before removing the component from the DOM to prevent memory leaks.
   */
  destroy() {
    this.listeners.forEach(({ el: o, type: t, handler: e }) => {
      o.removeEventListener(t, e);
    }), this.listeners = [], this.element = null;
  }
  /**
   * Updates the component's properties and re-renders if necessary.
   * Note: This is a simple implementation and might require full re-hydration depending on usage.
   * @param newProps Partial properties to update.
   */
  update(o) {
    this.props = { ...this.props, ...o };
  }
};
n(C, "counter", 0);
let p = C;
const I = {
  primary: "#ff9500",
  secondary: "#007aff",
  background: "#e0e5ec",
  shadow: "rgba(163, 177, 198, 0.6)",
  light: "rgba(255, 255, 255, 0.8)"
}, O = {
  primary: "#ff9500",
  secondary: "#5856d6",
  background: "#1e1e1e",
  shadow: "rgba(0, 0, 0, 0.5)",
  light: "rgba(255, 255, 255, 0.03)"
}, st = {
  mode: "dark",
  colors: {
    light: I,
    dark: O
  }
};
function F(h) {
  return h.mode === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : h.mode;
}
function at(h) {
  const o = document.documentElement, t = document.body, e = () => {
    const i = F(h), s = h.colors[i];
    o.setAttribute("data-theme", i), t.setAttribute("data-theme", i), o.style.setProperty("--accent-primary", s.primary), o.style.setProperty("--accent-secondary", s.secondary), o.style.setProperty("--kwami-accent", s.primary), s.background && (o.style.setProperty("--kwami-bg", s.background), o.style.setProperty("--kwami-surface", s.background)), s.shadow && o.style.setProperty("--kwami-shadow-dark", s.shadow), s.light && o.style.setProperty("--kwami-shadow-light", s.light);
  };
  if (e(), h.mode === "system") {
    const i = window.matchMedia("(prefers-color-scheme: dark)");
    return i.addEventListener("change", e), () => {
      i.removeEventListener("change", e);
    };
  }
  return () => {
  };
}
function b(h, o, t) {
  o /= 100, t /= 100;
  const e = o * Math.min(t, 1 - t), i = (s) => {
    const a = (s + h / 30) % 12, r = t - e * Math.max(Math.min(a - 3, 9 - a, 1), -1);
    return Math.round(255 * r).toString(16).padStart(2, "0");
  };
  return `#${i(0)}${i(8)}${i(4)}`;
}
function z(h, o, t) {
  o /= 100, t /= 100;
  const e = o * Math.min(t, 1 - t), i = (s) => {
    const a = (s + h / 30) % 12;
    return Math.round(255 * (t - e * Math.max(Math.min(a - 3, 9 - a, 1), -1)));
  };
  return { r: i(0), g: i(8), b: i(4) };
}
function N(h) {
  const o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return o ? {
    r: parseInt(o[1], 16),
    g: parseInt(o[2], 16),
    b: parseInt(o[3], 16)
  } : null;
}
function E(h, o, t) {
  h /= 255, o /= 255, t /= 255;
  const e = Math.max(h, o, t), i = Math.min(h, o, t);
  let s = 0, a = 0;
  const r = (e + i) / 2;
  if (e !== i) {
    const l = e - i;
    switch (a = r > 0.5 ? l / (2 - e - i) : l / (e + i), e) {
      case h:
        s = ((o - t) / l + (o < t ? 6 : 0)) / 6;
        break;
      case o:
        s = ((t - h) / l + 2) / 6;
        break;
      case t:
        s = ((h - o) / l + 4) / 6;
        break;
    }
  }
  return { h: Math.round(s * 360), s: Math.round(a * 100), l: Math.round(r * 100) };
}
function x(h) {
  if (h = h.trim(), h.startsWith("#")) {
    h.length === 9 && (h = h.substring(0, 7));
    const s = N(h);
    if (s) return E(s.r, s.g, s.b);
  }
  const o = h.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (o)
    return E(parseInt(o[1]), parseInt(o[2]), parseInt(o[3]));
  const t = h.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*[\d.]+\s*\)$/i);
  if (t)
    return E(parseInt(t[1]), parseInt(t[2]), parseInt(t[3]));
  const e = h.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/i);
  if (e)
    return { h: parseInt(e[1]), s: parseInt(e[2]), l: parseInt(e[3]) };
  const i = h.match(/^hsla\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*[\d.]+\s*\)$/i);
  return i ? { h: parseInt(i[1]), s: parseInt(i[2]), l: parseInt(i[3]) } : null;
}
function k(h, o) {
  h = h.replace(/^#/, "");
  let t = parseInt(h.substring(0, 2), 16), e = parseInt(h.substring(2, 4), 16), i = parseInt(h.substring(4, 6), 16);
  return t = Math.min(255, Math.max(0, t + Math.round(t * o / 100))), e = Math.min(255, Math.max(0, e + Math.round(e * o / 100))), i = Math.min(255, Math.max(0, i + Math.round(i * o / 100))), `#${t.toString(16).padStart(2, "0")}${e.toString(16).padStart(2, "0")}${i.toString(16).padStart(2, "0")}`;
}
function nt(h) {
  return {
    start: k(h, 30),
    light: k(h, 15),
    mid: h,
    dark: k(h, -10),
    end: k(h, -25)
  };
}
class R extends p {
  constructor(t = {}) {
    super(t);
    n(this, "btn", null);
    n(this, "isDisabled");
    n(this, "isLoading");
    this.isDisabled = t.disabled ?? !1, this.isLoading = t.loading ?? !1;
  }
  render() {
    const {
      label: t = "CLICK",
      className: e = "",
      size: i = "md",
      variant: s = "default",
      disabled: a = !1,
      loading: r = !1,
      icon: l,
      iconPosition: c = "left",
      type: d = "button",
      fullWidth: u = !1
    } = this.props, m = [
      "kwami-button-bezel",
      `kwami-button-bezel--${i}`,
      `kwami-button-bezel--${s}`,
      a || r ? "kwami-button-disabled" : "",
      u ? "kwami-button-bezel--full" : "",
      e
    ].filter(Boolean).join(" "), g = l ? `<iconify-icon class="kwami-button-icon" icon="${l}" width="18" height="18"></iconify-icon>` : "", v = r ? '<span class="kwami-button-spinner"></span>' : "", S = l && c === "right" ? `<span class="kwami-button-text">${t}</span>${g}` : `${g}<span class="kwami-button-text">${t}</span>`;
    return `
            <div class="${m}" data-kwami-id="${this.id}">
                <button 
                    class="kwami-button" 
                    type="${d}"
                    ${a || r ? 'disabled aria-disabled="true"' : ""}
                    ${r ? 'aria-busy="true"' : ""}
                >
                    <span class="kwami-button-face">
                        <span class="kwami-button-highlight"></span>
                        ${r ? v : S}
                    </span>
                </button>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.btn = this.element.querySelector(".kwami-button"), this.btn && this.addListener(this.btn, "click", (t) => {
      var e;
      this.isDisabled || this.isLoading || (this.btn.classList.add("pressed"), setTimeout(() => this.btn.classList.remove("pressed"), 150), (e = this.element) == null || e.dispatchEvent(new CustomEvent("buttonclick", {
        detail: { originalEvent: t },
        bubbles: !0
      })), this.props.onClick && this.props.onClick(t));
    }));
  }
  /** Enable or disable the button */
  setDisabled(t) {
    var e;
    this.isDisabled = t, this.btn && (this.btn.disabled = t, this.btn.setAttribute("aria-disabled", String(t))), (e = this.element) == null || e.classList.toggle("kwami-button-disabled", t);
  }
  /** Set loading state */
  setLoading(t) {
    var i, s;
    this.isLoading = t, this.setDisabled(t), this.btn && this.btn.setAttribute("aria-busy", String(t)), (i = this.element) == null || i.classList.toggle("kwami-button-loading", t);
    const e = (s = this.element) == null ? void 0 : s.querySelector(".kwami-button-face");
    if (e) {
      const a = e.querySelector(".kwami-button-highlight");
      if (t) {
        e.innerHTML = "", a && e.appendChild(a);
        const r = document.createElement("span");
        r.className = "kwami-button-spinner", e.appendChild(r);
      } else {
        const { label: r = "CLICK", icon: l, iconPosition: c = "left" } = this.props, d = l ? `<iconify-icon class="kwami-button-icon" icon="${l}" width="18" height="18"></iconify-icon>` : "", u = l && c === "right" ? `<span class="kwami-button-text">${r}</span>${d}` : `${d}<span class="kwami-button-text">${r}</span>`;
        e.innerHTML = `<span class="kwami-button-highlight"></span>${u}`;
      }
    }
  }
  /** Update button label */
  setLabel(t) {
    var i;
    const e = (i = this.element) == null ? void 0 : i.querySelector(".kwami-button-text");
    e && (e.textContent = t);
  }
  /** Get current disabled state */
  isButtonDisabled() {
    return this.isDisabled;
  }
  /** Get current loading state */
  isButtonLoading() {
    return this.isLoading;
  }
}
class y extends p {
  constructor(t = {}) {
    super(t);
    n(this, "ctx", null);
    n(this, "isOpen", !1);
    n(this, "isDragging", !1);
    n(this, "currentHue", 30);
    n(this, "currentSaturation", 100);
    n(this, "currentLightness", 50);
    n(this, "currentOpacity", 100);
    n(this, "currentFormat", "hex");
    // Store default color for reset feature
    n(this, "defaultHue", 30);
    n(this, "defaultSaturation", 100);
    n(this, "defaultLightness", 50);
    n(this, "defaultOpacity", 100);
    // DOM references
    n(this, "trigger", null);
    n(this, "popup", null);
    n(this, "canvas", null);
    n(this, "cursor", null);
    n(this, "preview", null);
    n(this, "brightnessSlider", null);
    n(this, "opacitySlider", null);
    n(this, "formatToggle", null);
    n(this, "valueInput", null);
    n(this, "pipetteBtn", null);
    n(this, "randomizeBtn", null);
    n(this, "resetBtn", null);
    n(this, "copyOppositeBtn", null);
    const e = x(t.defaultColor || "#ff9500");
    e && (this.currentHue = e.h, this.currentSaturation = e.s, this.currentLightness = e.l, this.defaultHue = e.h, this.defaultSaturation = e.s, this.defaultLightness = e.l);
  }
  render() {
    const {
      defaultColor: t = "#ff9500",
      popupDirection: e = "up",
      showRandomize: i = !1,
      showReset: s = !1,
      showCopyToOpposite: a = !1,
      showOpacity: r = !1
    } = this.props, l = e === "down" ? "kwami-colorpicker-popup-down" : "", c = i || s || a || this.props.showPipette !== !1;
    return `
            <div class="kwami-colorpicker" data-kwami-id="${this.id}" data-color="${t}">
                <button class="kwami-colorpicker-trigger" aria-label="Pick a color" title="Pick a color">
                    <span class="kwami-colorpicker-preview" style="background-color: ${t}"></span>
                    <iconify-icon icon="solar:palette-linear" width="16" height="16"></iconify-icon>
                </button>
                <div class="kwami-colorpicker-popup ${l}">
                    <div class="kwami-colorpicker-wheel">
                        <canvas class="kwami-colorpicker-canvas" width="200" height="200"></canvas>
                        <div class="kwami-colorpicker-cursor"></div>
                    </div>
                    <div class="kwami-colorpicker-sliders">
                        <div class="kwami-colorpicker-slider-row">
                            <iconify-icon icon="solar:sun-linear" width="14" height="14"></iconify-icon>
                            <input type="range" class="kwami-colorpicker-brightness-slider" min="0" max="100" value="${this.currentLightness}" />
                            <iconify-icon icon="solar:moon-linear" width="14" height="14"></iconify-icon>
                        </div>
                        ${r ? `
                            <div class="kwami-colorpicker-slider-row">
                                <iconify-icon icon="solar:eye-linear" width="14" height="14"></iconify-icon>
                                <input type="range" class="kwami-colorpicker-opacity-slider" min="0" max="100" value="${this.currentOpacity}" />
                                <iconify-icon icon="solar:eye-closed-linear" width="14" height="14"></iconify-icon>
                            </div>
                        ` : ""}
                    </div>
                    <div class="kwami-colorpicker-value-row">
                        <button class="kwami-colorpicker-format-toggle" data-format="hex" title="Toggle format">HEX</button>
                        <input type="text" class="kwami-colorpicker-value-input" value="${t}" spellcheck="false" />
                    </div>
                    ${c ? `
                        <div class="kwami-colorpicker-actions">
                            ${i ? `
                                <div class="kwami-colorpicker-action-item">
                                    <button class="kwami-colorpicker-randomize" aria-label="Randomize color" title="Randomize color">
                                        <iconify-icon icon="solar:shuffle-linear" width="14" height="14"></iconify-icon>
                                    </button>
                                    <span class="kwami-colorpicker-action-label">Random</span>
                                </div>
                            ` : ""}
                            <div class="kwami-colorpicker-action-item">
                                <button class="kwami-colorpicker-pipette" aria-label="Pick from screen" title="Pick color from screen">
                                    <iconify-icon icon="solar:pipette-linear" width="14" height="14"></iconify-icon>
                                </button>
                                <span class="kwami-colorpicker-action-label">Pick</span>
                            </div>
                            ${s ? `
                                <div class="kwami-colorpicker-action-item">
                                    <button class="kwami-colorpicker-reset" aria-label="Reset to default" title="Reset to default color">
                                        <iconify-icon icon="solar:restart-linear" width="14" height="14"></iconify-icon>
                                    </button>
                                    <span class="kwami-colorpicker-action-label">Reset</span>
                                </div>
                            ` : ""}
                            ${a ? `
                                <div class="kwami-colorpicker-action-item">
                                    <button class="kwami-colorpicker-copy-opposite" aria-label="Use for both themes" title="Use this color for both light and dark themes">
                                        <iconify-icon icon="solar:link-linear" width="14" height="14"></iconify-icon>
                                    </button>
                                    <span class="kwami-colorpicker-action-label">Both</span>
                                </div>
                            ` : ""}
                        </div>
                    ` : ""}
                </div>
            </div>
        `;
  }
  onHydrate() {
    var t;
    this.element && (this.trigger = this.element.querySelector(".kwami-colorpicker-trigger"), this.popup = this.element.querySelector(".kwami-colorpicker-popup"), this.canvas = this.element.querySelector(".kwami-colorpicker-canvas"), this.cursor = this.element.querySelector(".kwami-colorpicker-cursor"), this.preview = this.element.querySelector(".kwami-colorpicker-preview"), this.brightnessSlider = this.element.querySelector(".kwami-colorpicker-brightness-slider"), this.opacitySlider = this.element.querySelector(".kwami-colorpicker-opacity-slider"), this.formatToggle = this.element.querySelector(".kwami-colorpicker-format-toggle"), this.valueInput = this.element.querySelector(".kwami-colorpicker-value-input"), this.pipetteBtn = this.element.querySelector(".kwami-colorpicker-pipette"), this.randomizeBtn = this.element.querySelector(".kwami-colorpicker-randomize"), this.resetBtn = this.element.querySelector(".kwami-colorpicker-reset"), this.copyOppositeBtn = this.element.querySelector(".kwami-colorpicker-copy-opposite"), !(!this.trigger || !this.popup || !this.canvas || !this.cursor || !this.preview || !this.brightnessSlider || !this.formatToggle || !this.valueInput) && (this.ctx = this.canvas.getContext("2d"), this.ctx && (this.pipetteBtn && (!window.EyeDropper || this.props.showPipette === !1) && ((t = this.pipetteBtn.parentElement) == null || t.remove()), this.drawWheel(), this.updateCursorPosition(), this.setupEventListeners())));
  }
  setupEventListeners() {
    if (!this.trigger || !this.canvas || !this.brightnessSlider || !this.formatToggle || !this.valueInput || !this.popup) return;
    this.addListener(this.trigger, "click", (s) => {
      s.stopPropagation(), this.togglePopup();
    }), this.addListener(this.canvas, "mousedown", (s) => {
      this.isDragging = !0, this.updateFromWheel(s);
    }), this.addListener(this.canvas, "mousemove", (s) => {
      this.isDragging && this.updateFromWheel(s);
    });
    const t = () => {
      this.isDragging = !1;
    };
    document.addEventListener("mouseup", t), this.addListener(this.canvas, "touchstart", (s) => {
      s.preventDefault(), this.isDragging = !0, this.updateFromWheel(s.touches[0]);
    }), this.addListener(this.canvas, "touchmove", (s) => {
      s.preventDefault(), this.isDragging && this.updateFromWheel(s.touches[0]);
    }), this.addListener(this.canvas, "touchend", () => {
      this.isDragging = !1;
    }), this.addListener(this.brightnessSlider, "input", () => {
      this.currentLightness = parseInt(this.brightnessSlider.value), this.drawWheel(), this.updateFinalColor();
    }), this.opacitySlider && this.addListener(this.opacitySlider, "input", () => {
      this.currentOpacity = parseInt(this.opacitySlider.value), this.updateFinalColor();
    }), this.addListener(this.formatToggle, "click", (s) => {
      s.stopPropagation(), this.cycleFormat();
    }), this.pipetteBtn && this.addListener(this.pipetteBtn, "click", (s) => {
      s.stopPropagation(), this.pickFromScreen();
    }), this.randomizeBtn && this.addListener(this.randomizeBtn, "click", (s) => {
      s.stopPropagation(), this.randomizeColor();
    }), this.resetBtn && this.addListener(this.resetBtn, "click", (s) => {
      s.stopPropagation(), this.resetToDefault();
    }), this.copyOppositeBtn && this.addListener(this.copyOppositeBtn, "click", (s) => {
      s.stopPropagation(), this.copyToOppositeTheme();
    }), this.addListener(this.valueInput, "input", () => {
      this.handleInputChange();
    }), this.addListener(this.valueInput, "blur", () => {
      this.valueInput.value = this.getColorString();
    }), this.addListener(this.valueInput, "keydown", (s) => {
      s.key === "Enter" && this.valueInput.blur();
    });
    const e = (s) => {
      var a;
      this.isOpen && !((a = this.element) != null && a.contains(s.target)) && this.closePopup();
    };
    document.addEventListener("click", e);
    const i = (s) => {
      s.key === "Escape" && this.isOpen && this.closePopup();
    };
    document.addEventListener("keydown", i);
  }
  togglePopup() {
    var t, e;
    this.isOpen = !this.isOpen, (t = this.popup) == null || t.classList.toggle("active", this.isOpen), (e = this.element) == null || e.classList.toggle("active", this.isOpen), this.isOpen && this.updateCursorPosition();
  }
  closePopup() {
    var t, e;
    this.isOpen = !1, (t = this.popup) == null || t.classList.remove("active"), (e = this.element) == null || e.classList.remove("active");
  }
  drawWheel() {
    if (!this.ctx || !this.canvas) return;
    const t = this.canvas.width / 2, e = this.canvas.height / 2, i = Math.min(t, e) - 5;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let s = 0; s < 360; s++) {
      const a = (s - 1) * Math.PI / 180, r = (s + 1) * Math.PI / 180;
      this.ctx.beginPath(), this.ctx.moveTo(t, e), this.ctx.arc(t, e, i, a, r), this.ctx.closePath();
      const l = this.ctx.createRadialGradient(t, e, 0, t, e, i);
      l.addColorStop(0, `hsl(${s}, 0%, ${this.currentLightness}%)`), l.addColorStop(1, `hsl(${s}, 100%, ${this.currentLightness}%)`), this.ctx.fillStyle = l, this.ctx.fill();
    }
  }
  updateFromWheel(t) {
    if (!this.canvas || !this.cursor) return;
    const e = this.canvas.getBoundingClientRect(), i = this.canvas.width / e.width, s = this.canvas.height / e.height, a = (t.clientX - e.left) * i, r = (t.clientY - e.top) * s, l = this.canvas.width / 2, c = this.canvas.height / 2, d = Math.min(l, c) - 5, u = a - l, m = r - c, g = Math.sqrt(u * u + m * m);
    if (g <= d) {
      this.cursor.style.left = `${a / i}px`, this.cursor.style.top = `${r / s}px`, this.cursor.style.opacity = "1";
      let v = Math.atan2(m, u) * (180 / Math.PI);
      v < 0 && (v += 360), this.currentHue = v, this.currentSaturation = Math.min(g / d * 100, 100), this.updateFinalColor();
    }
  }
  updateCursorPosition() {
    if (!this.canvas || !this.cursor) return;
    const t = this.canvas.getBoundingClientRect(), e = this.canvas.width / t.width, i = this.canvas.height / t.height, s = this.canvas.width / 2, a = this.canvas.height / 2, r = Math.min(s, a) - 5, l = this.currentHue * (Math.PI / 180), c = this.currentSaturation / 100 * r, d = s + Math.cos(l) * c, u = a + Math.sin(l) * c;
    this.cursor.style.left = `${d / e}px`, this.cursor.style.top = `${u / i}px`, this.cursor.style.opacity = "1";
    const m = b(this.currentHue, this.currentSaturation, this.currentLightness);
    this.cursor.style.backgroundColor = m;
  }
  getColorString() {
    const t = z(this.currentHue, this.currentSaturation, this.currentLightness), e = this.currentOpacity / 100;
    switch (this.currentFormat) {
      case "hex":
        if (this.currentOpacity < 100) {
          const i = Math.round(e * 255).toString(16).padStart(2, "0");
          return (b(this.currentHue, this.currentSaturation, this.currentLightness) + i).toUpperCase();
        }
        return b(this.currentHue, this.currentSaturation, this.currentLightness).toUpperCase();
      case "rgb":
        return this.currentOpacity < 100 ? `rgba(${t.r}, ${t.g}, ${t.b}, ${e.toFixed(2)})` : `rgb(${t.r}, ${t.g}, ${t.b})`;
      case "hsl":
        return this.currentOpacity < 100 ? `hsla(${Math.round(this.currentHue)}, ${Math.round(this.currentSaturation)}%, ${Math.round(this.currentLightness)}%, ${e.toFixed(2)})` : `hsl(${Math.round(this.currentHue)}, ${Math.round(this.currentSaturation)}%, ${Math.round(this.currentLightness)}%)`;
    }
  }
  updateFinalColor(t = !0) {
    var s, a;
    const e = b(this.currentHue, this.currentSaturation, this.currentLightness), i = this.currentOpacity / 100;
    if (this.preview)
      if (this.currentOpacity < 100) {
        const r = z(this.currentHue, this.currentSaturation, this.currentLightness);
        this.preview.style.backgroundColor = `rgba(${r.r}, ${r.g}, ${r.b}, ${i})`;
      } else
        this.preview.style.backgroundColor = e;
    (s = this.element) == null || s.setAttribute("data-color", e), t && this.valueInput && (this.valueInput.value = this.getColorString()), this.updateCursorPosition(), (a = this.element) == null || a.dispatchEvent(new CustomEvent("colorchange", {
      detail: { color: e, opacity: this.currentOpacity },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(e);
  }
  handleInputChange() {
    if (!this.valueInput) return;
    const t = x(this.valueInput.value);
    t && (this.currentHue = t.h, this.currentSaturation = t.s, this.currentLightness = t.l, this.brightnessSlider && (this.brightnessSlider.value = String(this.currentLightness)), this.drawWheel(), this.updateCursorPosition(), this.updateFinalColor(!1));
  }
  cycleFormat() {
    const t = ["hex", "rgb", "hsl"], e = t.indexOf(this.currentFormat);
    this.currentFormat = t[(e + 1) % t.length], this.formatToggle && (this.formatToggle.textContent = this.currentFormat.toUpperCase(), this.formatToggle.setAttribute("data-format", this.currentFormat)), this.valueInput && (this.valueInput.value = this.getColorString());
  }
  async pickFromScreen() {
    var t, e, i;
    if (!(!window.EyeDropper || !this.pipetteBtn || !this.popup))
      try {
        const s = new window.EyeDropper();
        this.pipetteBtn.classList.add("clicked"), setTimeout(() => {
          var c;
          return (c = this.pipetteBtn) == null ? void 0 : c.classList.remove("clicked");
        }, 200), this.popup.classList.remove("active"), (t = this.element) == null || t.classList.remove("active");
        const r = (await s.open()).sRGBHex;
        this.popup.classList.add("active"), (e = this.element) == null || e.classList.add("active");
        const l = x(r);
        l && (this.currentHue = l.h, this.currentSaturation = l.s, this.currentLightness = l.l, this.brightnessSlider && (this.brightnessSlider.value = String(this.currentLightness)), this.drawWheel(), this.updateCursorPosition(), this.updateFinalColor());
      } catch {
        this.popup.classList.add("active"), (i = this.element) == null || i.classList.add("active");
      }
  }
  /** Randomize the color */
  randomizeColor() {
    var t;
    this.currentHue = Math.random() * 360, this.currentSaturation = 50 + Math.random() * 50, this.currentLightness = 30 + Math.random() * 40, this.brightnessSlider && (this.brightnessSlider.value = String(this.currentLightness)), this.drawWheel(), this.updateCursorPosition(), this.updateFinalColor(), (t = this.randomizeBtn) == null || t.classList.add("clicked"), setTimeout(() => {
      var e;
      return (e = this.randomizeBtn) == null ? void 0 : e.classList.remove("clicked");
    }, 200);
  }
  /** Reset to default color (simple button, not toggle) */
  resetToDefault() {
    var t;
    this.currentHue = this.defaultHue, this.currentSaturation = this.defaultSaturation, this.currentLightness = this.defaultLightness, this.currentOpacity = this.defaultOpacity, this.brightnessSlider && (this.brightnessSlider.value = String(this.currentLightness)), this.opacitySlider && (this.opacitySlider.value = String(this.currentOpacity)), this.drawWheel(), this.updateCursorPosition(), this.updateFinalColor(), (t = this.resetBtn) == null || t.classList.add("clicked"), setTimeout(() => {
      var e;
      return (e = this.resetBtn) == null ? void 0 : e.classList.remove("clicked");
    }, 200);
  }
  /** Copy current color to opposite theme */
  copyToOppositeTheme() {
    var e, i;
    const t = b(this.currentHue, this.currentSaturation, this.currentLightness);
    (e = this.copyOppositeBtn) == null || e.classList.add("clicked"), setTimeout(() => {
      var s;
      return (s = this.copyOppositeBtn) == null ? void 0 : s.classList.remove("clicked");
    }, 200), (i = this.element) == null || i.dispatchEvent(new CustomEvent("copytoopposite", {
      detail: { color: t },
      bubbles: !0
    })), this.props.onCopyToOpposite && this.props.onCopyToOpposite(t);
  }
  /** Get the current color value */
  getColor() {
    return b(this.currentHue, this.currentSaturation, this.currentLightness);
  }
  /** Set the color programmatically */
  setColor(t) {
    const e = x(t);
    e && (this.currentHue = e.h, this.currentSaturation = e.s, this.currentLightness = e.l, this.brightnessSlider && (this.brightnessSlider.value = String(this.currentLightness)), this.drawWheel(), this.updateCursorPosition(), this.updateFinalColor());
  }
  /** Set the default color for reset feature */
  setDefaultColor(t) {
    const e = x(t);
    e && (this.defaultHue = e.h, this.defaultSaturation = e.s, this.defaultLightness = e.l);
  }
}
const j = {
  label: "CLICK",
  bezel: { color: "#d0d0d0", radius: 14, padding: 6, shadowDepth: 50 },
  face: { color: "#e8e8e8", radius: 10, depth: 50, brightness: 50 },
  highlight: { color: "#ffffff", opacity: 40, height: 50 },
  text: { color: "#555555", size: 12, spacing: 2, weight: 600 }
};
class rt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "config");
    n(this, "button", null);
    // DOM references
    n(this, "bezelEl", null);
    n(this, "faceEl", null);
    n(this, "highlightEl", null);
    n(this, "textEl", null);
    // Color pickers
    n(this, "colorPickers", /* @__PURE__ */ new Map());
    this.config = { ...j, ...t.initialConfig };
  }
  render() {
    const { showControls: t = !0 } = this.props;
    this.button = new R({ label: this.config.label });
    const e = t ? this.renderControls() : "";
    return `
      <div class="kwami-button-configurator" data-kwami-id="${this.id}">
          <div class="kwami-button-configurator-preview">
        <div class="kwami-button-configurator-container">
            ${this.button.render()}
        </div>
          </div>
          ${e}
      </div>
      `;
  }
  renderControls() {
    return `
      <div class="kwami-button-configurator-controls">
          <!-- Part Selector Tabs -->
          <div class="kwami-button-configurator-parts">
        <button class="kwami-button-configurator-part-btn active" data-part="bezel" title="Bezel (outer frame)">
            <span class="part-icon">◰</span>
            <span class="part-label">Bezel</span>
        </button>
        <button class="kwami-button-configurator-part-btn" data-part="face" title="Face (button surface)">
            <span class="part-icon">▣</span>
            <span class="part-label">Face</span>
        </button>
        <button class="kwami-button-configurator-part-btn" data-part="highlight" title="Highlight (shine effect)">
            <span class="part-icon">◐</span>
            <span class="part-label">Shine</span>
        </button>
        <button class="kwami-button-configurator-part-btn" data-part="text" title="Text (label)">
            <span class="part-icon">T</span>
            <span class="part-label">Text</span>
        </button>
          </div>

          <!-- Control Panels -->
          <div class="kwami-button-configurator-panels">
        ${this.renderBezelPanel()}
        ${this.renderFacePanel()}
        ${this.renderHighlightPanel()}
        ${this.renderTextPanel()}
          </div>
      </div>
      `;
  }
  renderBezelPanel() {
    const { bezel: t } = this.config;
    return `
      <div class="kwami-button-configurator-panel active" data-panel="bezel">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="bezel"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Border Radius</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="bezel-radius" min="0" max="30" value="${t.radius}" />
            <span class="kwami-cfg-value">${t.radius}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Padding</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="bezel-padding" min="2" max="16" value="${t.padding}" />
            <span class="kwami-cfg-value">${t.padding}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Shadow Depth</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="bezel-shadow" min="0" max="100" value="${t.shadowDepth}" />
            <span class="kwami-cfg-value">${t.shadowDepth}%</span>
        </div>
          </div>
      </div>
      `;
  }
  renderFacePanel() {
    const { face: t } = this.config;
    return `
      <div class="kwami-button-configurator-panel" data-panel="face">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="face"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Border Radius</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="face-radius" min="0" max="24" value="${t.radius}" />
            <span class="kwami-cfg-value">${t.radius}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">3D Depth</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="face-depth" min="0" max="100" value="${t.depth}" />
            <span class="kwami-cfg-value">${t.depth}%</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Brightness</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="face-brightness" min="0" max="100" value="${t.brightness}" />
            <span class="kwami-cfg-value">${t.brightness}%</span>
        </div>
          </div>
      </div>
      `;
  }
  renderHighlightPanel() {
    const { highlight: t } = this.config;
    return `
      <div class="kwami-button-configurator-panel" data-panel="highlight">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="highlight"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Intensity</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="highlight-opacity" min="0" max="100" value="${t.opacity}" />
            <span class="kwami-cfg-value">${t.opacity}%</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Coverage</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="highlight-height" min="20" max="80" value="${t.height}" />
            <span class="kwami-cfg-value">${t.height}%</span>
        </div>
          </div>
      </div>
      `;
  }
  renderTextPanel() {
    const { text: t, label: e } = this.config;
    return `
      <div class="kwami-button-configurator-panel" data-panel="text">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="text"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Content</label>
        <input type="text" class="kwami-cfg-input" data-prop="text-content" value="${e}" maxlength="20" />
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Font Size</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="text-size" min="8" max="18" value="${t.size}" step="1" />
            <span class="kwami-cfg-value">${t.size}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Letter Spacing</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="text-spacing" min="0" max="8" value="${t.spacing}" step="0.5" />
            <span class="kwami-cfg-value">${t.spacing}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Weight</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="text-weight" min="400" max="800" value="${t.weight}" step="100" />
            <span class="kwami-cfg-value">${t.weight}</span>
        </div>
          </div>
      </div>
      `;
  }
  onHydrate() {
    this.element && (this.bezelEl = this.element.querySelector(".kwami-button-bezel"), this.faceEl = this.element.querySelector(".kwami-button-face"), this.highlightEl = this.element.querySelector(".kwami-button-highlight"), this.textEl = this.element.querySelector(".kwami-button-text"), this.button && this.bezelEl && this.button.hydrate(this.bezelEl), this.setupColorPickers(), this.setupPartSelector(), this.setupSliders(), this.setupTextInput(), this.highlightPart("bezel"));
  }
  setupColorPickers() {
    if (!this.element) return;
    ["bezel", "face", "highlight", "text"].forEach((e) => {
      var l;
      const i = (l = this.element) == null ? void 0 : l.querySelector(`[data-color-target="${e}"]`);
      if (!i) return;
      const s = this.getColorForTarget(e), a = new y({
        defaultColor: s,
        popupDirection: "up",
        onChange: (c) => this.handleColorChange(e, c)
      });
      i.innerHTML = a.render();
      const r = i.querySelector(".kwami-colorpicker");
      r && (a.hydrate(r), this.colorPickers.set(e, a));
    });
  }
  getColorForTarget(t) {
    switch (t) {
      case "bezel":
        return this.config.bezel.color;
      case "face":
        return this.config.face.color;
      case "highlight":
        return this.config.highlight.color;
      case "text":
        return this.config.text.color;
      default:
        return "#ffffff";
    }
  }
  handleColorChange(t, e) {
    switch (t) {
      case "bezel":
        if (this.config.bezel.color = e, this.bezelEl) {
          const i = k(e, 20), s = k(e, -20);
          this.bezelEl.style.background = `linear-gradient(145deg, ${i} 0%, ${e} 50%, ${s} 100%)`;
        }
        break;
      case "face":
        if (this.config.face.color = e, this.faceEl) {
          const i = k(e, 30), s = k(e, 15), a = k(e, -10), r = k(e, -25);
          this.faceEl.style.background = `linear-gradient(160deg, ${i} 0%, ${s} 20%, ${e} 50%, ${a} 80%, ${r} 100%)`;
        }
        break;
      case "highlight":
        this.config.highlight.color = e, this.highlightEl && (this.highlightEl.style.background = `linear-gradient(180deg, ${e}66 0%, ${e}1a 50%, transparent 100%)`);
        break;
      case "text":
        this.config.text.color = e, this.textEl && (this.textEl.style.color = e, this.textEl.style.textShadow = "none");
        break;
    }
    this.emitChange();
  }
  setupPartSelector() {
    if (!this.element) return;
    const t = this.element.querySelectorAll(".kwami-button-configurator-part-btn"), e = this.element.querySelectorAll(".kwami-button-configurator-panel");
    t.forEach((i) => {
      this.addListener(i, "click", () => {
        const s = i.getAttribute("data-part");
        t.forEach((a) => a.classList.remove("active")), i.classList.add("active"), e.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("data-panel") === s);
        }), this.highlightPart(s);
      });
    });
  }
  highlightPart(t) {
    var e, i, s, a, r, l, c, d;
    switch ((e = this.bezelEl) == null || e.classList.remove("kwami-cfg-editing"), (i = this.faceEl) == null || i.classList.remove("kwami-cfg-editing"), (s = this.highlightEl) == null || s.classList.remove("kwami-cfg-editing"), (a = this.textEl) == null || a.classList.remove("kwami-cfg-editing"), t) {
      case "bezel":
        (r = this.bezelEl) == null || r.classList.add("kwami-cfg-editing");
        break;
      case "face":
        (l = this.faceEl) == null || l.classList.add("kwami-cfg-editing");
        break;
      case "highlight":
        (c = this.highlightEl) == null || c.classList.add("kwami-cfg-editing");
        break;
      case "text":
        (d = this.textEl) == null || d.classList.add("kwami-cfg-editing");
        break;
    }
  }
  setupSliders() {
    if (!this.element) return;
    this.element.querySelectorAll(".kwami-cfg-slider").forEach((e) => {
      var r;
      const i = e, s = i.getAttribute("data-prop"), a = (r = i.parentElement) == null ? void 0 : r.querySelector(".kwami-cfg-value");
      this.addListener(i, "input", () => {
        const l = parseFloat(i.value);
        this.handleSliderChange(s, l, a);
      });
    });
  }
  handleSliderChange(t, e, i) {
    switch (t) {
      case "bezel-radius":
        this.config.bezel.radius = e, this.bezelEl && (this.bezelEl.style.borderRadius = `${e}px`), i && (i.textContent = `${e}px`);
        break;
      case "bezel-padding":
        this.config.bezel.padding = e, this.bezelEl && (this.bezelEl.style.padding = `${e}px`), i && (i.textContent = `${e}px`);
        break;
      case "bezel-shadow":
        this.config.bezel.shadowDepth = e, this.bezelEl && this.bezelEl.style.setProperty("--shadow-intensity", String(e / 100)), i && (i.textContent = `${e}%`);
        break;
      case "face-radius":
        this.config.face.radius = e, this.faceEl && (this.faceEl.style.borderRadius = `${e}px`), i && (i.textContent = `${e}px`);
        break;
      case "face-depth":
        this.config.face.depth = e, this.faceEl && this.faceEl.style.setProperty("--face-depth", String(e / 100)), i && (i.textContent = `${e}%`);
        break;
      case "face-brightness":
        this.config.face.brightness = e, this.faceEl && this.faceEl.style.setProperty("--face-brightness", String(e / 100)), i && (i.textContent = `${e}%`);
        break;
      case "highlight-opacity":
        this.config.highlight.opacity = e, this.highlightEl && (this.highlightEl.style.opacity = String(e / 100)), i && (i.textContent = `${e}%`);
        break;
      case "highlight-height":
        this.config.highlight.height = e, this.highlightEl && (this.highlightEl.style.height = `${e}%`), i && (i.textContent = `${e}%`);
        break;
      case "text-size":
        this.config.text.size = e, this.textEl && (this.textEl.style.fontSize = `${e / 16}rem`), i && (i.textContent = `${e}px`);
        break;
      case "text-spacing":
        this.config.text.spacing = e, this.textEl && (this.textEl.style.letterSpacing = `${e}px`), i && (i.textContent = `${e}px`);
        break;
      case "text-weight":
        this.config.text.weight = e, this.textEl && (this.textEl.style.fontWeight = String(e)), i && (i.textContent = String(e));
        break;
    }
    this.emitChange();
  }
  setupTextInput() {
    if (!this.element) return;
    const t = this.element.querySelector('.kwami-cfg-input[data-prop="text-content"]');
    t && this.addListener(t, "input", () => {
      this.config.label = t.value || "CLICK", this.textEl && (this.textEl.textContent = this.config.label), this.emitChange();
    });
  }
  emitChange() {
    this.props.onChange && this.props.onChange({ ...this.config });
  }
  /** Get the current configuration */
  getConfiguration() {
    return { ...this.config };
  }
  /** Set configuration programmatically */
  setConfiguration(t) {
    this.config = { ...this.config, ...t };
  }
}
class T extends p {
  constructor(o) {
    super(o);
  }
  render() {
    const { text: o, as: t = "h3" } = this.props, e = o.split("").map((i, s) => i === " " ? `<span class="kwami-title-char kwami-title-space" style="--char-index: ${s}">&nbsp;</span>` : `<span class="kwami-title-char" style="--char-index: ${s}">${i}</span>`).join("");
    return `
      <${t} class="kwami-title" data-kwami-id="${this.id}">
          <span class="kwami-title-text">${e}</span>
          <span class="kwami-title-glow" aria-hidden="true">${o}</span>
      </${t}>
      `;
  }
  onHydrate() {
  }
}
function ot(h, o) {
  return new T({ text: h, as: o }).render();
}
const W = {
  text: "TITLE",
  glowColor: "#ff9500"
};
class lt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "config");
    n(this, "title", null);
    n(this, "colorPicker", null);
    this.config = { ...W, ...t.initialConfig };
  }
  render() {
    const { showControls: t = !0 } = this.props;
    return this.title = new T({ text: this.config.text }), `
            <div class="kwami-title-configurator" data-kwami-id="${this.id}">
                <div class="kwami-title-configurator-preview" style="--kwami-accent: ${this.config.glowColor}">
                    ${this.title.render()}
                </div>
                ${t ? this.renderControls() : ""}
            </div>
        `;
  }
  renderControls() {
    const { config: t } = this;
    return `
            <div class="kwami-title-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Text</label>
                    <input type="text" class="kwami-cfg-input" data-prop="text" value="${t.text}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Glow Color</label>
                    <div class="kwami-cfg-color" data-color-target="glow"></div>
                </div>
                <div class="kwami-cfg-row kwami-cfg-hint">
                    <span>Hover over the title to see the glow effect</span>
                </div>
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    const t = this.element.querySelector(".kwami-title");
    t && this.title && this.title.hydrate(t);
    const e = this.element.querySelector('[data-color-target="glow"]');
    if (e) {
      this.colorPicker = new y({
        defaultColor: this.config.glowColor,
        popupDirection: "up",
        onChange: (a) => {
          var l;
          this.config.glowColor = a;
          const r = (l = this.element) == null ? void 0 : l.querySelector(".kwami-title-configurator-preview");
          r && r.style.setProperty("--kwami-accent", a), this.emitChange();
        }
      }), e.innerHTML = this.colorPicker.render();
      const s = e.querySelector(".kwami-colorpicker");
      s && this.colorPicker.hydrate(s);
    }
    const i = this.element.querySelector('[data-prop="text"]');
    i && this.addListener(i, "input", () => {
      this.config.text = i.value || "TITLE", this.updateTitleText(this.config.text), this.emitChange();
    });
  }
  updateTitleText(t) {
    var s, a;
    const e = (s = this.element) == null ? void 0 : s.querySelector(".kwami-title-text"), i = (a = this.element) == null ? void 0 : a.querySelector(".kwami-title-glow");
    if (e) {
      const r = t.split("").map((l, c) => l === " " ? `<span class="kwami-title-char kwami-title-space" style="--char-index: ${c}">&nbsp;</span>` : `<span class="kwami-title-char" style="--char-index: ${c}">${l}</span>`).join("");
      e.innerHTML = r;
    }
    i && (i.textContent = t);
  }
  emitChange() {
    this.props.onChange && this.props.onChange({ ...this.config });
  }
  getConfiguration() {
    return { ...this.config };
  }
}
class Y extends p {
  constructor(o) {
    super(o);
  }
  render() {
    const {
      content: o,
      size: t = "md",
      weight: e = 400,
      color: i,
      align: s = "left",
      className: a = ""
    } = this.props, r = [
      i ? `color: ${i}` : "",
      `font-weight: ${e}`,
      `text-align: ${s}`
    ].filter(Boolean).join("; ");
    return `
            <p class="kwami-text kwami-text-${t} ${a}" 
               data-kwami-id="${this.id}"
               style="${r}">
                ${o}
            </p>
        `;
  }
  onHydrate() {
  }
  /** Update the text content */
  setContent(o) {
    this.element && (this.element.textContent = o);
  }
  /** Update text styles */
  setStyle(o) {
    this.element && (o.color && (this.element.style.color = o.color), o.weight && (this.element.style.fontWeight = String(o.weight)), o.align && (this.element.style.textAlign = o.align));
  }
}
const G = {
  content: "Sample text content",
  size: "md",
  weight: 400,
  color: "#333333",
  align: "left"
};
class ct extends p {
  constructor(t = {}) {
    super(t);
    n(this, "config");
    n(this, "text", null);
    n(this, "colorPicker", null);
    this.config = { ...G, ...t.initialConfig };
  }
  render() {
    const { showControls: t = !0 } = this.props;
    return this.text = new Y({
      content: this.config.content,
      size: this.config.size,
      weight: this.config.weight,
      color: this.config.color,
      align: this.config.align
    }), `
            <div class="kwami-text-configurator" data-kwami-id="${this.id}">
                <div class="kwami-text-configurator-preview">
                    ${this.text.render()}
                </div>
                ${t ? this.renderControls() : ""}
            </div>
        `;
  }
  renderControls() {
    const { config: t } = this;
    return `
            <div class="kwami-text-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Content</label>
                    <input type="text" class="kwami-cfg-input" data-prop="content" value="${t.content}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-select-group">
                        <button class="kwami-cfg-select-btn ${t.size === "xs" ? "active" : ""}" data-size="xs">XS</button>
                        <button class="kwami-cfg-select-btn ${t.size === "sm" ? "active" : ""}" data-size="sm">SM</button>
                        <button class="kwami-cfg-select-btn ${t.size === "md" ? "active" : ""}" data-size="md">MD</button>
                        <button class="kwami-cfg-select-btn ${t.size === "lg" ? "active" : ""}" data-size="lg">LG</button>
                        <button class="kwami-cfg-select-btn ${t.size === "xl" ? "active" : ""}" data-size="xl">XL</button>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Weight</label>
                    <div class="kwami-cfg-slider-wrap">
                        <input type="range" class="kwami-cfg-slider" data-prop="weight" min="300" max="700" step="100" value="${t.weight}" />
                        <span class="kwami-cfg-value">${t.weight}</span>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="text"></div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Align</label>
                    <div class="kwami-cfg-select-group">
                        <button class="kwami-cfg-select-btn ${t.align === "left" ? "active" : ""}" data-align="left">
                            <iconify-icon icon="solar:align-left-linear" width="16"></iconify-icon>
                        </button>
                        <button class="kwami-cfg-select-btn ${t.align === "center" ? "active" : ""}" data-align="center">
                            <iconify-icon icon="solar:align-horizontal-center-linear" width="16"></iconify-icon>
                        </button>
                        <button class="kwami-cfg-select-btn ${t.align === "right" ? "active" : ""}" data-align="right">
                            <iconify-icon icon="solar:align-right-linear" width="16"></iconify-icon>
                        </button>
                    </div>
                </div>
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    const t = this.element.querySelector(".kwami-text");
    t && this.text && this.text.hydrate(t);
    const e = this.element.querySelector('[data-color-target="text"]');
    if (e) {
      this.colorPicker = new y({
        defaultColor: this.config.color,
        popupDirection: "up",
        onChange: (d) => {
          var u;
          this.config.color = d, (u = this.text) == null || u.setStyle({ color: d }), this.emitChange();
        }
      }), e.innerHTML = this.colorPicker.render();
      const c = e.querySelector(".kwami-colorpicker");
      c && this.colorPicker.hydrate(c);
    }
    const i = this.element.querySelector('[data-prop="content"]');
    i && this.addListener(i, "input", () => {
      var c;
      this.config.content = i.value, (c = this.text) == null || c.setContent(i.value), this.emitChange();
    });
    const s = this.element.querySelectorAll("[data-size]");
    s.forEach((c) => {
      this.addListener(c, "click", () => {
        var m;
        const d = c.getAttribute("data-size");
        this.config.size = d, s.forEach((g) => g.classList.remove("active")), c.classList.add("active");
        const u = (m = this.element) == null ? void 0 : m.querySelector(".kwami-text");
        u && (u.className = `kwami-text kwami-text-${d}`), this.emitChange();
      });
    });
    const a = this.element.querySelector('[data-prop="weight"]'), r = this.element.querySelector(".kwami-cfg-slider-wrap .kwami-cfg-value");
    a && this.addListener(a, "input", () => {
      var d;
      const c = parseInt(a.value);
      this.config.weight = c, r && (r.textContent = String(c)), (d = this.text) == null || d.setStyle({ weight: c }), this.emitChange();
    });
    const l = this.element.querySelectorAll("[data-align]");
    l.forEach((c) => {
      this.addListener(c, "click", () => {
        var u;
        const d = c.getAttribute("data-align");
        this.config.align = d, l.forEach((m) => m.classList.remove("active")), c.classList.add("active"), (u = this.text) == null || u.setStyle({ align: d }), this.emitChange();
      });
    });
  }
  emitChange() {
    this.props.onChange && this.props.onChange({ ...this.config });
  }
  getConfiguration() {
    return { ...this.config };
  }
}
class M extends p {
  constructor(o) {
    super(o);
  }
  render() {
    const {
      text: o,
      size: t = "md",
      required: e = !1,
      color: i,
      htmlFor: s,
      className: a = ""
    } = this.props, r = s ? `for="${s}"` : "", l = i ? `style="color: ${i}"` : "", c = e ? '<span class="kwami-label-required">*</span>' : "";
    return `
            <label class="kwami-label kwami-label-${t} ${a}" 
                   data-kwami-id="${this.id}"
                   ${r}
                   ${l}>
                ${o}${c}
            </label>
        `;
  }
  onHydrate() {
  }
  setText(o) {
    if (this.element) {
      const t = this.element.querySelector(".kwami-label-required");
      this.element.textContent = o, t && this.element.appendChild(t);
    }
  }
  setColor(o) {
    this.element && (this.element.style.color = o);
  }
}
const U = {
  text: "Label",
  size: "md",
  color: "#666666",
  required: !1
};
class ht extends p {
  constructor(t = {}) {
    super(t);
    n(this, "config");
    n(this, "label", null);
    n(this, "colorPicker", null);
    this.config = { ...U, ...t.initialConfig };
  }
  render() {
    const { showControls: t = !0 } = this.props;
    return this.label = new M({
      text: this.config.text,
      size: this.config.size,
      color: this.config.color,
      required: this.config.required
    }), `
            <div class="kwami-label-configurator" data-kwami-id="${this.id}">
                <div class="kwami-label-configurator-preview">
                    ${this.label.render()}
                </div>
                ${t ? this.renderControls() : ""}
            </div>
        `;
  }
  renderControls() {
    const { config: t } = this;
    return `
            <div class="kwami-label-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Text</label>
                    <input type="text" class="kwami-cfg-input" data-prop="text" value="${t.text}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-select-group">
                        <button class="kwami-cfg-select-btn ${t.size === "sm" ? "active" : ""}" data-size="sm">SM</button>
                        <button class="kwami-cfg-select-btn ${t.size === "md" ? "active" : ""}" data-size="md">MD</button>
                        <button class="kwami-cfg-select-btn ${t.size === "lg" ? "active" : ""}" data-size="lg">LG</button>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="label"></div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Required</label>
                    <button class="kwami-cfg-toggle ${t.required ? "active" : ""}" data-prop="required">
                        <span class="kwami-cfg-toggle-track">
                            <span class="kwami-cfg-toggle-thumb"></span>
                        </span>
                    </button>
                </div>
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    const t = this.element.querySelector(".kwami-label");
    t && this.label && this.label.hydrate(t);
    const e = this.element.querySelector('[data-color-target="label"]');
    if (e) {
      this.colorPicker = new y({
        defaultColor: this.config.color,
        popupDirection: "up",
        onChange: (l) => {
          var c;
          this.config.color = l, (c = this.label) == null || c.setColor(l), this.emitChange();
        }
      }), e.innerHTML = this.colorPicker.render();
      const r = e.querySelector(".kwami-colorpicker");
      r && this.colorPicker.hydrate(r);
    }
    const i = this.element.querySelector('[data-prop="text"]');
    i && this.addListener(i, "input", () => {
      var r;
      this.config.text = i.value, (r = this.label) == null || r.setText(i.value), this.emitChange();
    });
    const s = this.element.querySelectorAll("[data-size]");
    s.forEach((r) => {
      this.addListener(r, "click", () => {
        var d;
        const l = r.getAttribute("data-size");
        this.config.size = l, s.forEach((u) => u.classList.remove("active")), r.classList.add("active");
        const c = (d = this.element) == null ? void 0 : d.querySelector(".kwami-label");
        c && (c.className = `kwami-label kwami-label-${l}`), this.emitChange();
      });
    });
    const a = this.element.querySelector('[data-prop="required"]');
    a && this.addListener(a, "click", () => {
      var l, c;
      this.config.required = !this.config.required, a.classList.toggle("active", this.config.required);
      const r = (l = this.element) == null ? void 0 : l.querySelector(".kwami-label");
      if (r && this.label) {
        r.outerHTML = new M({
          text: this.config.text,
          size: this.config.size,
          color: this.config.color,
          required: this.config.required
        }).render(), this.label = new M(this.config);
        const d = (c = this.element) == null ? void 0 : c.querySelector(".kwami-label");
        d && this.label.hydrate(d);
      }
      this.emitChange();
    });
  }
  emitChange() {
    this.props.onChange && this.props.onChange({ ...this.config });
  }
  getConfiguration() {
    return { ...this.config };
  }
}
class K extends p {
  constructor(o) {
    super(o);
  }
  render() {
    const {
      icon: o,
      size: t = 24,
      color: e,
      className: i = ""
    } = this.props, s = e ? `color: ${e}` : "";
    return `
            <span class="kwami-icon ${i}" data-kwami-id="${this.id}" style="${s}">
                <iconify-icon icon="${o}" width="${t}" height="${t}"></iconify-icon>
            </span>
        `;
  }
  onHydrate() {
  }
  /** Change the icon */
  setIcon(o) {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelector("iconify-icon");
    t && t.setAttribute("icon", o);
  }
  /** Change the size */
  setSize(o) {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelector("iconify-icon");
    t && (t.setAttribute("width", String(o)), t.setAttribute("height", String(o)));
  }
  /** Change the color */
  setColor(o) {
    this.element && (this.element.style.color = o);
  }
}
const X = {
  icon: "solar:star-bold",
  size: 48,
  color: "#ff9500"
}, _ = [
  "solar:star-bold",
  "solar:heart-bold",
  "solar:home-2-bold",
  "solar:user-bold",
  "solar:settings-bold",
  "solar:bell-bold",
  "solar:chat-round-dots-bold",
  "solar:folder-bold",
  "solar:camera-bold",
  "solar:music-note-bold",
  "solar:map-point-bold",
  "solar:sun-bold"
];
class dt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "config");
    n(this, "icon", null);
    n(this, "colorPicker", null);
    this.config = { ...X, ...t.initialConfig };
  }
  render() {
    const { showControls: t = !0 } = this.props;
    return this.icon = new K({
      icon: this.config.icon,
      size: this.config.size,
      color: this.config.color
    }), `
            <div class="kwami-icon-configurator" data-kwami-id="${this.id}">
                <div class="kwami-icon-configurator-preview">
                    ${this.icon.render()}
                </div>
                ${t ? this.renderControls() : ""}
            </div>
        `;
  }
  renderControls() {
    const { config: t } = this, e = _.map((i) => `
            <button class="kwami-icon-preset ${i === t.icon ? "active" : ""}" data-icon="${i}" title="${i}">
                <iconify-icon icon="${i}" width="20" height="20"></iconify-icon>
            </button>
        `).join("");
    return `
            <div class="kwami-icon-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Icon</label>
                    <input type="text" class="kwami-cfg-input kwami-cfg-input-sm" data-prop="icon" value="${t.icon}" placeholder="solar:icon-name" />
                </div>
                <div class="kwami-icon-preset-grid">
                    ${e}
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-slider-wrap">
                        <input type="range" class="kwami-cfg-slider" data-prop="size" min="16" max="96" value="${t.size}" />
                        <span class="kwami-cfg-value">${t.size}px</span>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="icon"></div>
                </div>
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    const t = this.element.querySelector(".kwami-icon");
    t && this.icon && this.icon.hydrate(t);
    const e = this.element.querySelector('[data-color-target="icon"]');
    if (e) {
      this.colorPicker = new y({
        defaultColor: this.config.color,
        popupDirection: "up",
        onChange: (c) => {
          var d;
          this.config.color = c, (d = this.icon) == null || d.setColor(c), this.emitChange();
        }
      }), e.innerHTML = this.colorPicker.render();
      const l = e.querySelector(".kwami-colorpicker");
      l && this.colorPicker.hydrate(l);
    }
    const i = this.element.querySelector('[data-prop="icon"]');
    i && this.addListener(i, "input", () => {
      var l;
      this.config.icon = i.value, (l = this.icon) == null || l.setIcon(i.value), this.updatePresetSelection(i.value), this.emitChange();
    });
    const s = this.element.querySelector('[data-prop="size"]'), a = this.element.querySelector(".kwami-cfg-slider-wrap .kwami-cfg-value");
    s && this.addListener(s, "input", () => {
      var c;
      const l = parseInt(s.value);
      this.config.size = l, a && (a.textContent = `${l}px`), (c = this.icon) == null || c.setSize(l), this.emitChange();
    }), this.element.querySelectorAll(".kwami-icon-preset").forEach((l) => {
      this.addListener(l, "click", () => {
        var d;
        const c = l.getAttribute("data-icon");
        this.config.icon = c, (d = this.icon) == null || d.setIcon(c), i && (i.value = c), this.updatePresetSelection(c), this.emitChange();
      });
    });
  }
  updatePresetSelection(t) {
    var i;
    const e = (i = this.element) == null ? void 0 : i.querySelectorAll(".kwami-icon-preset");
    e == null || e.forEach((s) => {
      s.classList.toggle("active", s.getAttribute("data-icon") === t);
    });
  }
  emitChange() {
    this.props.onChange && this.props.onChange({ ...this.config });
  }
  getConfiguration() {
    return { ...this.config };
  }
}
class ut extends p {
  constructor(t = {}) {
    super(t);
    n(this, "input", null);
    n(this, "valueDisplay", null);
    n(this, "fill", null);
    n(this, "thumbVisual", null);
    n(this, "currentValue");
    this.currentValue = t.value ?? 50;
  }
  render() {
    const {
      min: t = 0,
      max: e = 100,
      value: i = 50,
      step: s = 1,
      label: a = "SLIDER"
    } = this.props, r = (i - t) / (e - t) * 100;
    return `
            <div class="kwami-slider-container" data-kwami-id="${this.id}">
                <div class="kwami-slider-bezel">
                    <div class="kwami-slider-track">
                        <div class="kwami-slider-fill" style="width: ${r}%"></div>
                        <input 
                            type="range" 
                            class="kwami-slider" 
                            min="${t}" 
                            max="${e}" 
                            value="${i}"
                            step="${s}"
                        />
                        <div class="kwami-slider-thumb-visual" style="left: ${r}%"></div>
                    </div>
                </div>
                <div class="kwami-slider-value-container">
                    <span class="kwami-slider-value">${i}</span>
                </div>
                <span class="kwami-slider-label">${a}</span>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.input = this.element.querySelector(".kwami-slider"), this.valueDisplay = this.element.querySelector(".kwami-slider-value"), this.fill = this.element.querySelector(".kwami-slider-fill"), this.thumbVisual = this.element.querySelector(".kwami-slider-thumb-visual"), this.input && this.addListener(this.input, "input", () => {
      this.handleChange();
    }));
  }
  handleChange() {
    var s;
    if (!this.input) return;
    const { min: t = 0, max: e = 100 } = this.props;
    this.currentValue = parseFloat(this.input.value);
    const i = (this.currentValue - t) / (e - t) * 100;
    this.fill && (this.fill.style.width = `${i}%`), this.thumbVisual && (this.thumbVisual.style.left = `${i}%`), this.valueDisplay && (this.valueDisplay.textContent = String(this.currentValue)), (s = this.element) == null || s.dispatchEvent(new CustomEvent("sliderchange", {
      detail: { value: this.currentValue },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(this.currentValue);
  }
  /** Get the current value */
  getValue() {
    return this.currentValue;
  }
  /** Set the value programmatically */
  setValue(t) {
    const { min: e = 0, max: i = 100 } = this.props;
    this.currentValue = t;
    const s = (t - e) / (i - e) * 100;
    this.input && (this.input.value = String(t)), this.fill && (this.fill.style.width = `${s}%`), this.thumbVisual && (this.thumbVisual.style.left = `${s}%`), this.valueDisplay && (this.valueDisplay.textContent = String(t));
  }
}
class pt extends p {
  constructor(t) {
    super(t);
    n(this, "isExpanded", !1);
    n(this, "isAnimating", !1);
    n(this, "activeScreenId", null);
    n(this, "overlay", null);
    n(this, "placeholder", null);
    n(this, "minimizeBtn", null);
    n(this, "screenBtns", /* @__PURE__ */ new Map());
    n(this, "titleComponent", null);
    n(this, "contentEl", null);
    n(this, "previewEl", null);
    this.titleComponent = new T({ text: t.title });
  }
  /** Check if using multi-screen mode */
  isMultiScreen() {
    return Array.isArray(this.props.screens) && this.props.screens.length > 0;
  }
  render() {
    const { expandableId: t, expandedWidth: e = "min(90vw, 500px)", expandedHeight: i = "min(90vh, 500px)" } = this.props, s = this.titleComponent ? this.titleComponent.render() : "";
    return this.isMultiScreen() ? this.renderMultiScreen(s, t) : this.renderSingleScreen(s, t, e, i);
  }
  renderSingleScreen(t, e, i, s) {
    const { content: a = "" } = this.props;
    return `
      <div class="kwami-expandable-placeholder" data-placeholder-for="${e}"></div>
      <div class="kwami-expandable" data-kwami-id="${this.id}" data-expandable-id="${e}"
           style="--end-width: ${i}; --end-height: ${s}">
          <div class="kwami-expandable-inner">
              <div class="kwami-expandable-actions">
                  <button class="kwami-expandable-btn kwami-expandable-btn-expand" aria-label="Expand" title="Expand">
                      <iconify-icon class="kwami-expandable-icon-expand" icon="solar:maximize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
                  </button>
                  <button class="kwami-expandable-btn kwami-expandable-btn-minimize" aria-label="Minimize" title="Minimize">
                      <iconify-icon icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
                  </button>
              </div>
              <div class="kwami-expandable-title">
                  ${t}
              </div>
              <div class="kwami-expandable-content" data-component="${e}">
                  ${a}
              </div>
          </div>
      </div>
      <div class="kwami-expandable-overlay" data-overlay-for="${e}"></div>
      `;
  }
  renderMultiScreen(t, e) {
    const { preview: i = "", screens: s = [] } = this.props, a = s[0], r = (a == null ? void 0 : a.expandedWidth) || "min(90vw, 500px)", l = (a == null ? void 0 : a.expandedHeight) || "min(90vh, 500px)", c = s.map((u) => `
          <button class="kwami-expandable-btn kwami-expandable-btn-screen" 
                  data-screen-id="${u.id}" 
                  aria-label="${u.title || u.id}" 
                  title="${u.title || u.id}">
              <iconify-icon icon="${u.icon}" width="18" height="18"></iconify-icon>
          </button>
      `).join(""), d = s.map((u) => `
          <div class="kwami-expandable-screen" data-screen="${u.id}" 
               data-width="${u.expandedWidth || r}"
               data-height="${u.expandedHeight || l}"
               ${u.noScroll ? 'data-no-scroll="true"' : ""}>
              ${u.content}
          </div>
      `).join("");
    return `
      <div class="kwami-expandable-placeholder" data-placeholder-for="${e}"></div>
      <div class="kwami-expandable kwami-expandable-multi" data-kwami-id="${this.id}" data-expandable-id="${e}"
           style="--end-width: ${r}; --end-height: ${l}">
          <div class="kwami-expandable-inner">
              <div class="kwami-expandable-actions">
                  ${c}
                  <button class="kwami-expandable-btn kwami-expandable-btn-minimize" aria-label="Minimize" title="Minimize">
                      <iconify-icon icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
                  </button>
              </div>
              <div class="kwami-expandable-title">
                  ${t}
              </div>
              <div class="kwami-expandable-preview">
                  ${i}
              </div>
              <div class="kwami-expandable-screens">
                  ${d}
              </div>
          </div>
      </div>
      <div class="kwami-expandable-overlay" data-overlay-for="${e}"></div>
      `;
  }
  onHydrate() {
    if (!this.element) return;
    const { expandableId: t } = this.props, e = this.element.parentElement;
    if (!e || (this.overlay = e.querySelector(`[data-overlay-for="${t}"]`), this.placeholder = e.querySelector(`[data-placeholder-for="${t}"]`), this.minimizeBtn = this.element.querySelector(".kwami-expandable-btn-minimize"), this.contentEl = this.element.querySelector(".kwami-expandable-content"), this.previewEl = this.element.querySelector(".kwami-expandable-preview"), !this.overlay || !this.placeholder)) return;
    const i = this.element.querySelector(".kwami-title");
    i && this.titleComponent && this.titleComponent.hydrate(i), this.isMultiScreen() ? this.hydrateMultiScreen() : this.hydrateSingleScreen(), this.addListener(this.overlay, "click", () => {
      this.isExpanded && !this.isAnimating && this.collapse();
    });
    const s = (a) => {
      a.key === "Escape" && this.isExpanded && !this.isAnimating && this.collapse();
    };
    document.addEventListener("keydown", s);
  }
  hydrateSingleScreen() {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelector(".kwami-expandable-btn-expand");
    t && this.addListener(t, "click", (i) => {
      i.stopPropagation(), this.expand();
    }), this.minimizeBtn && this.addListener(this.minimizeBtn, "click", (i) => {
      i.stopPropagation(), this.collapse();
    });
  }
  hydrateMultiScreen() {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelectorAll(".kwami-expandable-btn-screen");
    t == null || t.forEach((i) => {
      const s = i.getAttribute("data-screen-id");
      s && (this.screenBtns.set(s, i), this.addListener(i, "click", (a) => {
        a.stopPropagation(), this.expandToScreen(s);
      }));
    }), this.minimizeBtn && this.addListener(this.minimizeBtn, "click", (i) => {
      i.stopPropagation(), this.collapse();
    });
  }
  /** Expand to a specific screen (multi-screen mode) */
  expandToScreen(t) {
    if (this.isAnimating || !this.element || !this.placeholder || !this.overlay) return;
    const e = this.element.querySelector(`[data-screen="${t}"]`);
    if (!e) return;
    const i = e.dataset.width || "min(90vw, 500px)", s = e.dataset.height || "min(90vh, 500px)";
    this.element.style.setProperty("--end-width", i), this.element.style.setProperty("--end-height", s), this.element.querySelectorAll(".kwami-expandable-screen").forEach((a) => {
      a.classList.remove("active");
    }), e.classList.add("active"), this.screenBtns.forEach((a, r) => {
      a.classList.toggle("active", r === t);
    }), this.activeScreenId = t, this.isExpanded || this.expand(t);
  }
  expand(t) {
    if (this.isAnimating || !this.element || !this.placeholder || !this.overlay) return;
    this.isAnimating = !0;
    const e = this.element.getBoundingClientRect();
    this.element.style.setProperty("--start-x", `${e.left}px`), this.element.style.setProperty("--start-y", `${e.top}px`), this.element.style.setProperty("--start-width", `${e.width}px`), this.element.style.setProperty("--start-height", `${e.height}px`), this.placeholder.classList.add("active"), this.element.classList.add("expanding"), this.overlay.classList.add("active"), document.body.style.overflow = "hidden";
    const i = () => {
      var s, a, r;
      (s = this.element) == null || s.removeEventListener("animationend", i), (a = this.element) == null || a.classList.remove("expanding"), (r = this.element) == null || r.classList.add("expanded"), this.isExpanded = !0, this.isAnimating = !1, this.props.onExpand && this.props.onExpand(t);
    };
    this.element.addEventListener("animationend", i, { once: !0 });
  }
  collapse() {
    if (this.isAnimating || !this.element || !this.placeholder || !this.overlay) return;
    this.isAnimating = !0;
    const t = this.placeholder.getBoundingClientRect();
    this.element.style.setProperty("--start-x", `${t.left}px`), this.element.style.setProperty("--start-y", `${t.top}px`), this.element.style.setProperty("--start-width", `${t.width}px`), this.element.style.setProperty("--start-height", `${t.height}px`), this.element.classList.remove("expanded"), this.element.classList.add("collapsing"), this.overlay.classList.remove("active");
    const e = () => {
      var i, s, a, r;
      (i = this.element) == null || i.removeEventListener("animationend", e), (s = this.element) == null || s.classList.remove("collapsing"), (a = this.placeholder) == null || a.classList.remove("active"), document.body.style.overflow = "", this.isExpanded = !1, this.isAnimating = !1, this.isMultiScreen() && ((r = this.element) == null || r.querySelectorAll(".kwami-expandable-screen").forEach((l) => {
        l.classList.remove("active");
      }), this.screenBtns.forEach((l) => l.classList.remove("active")), this.activeScreenId = null), this.props.onCollapse && this.props.onCollapse();
    };
    this.element.addEventListener("animationend", e, { once: !0 });
  }
  /** Check if currently expanded */
  getIsExpanded() {
    return this.isExpanded;
  }
  /** Get the currently active screen ID (multi-screen mode) */
  getActiveScreenId() {
    return this.activeScreenId;
  }
  /** Get the content container element */
  getContentElement() {
    var t;
    return ((t = this.element) == null ? void 0 : t.querySelector(".kwami-expandable-content")) || null;
  }
  /** Get a specific screen element by ID */
  getScreenElement(t) {
    var e;
    return ((e = this.element) == null ? void 0 : e.querySelector(`[data-screen="${t}"]`)) || null;
  }
  /** Get the preview element (multi-screen mode) */
  getPreviewElement() {
    return this.previewEl;
  }
}
const J = [
  { icon: "solar:sun-bold", label: "Light" },
  { icon: "solar:moon-bold", label: "Dark" },
  { icon: "solar:monitor-bold", label: "System" }
];
class Q extends p {
  constructor(t = {}) {
    super(t);
    n(this, "currentState");
    n(this, "states");
    // DOM references
    n(this, "btn", null);
    n(this, "icon", null);
    n(this, "label", null);
    this.states = t.states || J, this.currentState = t.initialState || 0;
  }
  render() {
    const { className: t = "" } = this.props, e = this.states[this.currentState];
    return `
            <div class="kwami-toggle ${t}" data-kwami-id="${this.id}" data-state="${this.currentState}">
                <button class="kwami-toggle-btn" title="Click to toggle">
                    <span class="kwami-toggle-highlight"></span>
                    <iconify-icon class="kwami-toggle-icon" icon="${e.icon}" width="20" height="20"></iconify-icon>
                </button>
                <span class="kwami-toggle-label">${e.label}</span>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.btn = this.element.querySelector(".kwami-toggle-btn"), this.icon = this.element.querySelector(".kwami-toggle-icon"), this.label = this.element.querySelector(".kwami-toggle-label"), !(!this.btn || !this.icon || !this.label) && this.addListener(this.btn, "click", () => {
      this.cycle();
    }));
  }
  updateState(t) {
    var i;
    if (!this.icon || !this.label) return;
    this.currentState = t % this.states.length;
    const e = this.states[this.currentState];
    this.icon.classList.add("switching"), setTimeout(() => {
      var s;
      this.icon.setAttribute("icon", e.icon), this.label.textContent = e.label, (s = this.element) == null || s.setAttribute("data-state", String(this.currentState)), setTimeout(() => this.icon.classList.remove("switching"), 150);
    }, 100), (i = this.element) == null || i.dispatchEvent(new CustomEvent("togglechange", {
      detail: {
        state: this.currentState,
        icon: e.icon,
        label: e.label
      },
      bubbles: !0
    })), this.props.onChange && this.props.onChange({
      index: this.currentState,
      icon: e.icon,
      label: e.label
    });
  }
  /** Cycle to the next state */
  cycle() {
    this.updateState(this.currentState + 1);
  }
  /** Set a specific state by index */
  setState(t) {
    t >= 0 && t < this.states.length && this.updateState(t);
  }
  /** Get current state */
  getState() {
    const t = this.states[this.currentState];
    return {
      index: this.currentState,
      icon: t.icon,
      label: t.label
    };
  }
}
class mt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isActive");
    n(this, "ledColor");
    // DOM references
    n(this, "activator", null);
    n(this, "led", null);
    this.isActive = t.active || !1, this.ledColor = t.ledColor || "#ff9500";
  }
  render() {
    const { text: t = "PUSH", label: e = "", className: i = "" } = this.props, s = this.isActive ? "active" : "";
    return `
            <div class="kwami-activator-container ${i}" data-kwami-id="${this.id}">
                <div class="kwami-activator-bezel">
                    <button class="kwami-activator ${s}">
                        <span class="kwami-activator-face">
                            <span class="kwami-activator-highlight"></span>
                            <span class="kwami-activator-text">${t}</span>
                        </span>
                        <span class="kwami-activator-led ${s}"></span>
                    </button>
                </div>
                ${e ? `<span class="kwami-activator-label">${e}</span>` : ""}
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.activator = this.element.querySelector(".kwami-activator"), this.led = this.element.querySelector(".kwami-activator-led"), !(!this.activator || !this.led) && (this.isActive && this.updateLedStyle(), this.addListener(this.activator, "click", () => {
      this.toggle(), this.props.onClick && this.props.onClick();
    })));
  }
  updateLedStyle() {
    if (!this.led || !this.isActive) return;
    const t = 12;
    this.led.style.background = `radial-gradient(circle at 30% 30%, ${this.adjustBrightness(this.ledColor, 40)}, ${this.ledColor})`, this.led.style.boxShadow = `
            0 0 ${t}px ${this.ledColor}cc,
            0 0 ${t * 2}px ${this.ledColor}80,
            0 0 ${t * 3}px ${this.ledColor}4d
        `;
  }
  adjustBrightness(t, e) {
    t = t.replace(/^#/, "");
    let i = parseInt(t.substring(0, 2), 16), s = parseInt(t.substring(2, 4), 16), a = parseInt(t.substring(4, 6), 16);
    return i = Math.min(255, Math.max(0, i + Math.round(i * e / 100))), s = Math.min(255, Math.max(0, s + Math.round(s * e / 100))), a = Math.min(255, Math.max(0, a + Math.round(a * e / 100))), `#${i.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
  }
  /** Toggle the active state */
  toggle() {
    this.setActive(!this.isActive);
  }
  /** Set the active state */
  setActive(t) {
    var e, i, s, a, r;
    this.isActive = t, this.isActive ? ((e = this.led) == null || e.classList.add("active"), (i = this.activator) == null || i.classList.add("active"), this.updateLedStyle()) : ((s = this.led) == null || s.classList.remove("active"), (a = this.activator) == null || a.classList.remove("active"), this.led && (this.led.style.background = "", this.led.style.boxShadow = "")), (r = this.element) == null || r.dispatchEvent(new CustomEvent("activatorchange", {
      detail: { active: this.isActive },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(this.isActive);
  }
  /** Get current active state */
  getActive() {
    return this.isActive;
  }
  /** Set LED color */
  setLedColor(t) {
    this.ledColor = t, this.isActive && this.updateLedStyle();
  }
}
class gt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isChecked");
    n(this, "activeThumbColor");
    n(this, "activeTrackColor");
    // DOM references
    n(this, "input", null);
    n(this, "track", null);
    n(this, "thumb", null);
    this.isChecked = t.checked || !1, this.activeThumbColor = t.activeThumbColor || "#ff9500", this.activeTrackColor = t.activeTrackColor || "#ffe8cc";
  }
  render() {
    const { label: t = "", className: e = "", disabled: i = !1 } = this.props, s = this.isChecked ? "checked" : "", a = i ? "disabled" : "";
    return `
            <div class="kwami-switch-container ${e}" data-kwami-id="${this.id}">
                <label class="kwami-switch ${i ? "kwami-switch-disabled" : ""}">
                    <input type="checkbox" class="kwami-switch-input" ${s} ${a}>
                    <span class="kwami-switch-bezel">
                        <span class="kwami-switch-track">
                            <span class="kwami-switch-thumb">
                                <span class="kwami-switch-thumb-highlight"></span>
                            </span>
                        </span>
                    </span>
                </label>
                ${t ? `<span class="kwami-switch-label">${t}</span>` : ""}
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.input = this.element.querySelector(".kwami-switch-input"), this.track = this.element.querySelector(".kwami-switch-track"), this.thumb = this.element.querySelector(".kwami-switch-thumb"), !(!this.input || !this.track || !this.thumb) && (this.isChecked && this.updateActiveStyles(), this.addListener(this.input, "change", () => {
      var t;
      this.isChecked = this.input.checked, this.isChecked ? this.updateActiveStyles() : this.resetStyles(), (t = this.element) == null || t.dispatchEvent(new CustomEvent("switchchange", {
        detail: { checked: this.isChecked },
        bubbles: !0
      })), this.props.onChange && this.props.onChange(this.isChecked);
    })));
  }
  updateActiveStyles() {
    if (!this.track || !this.thumb) return;
    const t = this.adjustBrightness(this.activeTrackColor, 10);
    this.track.style.background = `linear-gradient(145deg, ${this.activeTrackColor} 0%, ${t} 100%)`;
    const e = this.adjustBrightness(this.activeThumbColor, 30), i = this.adjustBrightness(this.activeThumbColor, 10), s = this.adjustBrightness(this.activeThumbColor, -15), a = this.adjustBrightness(this.activeThumbColor, -25);
    this.thumb.style.background = `linear-gradient(160deg, ${e} 0%, ${i} 20%, ${this.activeThumbColor} 50%, ${s} 80%, ${a} 100%)`;
    const r = 10;
    this.thumb.style.boxShadow = `
            0 3px ${r}px ${this.activeThumbColor}66,
            0 2px 6px ${this.activeThumbColor}4d,
            0 0 ${r * 2}px ${this.activeThumbColor}4d,
            inset 0 2px 3px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px ${a}4d
        `;
  }
  resetStyles() {
    !this.track || !this.thumb || (this.track.style.background = "", this.thumb.style.background = "", this.thumb.style.boxShadow = "");
  }
  adjustBrightness(t, e) {
    t = t.replace(/^#/, "");
    let i = parseInt(t.substring(0, 2), 16), s = parseInt(t.substring(2, 4), 16), a = parseInt(t.substring(4, 6), 16);
    return i = Math.min(255, Math.max(0, i + Math.round(i * e / 100))), s = Math.min(255, Math.max(0, s + Math.round(s * e / 100))), a = Math.min(255, Math.max(0, a + Math.round(a * e / 100))), `#${i.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}${a.toString(16).padStart(2, "0")}`;
  }
  /** Toggle the switch */
  toggle() {
    this.setChecked(!this.isChecked);
  }
  /** Set checked state */
  setChecked(t) {
    this.input && (this.input.checked = t, this.input.dispatchEvent(new Event("change")));
  }
  /** Get checked state */
  getChecked() {
    return this.isChecked;
  }
  /** Set active thumb color */
  setActiveThumbColor(t) {
    this.activeThumbColor = t, this.isChecked && this.updateActiveStyles();
  }
  /** Set active track color */
  setActiveTrackColor(t) {
    this.activeTrackColor = t, this.isChecked && this.updateActiveStyles();
  }
}
class ft extends p {
  constructor(t = {}) {
    super(t);
    // DOM references
    n(this, "input", null);
    n(this, "wrapper", null);
    n(this, "highlight", null);
  }
  render() {
    const {
      placeholder: t = "Type here...",
      value: e = "",
      type: i = "text",
      label: s = "",
      className: a = "",
      disabled: r = !1
    } = this.props, l = r ? "disabled" : "";
    return `
            <div class="kwami-textinput-container ${a} ${r ? "kwami-textinput-disabled" : ""}" data-kwami-id="${this.id}">
                <div class="kwami-textinput-bezel">
                    <div class="kwami-textinput-wrapper">
                        <input 
                            type="${i}" 
                            class="kwami-textinput" 
                            placeholder="${t}"
                            value="${e}"
                            ${l}
                        />
                        <span class="kwami-textinput-highlight"></span>
                    </div>
                </div>
                ${s ? `<span class="kwami-textinput-label">${s}</span>` : ""}
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.input = this.element.querySelector(".kwami-textinput"), this.wrapper = this.element.querySelector(".kwami-textinput-wrapper"), this.highlight = this.element.querySelector(".kwami-textinput-highlight"), !(!this.input || !this.wrapper || !this.highlight) && (this.addListener(this.input, "focus", () => {
      var t;
      (t = this.wrapper) == null || t.classList.add("focused"), this.highlight && (this.highlight.style.width = "80%"), this.props.onFocus && this.props.onFocus();
    }), this.addListener(this.input, "blur", () => {
      var t;
      (t = this.wrapper) == null || t.classList.remove("focused"), this.highlight && (this.highlight.style.width = "0"), this.props.onBlur && this.props.onBlur();
    }), this.addListener(this.input, "input", () => {
      this.props.onChange && this.input && this.props.onChange(this.input.value);
    })));
  }
  /** Get current value */
  getValue() {
    var t;
    return ((t = this.input) == null ? void 0 : t.value) || "";
  }
  /** Set value */
  setValue(t) {
    this.input && (this.input.value = t);
  }
  /** Focus the input */
  focus() {
    var t;
    (t = this.input) == null || t.focus();
  }
  /** Blur the input */
  blur() {
    var t;
    (t = this.input) == null || t.blur();
  }
}
class kt extends p {
  constructor(t = {}) {
    super(t);
    // DOM references
    n(this, "textarea", null);
    n(this, "wrapper", null);
    n(this, "highlight", null);
  }
  render() {
    const {
      placeholder: t = "Enter text...",
      value: e = "",
      rows: i = 3,
      label: s = "",
      className: a = "",
      disabled: r = !1,
      resize: l = "vertical"
    } = this.props, c = r ? "disabled" : "";
    return `
            <div class="kwami-textarea-container ${a} ${r ? "kwami-textarea-disabled" : ""}" data-kwami-id="${this.id}">
                <div class="kwami-textarea-bezel">
                    <div class="kwami-textarea-wrapper">
                        <textarea 
                            class="kwami-textarea" 
                            placeholder="${t}"
                            rows="${i}"
                            style="resize: ${l}"
                            ${c}
                        >${e}</textarea>
                        <span class="kwami-textarea-highlight"></span>
                    </div>
                </div>
                ${s ? `<span class="kwami-textarea-label">${s}</span>` : ""}
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.textarea = this.element.querySelector(".kwami-textarea"), this.wrapper = this.element.querySelector(".kwami-textarea-wrapper"), this.highlight = this.element.querySelector(".kwami-textarea-highlight"), !(!this.textarea || !this.wrapper || !this.highlight) && (this.addListener(this.textarea, "focus", () => {
      var t;
      (t = this.wrapper) == null || t.classList.add("focused"), this.highlight && (this.highlight.style.width = "80%"), this.props.onFocus && this.props.onFocus();
    }), this.addListener(this.textarea, "blur", () => {
      var t;
      (t = this.wrapper) == null || t.classList.remove("focused"), this.highlight && (this.highlight.style.width = "0"), this.props.onBlur && this.props.onBlur();
    }), this.addListener(this.textarea, "input", () => {
      this.props.onChange && this.textarea && this.props.onChange(this.textarea.value);
    })));
  }
  /** Get current value */
  getValue() {
    var t;
    return ((t = this.textarea) == null ? void 0 : t.value) || "";
  }
  /** Set value */
  setValue(t) {
    this.textarea && (this.textarea.value = t);
  }
  /** Focus the textarea */
  focus() {
    var t;
    (t = this.textarea) == null || t.focus();
  }
  /** Blur the textarea */
  blur() {
    var t;
    (t = this.textarea) == null || t.blur();
  }
}
class wt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "inputs", []);
    n(this, "values", []);
    const e = t.length || 4;
    this.values = new Array(e).fill("");
  }
  render() {
    const {
      length: t = 4,
      label: e = "",
      masked: i = !1,
      className: s = "",
      disabled: a = !1
    } = this.props, r = a ? "disabled" : "", l = a ? "kwami-pin-disabled" : "", c = i ? "password" : "text", d = Array.from({ length: t }, (u, m) => `
            <div class="kwami-pin-digit-wrapper">
                <input 
                    type="${c}" 
                    class="kwami-pin-digit" 
                    maxlength="1"
                    inputmode="numeric"
                    pattern="[0-9]"
                    data-index="${m}"
                    ${r}
                />
                <span class="kwami-pin-digit-highlight"></span>
            </div>
        `).join("");
    return `
            <div class="kwami-pin-container ${s} ${l}" data-kwami-id="${this.id}">
                <div class="kwami-pin-bezel">
                    <div class="kwami-pin-inputs">
                        ${d}
                    </div>
                </div>
                ${e ? `<span class="kwami-pin-label">${e}</span>` : ""}
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.inputs = Array.from(this.element.querySelectorAll(".kwami-pin-digit")), this.inputs.forEach((t, e) => {
      this.addListener(t, "focus", () => {
        var i;
        (i = t.parentElement) == null || i.classList.add("focused"), t.select();
      }), this.addListener(t, "blur", () => {
        var i;
        (i = t.parentElement) == null || i.classList.remove("focused");
      }), this.addListener(t, "input", (i) => {
        const s = i.target;
        let a = s.value;
        a = a.replace(/[^0-9]/g, ""), s.value = a, this.values[e] = a, a && e < this.inputs.length - 1 && this.inputs[e + 1].focus(), this.notifyChange(), this.isComplete() && this.props.onComplete && this.props.onComplete(this.getValue());
      }), this.addListener(t, "keydown", (i) => {
        const s = i.key;
        s === "Backspace" ? (!t.value && e > 0 ? (this.inputs[e - 1].focus(), this.inputs[e - 1].value = "", this.values[e - 1] = "", i.preventDefault()) : this.values[e] = "", this.notifyChange()) : s === "ArrowLeft" && e > 0 ? (i.preventDefault(), this.inputs[e - 1].focus()) : s === "ArrowRight" && e < this.inputs.length - 1 && (i.preventDefault(), this.inputs[e + 1].focus());
      }), this.addListener(t, "paste", (i) => {
        var l;
        i.preventDefault();
        const a = (((l = i.clipboardData) == null ? void 0 : l.getData("text")) || "").replace(/[^0-9]/g, "").slice(0, this.inputs.length);
        a.split("").forEach((c, d) => {
          this.inputs[d] && (this.inputs[d].value = c, this.values[d] = c);
        });
        const r = Math.min(a.length, this.inputs.length - 1);
        this.inputs[r].focus(), this.notifyChange(), this.isComplete() && this.props.onComplete && this.props.onComplete(this.getValue());
      });
    }));
  }
  notifyChange() {
    this.props.onChange && this.props.onChange(this.getValue());
  }
  isComplete() {
    return this.values.every((t) => t !== "");
  }
  /** Get current value */
  getValue() {
    return this.values.join("");
  }
  /** Set value */
  setValue(t) {
    const e = t.replace(/[^0-9]/g, "").slice(0, this.inputs.length);
    this.values = new Array(this.inputs.length).fill(""), e.split("").forEach((i, s) => {
      this.inputs[s] && (this.inputs[s].value = i, this.values[s] = i);
    });
  }
  /** Clear all inputs */
  clear() {
    var t;
    this.inputs.forEach((e, i) => {
      e.value = "", this.values[i] = "";
    }), (t = this.inputs[0]) == null || t.focus();
  }
  /** Focus the first input */
  focus() {
    var t;
    (t = this.inputs[0]) == null || t.focus();
  }
}
const Z = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" }
];
class vt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isOpen", !1);
    n(this, "selectedValue");
    // DOM references
    n(this, "selector", null);
    n(this, "valueDisplay", null);
    n(this, "dropdown", null);
    this.selectedValue = t.value || "";
  }
  render() {
    const {
      options: t = Z,
      placeholder: e = "Select...",
      label: i = "",
      className: s = "",
      disabled: a = !1
    } = this.props, r = a ? "kwami-selector-disabled" : "", l = t.find((m) => m.value === this.selectedValue), c = l ? l.label : e, d = !l, u = t.map((m) => `
            <div class="kwami-selector-option ${m.value === this.selectedValue ? "selected" : ""}" 
                 data-value="${m.value}" 
                 role="option"
                 tabindex="0">
                ${m.label}
            </div>
        `).join("");
    return `
            <div class="kwami-selector-container ${s} ${r}" data-kwami-id="${this.id}">
                <div class="kwami-selector-bezel">
                    <div class="kwami-selector" tabindex="0" role="listbox" aria-expanded="false">
                        <div class="kwami-selector-face">
                            <span class="kwami-selector-value" data-placeholder="${d}">${c}</span>
                            <span class="kwami-selector-arrow">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <div class="kwami-selector-dropdown">
                            ${u}
                        </div>
                    </div>
                </div>
                ${i ? `<span class="kwami-selector-label">${i}</span>` : ""}
            </div>
        `;
  }
  onHydrate() {
    if (!this.element || (this.selector = this.element.querySelector(".kwami-selector"), this.valueDisplay = this.element.querySelector(".kwami-selector-value"), this.dropdown = this.element.querySelector(".kwami-selector-dropdown"), !this.selector || !this.valueDisplay || !this.dropdown)) return;
    const t = this.element.querySelectorAll(".kwami-selector-option");
    this.addListener(this.selector, "click", (i) => {
      i.target.closest(".kwami-selector-option") || this.toggleDropdown();
    }), t.forEach((i) => {
      this.addListener(i, "click", () => {
        this.selectOption(i);
      }), this.addListener(i, "keydown", (s) => {
        (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this.selectOption(i));
      });
    }), this.addListener(this.selector, "keydown", (i) => {
      var a, r, l;
      switch (i.key) {
        case "Enter":
        case " ":
          this.isOpen || (i.preventDefault(), this.toggleDropdown(!0));
          break;
        case "Escape":
          this.toggleDropdown(!1), (a = this.selector) == null || a.focus();
          break;
        case "ArrowDown":
          if (i.preventDefault(), !this.isOpen)
            this.toggleDropdown(!0);
          else {
            const c = (r = this.dropdown) == null ? void 0 : r.querySelector(".kwami-selector-option:focus"), d = c == null ? void 0 : c.nextElementSibling;
            d == null || d.focus();
          }
          break;
        case "ArrowUp":
          if (i.preventDefault(), this.isOpen) {
            const c = (l = this.dropdown) == null ? void 0 : l.querySelector(".kwami-selector-option:focus"), d = c == null ? void 0 : c.previousElementSibling;
            d == null || d.focus();
          }
          break;
      }
    });
    const e = (i) => {
      var s;
      !((s = this.element) != null && s.contains(i.target)) && this.isOpen && this.toggleDropdown(!1);
    };
    document.addEventListener("click", e), this.addListener(this.selector, "focusout", (i) => {
      var s;
      (s = this.selector) != null && s.contains(i.relatedTarget) || this.toggleDropdown(!1);
    });
  }
  toggleDropdown(t) {
    var e, i, s, a, r, l;
    if (this.isOpen = t !== void 0 ? t : !this.isOpen, (e = this.selector) == null || e.setAttribute("aria-expanded", this.isOpen.toString()), this.isOpen) {
      (i = this.selector) == null || i.classList.add("open");
      const c = (s = this.dropdown) == null ? void 0 : s.querySelector(".kwami-selector-option.selected"), d = (a = this.dropdown) == null ? void 0 : a.querySelector(".kwami-selector-option");
      (r = c || d) == null || r.focus();
    } else
      (l = this.selector) == null || l.classList.remove("open");
  }
  selectOption(t) {
    var a, r, l, c;
    const e = t.getAttribute("data-value") || "", i = ((a = t.textContent) == null ? void 0 : a.trim()) || "", s = (r = this.element) == null ? void 0 : r.querySelectorAll(".kwami-selector-option");
    s == null || s.forEach((d) => d.classList.remove("selected")), t.classList.add("selected"), this.selectedValue = e, this.valueDisplay && (this.valueDisplay.textContent = i, this.valueDisplay.setAttribute("data-placeholder", "false")), this.toggleDropdown(!1), (l = this.selector) == null || l.focus(), (c = this.element) == null || c.dispatchEvent(new CustomEvent("selectorchange", {
      detail: { value: e, label: i },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(e, i);
  }
  /** Get current selected value */
  getValue() {
    return this.selectedValue;
  }
  /** Set selected value */
  setValue(t) {
    var i;
    const e = (i = this.element) == null ? void 0 : i.querySelector(`.kwami-selector-option[data-value="${t}"]`);
    e && this.selectOption(e);
  }
  /** Open the dropdown */
  open() {
    this.toggleDropdown(!0);
  }
  /** Close the dropdown */
  close() {
    this.toggleDropdown(!1);
  }
}
const P = [
  { value: "a", label: "Option A", checked: !0 },
  { value: "b", label: "Option B", checked: !1 },
  { value: "c", label: "Option C", checked: !1 }
];
class bt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "selectedValues");
    const e = t.options || P;
    this.selectedValues = new Set(
      e.filter((i) => i.checked).map((i) => i.value)
    );
  }
  render() {
    const {
      options: t = P,
      className: e = "",
      disabled: i = !1
    } = this.props, s = i ? "kwami-checkbox-group-disabled" : "", a = t.map((r) => `
            <label class="kwami-checkbox">
                <input type="checkbox" value="${r.value}" ${r.checked ? "checked" : ""} ${i ? "disabled" : ""} />
                <span class="kwami-checkbox-box">
                    <iconify-icon icon="solar:check-read-linear" width="14" height="14"></iconify-icon>
                </span>
                <span class="kwami-checkbox-label">${r.label}</span>
            </label>
        `).join("");
    return `
            <div class="kwami-checkbox-group ${e} ${s}" data-kwami-id="${this.id}">
                ${a}
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    this.element.querySelectorAll(".kwami-checkbox input").forEach((e) => {
      this.addListener(e, "change", (i) => {
        var r;
        const s = i.target, a = s.value;
        s.checked ? this.selectedValues.add(a) : this.selectedValues.delete(a), (r = this.element) == null || r.dispatchEvent(new CustomEvent("checkboxchange", {
          detail: { values: this.getValues(), changed: a, checked: s.checked },
          bubbles: !0
        })), this.props.onChange && this.props.onChange(this.getValues());
      });
    });
  }
  /** Get all selected values */
  getValues() {
    return Array.from(this.selectedValues);
  }
  /** Check if a value is selected */
  isChecked(t) {
    return this.selectedValues.has(t);
  }
  /** Set a checkbox value */
  setChecked(t, e) {
    var s;
    const i = (s = this.element) == null ? void 0 : s.querySelector(`input[value="${t}"]`);
    i && (i.checked = e, e ? this.selectedValues.add(t) : this.selectedValues.delete(t));
  }
  /** Select all checkboxes */
  selectAll() {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelectorAll(".kwami-checkbox input");
    t == null || t.forEach((i) => {
      i.checked = !0, this.selectedValues.add(i.value);
    });
  }
  /** Deselect all checkboxes */
  deselectAll() {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelectorAll(".kwami-checkbox input");
    t == null || t.forEach((i) => {
      i.checked = !1;
    }), this.selectedValues.clear();
  }
}
const H = [
  { value: "a", label: "Choice A" },
  { value: "b", label: "Choice B" },
  { value: "c", label: "Choice C" }
];
class yt extends p {
  constructor(t = {}) {
    var e, i;
    super(t);
    n(this, "selectedValue");
    n(this, "groupName");
    this.selectedValue = t.value || ((i = (e = t.options) == null ? void 0 : e[0]) == null ? void 0 : i.value) || H[0].value, this.groupName = t.name || `radio-${this.id}`;
  }
  render() {
    const {
      options: t = H,
      className: e = "",
      disabled: i = !1
    } = this.props, s = i ? "kwami-radio-group-disabled" : "", a = t.map((r, l) => {
      const c = r.value === this.selectedValue || l === 0 && !this.selectedValue;
      return `
                <label class="kwami-radio">
                    <input type="radio" name="${this.groupName}" value="${r.value}" ${c ? "checked" : ""} ${i ? "disabled" : ""} />
                    <span class="kwami-radio-circle">
                        <span class="kwami-radio-dot"></span>
                    </span>
                    <span class="kwami-radio-label">${r.label}</span>
                </label>
            `;
    }).join("");
    return `
            <div class="kwami-radio-group ${e} ${s}" data-kwami-id="${this.id}" role="radiogroup">
                ${a}
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    this.element.querySelectorAll(".kwami-radio input").forEach((e) => {
      this.addListener(e, "change", (i) => {
        var a;
        const s = i.target;
        this.selectedValue = s.value, (a = this.element) == null || a.dispatchEvent(new CustomEvent("radiochange", {
          detail: { value: this.selectedValue },
          bubbles: !0
        })), this.props.onChange && this.props.onChange(this.selectedValue);
      });
    });
  }
  /** Get selected value */
  getValue() {
    return this.selectedValue;
  }
  /** Set selected value */
  setValue(t) {
    var i;
    const e = (i = this.element) == null ? void 0 : i.querySelector(`input[value="${t}"]`);
    e && (e.checked = !0, this.selectedValue = t);
  }
}
class $t extends p {
  constructor(t = {}) {
    super(t);
    n(this, "currentMonth");
    n(this, "selectedDate", null);
    n(this, "isOpen", !1);
    // DOM references
    n(this, "trigger", null);
    n(this, "popup", null);
    n(this, "monthLabel", null);
    n(this, "daysGrid", null);
    n(this, "prevBtn", null);
    n(this, "nextBtn", null);
    n(this, "valueDisplay", null);
    const { defaultDate: e } = t;
    e ? (this.selectedDate = new Date(e), this.currentMonth = new Date(e.getFullYear(), e.getMonth(), 1)) : (this.currentMonth = /* @__PURE__ */ new Date(), this.currentMonth.setDate(1));
  }
  render() {
    const { label: t, placeholder: e = "Select date", popupDirection: i = "up" } = this.props, s = i === "down" ? "kwami-datepicker-popup-down" : "", a = this.selectedDate ? this.formatDate(this.selectedDate) : e;
    return `
            <div class="kwami-datepicker-container" data-kwami-id="${this.id}">
                ${t ? `<span class="kwami-datepicker-label">${t}</span>` : ""}
                <div class="kwami-datepicker">
                    <button class="kwami-datepicker-trigger" aria-label="Pick a date" title="Pick a date">
                        <span class="kwami-datepicker-value">${a}</span>
                        <iconify-icon icon="solar:calendar-linear" width="16" height="16"></iconify-icon>
                    </button>
                    <div class="kwami-datepicker-popup ${s}">
                        <div class="kwami-datepicker-header">
                            <button class="kwami-datepicker-nav kwami-datepicker-prev" aria-label="Previous month">
                                <iconify-icon icon="solar:alt-arrow-left-linear" width="18" height="18"></iconify-icon>
                            </button>
                            <span class="kwami-datepicker-month-label"></span>
                            <button class="kwami-datepicker-nav kwami-datepicker-next" aria-label="Next month">
                                <iconify-icon icon="solar:alt-arrow-right-linear" width="18" height="18"></iconify-icon>
                            </button>
                        </div>
                        <div class="kwami-datepicker-weekdays">
                            ${this.renderWeekdays()}
                        </div>
                        <div class="kwami-datepicker-days"></div>
                    </div>
                </div>
            </div>
        `;
  }
  formatDate(t) {
    const { locale: e = "en-US" } = this.props;
    return t.toLocaleDateString(e, {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }
  renderWeekdays() {
    const { firstDayOfWeek: t = 0, locale: e = "en-US" } = this.props, i = [], s = new Date(2024, 0, 7);
    for (let a = 0; a < 7; a++) {
      const r = (t + a) % 7, l = new Date(s);
      l.setDate(l.getDate() + r), i.push(l.toLocaleDateString(e, { weekday: "short" }).slice(0, 2));
    }
    return i.map((a) => `<span class="kwami-datepicker-weekday">${a}</span>`).join("");
  }
  onHydrate() {
    this.element && (this.trigger = this.element.querySelector(".kwami-datepicker-trigger"), this.popup = this.element.querySelector(".kwami-datepicker-popup"), this.monthLabel = this.element.querySelector(".kwami-datepicker-month-label"), this.daysGrid = this.element.querySelector(".kwami-datepicker-days"), this.prevBtn = this.element.querySelector(".kwami-datepicker-prev"), this.nextBtn = this.element.querySelector(".kwami-datepicker-next"), this.valueDisplay = this.element.querySelector(".kwami-datepicker-value"), !(!this.trigger || !this.popup || !this.monthLabel || !this.daysGrid || !this.prevBtn || !this.nextBtn || !this.valueDisplay) && (this.setupEventListeners(), this.renderMonth()));
  }
  setupEventListeners() {
    if (!this.trigger || !this.prevBtn || !this.nextBtn || !this.daysGrid || !this.popup) return;
    this.addListener(this.trigger, "click", (i) => {
      i.stopPropagation(), this.togglePopup();
    }), this.addListener(this.prevBtn, "click", (i) => {
      i.stopPropagation(), this.navigateMonth(-1);
    }), this.addListener(this.nextBtn, "click", (i) => {
      i.stopPropagation(), this.navigateMonth(1);
    }), this.addListener(this.daysGrid, "click", (i) => {
      i.stopPropagation();
      const a = i.target.closest(".kwami-datepicker-day:not(.disabled):not(.outside)");
      if (a) {
        const r = parseInt(a.dataset.day || "0");
        r > 0 && this.selectDate(r);
      }
    });
    const t = (i) => {
      var s;
      this.isOpen && !((s = this.element) != null && s.contains(i.target)) && this.closePopup();
    };
    document.addEventListener("click", t);
    const e = (i) => {
      i.key === "Escape" && this.isOpen && this.closePopup();
    };
    document.addEventListener("keydown", e);
  }
  togglePopup() {
    var t, e, i;
    this.isOpen = !this.isOpen, (t = this.popup) == null || t.classList.toggle("active", this.isOpen), (i = (e = this.element) == null ? void 0 : e.querySelector(".kwami-datepicker")) == null || i.classList.toggle("active", this.isOpen);
  }
  closePopup() {
    var t, e, i;
    this.isOpen = !1, (t = this.popup) == null || t.classList.remove("active"), (i = (e = this.element) == null ? void 0 : e.querySelector(".kwami-datepicker")) == null || i.classList.remove("active");
  }
  navigateMonth(t) {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + t), this.renderMonth();
  }
  renderMonth() {
    if (!this.monthLabel || !this.daysGrid) return;
    const { locale: t = "en-US" } = this.props;
    this.monthLabel.textContent = this.currentMonth.toLocaleDateString(t, {
      month: "long",
      year: "numeric"
    });
    const e = this.generateDays();
    this.daysGrid.innerHTML = e;
  }
  generateDays() {
    const { firstDayOfWeek: t = 0, minDate: e, maxDate: i } = this.props, s = this.currentMonth.getFullYear(), a = this.currentMonth.getMonth(), r = new Date(s, a, 1), c = new Date(s, a + 1, 0).getDate();
    let d = r.getDay() - t;
    d < 0 && (d += 7);
    const u = new Date(s, a, 0).getDate(), m = [], g = /* @__PURE__ */ new Date();
    g.setHours(0, 0, 0, 0);
    for (let f = d - 1; f >= 0; f--) {
      const w = u - f;
      m.push(`<button class="kwami-datepicker-day outside" disabled>${w}</button>`);
    }
    for (let f = 1; f <= c; f++) {
      const w = new Date(s, a, f), $ = ["kwami-datepicker-day"];
      let L = !1;
      w.getTime() === g.getTime() && $.push("today"), this.selectedDate && w.getFullYear() === this.selectedDate.getFullYear() && w.getMonth() === this.selectedDate.getMonth() && w.getDate() === this.selectedDate.getDate() && $.push("selected"), e && w < e && ($.push("disabled"), L = !0), i && w > i && ($.push("disabled"), L = !0), m.push(`<button class="${$.join(" ")}" data-day="${f}"${L ? " disabled" : ""}>${f}</button>`);
    }
    const S = Math.ceil((d + c) / 7) * 7 - (d + c);
    for (let f = 1; f <= S; f++)
      m.push(`<button class="kwami-datepicker-day outside" disabled>${f}</button>`);
    return m.join("");
  }
  selectDate(t) {
    var s;
    const e = this.currentMonth.getFullYear(), i = this.currentMonth.getMonth();
    this.selectedDate = new Date(e, i, t), this.renderMonth(), this.valueDisplay && (this.valueDisplay.textContent = this.formatDate(this.selectedDate)), this.closePopup(), (s = this.element) == null || s.dispatchEvent(new CustomEvent("datechange", {
      detail: { date: new Date(this.selectedDate) },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(new Date(this.selectedDate));
  }
  /** Get the currently selected date */
  getDate() {
    return this.selectedDate ? new Date(this.selectedDate) : null;
  }
  /** Set the date programmatically */
  setDate(t) {
    this.selectedDate = new Date(t), this.currentMonth = new Date(t.getFullYear(), t.getMonth(), 1), this.renderMonth(), this.valueDisplay && (this.valueDisplay.textContent = this.formatDate(this.selectedDate));
  }
  /** Clear the selected date */
  clear() {
    this.selectedDate = null, this.renderMonth(), this.valueDisplay && (this.valueDisplay.textContent = this.props.placeholder || "Select date");
  }
  /** Navigate to a specific month */
  goToMonth(t, e) {
    this.currentMonth = new Date(t, e, 1), this.renderMonth();
  }
}
class xt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "currentValue");
    n(this, "valueDisplay", null);
    n(this, "minusBtn", null);
    n(this, "plusBtn", null);
    this.currentValue = t.value ?? 0;
  }
  render() {
    const { value: t = 0, min: e = -10, max: i = 10, step: s = 1, label: a } = this.props;
    return `
            <div class="kwami-stepper-container" data-kwami-id="${this.id}">
                ${a ? `<span class="kwami-stepper-label">${a}</span>` : ""}
                <div class="kwami-stepper" data-value="${t}" data-min="${e}" data-max="${i}" data-step="${s}">
                    <button class="kwami-stepper-btn kwami-stepper-minus" aria-label="Decrease">
                        <iconify-icon icon="solar:minus-circle-linear" width="20" height="20"></iconify-icon>
                    </button>
                    <div class="kwami-stepper-value">${t}</div>
                    <button class="kwami-stepper-btn kwami-stepper-plus" aria-label="Increase">
                        <iconify-icon icon="solar:add-circle-linear" width="20" height="20"></iconify-icon>
                    </button>
                </div>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.minusBtn = this.element.querySelector(".kwami-stepper-minus"), this.plusBtn = this.element.querySelector(".kwami-stepper-plus"), this.valueDisplay = this.element.querySelector(".kwami-stepper-value"), !(!this.minusBtn || !this.plusBtn || !this.valueDisplay) && (this.addListener(this.minusBtn, "click", () => this.decrement()), this.addListener(this.plusBtn, "click", () => this.increment()), this.updateButtonStates()));
  }
  updateButtonStates() {
    var i, s;
    const { min: t = -10, max: e = 10 } = this.props;
    (i = this.minusBtn) == null || i.classList.toggle("disabled", this.currentValue <= t), (s = this.plusBtn) == null || s.classList.toggle("disabled", this.currentValue >= e);
  }
  updateValue(t) {
    var s;
    const { min: e = -10, max: i = 10 } = this.props;
    this.currentValue = Math.max(e, Math.min(i, t)), this.valueDisplay && (this.valueDisplay.textContent = String(this.currentValue)), this.updateButtonStates(), (s = this.element) == null || s.dispatchEvent(new CustomEvent("stepperchange", {
      detail: { value: this.currentValue },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(this.currentValue);
  }
  increment() {
    var i;
    const { step: t = 1, max: e = 10 } = this.props;
    this.currentValue >= e || (this.updateValue(this.currentValue + t), (i = this.valueDisplay) == null || i.classList.add("bump-up"), setTimeout(() => {
      var s;
      return (s = this.valueDisplay) == null ? void 0 : s.classList.remove("bump-up");
    }, 150));
  }
  decrement() {
    var i;
    const { step: t = 1, min: e = -10 } = this.props;
    this.currentValue <= e || (this.updateValue(this.currentValue - t), (i = this.valueDisplay) == null || i.classList.add("bump-down"), setTimeout(() => {
      var s;
      return (s = this.valueDisplay) == null ? void 0 : s.classList.remove("bump-down");
    }, 150));
  }
  /** Get the current value */
  getValue() {
    return this.currentValue;
  }
  /** Set the value programmatically */
  setValue(t) {
    this.updateValue(t);
  }
}
class Ct extends p {
  constructor(t = {}) {
    super(t);
    n(this, "currentValue");
    n(this, "isDragging", !1);
    n(this, "track", null);
    n(this, "knob", null);
    n(this, "fill", null);
    this.currentValue = t.value ?? 75;
  }
  render() {
    const { value: t = 75, min: e = 0, max: i = 100, label: s } = this.props;
    return `
            <div class="kwami-fader-container" data-kwami-id="${this.id}">
                ${s ? `<span class="kwami-fader-label">${s}</span>` : ""}
                <div class="kwami-fader" data-value="${t}" data-min="${e}" data-max="${i}">
                    <div class="kwami-fader-track">
                        <div class="kwami-fader-groove"></div>
                        <div class="kwami-fader-fill"></div>
                        <div class="kwami-fader-knob">
                            <div class="kwami-fader-knob-grip"></div>
                            <div class="kwami-fader-knob-grip"></div>
                            <div class="kwami-fader-knob-grip"></div>
                        </div>
                    </div>
                    <div class="kwami-fader-ticks">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.track = this.element.querySelector(".kwami-fader-track"), this.knob = this.element.querySelector(".kwami-fader-knob"), this.fill = this.element.querySelector(".kwami-fader-fill"), !(!this.track || !this.knob || !this.fill) && (this.setupEventListeners(), this.updatePosition(this.currentValue)));
  }
  setupEventListeners() {
    if (!this.knob || !this.track) return;
    this.addListener(this.knob, "mousedown", (a) => {
      var r;
      a.preventDefault(), this.isDragging = !0, (r = this.knob) == null || r.classList.add("dragging");
    });
    const t = (a) => {
      this.isDragging && this.handleMove(a.clientY);
    };
    document.addEventListener("mousemove", t);
    const e = () => {
      var a;
      this.isDragging = !1, (a = this.knob) == null || a.classList.remove("dragging");
    };
    document.addEventListener("mouseup", e), this.addListener(this.knob, "touchstart", (a) => {
      var r;
      a.preventDefault(), this.isDragging = !0, (r = this.knob) == null || r.classList.add("dragging");
    });
    const i = (a) => {
      this.isDragging && this.handleMove(a.touches[0].clientY);
    };
    document.addEventListener("touchmove", i);
    const s = () => {
      var a;
      this.isDragging = !1, (a = this.knob) == null || a.classList.remove("dragging");
    };
    document.addEventListener("touchend", s), this.addListener(this.track, "click", (a) => {
      var r;
      a.target === this.knob || (r = this.knob) != null && r.contains(a.target) || this.handleMove(a.clientY);
    });
  }
  handleMove(t) {
    if (!this.track) return;
    const { min: e = 0, max: i = 100 } = this.props, s = this.track.getBoundingClientRect(), a = s.height - 40, r = s.bottom - 20 - t, l = Math.max(0, Math.min(100, r / a * 100)), c = e + l / 100 * (i - e);
    this.updatePosition(c);
  }
  updatePosition(t) {
    var a;
    const { min: e = 0, max: i = 100 } = this.props;
    this.currentValue = Math.max(e, Math.min(i, t));
    const s = (this.currentValue - e) / (i - e) * 100;
    this.knob && (this.knob.style.bottom = `calc(${s}% - 20px)`), this.fill && (this.fill.style.height = `${s}%`), (a = this.element) == null || a.dispatchEvent(new CustomEvent("faderchange", {
      detail: { value: Math.round(this.currentValue) },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(Math.round(this.currentValue));
  }
  /** Get the current value */
  getValue() {
    return Math.round(this.currentValue);
  }
  /** Set the value programmatically */
  setValue(t) {
    this.updatePosition(t);
  }
}
class St extends p {
  constructor(t = {}) {
    super(t);
    n(this, "currentValue");
    n(this, "isDragging", !1);
    n(this, "startY", 0);
    n(this, "startValue", 0);
    n(this, "knobEl", null);
    n(this, "track", null);
    n(this, "ledsContainer", null);
    this.currentValue = t.value ?? 50;
  }
  render() {
    const { label: t = "VOLUME" } = this.props, e = Array.from(
      { length: 11 },
      (i, s) => `<div class="kwami-knob-led" data-led-index="${s}"></div>`
    ).join("");
    return `
            <div class="kwami-knob-container" data-kwami-id="${this.id}">
                <div class="kwami-knob-outer">
                    <div class="kwami-knob-bezel" aria-hidden="true"></div>
                    <div class="kwami-knob-track-ring" aria-hidden="true"></div>
                    <div class="kwami-knob-leds" aria-hidden="true">
                        ${e}
                    </div>
                    <div class="kwami-knob" data-value="${this.currentValue}">
                        <div class="kwami-knob-edge" aria-hidden="true"></div>
                        <div class="kwami-knob-face" aria-hidden="true"></div>
                        <div class="kwami-knob-grooves" aria-hidden="true">
                            <div class="kwami-knob-groove kwami-knob-groove-1"></div>
                            <div class="kwami-knob-groove kwami-knob-groove-2"></div>
                            <div class="kwami-knob-groove kwami-knob-groove-3"></div>
                            <div class="kwami-knob-groove kwami-knob-groove-4"></div>
                        </div>
                        <div class="kwami-knob-cap" aria-hidden="true"></div>
                        <div class="kwami-knob-track">
                            <div class="kwami-knob-indicator"></div>
                        </div>
                    </div>
                </div>
                <span class="kwami-knob-label">${t}</span>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.knobEl = this.element.querySelector(".kwami-knob"), this.track = this.element.querySelector(".kwami-knob-track"), this.ledsContainer = this.element.querySelector(".kwami-knob-leds"), this.knobEl && (this.setupEventListeners(), this.updateKnob(this.currentValue)));
  }
  setupEventListeners() {
    if (!this.knobEl) return;
    this.addListener(this.knobEl, "mousedown", (s) => {
      this.handleStart(s.clientY), s.preventDefault();
    });
    const t = (s) => {
      this.handleMove(s.clientY);
    };
    document.addEventListener("mousemove", t);
    const e = () => {
      this.handleEnd();
    };
    document.addEventListener("mouseup", e), this.addListener(this.knobEl, "touchstart", (s) => {
      const a = s.touches[0];
      a && (this.handleStart(a.clientY), s.preventDefault());
    });
    const i = (s) => {
      const a = s.touches[0];
      a && this.handleMove(a.clientY);
    };
    document.addEventListener("touchmove", i), document.addEventListener("touchend", () => this.handleEnd()), this.addListener(this.knobEl, "wheel", (s) => {
      s.preventDefault();
      const a = s.deltaY > 0 ? -2 : 2;
      this.updateKnob(this.currentValue + a);
    });
  }
  handleStart(t) {
    var e;
    this.isDragging = !0, this.startY = t, this.startValue = this.currentValue, (e = this.knobEl) == null || e.classList.add("grabbing");
  }
  handleMove(t) {
    if (!this.isDragging) return;
    const e = this.startY - t, s = this.startValue + e * 0.5;
    this.updateKnob(s);
  }
  handleEnd() {
    var t;
    this.isDragging = !1, (t = this.knobEl) == null || t.classList.remove("grabbing");
  }
  updateLeds(t) {
    if (!this.ledsContainer) return;
    const e = this.ledsContainer.querySelectorAll(".kwami-knob-led"), i = Math.round(t / 100 * 11);
    e.forEach((s, a) => {
      a < i ? s.classList.add("active") : s.classList.remove("active");
    });
  }
  updateKnob(t) {
    var i, s;
    this.currentValue = Math.max(0, Math.min(100, t));
    const e = this.currentValue / 100 * 270 - 135;
    this.track && (this.track.style.transform = `rotate(${e}deg)`), (i = this.knobEl) == null || i.setAttribute("data-value", this.currentValue.toString()), this.updateLeds(this.currentValue), (s = this.element) == null || s.dispatchEvent(new CustomEvent("knobchange", {
      detail: { value: Math.round(this.currentValue) },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(Math.round(this.currentValue));
  }
  /** Get the current value */
  getValue() {
    return Math.round(this.currentValue);
  }
  /** Set the value programmatically */
  setValue(t) {
    this.updateKnob(t);
  }
}
const tt = [
  { id: "tab1", label: "Tab 1", content: "Content 1" },
  { id: "tab2", label: "Tab 2", content: "Content 2" },
  { id: "tab3", label: "Tab 3", content: "Content 3" }
];
class Lt extends p {
  constructor(t = {}) {
    var e;
    super(t);
    n(this, "tabs");
    n(this, "activeTabId");
    // DOM references
    n(this, "indicator", null);
    n(this, "tabButtons", null);
    n(this, "panels", null);
    this.tabs = t.tabs || tt, this.activeTabId = t.activeTab || ((e = this.tabs[0]) == null ? void 0 : e.id) || "";
  }
  render() {
    const { className: t = "" } = this.props, e = this.tabs.map((s) => `
            <button 
                class="kwami-tab${s.id === this.activeTabId ? " active" : ""}" 
                role="tab" 
                data-tab="${s.id}" 
                aria-selected="${s.id === this.activeTabId}"
            >${s.label}</button>
        `).join(""), i = this.tabs.map((s) => `
            <div 
                class="kwami-tab-panel${s.id === this.activeTabId ? " active" : ""}" 
                data-panel="${s.id}" 
                role="tabpanel"
            >
                <span>${s.content}</span>
            </div>
        `).join("");
    return `
            <div class="kwami-tabs ${t}" data-kwami-id="${this.id}">
                <div class="kwami-tabs-list" role="tablist">
                    ${e}
                    <div class="kwami-tabs-indicator"></div>
                </div>
                <div class="kwami-tabs-content">
                    ${i}
                </div>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.indicator = this.element.querySelector(".kwami-tabs-indicator"), this.tabButtons = this.element.querySelectorAll(".kwami-tab"), this.panels = this.element.querySelectorAll(".kwami-tab-panel"), !(!this.indicator || !this.tabButtons || !this.panels) && (this.tabButtons.forEach((t) => {
      this.addListener(t, "click", () => {
        const e = t.getAttribute("data-tab");
        e && this.activateTab(e);
      });
    }), requestAnimationFrame(() => this.updateIndicator()), this.addListener(window, "resize", () => {
      this.updateIndicator();
    })));
  }
  updateIndicator() {
    if (!this.indicator || !this.element) return;
    const t = this.element.querySelector(".kwami-tab.active");
    if (!t) return;
    const e = this.element.querySelector(".kwami-tabs-list");
    if (!e) return;
    const i = e.getBoundingClientRect(), s = t.getBoundingClientRect();
    this.indicator.style.width = `${s.width}px`, this.indicator.style.left = `${s.left - i.left}px`;
  }
  activateTab(t) {
    var e;
    !this.tabButtons || !this.panels || (this.activeTabId = t, this.tabButtons.forEach((i) => {
      const s = i.getAttribute("data-tab") === t;
      i.classList.toggle("active", s), i.setAttribute("aria-selected", String(s));
    }), this.panels.forEach((i) => {
      const s = i.getAttribute("data-panel") === t;
      i.classList.toggle("active", s);
    }), this.updateIndicator(), (e = this.element) == null || e.dispatchEvent(new CustomEvent("tabchange", {
      detail: { tabId: t },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(t));
  }
  /** Set active tab by ID */
  setActiveTab(t) {
    this.tabs.some((e) => e.id === t) && this.activateTab(t);
  }
  /** Get current active tab ID */
  getActiveTab() {
    return this.activeTabId;
  }
}
const et = [
  { id: "section1", title: "Section 1", content: "Content for section 1", expanded: !0 },
  { id: "section2", title: "Section 2", content: "Content for section 2" }
];
class Et extends p {
  constructor(t = {}) {
    super(t);
    n(this, "items");
    n(this, "allowMultiple");
    this.items = t.items || et, this.allowMultiple = t.allowMultiple ?? !0;
  }
  render() {
    const { className: t = "" } = this.props, e = this.items.map((i) => `
            <div class="kwami-accordion-item${i.expanded ? " expanded" : ""}" data-item="${i.id}">
                <button class="kwami-accordion-header">
                    <span>${i.title}</span>
                    <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon>
                </button>
                <div class="kwami-accordion-content">
                    <div class="kwami-accordion-body">
                        ${i.content}
                    </div>
                </div>
            </div>
        `).join("");
    return `
            <div class="kwami-accordion ${t}" data-kwami-id="${this.id}">
                ${e}
            </div>
        `;
  }
  onHydrate() {
    if (!this.element) return;
    const t = this.element.querySelectorAll(".kwami-accordion-item");
    t.forEach((e) => {
      const i = e.querySelector(".kwami-accordion-header"), s = e.querySelector(".kwami-accordion-content"), a = e.querySelector(".kwami-accordion-body");
      !i || !s || !a || (e.classList.contains("expanded") && (s.style.maxHeight = `${a.offsetHeight}px`), this.addListener(i, "click", () => {
        var c;
        const r = e.classList.contains("expanded"), l = e.getAttribute("data-item") || "";
        r ? (s.style.maxHeight = "0", e.classList.remove("expanded")) : (this.allowMultiple || t.forEach((d) => {
          if (d !== e && d.classList.contains("expanded")) {
            const u = d.querySelector(".kwami-accordion-content");
            u && (u.style.maxHeight = "0", d.classList.remove("expanded"));
          }
        }), s.style.maxHeight = `${a.offsetHeight}px`, e.classList.add("expanded")), (c = this.element) == null || c.dispatchEvent(new CustomEvent("accordionchange", {
          detail: {
            itemId: l,
            expanded: !r
          },
          bubbles: !0
        })), this.props.onChange && this.props.onChange(l, !r);
      }));
    });
  }
  /** Expand a specific section by ID */
  expand(t) {
    if (!this.element) return;
    const e = this.element.querySelector(`[data-item="${t}"]`);
    if (e && !e.classList.contains("expanded")) {
      const i = e.querySelector(".kwami-accordion-header");
      i == null || i.click();
    }
  }
  /** Collapse a specific section by ID */
  collapse(t) {
    if (!this.element) return;
    const e = this.element.querySelector(`[data-item="${t}"]`);
    if (e && e.classList.contains("expanded")) {
      const i = e.querySelector(".kwami-accordion-header");
      i == null || i.click();
    }
  }
  /** Check if a section is expanded */
  isExpanded(t) {
    if (!this.element) return !1;
    const e = this.element.querySelector(`[data-item="${t}"]`);
    return (e == null ? void 0 : e.classList.contains("expanded")) ?? !1;
  }
}
class Mt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isOpen", !1);
    // DOM references
    n(this, "trigger", null);
    n(this, "popover", null);
    n(this, "documentClickHandler", null);
  }
  render() {
    const {
      className: t = "",
      triggerText: e = "INFO",
      title: i = "Popover Title",
      content: s = "This is a neumorphic popover panel with hardware-inspired styling."
    } = this.props;
    return `
            <div class="kwami-popover-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-popover-trigger-bezel">
                    <button class="kwami-popover-trigger">
                        <span class="kwami-popover-trigger-face">
                            <span class="kwami-popover-trigger-highlight"></span>
                            <span class="kwami-popover-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
                <div class="kwami-popover hidden">
                    <div class="kwami-popover-content">
                        <h4>${i}</h4>
                        <p>${s}</p>
                    </div>
                    <div class="kwami-popover-arrow"></div>
                </div>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.trigger = this.element.querySelector(".kwami-popover-trigger"), this.popover = this.element.querySelector(".kwami-popover"), !(!this.trigger || !this.popover) && (this.addListener(this.trigger, "click", (t) => {
      t.stopPropagation(), this.toggle();
    }), this.documentClickHandler = (t) => {
      var e;
      (e = this.element) != null && e.contains(t.target) || this.close();
    }, document.addEventListener("click", this.documentClickHandler)));
  }
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  /** Open the popover */
  open() {
    var t;
    !this.trigger || !this.popover || this.isOpen || (this.isOpen = !0, this.popover.classList.remove("hidden"), this.trigger.classList.add("active"), (t = this.element) == null || t.dispatchEvent(new CustomEvent("popoverchange", {
      detail: { isOpen: !0 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!0));
  }
  /** Close the popover */
  close() {
    var t;
    !this.trigger || !this.popover || !this.isOpen || (this.isOpen = !1, this.popover.classList.add("hidden"), this.trigger.classList.remove("active"), (t = this.element) == null || t.dispatchEvent(new CustomEvent("popoverchange", {
      detail: { isOpen: !1 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!1));
  }
  /** Check if popover is open */
  getIsOpen() {
    return this.isOpen;
  }
  destroy() {
    this.documentClickHandler && document.removeEventListener("click", this.documentClickHandler), super.destroy();
  }
}
class Dt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isVisible", !1);
    // DOM references
    n(this, "trigger", null);
    n(this, "tooltip", null);
  }
  render() {
    const {
      className: t = "",
      triggerText: e = "HOVER",
      text: i = "Helpful tooltip info!"
    } = this.props;
    return `
            <div class="kwami-tooltip-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-tooltip-trigger-bezel">
                    <button class="kwami-tooltip-trigger">
                        <span class="kwami-tooltip-trigger-face">
                            <span class="kwami-tooltip-trigger-highlight"></span>
                            <span class="kwami-tooltip-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
                <div class="kwami-tooltip hidden">
                    <span class="kwami-tooltip-text">${i}</span>
                    <div class="kwami-tooltip-arrow"></div>
                </div>
            </div>
        `;
  }
  onHydrate() {
    this.element && (this.trigger = this.element.querySelector(".kwami-tooltip-trigger"), this.tooltip = this.element.querySelector(".kwami-tooltip"), !(!this.trigger || !this.tooltip) && (this.addListener(this.trigger, "mouseenter", () => {
      this.show();
    }), this.addListener(this.trigger, "mouseleave", () => {
      this.hide();
    }), this.addListener(this.trigger, "focus", () => {
      this.show();
    }), this.addListener(this.trigger, "blur", () => {
      this.hide();
    })));
  }
  /** Show the tooltip */
  show() {
    var t;
    !this.tooltip || this.isVisible || (this.isVisible = !0, this.tooltip.classList.remove("hidden"), (t = this.element) == null || t.dispatchEvent(new CustomEvent("tooltipchange", {
      detail: { isVisible: !0 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!0));
  }
  /** Hide the tooltip */
  hide() {
    var t;
    !this.tooltip || !this.isVisible || (this.isVisible = !1, this.tooltip.classList.add("hidden"), (t = this.element) == null || t.dispatchEvent(new CustomEvent("tooltipchange", {
      detail: { isVisible: !1 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!1));
  }
  /** Check if tooltip is visible */
  getIsVisible() {
    return this.isVisible;
  }
}
class qt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isOpen", !1);
    // DOM references
    n(this, "trigger", null);
    n(this, "overlay", null);
    n(this, "closeBtn", null);
    n(this, "escHandler", null);
  }
  getOverlayHTML() {
    const {
      title: t = "Modal Title",
      content: e = "This is a neumorphic modal dialog with smooth animations and hardware-inspired styling.",
      showCloseButton: i = !0
    } = this.props;
    return `
            <div class="kwami-modal-overlay hidden" data-modal-id="${this.id}">
                <div class="kwami-modal">
                    <div class="kwami-modal-header">
                        <h3 class="kwami-modal-title">${t}</h3>
                        ${i ? `
                            <button class="kwami-modal-close" aria-label="Close modal">
                                <iconify-icon icon="solar:close-circle-linear" width="24" height="24"></iconify-icon>
                            </button>
                        ` : ""}
                    </div>
                    <div class="kwami-modal-content">
                        <p>${e}</p>
                    </div>
                    <div class="kwami-modal-footer">
                        <button class="kwami-modal-btn kwami-modal-btn-secondary">Cancel</button>
                        <button class="kwami-modal-btn kwami-modal-btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        `;
  }
  render() {
    const {
      className: t = "",
      triggerText: e = "OPEN"
    } = this.props;
    return `
            <div class="kwami-modal-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-modal-trigger-bezel">
                    <button class="kwami-modal-trigger">
                        <span class="kwami-modal-trigger-face">
                            <span class="kwami-modal-trigger-highlight"></span>
                            <span class="kwami-modal-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
            </div>
        `;
  }
  onHydrate() {
    if (!this.element || (this.trigger = this.element.querySelector(".kwami-modal-trigger"), !this.trigger)) return;
    const t = document.createElement("div");
    t.innerHTML = this.getOverlayHTML(), this.overlay = t.firstElementChild, document.body.appendChild(this.overlay), this.closeBtn = this.overlay.querySelector(".kwami-modal-close"), this.addListener(this.trigger, "click", (s) => {
      s.stopPropagation(), this.open();
    }), this.closeBtn && this.addListener(this.closeBtn, "click", () => {
      this.close();
    }), this.addListener(this.overlay, "click", (s) => {
      s.target === this.overlay && this.close();
    });
    const e = this.overlay.querySelector(".kwami-modal-btn-secondary");
    e && this.addListener(e, "click", () => {
      this.close();
    });
    const i = this.overlay.querySelector(".kwami-modal-btn-primary");
    i && this.addListener(i, "click", () => {
      var s;
      (s = this.element) == null || s.dispatchEvent(new CustomEvent("modalconfirm", {
        bubbles: !0
      })), this.close();
    }), this.escHandler = (s) => {
      s.key === "Escape" && this.isOpen && this.close();
    }, document.addEventListener("keydown", this.escHandler);
  }
  /** Open the modal */
  open() {
    var t;
    !this.trigger || !this.overlay || this.isOpen || (this.isOpen = !0, this.overlay.classList.remove("hidden"), this.trigger.classList.add("active"), document.body.style.overflow = "hidden", (t = this.element) == null || t.dispatchEvent(new CustomEvent("modalchange", {
      detail: { isOpen: !0 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!0));
  }
  /** Close the modal */
  close() {
    var t;
    !this.trigger || !this.overlay || !this.isOpen || (this.isOpen = !1, this.overlay.classList.add("hidden"), this.trigger.classList.remove("active"), document.body.style.overflow = "", (t = this.element) == null || t.dispatchEvent(new CustomEvent("modalchange", {
      detail: { isOpen: !1 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!1));
  }
  /** Check if modal is open */
  getIsOpen() {
    return this.isOpen;
  }
  destroy() {
    this.escHandler && document.removeEventListener("keydown", this.escHandler), this.overlay && this.overlay.parentNode && this.overlay.parentNode.removeChild(this.overlay), document.body.style.overflow = "", super.destroy();
  }
}
class Tt extends p {
  constructor(t = {}) {
    super(t);
    n(this, "isVisible", !1);
    n(this, "hideTimeout", null);
    // DOM references
    n(this, "trigger", null);
    n(this, "toast", null);
    n(this, "closeBtn", null);
  }
  getIcon(t) {
    return {
      info: "solar:info-circle-linear",
      success: "solar:check-circle-linear",
      warning: "solar:danger-triangle-linear",
      error: "solar:close-circle-linear"
    }[t];
  }
  getToastHTML() {
    const {
      message: t = "This is a notification toast!",
      type: e = "info",
      position: i = "top-right"
    } = this.props;
    return `
            <div class="kwami-toast kwami-toast-${e} kwami-toast-${i} hidden" data-toast-id="${this.id}">
                <div class="kwami-toast-icon">
                    <iconify-icon icon="${this.getIcon(e)}" width="20" height="20"></iconify-icon>
                </div>
                <span class="kwami-toast-message">${t}</span>
                <button class="kwami-toast-close" aria-label="Close toast">
                    <iconify-icon icon="solar:close-square-linear" width="18" height="18"></iconify-icon>
                </button>
                <div class="kwami-toast-progress"></div>
            </div>
        `;
  }
  render() {
    const {
      className: t = "",
      triggerText: e = "NOTIFY"
    } = this.props;
    return `
            <div class="kwami-toast-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-toast-trigger-bezel">
                    <button class="kwami-toast-trigger">
                        <span class="kwami-toast-trigger-face">
                            <span class="kwami-toast-trigger-highlight"></span>
                            <span class="kwami-toast-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
            </div>
        `;
  }
  onHydrate() {
    if (!this.element || (this.trigger = this.element.querySelector(".kwami-toast-trigger"), !this.trigger)) return;
    const t = document.createElement("div");
    t.innerHTML = this.getToastHTML(), this.toast = t.firstElementChild, document.body.appendChild(this.toast), this.closeBtn = this.toast.querySelector(".kwami-toast-close"), this.addListener(this.trigger, "click", (e) => {
      e.stopPropagation(), this.show();
    }), this.closeBtn && this.addListener(this.closeBtn, "click", () => {
      this.hide();
    });
  }
  /** Show the toast */
  show() {
    var i;
    if (!this.toast) return;
    this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null), this.isVisible = !0, this.toast.classList.remove("hidden", "hiding"), this.toast.classList.add("showing");
    const t = this.props.duration ?? 3e3, e = this.toast.querySelector(".kwami-toast-progress");
    e && t > 0 && (e.style.animation = "none", e.offsetHeight, e.style.animation = `kwami-toast-progress ${t}ms linear forwards`), (i = this.element) == null || i.dispatchEvent(new CustomEvent("toastchange", {
      detail: { isVisible: !0 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!0), t > 0 && (this.hideTimeout = setTimeout(() => {
      this.hide();
    }, t));
  }
  /** Hide the toast */
  hide() {
    var t;
    !this.toast || !this.isVisible || (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = null), this.isVisible = !1, this.toast.classList.remove("showing"), this.toast.classList.add("hiding"), setTimeout(() => {
      var e, i;
      (e = this.toast) == null || e.classList.add("hidden"), (i = this.toast) == null || i.classList.remove("hiding");
    }, 300), (t = this.element) == null || t.dispatchEvent(new CustomEvent("toastchange", {
      detail: { isVisible: !1 },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(!1));
  }
  /** Check if toast is visible */
  getIsVisible() {
    return this.isVisible;
  }
  /** Update the message dynamically */
  setMessage(t) {
    var i;
    const e = (i = this.toast) == null ? void 0 : i.querySelector(".kwami-toast-message");
    e && (e.textContent = t);
  }
  /** Update the type dynamically */
  setType(t) {
    if (!this.toast) return;
    this.toast.classList.remove("kwami-toast-info", "kwami-toast-success", "kwami-toast-warning", "kwami-toast-error"), this.toast.classList.add(`kwami-toast-${t}`);
    const e = this.toast.querySelector(".kwami-toast-icon iconify-icon");
    e && e.setAttribute("icon", this.getIcon(t));
  }
  destroy() {
    this.hideTimeout && clearTimeout(this.hideTimeout), this.toast && this.toast.parentNode && this.toast.parentNode.removeChild(this.toast), super.destroy();
  }
}
class zt extends p {
  constructor(o = {}) {
    super(o);
  }
  render() {
    const {
      className: o = "",
      content: t = "This is a depth note with an inset neumorphic style.",
      icon: e,
      padding: i = "md"
    } = this.props, s = e ? `<iconify-icon class="kwami-depth-icon" icon="${e}" width="18" height="18"></iconify-icon>` : "";
    return `
            <div class="kwami-depth kwami-depth-${i} ${o}" data-kwami-id="${this.id}">
                ${s}
                <div class="kwami-depth-content">${t}</div>
            </div>
        `;
  }
  onHydrate() {
  }
  /** Update the content dynamically */
  setContent(o) {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelector(".kwami-depth-content");
    t && (t.innerHTML = o);
  }
  /** Update the icon dynamically */
  setIcon(o) {
    if (!this.element) return;
    const t = this.element.querySelector(".kwami-depth-icon");
    if (o)
      if (t)
        t.setAttribute("icon", o);
      else {
        const e = document.createElement("iconify-icon");
        e.className = "kwami-depth-icon", e.setAttribute("icon", o), e.setAttribute("width", "18"), e.setAttribute("height", "18"), this.element.insertBefore(e, this.element.firstChild);
      }
    else t && t.remove();
  }
}
class Pt extends p {
  constructor(o = {}) {
    super(o);
  }
  render() {
    const {
      className: o = "",
      content: t = "This is a shallow note with a raised neumorphic style.",
      icon: e,
      padding: i = "md"
    } = this.props, s = e ? `<iconify-icon class="kwami-shallow-icon" icon="${e}" width="18" height="18"></iconify-icon>` : "";
    return `
            <div class="kwami-shallow kwami-shallow-${i} ${o}" data-kwami-id="${this.id}">
                ${s}
                <div class="kwami-shallow-content">${t}</div>
            </div>
        `;
  }
  onHydrate() {
  }
  /** Update the content dynamically */
  setContent(o) {
    var e;
    const t = (e = this.element) == null ? void 0 : e.querySelector(".kwami-shallow-content");
    t && (t.innerHTML = o);
  }
  /** Update the icon dynamically */
  setIcon(o) {
    if (!this.element) return;
    const t = this.element.querySelector(".kwami-shallow-icon");
    if (o)
      if (t)
        t.setAttribute("icon", o);
      else {
        const e = document.createElement("iconify-icon");
        e.className = "kwami-shallow-icon", e.setAttribute("icon", o), e.setAttribute("width", "18"), e.setAttribute("height", "18"), this.element.insertBefore(e, this.element.firstChild);
      }
    else t && t.remove();
  }
}
const D = {
  primary: "#ff9500",
  secondary: "#5856d6",
  background: "#1e1e1e",
  shadow: "rgba(0, 0, 0, 0.5)",
  light: "rgba(255, 255, 255, 0.03)"
}, q = {
  primary: "#ff9500",
  secondary: "#007aff",
  background: "#e0e5ec",
  shadow: "rgba(163, 177, 198, 0.6)",
  light: "rgba(255, 255, 255, 0.8)"
}, A = {
  mode: "dark",
  colors: {
    light: q,
    dark: D
  }
};
class Ht extends p {
  constructor(t = {}) {
    super(t);
    n(this, "config");
    n(this, "toggle", null);
    n(this, "colorPickers", /* @__PURE__ */ new Map());
    n(this, "systemThemeListener", null);
    this.config = this.loadConfig();
  }
  loadConfig() {
    const { config: t, storageKey: e = "kwami-theme-control" } = this.props;
    if (e)
      try {
        const i = localStorage.getItem(e);
        if (i) {
          const s = JSON.parse(i);
          if (s && s.mode && s.colors)
            return this.mergeConfig(s, t);
        }
      } catch {
      }
    return this.mergeConfig(A, t);
  }
  mergeConfig(t, e) {
    var i, s;
    return e ? {
      mode: e.mode ?? t.mode,
      colors: {
        light: { ...t.colors.light, ...(i = e.colors) == null ? void 0 : i.light },
        dark: { ...t.colors.dark, ...(s = e.colors) == null ? void 0 : s.dark }
      }
    } : { ...t };
  }
  saveConfig() {
    const { storageKey: t = "kwami-theme-control" } = this.props;
    if (t)
      try {
        localStorage.setItem(t, JSON.stringify(this.config));
      } catch {
      }
  }
  getEffectiveMode() {
    return this.config.mode === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : this.config.mode;
  }
  getControls() {
    return this.props.controls || ["mode", "primary", "secondary", "background", "shadow", "light"];
  }
  render() {
    const { layout: t = "horizontal", showLabels: e = !0 } = this.props, i = this.getControls(), s = this.getEffectiveMode(), a = this.config.colors[s], r = this.config.mode === "light" ? 0 : this.config.mode === "dark" ? 1 : 2;
    this.toggle = new Q({
      states: [
        { icon: "solar:sun-bold", label: "Light" },
        { icon: "solar:moon-bold", label: "Dark" },
        { icon: "solar:monitor-bold", label: "System" }
      ],
      initialState: r
    });
    const l = [
      { key: "background", label: "Background", icon: "solar:layers-linear" },
      { key: "shadow", label: "Shadow", icon: "solar:cloud-linear" },
      { key: "light", label: "Light", icon: "solar:sun-fog-linear" },
      { key: "primary", label: "Primary", icon: "solar:palette-linear" },
      { key: "secondary", label: "Secondary", icon: "solar:palette-2-linear" }
    ], c = s === "light" ? q : D;
    let d = "";
    for (const { key: u, label: m } of l)
      if (i.includes(u)) {
        const g = new y({
          defaultColor: a[u],
          popupDirection: "down",
          showRandomize: !0,
          showReset: !0,
          showCopyToOpposite: !0,
          showOpacity: !0
        });
        g.setDefaultColor(c[u]), this.colorPickers.set(u, g), d += `
                    <div class="kwami-theme-control-item" data-control="${u}">
                        ${e ? `<span class="kwami-theme-control-label">${m}</span>` : ""}
                        ${g.render()}
                    </div>
                `;
      }
    return `
            <div class="kwami-theme-control kwami-theme-control-${t}" data-kwami-id="${this.id}">
                ${i.includes("mode") ? `
                    <div class="kwami-theme-control-item kwami-theme-control-mode" data-control="mode">
                        ${e ? '<span class="kwami-theme-control-label">Theme</span>' : ""}
                        ${this.toggle.render()}
                    </div>
                ` : ""}
                ${d ? `
                    <div class="kwami-theme-control-colors">
                        ${d}
                    </div>
                ` : ""}
            </div>
        `;
  }
  onHydrate() {
    if (this.element) {
      if (this.toggle) {
        const t = this.element.querySelector(".kwami-toggle");
        t && this.toggle.hydrate(t);
      }
      this.colorPickers.forEach((t, e) => {
        var s;
        const i = (s = this.element) == null ? void 0 : s.querySelector(`[data-control="${e}"] .kwami-colorpicker`);
        i && t.hydrate(i);
      }), this.setupEventListeners(), this.applyTheme(), this.setupSystemThemeListener();
    }
  }
  setupEventListeners() {
    var i;
    const t = (i = this.element) == null ? void 0 : i.querySelector(".kwami-toggle");
    t && this.addListener(t, "togglechange", (s) => {
      const a = s.detail, r = ["light", "dark", "system"];
      this.config.mode = r[a.state], this.onConfigChange(), this.updateColorPickerValues(), this.updateColorPickerDefaults();
    }), ["primary", "secondary", "background", "shadow", "light"].forEach((s) => {
      var r;
      if (this.colorPickers.get(s)) {
        const l = (r = this.element) == null ? void 0 : r.querySelector(`[data-control="${s}"] .kwami-colorpicker`);
        l && (this.addListener(l, "colorchange", (c) => {
          const d = c.detail.color, u = this.getEffectiveMode();
          this.config.colors[u][s] = d, this.onConfigChange();
        }), this.addListener(l, "copytoopposite", (c) => {
          const d = c.detail.color, m = this.getEffectiveMode() === "light" ? "dark" : "light";
          this.config.colors[m][s] = d, this.saveConfig();
        }));
      }
    });
  }
  /** Update color picker default colors when theme mode changes */
  updateColorPickerDefaults() {
    const e = this.getEffectiveMode() === "light" ? q : D;
    this.colorPickers.forEach((i, s) => {
      const a = s;
      i.setDefaultColor(e[a]);
    });
  }
  setupSystemThemeListener() {
    if (this.config.mode === "system") {
      const t = window.matchMedia("(prefers-color-scheme: dark)"), e = () => {
        this.applyTheme(), this.updateColorPickerValues();
      };
      t.addEventListener("change", e), this.systemThemeListener = () => t.removeEventListener("change", e);
    }
  }
  updateColorPickerValues() {
    const t = this.getEffectiveMode(), e = this.config.colors[t];
    this.colorPickers.forEach((i, s) => {
      const a = s;
      e[a] && i.setColor(e[a]);
    });
  }
  onConfigChange() {
    var t;
    this.saveConfig(), this.applyTheme(), (t = this.element) == null || t.dispatchEvent(new CustomEvent("themechange", {
      detail: { config: this.config },
      bubbles: !0
    })), this.props.onChange && this.props.onChange(this.config);
  }
  applyTheme() {
    const t = document.documentElement, e = document.body, i = this.getEffectiveMode(), s = this.config.colors[i];
    t.setAttribute("data-theme", i), e.setAttribute("data-theme", i), t.style.setProperty("--accent-primary", s.primary), t.style.setProperty("--accent-secondary", s.secondary), t.style.setProperty("--kwami-accent", s.primary), t.style.setProperty("--kwami-bg", s.background), t.style.setProperty("--kwami-surface", s.background), t.style.setProperty("--kwami-shadow-dark", s.shadow), t.style.setProperty("--kwami-shadow-light", s.light);
  }
  /** Get the current theme configuration */
  getConfig() {
    return { ...this.config };
  }
  /** Set the theme configuration programmatically */
  setConfig(t) {
    if (this.config = this.mergeConfig(this.config, t), this.onConfigChange(), this.updateColorPickerValues(), t.mode && this.toggle) {
      const e = t.mode === "light" ? 0 : t.mode === "dark" ? 1 : 2;
      this.toggle.setState(e);
    }
  }
  /** Set the theme mode */
  setMode(t) {
    this.setConfig({ mode: t });
  }
  /** Reset to default configuration */
  reset() {
    if (this.config = { ...A }, this.onConfigChange(), this.updateColorPickerValues(), this.toggle) {
      const t = this.config.mode === "light" ? 0 : this.config.mode === "dark" ? 1 : 2;
      this.toggle.setState(t);
    }
  }
  destroy() {
    var t;
    this.systemThemeListener && this.systemThemeListener(), this.colorPickers.forEach((e) => e.destroy()), (t = this.toggle) == null || t.destroy(), super.destroy();
  }
}
export {
  Et as Accordion,
  mt as Activator,
  R as Button,
  rt as ButtonConfigurator,
  bt as Checkbox,
  y as ColorPicker,
  p as Component,
  $t as DatePicker,
  zt as Depth,
  pt as Expandable,
  Ct as Fader,
  K as Icon,
  dt as IconConfigurator,
  St as Knob,
  M as Label,
  ht as LabelConfigurator,
  qt as Modal,
  wt as Pin,
  Mt as Popover,
  yt as Radio,
  vt as Selector,
  Pt as Shallow,
  ut as Slider,
  xt as Stepper,
  gt as Switch,
  Lt as Tabs,
  Y as Text,
  kt as TextArea,
  ct as TextConfigurator,
  ft as TextInput,
  Ht as ThemeControl,
  T as Title,
  lt as TitleConfigurator,
  Tt as Toast,
  Q as Toggle,
  Dt as Tooltip,
  k as adjustBrightness,
  at as applyTheme,
  j as defaultButtonConfig,
  O as defaultDarkColors,
  X as defaultIconConfig,
  U as defaultLabelConfig,
  I as defaultLightColors,
  G as defaultTextConfig,
  st as defaultTheme,
  A as defaultThemeControlConfig,
  W as defaultTitleConfig,
  nt as generateGradientColors,
  F as getEffectiveTheme,
  N as hexToRgb,
  b as hslToHex,
  z as hslToRgb,
  x as parseColor,
  ot as renderTitle,
  E as rgbToHsl
};
