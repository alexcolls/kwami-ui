import './Selector.css'

export function Selector(): string {
  return `
    <div class="kwami-selector-container">
      <div class="kwami-selector-bezel">
        <div class="kwami-selector" tabindex="0" role="listbox" aria-expanded="false">
          <div class="kwami-selector-face">
            <span class="kwami-selector-value" data-placeholder="true">Select...</span>
            <span class="kwami-selector-arrow">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
          <div class="kwami-selector-dropdown">
            <div class="kwami-selector-option" data-value="" role="option">Select...</div>
            <div class="kwami-selector-option" data-value="option1" role="option">Option 1</div>
            <div class="kwami-selector-option" data-value="option2" role="option">Option 2</div>
            <div class="kwami-selector-option" data-value="option3" role="option">Option 3</div>
          </div>
        </div>
      </div>
      <span class="kwami-selector-label">DROPDOWN</span>
    </div>
  `;
}

export function initSelector(container: HTMLElement): void {
  const selector = container.querySelector('.kwami-selector') as HTMLElement;
  const valueDisplay = container.querySelector('.kwami-selector-value') as HTMLElement;
  const dropdown = container.querySelector('.kwami-selector-dropdown') as HTMLElement;
  const options = container.querySelectorAll('.kwami-selector-option');
  
  let isOpen = false;
  let selectedValue = '';
  
  const toggleDropdown = (open?: boolean) => {
    isOpen = open !== undefined ? open : !isOpen;
    selector.setAttribute('aria-expanded', isOpen.toString());
    
    if (isOpen) {
      selector.classList.add('open');
      // Focus first option or selected option
      const selected = dropdown.querySelector('.kwami-selector-option.selected') as HTMLElement;
      (selected || options[0] as HTMLElement)?.focus();
    } else {
      selector.classList.remove('open');
    }
  };
  
  const selectOption = (option: Element) => {
    const value = option.getAttribute('data-value') || '';
    const text = option.textContent || '';
    
    // Update selection state
    options.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    
    // Update display
    selectedValue = value;
    valueDisplay.textContent = text;
    valueDisplay.setAttribute('data-placeholder', value === '' ? 'true' : 'false');
    
    toggleDropdown(false);
    selector.focus();
    
    console.log('Selected:', value);
  };
  
  // Click to toggle
  selector.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('.kwami-selector-option')) {
      toggleDropdown();
    }
  });
  
  // Option click
  options.forEach(option => {
    option.addEventListener('click', () => {
      selectOption(option);
    });
  });
  
  // Keyboard navigation
  selector.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault();
          toggleDropdown(true);
        }
        break;
      case 'Escape':
        toggleDropdown(false);
        selector.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          toggleDropdown(true);
        } else {
          const current = dropdown.querySelector('.kwami-selector-option:focus') as HTMLElement;
          const next = current?.nextElementSibling as HTMLElement;
          next?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          const current = dropdown.querySelector('.kwami-selector-option:focus') as HTMLElement;
          const prev = current?.previousElementSibling as HTMLElement;
          prev?.focus();
        }
        break;
    }
  });
  
  // Option keyboard selection
  options.forEach(option => {
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(option);
      }
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target as Node) && isOpen) {
      toggleDropdown(false);
    }
  });
  
  // Close on focus out
  selector.addEventListener('focusout', (e) => {
    if (!selector.contains(e.relatedTarget as Node)) {
      toggleDropdown(false);
    }
  });
}
