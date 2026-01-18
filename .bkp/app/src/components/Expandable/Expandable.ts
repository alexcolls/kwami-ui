import './Expandable.css'
import 'iconify-icon'
import { Title } from '../Title/Title'

interface ExpandableProps {
  title: string;
  content: string;
  id: string;
}

export function Expandable({ title, content, id }: ExpandableProps): string {
  return `
    <div class="kwami-expandable-placeholder" data-placeholder-for="${id}"></div>
    <div class="kwami-expandable" data-expandable-id="${id}">
      <div class="kwami-expandable-inner">
        <button class="kwami-expandable-btn" aria-label="Expand" title="Expand">
          <iconify-icon class="kwami-expandable-icon-expand" icon="solar:maximize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
          <iconify-icon class="kwami-expandable-icon-minimize" icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
        </button>
        <div class="kwami-expandable-title">${Title(title)}</div>
        <div class="kwami-expandable-content" data-component="${id}">
          ${content}
        </div>
      </div>
    </div>
    <div class="kwami-expandable-overlay" data-overlay-for="${id}"></div>
  `;
}

export function initExpandable(container: HTMLElement): void {
  const expandables = container.querySelectorAll('.kwami-expandable');
  
  expandables.forEach(expandable => {
    const btn = expandable.querySelector('.kwami-expandable-btn');
    const id = expandable.getAttribute('data-expandable-id');
    const overlay = container.querySelector(`[data-overlay-for="${id}"]`);
    const placeholder = container.querySelector(`[data-placeholder-for="${id}"]`);
    
    if (!btn || !overlay || !placeholder) return;
    
    let isExpanded = false;
    let isAnimating = false;
    
    const expand = () => {
      if (isAnimating) return;
      isAnimating = true;
      
      const el = expandable as HTMLElement;
      const rect = el.getBoundingClientRect();
      
      // Store original position
      el.style.setProperty('--start-x', `${rect.left}px`);
      el.style.setProperty('--start-y', `${rect.top}px`);
      el.style.setProperty('--start-width', `${rect.width}px`);
      el.style.setProperty('--start-height', `${rect.height}px`);
      
      // Activate placeholder to maintain grid space
      placeholder.classList.add('active');
      
      // Start expanding animation
      el.classList.add('expanding');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-label', 'Minimize');
      btn.setAttribute('title', 'Minimize');
      
      // After animation completes, switch to expanded state
      el.addEventListener('animationend', function onExpanded() {
        el.removeEventListener('animationend', onExpanded);
        el.classList.remove('expanding');
        el.classList.add('expanded');
        isExpanded = true;
        isAnimating = false;
      }, { once: true });
    };
    
    const collapse = () => {
      if (isAnimating) return;
      isAnimating = true;
      
      const el = expandable as HTMLElement;
      
      // Update position in case window was resized
      const placeholderRect = placeholder.getBoundingClientRect();
      el.style.setProperty('--start-x', `${placeholderRect.left}px`);
      el.style.setProperty('--start-y', `${placeholderRect.top}px`);
      el.style.setProperty('--start-width', `${placeholderRect.width}px`);
      el.style.setProperty('--start-height', `${placeholderRect.height}px`);
      
      // Start collapsing animation
      el.classList.remove('expanded');
      el.classList.add('collapsing');
      overlay.classList.remove('active');
      
      btn.setAttribute('aria-label', 'Expand');
      btn.setAttribute('title', 'Expand');
      
      // After animation completes, restore normal state
      el.addEventListener('animationend', function onCollapsed() {
        el.removeEventListener('animationend', onCollapsed);
        el.classList.remove('collapsing');
        placeholder.classList.remove('active');
        document.body.style.overflow = '';
        isExpanded = false;
        isAnimating = false;
      }, { once: true });
    };
    
    const toggle = () => {
      if (isExpanded) {
        collapse();
      } else {
        expand();
      }
    };
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    
    overlay.addEventListener('click', () => {
      if (isExpanded && !isAnimating) collapse();
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isExpanded && !isAnimating) {
        collapse();
      }
    });
  });
}
