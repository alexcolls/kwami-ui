import './Toggle.css'
import 'iconify-icon'

interface ToggleState {
  icon: string;
  label: string;
}

export function Toggle(): string {
  return `
    <div class="kwami-toggle" data-state="0">
      <button class="kwami-toggle-btn" title="Click to toggle">
        <iconify-icon class="kwami-toggle-icon" icon="solar:sun-bold" width="20" height="20"></iconify-icon>
      </button>
      <span class="kwami-toggle-label">Light</span>
    </div>
  `;
}

export function initToggle(container: HTMLElement): void {
  const toggles = container.querySelectorAll('.kwami-toggle');
  
  toggles.forEach(toggle => {
    const btn = toggle.querySelector('.kwami-toggle-btn') as HTMLButtonElement;
    const icon = toggle.querySelector('.kwami-toggle-icon') as HTMLElement;
    const label = toggle.querySelector('.kwami-toggle-label') as HTMLElement;
    
    if (!btn || !icon || !label) return;
    
    // Define states with icons and labels
    const states: ToggleState[] = [
      { icon: 'solar:sun-bold', label: 'Light' },
      { icon: 'solar:moon-bold', label: 'Dark' },
      { icon: 'solar:monitor-bold', label: 'System' }
    ];
    
    let currentState = parseInt(toggle.getAttribute('data-state') || '0');
    
    const updateState = (stateIndex: number) => {
      currentState = stateIndex % states.length;
      const state = states[currentState];
      
      // Add animation class
      icon.classList.add('switching');
      
      setTimeout(() => {
        icon.setAttribute('icon', state.icon);
        label.textContent = state.label;
        toggle.setAttribute('data-state', String(currentState));
        
        // Remove animation class
        setTimeout(() => icon.classList.remove('switching'), 150);
      }, 100);
      
      // Dispatch event
      toggle.dispatchEvent(new CustomEvent('togglechange', {
        detail: { 
          state: currentState,
          icon: state.icon,
          label: state.label
        },
        bubbles: true
      }));
    };
    
    btn.addEventListener('click', () => {
      updateState(currentState + 1);
    });
    
    // Initialize
    const state = states[currentState];
    icon.setAttribute('icon', state.icon);
    label.textContent = state.label;
  });
}
