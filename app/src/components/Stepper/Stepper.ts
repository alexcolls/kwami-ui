import './Stepper.css'
import 'iconify-icon'

export function Stepper(): string {
  return `
    <div class="kwami-stepper" data-value="0" data-min="-10" data-max="10" data-step="1">
      <button class="kwami-stepper-btn kwami-stepper-minus" aria-label="Decrease">
        <iconify-icon icon="solar:minus-circle-linear" width="20" height="20"></iconify-icon>
      </button>
      <div class="kwami-stepper-value">0</div>
      <button class="kwami-stepper-btn kwami-stepper-plus" aria-label="Increase">
        <iconify-icon icon="solar:add-circle-linear" width="20" height="20"></iconify-icon>
      </button>
    </div>
  `;
}

export function initStepper(container: HTMLElement): void {
  const steppers = container.querySelectorAll('.kwami-stepper');
  
  steppers.forEach(stepper => {
    const minusBtn = stepper.querySelector('.kwami-stepper-minus') as HTMLButtonElement;
    const plusBtn = stepper.querySelector('.kwami-stepper-plus') as HTMLButtonElement;
    const valueDisplay = stepper.querySelector('.kwami-stepper-value') as HTMLElement;
    
    if (!minusBtn || !plusBtn || !valueDisplay) return;
    
    let value = parseInt(stepper.getAttribute('data-value') || '0');
    const min = parseInt(stepper.getAttribute('data-min') || '-Infinity');
    const max = parseInt(stepper.getAttribute('data-max') || 'Infinity');
    const step = parseInt(stepper.getAttribute('data-step') || '1');
    
    const updateValue = (newValue: number) => {
      value = Math.max(min, Math.min(max, newValue));
      valueDisplay.textContent = String(value);
      stepper.setAttribute('data-value', String(value));
      
      // Update button states
      minusBtn.classList.toggle('disabled', value <= min);
      plusBtn.classList.toggle('disabled', value >= max);
      
      // Dispatch event
      stepper.dispatchEvent(new CustomEvent('stepperchange', {
        detail: { value },
        bubbles: true
      }));
    };
    
    minusBtn.addEventListener('click', () => {
      updateValue(value - step);
      valueDisplay.classList.add('bump-down');
      setTimeout(() => valueDisplay.classList.remove('bump-down'), 150);
    });
    
    plusBtn.addEventListener('click', () => {
      updateValue(value + step);
      valueDisplay.classList.add('bump-up');
      setTimeout(() => valueDisplay.classList.remove('bump-up'), 150);
    });
    
    // Initial state
    updateValue(value);
  });
}
