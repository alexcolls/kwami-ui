import './Input.css'

export function Input(): string {
  return `
    <div class="kwami-input-container">
      <div class="kwami-input-bezel">
        <div class="kwami-input-wrapper">
          <input 
            type="text" 
            class="kwami-input" 
            placeholder="Type here..."
          />
          <span class="kwami-input-highlight"></span>
        </div>
      </div>
      <span class="kwami-input-label">TEXT INPUT</span>
    </div>
  `;
}

export function initInput(container: HTMLElement): void {
  const input = container.querySelector('.kwami-input') as HTMLInputElement;
  const wrapper = container.querySelector('.kwami-input-wrapper');
  
  input?.addEventListener('focus', () => {
    wrapper?.classList.add('focused');
  });
  
  input?.addEventListener('blur', () => {
    wrapper?.classList.remove('focused');
  });
  
  input?.addEventListener('input', (e) => {
    console.log('Input value:', (e.target as HTMLInputElement).value);
  });
}
