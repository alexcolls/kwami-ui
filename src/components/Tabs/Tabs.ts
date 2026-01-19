import { Component } from '../../core/Component';
import './Tabs.css';

export interface TabItem {
  /** Unique ID for the tab */
  id: string;
  /** Tab label */
  label: string;
  /** Tab content */
  content: string;
}

export interface TabsProps {
  /** Array of tab items */
  tabs?: TabItem[];
  /** Initially active tab ID */
  activeTab?: string;
  /** Callback when tab changes */
  onChange?: (tabId: string) => void;
  /** Additional CSS class */
  className?: string;
}

const defaultTabs: TabItem[] = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content 3' },
];

export class Tabs extends Component<TabsProps> {
  private tabs: TabItem[];
  private activeTabId: string;

  // DOM references
  private indicator: HTMLElement | null = null;
  private tabButtons: NodeListOf<HTMLButtonElement> | null = null;
  private panels: NodeListOf<HTMLElement> | null = null;

  constructor(props: TabsProps = {}) {
    super(props);
    this.tabs = props.tabs || defaultTabs;
    this.activeTabId = props.activeTab || this.tabs[0]?.id || '';
  }

  render(): string {
    const { className = '' } = this.props;

    const tabButtons = this.tabs
      .map(
        (tab) => `
   <button 
    class="kwami-tab${tab.id === this.activeTabId ? ' active' : ''}" 
    role="tab" 
    data-tab="${tab.id}" 
    aria-selected="${tab.id === this.activeTabId}"
   >${tab.label}</button>
        `
      )
      .join('');

    const panels = this.tabs
      .map(
        (tab) => `
   <div 
    class="kwami-tab-panel${tab.id === this.activeTabId ? ' active' : ''}" 
    data-panel="${tab.id}" 
    role="tabpanel"
   >
    <span>${tab.content}</span>
   </div>
        `
      )
      .join('');

    return `
   <div class="kwami-tabs ${className}" data-kwami-id="${this.id}">
    <div class="kwami-tabs-list" role="tablist">
     ${tabButtons}
     <div class="kwami-tabs-indicator"></div>
    </div>
    <div class="kwami-tabs-content">
     ${panels}
    </div>
   </div>
        `;
  }

  protected onHydrate(): void {
    if (!this.element) return;

    this.indicator = this.element.querySelector('.kwami-tabs-indicator');
    this.tabButtons = this.element.querySelectorAll('.kwami-tab');
    this.panels = this.element.querySelectorAll('.kwami-tab-panel');

    if (!this.indicator || !this.tabButtons || !this.panels) return;

    // Attach click listeners to tabs
    this.tabButtons.forEach((tab) => {
      this.addListener(tab, 'click', () => {
        const tabId = tab.getAttribute('data-tab');
        if (tabId) this.activateTab(tabId);
      });
    });

    // Initialize indicator position
    requestAnimationFrame(() => this.updateIndicator());

    // Update indicator on resize
    this.addListener(window as unknown as Element, 'resize', () => {
      this.updateIndicator();
    });
  }

  private updateIndicator(): void {
    if (!this.indicator || !this.element) return;

    const activeTab = this.element.querySelector('.kwami-tab.active') as HTMLElement;
    if (!activeTab) return;

    const tabsList = this.element.querySelector('.kwami-tabs-list') as HTMLElement;
    if (!tabsList) return;

    const listRect = tabsList.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    this.indicator.style.width = `${tabRect.width}px`;
    this.indicator.style.left = `${tabRect.left - listRect.left}px`;
  }

  private activateTab(tabId: string): void {
    if (!this.tabButtons || !this.panels) return;

    this.activeTabId = tabId;

    // Update tabs
    this.tabButtons.forEach((tab) => {
      const isActive = tab.getAttribute('data-tab') === tabId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    // Update panels
    this.panels.forEach((panel) => {
      const isActive = panel.getAttribute('data-panel') === tabId;
      panel.classList.toggle('active', isActive);
    });

    // Update indicator
    this.updateIndicator();

    // Dispatch event
    this.element?.dispatchEvent(
      new CustomEvent('tabchange', {
        detail: { tabId },
        bubbles: true,
      })
    );

    // Call onChange callback
    if (this.props.onChange) {
      this.props.onChange(tabId);
    }
  }

  /** Set active tab by ID */
  setActiveTab(tabId: string): void {
    if (this.tabs.some((t) => t.id === tabId)) {
      this.activateTab(tabId);
    }
  }

  /** Get current active tab ID */
  getActiveTab(): string {
    return this.activeTabId;
  }
}
