import './Tabs.css'

export function Tabs(): string {
  return `
    <div class="kwami-tabs">
      <div class="kwami-tabs-list" role="tablist">
        <button class="kwami-tab active" role="tab" data-tab="tab1" aria-selected="true">Tab 1</button>
        <button class="kwami-tab" role="tab" data-tab="tab2" aria-selected="false">Tab 2</button>
        <button class="kwami-tab" role="tab" data-tab="tab3" aria-selected="false">Tab 3</button>
        <div class="kwami-tabs-indicator"></div>
      </div>
      <div class="kwami-tabs-content">
        <div class="kwami-tab-panel active" data-panel="tab1" role="tabpanel">
          <span>Content 1</span>
        </div>
        <div class="kwami-tab-panel" data-panel="tab2" role="tabpanel">
          <span>Content 2</span>
        </div>
        <div class="kwami-tab-panel" data-panel="tab3" role="tabpanel">
          <span>Content 3</span>
        </div>
      </div>
    </div>
  `;
}

export function initTabs(container: HTMLElement): void {
  const tabsContainers = container.querySelectorAll('.kwami-tabs');
  
  tabsContainers.forEach(tabs => {
    const tabButtons = tabs.querySelectorAll('.kwami-tab');
    const panels = tabs.querySelectorAll('.kwami-tab-panel');
    const indicator = tabs.querySelector('.kwami-tabs-indicator') as HTMLElement;
    
    if (!indicator) return;
    
    const updateIndicator = (activeTab: HTMLElement) => {
      const tabsList = tabs.querySelector('.kwami-tabs-list') as HTMLElement;
      const listRect = tabsList.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      
      indicator.style.width = `${tabRect.width}px`;
      indicator.style.left = `${tabRect.left - listRect.left}px`;
    };
    
    const activateTab = (tabId: string) => {
      // Update tabs
      tabButtons.forEach(tab => {
        const isActive = tab.getAttribute('data-tab') === tabId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        
        if (isActive) {
          updateIndicator(tab as HTMLElement);
        }
      });
      
      // Update panels
      panels.forEach(panel => {
        const isActive = panel.getAttribute('data-panel') === tabId;
        panel.classList.toggle('active', isActive);
      });
      
      // Dispatch event
      tabs.dispatchEvent(new CustomEvent('tabchange', {
        detail: { tabId },
        bubbles: true
      }));
    };
    
    tabButtons.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        if (tabId) activateTab(tabId);
      });
    });
    
    // Initialize indicator position
    const activeTab = tabs.querySelector('.kwami-tab.active') as HTMLElement;
    if (activeTab) {
      // Delay to ensure layout is ready
      requestAnimationFrame(() => updateIndicator(activeTab));
    }
    
    // Update indicator on resize
    window.addEventListener('resize', () => {
      const currentActive = tabs.querySelector('.kwami-tab.active') as HTMLElement;
      if (currentActive) updateIndicator(currentActive);
    });
  });
}
