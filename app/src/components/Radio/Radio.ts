import './Radio.css'

export function Radio(): string {
  return `
    <div class="kwami-radio-group" role="radiogroup">
      <label class="kwami-radio">
        <input type="radio" name="demo-radio" value="a" checked />
        <span class="kwami-radio-circle">
          <span class="kwami-radio-dot"></span>
        </span>
        <span class="kwami-radio-label">Choice A</span>
      </label>
      <label class="kwami-radio">
        <input type="radio" name="demo-radio" value="b" />
        <span class="kwami-radio-circle">
          <span class="kwami-radio-dot"></span>
        </span>
        <span class="kwami-radio-label">Choice B</span>
      </label>
    </div>
  `;
}

export function initRadio(container: HTMLElement): void {
  const radios = container.querySelectorAll('.kwami-radio input');
  
  radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const input = e.target as HTMLInputElement;
      console.log('Radio selected:', input.value);
    });
  });
}
