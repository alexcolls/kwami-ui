/**
 * Button Documentation Panel - Demo with live examples and code snippets
 * Shows developer API documentation with interactive examples
 */

import { Button, ButtonConfigurator } from '@kwami/ui';
import { CodeBlock } from '../CodeBlock/CodeBlock';

export interface ButtonDocsProps {
  onExampleClick?: (example: string) => void;
}

// Code examples
const CODE_EXAMPLES = {
  basic: `import { Button } from '@kwami/ui';

// Create a button instance
const button = new Button({
    label: 'Click Me',
    onClick: (e) => console.log('Clicked!', e)
});

// Mount to DOM
const container = document.getElementById('app');
button.mount(container);`,

  variants: `// Different visual styles
new Button({ label: 'DEFAULT', variant: 'default' });
new Button({ label: 'PRIMARY', variant: 'primary' });
new Button({ label: 'DANGER', variant: 'danger' });
new Button({ label: 'GHOST', variant: 'ghost' });
new Button({ label: 'OUTLINE', variant: 'outline' });`,

  sizes: `// Size variants
new Button({ label: 'SMALL', size: 'sm' });
new Button({ label: 'MEDIUM', size: 'md' });  // default
new Button({ label: 'LARGE', size: 'lg' });`,

  icons: `// With icons (uses Iconify)
new Button({ 
    label: 'SAVE', 
    icon: 'solar:diskette-bold',
    iconPosition: 'left'  // 'left' | 'right'
});

// Icon-only button
new Button({ 
    label: '', 
    icon: 'solar:heart-bold'
});`,

  states: `// Disabled button
const disabledBtn = new Button({ 
    label: 'DISABLED', 
    disabled: true 
});

// Loading state
const loadingBtn = new Button({ 
    label: 'SAVING', 
    loading: true 
});

// Toggle loading programmatically
loadingBtn.setLoading(true);
loadingBtn.setLoading(false);`,

  events: `// Handle click events
const btn = new Button({
    label: 'SUBMIT',
    type: 'submit',
    onClick: (event) => {
        event.preventDefault();
        console.log('Form submitted!');
    }
});

// Listen to custom event
btn.element?.addEventListener('buttonclick', (e) => {
    console.log('Button clicked:', e.detail);
});`,

  configurator: `import { ButtonConfigurator } from '@kwami/ui';

// Create a button configurator
const configurator = new ButtonConfigurator({
    showControls: true,
    onChange: (config) => {
        console.log('Config changed:', config);
    }
});

// Mount to DOM
configurator.mount(document.getElementById('app'));

// Get current configuration
const config = configurator.getConfiguration();`,
};

export class ButtonDocs {
  private examples: Map<string, Button> = new Map();
  private codeBlocks: Map<string, CodeBlock> = new Map();
  private configurator: ButtonConfigurator | null = null;

  constructor(_props: ButtonDocsProps = {}) {
    // Props reserved for future use
  }

