interface EventListenerEntry {
  el: Element;
  type: string;
  handler: EventListener;
}

/**
 * Base abstract class for all UI components.
 * @template P The type of the properties object.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export abstract class Component<P = {}> {
  private static counter = 0;

  /** Unique identifier for this component instance */
  protected readonly id: string;
  protected props: P;
  protected element: HTMLElement | null = null;
  private listeners: EventListenerEntry[] = [];

  constructor(props: P) {
    this.props = props;
    this.id = `kwami-${++Component.counter}`;
  }

  /**
   * Generates the HTML string for the component.
   * @returns The HTML string.
   */
  abstract render(): string;

  /**
   * Convenience method to render HTML and hydrate in one step.
   * Renders the component into the container and attaches event listeners.
   * @param container The container element to mount into.
   * @returns The root element of the component.
   */
  mount(container: HTMLElement): HTMLElement {
    container.innerHTML = this.render();
    const el = container.firstElementChild as HTMLElement;
    this.hydrate(el);
    return el;
  }

  /**
   * Attaches event listeners and initializes behavior for the component.
   * This method should be called after the component's HTML has been inserted into the DOM.
   * @param element The root element of the component.
   */
  hydrate(element: HTMLElement): void {
    this.element = element;
    this.element.setAttribute('data-kwami-id', this.id);
    this.onHydrate();
  }

  /**
   * Lifecycle method called during hydration.
   * Override this to attach event listeners.
   */
  protected onHydrate(): void {}

  /**
   * Helper method to add event listeners with automatic cleanup tracking.
   * Use this instead of direct addEventListener calls.
   * @param el The element to attach the listener to.
   * @param type The event type (e.g., 'click', 'input').
   * @param handler The event handler function.
   */
  protected addListener(el: Element, type: string, handler: EventListener): void {
    el.addEventListener(type, handler);
    this.listeners.push({ el, type, handler });
  }

  /**
   * Cleans up the component by removing all event listeners and references.
   * Call this before removing the component from the DOM to prevent memory leaks.
   */
  destroy(): void {
    this.listeners.forEach(({ el, type, handler }) => {
      el.removeEventListener(type, handler);
    });
    this.listeners = [];
    this.element = null;
  }

  /**
   * Updates the component's properties and re-renders if necessary.
   * Note: This is a simple implementation and might require full re-hydration depending on usage.
   * @param newProps Partial properties to update.
   */
  update(newProps: Partial<P>): void {
    this.props = { ...this.props, ...newProps };
    // In a full framework, this would trigger a re-render.
    // For this lightweight library, it updates state for future renders.
  }
}
