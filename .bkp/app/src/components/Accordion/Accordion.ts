import './Accordion.css'
import 'iconify-icon'

export function Accordion(): string {
  return `
    <div class="kwami-accordion">
      <div class="kwami-accordion-item expanded">
        <button class="kwami-accordion-header">
          <span>Section 1</span>
          <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon>
        </button>
        <div class="kwami-accordion-content">
          <div class="kwami-accordion-body">
            Content for section 1
          </div>
        </div>
      </div>
      <div class="kwami-accordion-item">
        <button class="kwami-accordion-header">
          <span>Section 2</span>
          <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon>
        </button>
        <div class="kwami-accordion-content">
          <div class="kwami-accordion-body">
            Content for section 2
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initAccordion(container: HTMLElement): void {
  const accordions = container.querySelectorAll('.kwami-accordion');
  
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.kwami-accordion-item');
    
    items.forEach(item => {
      const header = item.querySelector('.kwami-accordion-header');
      const content = item.querySelector('.kwami-accordion-content') as HTMLElement;
      const body = item.querySelector('.kwami-accordion-body') as HTMLElement;
      
      if (!header || !content || !body) return;
      
      // Set initial height for expanded items
      if (item.classList.contains('expanded')) {
        content.style.maxHeight = `${body.offsetHeight}px`;
      }
      
      header.addEventListener('click', () => {
        const isExpanded = item.classList.contains('expanded');
        
        // Toggle this item
        if (isExpanded) {
          content.style.maxHeight = '0';
          item.classList.remove('expanded');
        } else {
          content.style.maxHeight = `${body.offsetHeight}px`;
          item.classList.add('expanded');
        }
        
        // Dispatch event
        accordion.dispatchEvent(new CustomEvent('accordionchange', {
          detail: { 
            item: item,
            expanded: !isExpanded 
          },
          bubbles: true
        }));
      });
    });
  });
}