  render(): string {
    // Create example buttons
    const defaultBtn = new Button({ label: 'DEFAULT' });
    const primaryBtn = new Button({ label: 'PRIMARY', variant: 'primary' });
    const dangerBtn = new Button({ label: 'DANGER', variant: 'danger' });
    const ghostBtn = new Button({ label: 'GHOST', variant: 'ghost' });
    const outlineBtn = new Button({ label: 'OUTLINE', variant: 'outline' });

    const smBtn = new Button({ label: 'SMALL', size: 'sm' });
    const mdBtn = new Button({ label: 'MEDIUM', size: 'md' });
    const lgBtn = new Button({ label: 'LARGE', size: 'lg' });

    const iconLeftBtn = new Button({
      label: 'SAVE',
      icon: 'solar:diskette-bold',
      iconPosition: 'left',
    });
    const iconRightBtn = new Button({
      label: 'NEXT',
      icon: 'solar:arrow-right-bold',
      iconPosition: 'right',
    });
    const iconOnlyBtn = new Button({ label: '', icon: 'solar:heart-bold', variant: 'primary' });

    const disabledBtn = new Button({ label: 'DISABLED', disabled: true });
    const loadingBtn = new Button({ label: 'LOADING', loading: true, variant: 'primary' });

    // Store for hydration
    this.examples.set('default', defaultBtn);
    this.examples.set('primary', primaryBtn);
    this.examples.set('danger', dangerBtn);
    this.examples.set('ghost', ghostBtn);
    this.examples.set('outline', outlineBtn);
    this.examples.set('sm', smBtn);
    this.examples.set('md', mdBtn);
    this.examples.set('lg', lgBtn);
    this.examples.set('icon-left', iconLeftBtn);
    this.examples.set('icon-right', iconRightBtn);
    this.examples.set('icon-only', iconOnlyBtn);
    this.examples.set('disabled', disabledBtn);
    this.examples.set('loading', loadingBtn);

    // Create configurator
    this.configurator = new ButtonConfigurator({ showControls: true });

    // Create code blocks
    const basicCodeBlock = new CodeBlock({ code: CODE_EXAMPLES.basic, title: 'Basic Usage' });
    const variantsCodeBlock = new CodeBlock({ code: CODE_EXAMPLES.variants, title: 'Variants' });
    const sizesCodeBlock = new CodeBlock({ code: CODE_EXAMPLES.sizes, title: 'Sizes' });
    const iconsCodeBlock = new CodeBlock({ code: CODE_EXAMPLES.icons, title: 'Icons' });
    const statesCodeBlock = new CodeBlock({ code: CODE_EXAMPLES.states, title: 'States' });
    const eventsCodeBlock = new CodeBlock({ code: CODE_EXAMPLES.events, title: 'Events' });
    const configuratorCodeBlock = new CodeBlock({
      code: CODE_EXAMPLES.configurator,
      title: 'ButtonConfigurator',
    });

    this.codeBlocks.set('basic', basicCodeBlock);
    this.codeBlocks.set('variants', variantsCodeBlock);
    this.codeBlocks.set('sizes', sizesCodeBlock);
    this.codeBlocks.set('icons', iconsCodeBlock);
    this.codeBlocks.set('states', statesCodeBlock);
    this.codeBlocks.set('events', eventsCodeBlock);
    this.codeBlocks.set('configurator', configuratorCodeBlock);

    return `
            <div class="kwami-button-docs">
                <!-- =============================================
                     BUTTON COMPONENT SECTION
                     ============================================= -->
                <div class="kwami-docs-section">
                    <h3 class="kwami-docs-title">Button Component</h3>
                    <p class="kwami-docs-desc">A versatile, neumorphic button component with multiple variants, sizes, and interactive features.</p>
                </div>

                <!-- Quick Start -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:bolt-linear" width="14" height="14"></iconify-icon>
                        Quick Start
                    </h4>
                    <div class="kwami-docs-code" data-code="basic">${basicCodeBlock.render()}</div>
                </div>

                <!-- Variants -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <span class="kwami-docs-prop">variant</span>
                        <code class="kwami-docs-type">'default' | 'primary' | 'danger' | 'ghost' | 'outline'</code>
                    </h4>
                    <div class="kwami-docs-examples kwami-docs-examples--row">
                        <div class="kwami-docs-example" data-example="default">${defaultBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="primary">${primaryBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="danger">${dangerBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="ghost">${ghostBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="outline">${outlineBtn.render()}</div>
                    </div>
                    <div class="kwami-docs-code" data-code="variants">${variantsCodeBlock.render()}</div>
                </div>

                <!-- Sizes -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <span class="kwami-docs-prop">size</span>
                        <code class="kwami-docs-type">'sm' | 'md' | 'lg'</code>
                    </h4>
                    <div class="kwami-docs-examples kwami-docs-examples--row kwami-docs-examples--align-end">
                        <div class="kwami-docs-example" data-example="sm">${smBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="md">${mdBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="lg">${lgBtn.render()}</div>
                    </div>
                    <div class="kwami-docs-code" data-code="sizes">${sizesCodeBlock.render()}</div>
                </div>

                <!-- Icons -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <span class="kwami-docs-prop">icon</span> + <span class="kwami-docs-prop">iconPosition</span>
                        <code class="kwami-docs-type">'left' | 'right'</code>
                    </h4>
                    <div class="kwami-docs-examples kwami-docs-examples--row">
                        <div class="kwami-docs-example" data-example="icon-left">${iconLeftBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="icon-right">${iconRightBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="icon-only">${iconOnlyBtn.render()}</div>
                    </div>
                    <div class="kwami-docs-code" data-code="icons">${iconsCodeBlock.render()}</div>
                </div>

                <!-- States -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <span class="kwami-docs-prop">disabled</span> / <span class="kwami-docs-prop">loading</span>
                        <code class="kwami-docs-type">boolean</code>
                    </h4>
                    <div class="kwami-docs-examples kwami-docs-examples--row">
                        <div class="kwami-docs-example" data-example="disabled">${disabledBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="loading">${loadingBtn.render()}</div>
                    </div>
                    <div class="kwami-docs-code" data-code="states">${statesCodeBlock.render()}</div>
                </div>

                <!-- Events -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:bolt-circle-linear" width="14" height="14"></iconify-icon>
                        Event Handling
                    </h4>
                    <div class="kwami-docs-code" data-code="events">${eventsCodeBlock.render()}</div>
                </div>

                <!-- Props Table -->
                <div class="kwami-docs-section kwami-docs-section--table">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:document-text-linear" width="14" height="14"></iconify-icon>
                        All Props
                    </h4>
                    <div class="kwami-docs-table-wrap">
                        <table class="kwami-docs-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>label</code></td>
                                    <td><code>string</code></td>
                                    <td><code>'CLICK'</code></td>
                                    <td>Button text content</td>
                                </tr>
                                <tr>
                                    <td><code>variant</code></td>
                                    <td><code>'default' | 'primary' | 'danger' | 'ghost' | 'outline'</code></td>
                                    <td><code>'default'</code></td>
                                    <td>Visual style variant</td>
                                </tr>
                                <tr>
                                    <td><code>size</code></td>
                                    <td><code>'sm' | 'md' | 'lg'</code></td>
                                    <td><code>'md'</code></td>
                                    <td>Button size</td>
                                </tr>
                                <tr>
                                    <td><code>disabled</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Disable interactions</td>
                                </tr>
                                <tr>
                                    <td><code>loading</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Show loading spinner</td>
                                </tr>
                                <tr>
                                    <td><code>icon</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Iconify icon name</td>
                                </tr>
                                <tr>
                                    <td><code>iconPosition</code></td>
                                    <td><code>'left' | 'right'</code></td>
                                    <td><code>'left'</code></td>
                                    <td>Icon placement</td>
                                </tr>
                                <tr>
                                    <td><code>fullWidth</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Expand to container width</td>
                                </tr>
                                <tr>
                                    <td><code>type</code></td>
                                    <td><code>'button' | 'submit' | 'reset'</code></td>
                                    <td><code>'button'</code></td>
                                    <td>HTML button type</td>
                                </tr>
                                <tr>
                                    <td><code>onClick</code></td>
                                    <td><code>(e: MouseEvent) => void</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Click handler</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Methods -->
                <div class="kwami-docs-section kwami-docs-section--table">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:code-linear" width="14" height="14"></iconify-icon>
                        Methods
                    </h4>
                    <div class="kwami-docs-table-wrap">
                        <table class="kwami-docs-table">
                            <thead>
                                <tr>
                                    <th>Method</th>
                                    <th>Parameters</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>setDisabled()</code></td>
                                    <td><code>disabled: boolean</code></td>
                                    <td>Enable or disable the button</td>
                                </tr>
                                <tr>
                                    <td><code>setLoading()</code></td>
                                    <td><code>loading: boolean</code></td>
                                    <td>Set loading state with spinner</td>
                                </tr>
                                <tr>
                                    <td><code>setLabel()</code></td>
                                    <td><code>label: string</code></td>
                                    <td>Update button text</td>
                                </tr>
                                <tr>
                                    <td><code>mount()</code></td>
                                    <td><code>container: HTMLElement</code></td>
                                    <td>Render and hydrate in container</td>
                                </tr>
                                <tr>
                                    <td><code>destroy()</code></td>
                                    <td>—</td>
                                    <td>Clean up event listeners</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- =============================================
                     SECTION DIVIDER
                     ============================================= -->
                <div class="kwami-docs-divider">
                    <span class="kwami-docs-divider-text">Optional Component</span>
                </div>

                <!-- =============================================
                     BUTTON CONFIGURATOR SECTION
                     ============================================= -->
                <div class="kwami-docs-section kwami-docs-section--new-component">
                    <h3 class="kwami-docs-title">
                        <iconify-icon icon="solar:settings-linear" width="18" height="18"></iconify-icon>
                        ButtonConfigurator
                    </h3>
                    <p class="kwami-docs-desc">An optional companion component that allows end-users to customize button styles interactively. Perfect for apps that want to give users control over their UI appearance.</p>
                    <span class="kwami-docs-badge">Optional</span>
                </div>

                <!-- Live Preview -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:play-circle-linear" width="14" height="14"></iconify-icon>
                        Live Preview
                    </h4>
                    <div class="kwami-docs-configurator-preview" data-configurator>
                        ${this.configurator.render()}
                    </div>
                </div>

                <!-- Configurator Usage -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:code-linear" width="14" height="14"></iconify-icon>
                        Usage
                    </h4>
                    <div class="kwami-docs-code" data-code="configurator">${configuratorCodeBlock.render()}</div>
                </div>

                <!-- Configurator Props -->
                <div class="kwami-docs-section kwami-docs-section--table">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:document-text-linear" width="14" height="14"></iconify-icon>
                        Configurator Props
                    </h4>
                    <div class="kwami-docs-table-wrap">
                        <table class="kwami-docs-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>initialConfig</code></td>
                                    <td><code>Partial&lt;ButtonConfiguration&gt;</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Initial button configuration</td>
                                </tr>
                                <tr>
                                    <td><code>onChange</code></td>
                                    <td><code>(config) => void</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Callback when config changes</td>
                                </tr>
                                <tr>
                                    <td><code>showControls</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>true</code></td>
                                    <td>Show/hide control panels</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
  }

  hydrate(element: HTMLElement): void {
    // Hydrate all example buttons
    this.examples.forEach((btn, key) => {
      const container = element.querySelector(`[data-example="${key}"] .kwami-button-bezel`);
      if (container) {
        btn.hydrate(container as HTMLElement);
      }
    });

    // Hydrate the configurator
    if (this.configurator) {
      const configContainer = element.querySelector(
        '[data-configurator] .kwami-button-configurator'
      );
      if (configContainer) {
        this.configurator.hydrate(configContainer as HTMLElement);
      }
    }

    // Hydrate all code blocks
    this.codeBlocks.forEach((block, key) => {
      const container = element.querySelector(`[data-code="${key}"] .kwami-code-block`);
      if (container) {
        block.hydrate(container as HTMLElement);
      }
    });
  }

  destroy(): void {
    this.examples.forEach((btn) => btn.destroy());
    this.examples.clear();
    this.configurator?.destroy();
    this.configurator = null;
    this.codeBlocks.forEach((block) => block.destroy());
    this.codeBlocks.clear();
  }
}
