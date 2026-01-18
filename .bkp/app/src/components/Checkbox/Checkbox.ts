import './Checkbox.css'
import 'iconify-icon'

export function Checkbox(): string {
  return `
    <div class="kwami-checkbox-group">
      <label class="kwami-checkbox">
        <input type="checkbox" checked />
        <span class="kwami-checkbox-box">
          <iconify-icon icon="solar:check-read-linear" width="14" height="14"></iconify-icon>
        </span>
        <span class="kwami-checkbox-label">Option A</span>
      </label>
      <label class="kwami-checkbox">
        <input type="checkbox" />
        <span class="kwami-checkbox-box">
          <iconify-icon icon="solar:check-read-linear" width="14" height="14"></iconify-icon>
        </span>
        <span class="kwami-checkbox-label">Option B</span>
      </label>
    </div>
  `;
}

export function initCheckbox(container: HTMLElement): void {
  const checkboxes = container.querySelectorAll('.kwami-checkbox input');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const input = e.target as HTMLInputElement;
      console.log('Checkbox changed:', input.checked);
    });
  });
}
