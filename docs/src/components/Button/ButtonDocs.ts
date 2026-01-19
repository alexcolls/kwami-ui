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
    variant: 'primary',
    onClick: (e) => console.log('Clicked!', e)
});

// Mount to DOM
const container = document.getElementById('app');
button.mount(container);`,

  variants: `// Button style variants
new Button({ label: 'PRIMARY', variant: 'primary' });   // Accent color, main actions
new Button({ label: 'SECONDARY', variant: 'secondary' }); // Neutral, secondary actions
new Button({ label: 'DANGER', variant: 'danger' });      // Destructive actions
new Button({ icon: 'solar:heart-bold', variant: 'mini' }); // Compact icon-only`,

  sizes: `// Size variants (sm, md, lg)
new Button({ label: 'SMALL', size: 'sm', variant: 'primary' });
new Button({ label: 'MEDIUM', size: 'md', variant: 'primary' });  // default
new Button({ label: 'LARGE', size: 'lg', variant: 'primary' });`,

  icons: `// With icons (uses Iconify)
new Button({ 
    label: 'SAVE', 
    icon: 'solar:diskette-bold',
    iconPosition: 'left',  // 'left' | 'right'
    variant: 'primary'
});

// Mini variant - icon-only compact button
new Button({ 
    icon: 'solar:heart-bold',
    variant: 'mini',
    label: 'Like'  // Used for aria-label
});`,

  states: `// Disabled button
const disabledBtn = new Button({ 
    label: 'DISABLED', 
    disabled: true,
    variant: 'secondary'
});

// Loading state with spinner
const loadingBtn = new Button({ 
    label: 'SAVING', 
    loading: true,
    variant: 'primary'
});

// Toggle states programmatically
loadingBtn.setLoading(true);
loadingBtn.setDisabled(false);`,

  events: `// Handle click events
const btn = new Button({
    label: 'SUBMIT',
    type: 'submit',
    variant: 'primary',
    onClick: (event) => {
        event.preventDefault();
        console.log('Form submitted!');
    }
});

// Listen to custom event
btn.element?.addEventListener('buttonclick', (e) => {
    console.log('Button clicked:', e.detail);
});`,

  cssCustomization: `/* Override CSS custom properties for complete control */

/* Custom Primary Button */
.my-custom-btn .kwami-button-bezel {
    --kwami-btn-bezel-bg: linear-gradient(145deg, #7c3aed, #5b21b6);
    --kwami-btn-bezel-shadow: 0 4px 20px rgba(124, 58, 237, 0.4);
}

.my-custom-btn .kwami-button-face {
    --kwami-btn-face-bg: linear-gradient(165deg, #a78bfa, #8b5cf6, #7c3aed);
    --kwami-btn-face-shadow: 0 6px 24px rgba(139, 92, 246, 0.5);
    --kwami-btn-text-color: #faf5ff;
}

.my-custom-btn .kwami-button-highlight {
    --kwami-btn-highlight-bg: linear-gradient(180deg, 
        rgba(255,255,255,0.4) 0%, transparent 100%);
}

/* Flat/Minimal Style */
.flat-btn .kwami-button-bezel {
    --kwami-btn-bezel-bg: transparent;
    --kwami-btn-bezel-shadow: none;
    --kwami-btn-bezel-padding: 0;
}

.flat-btn .kwami-button-face {
    --kwami-btn-face-bg: #3b82f6;
    --kwami-btn-face-shadow: none;
    --kwami-btn-face-radius: 8px;
    --kwami-btn-text-color: white;
}

.flat-btn .kwami-button-highlight {
    display: none;
}`,

  cssVariablesRef: `/* Complete CSS Custom Properties Reference */

/* BEZEL (outer frame) */
--kwami-btn-bezel-bg          /* Background gradient/color */
--kwami-btn-bezel-radius      /* Border radius */
--kwami-btn-bezel-padding     /* Padding around button face */
--kwami-btn-bezel-shadow      /* Box shadow */

/* FACE (button surface) */
--kwami-btn-face-bg           /* Background gradient/color */
--kwami-btn-face-radius       /* Border radius */
--kwami-btn-face-shadow       /* Box shadow */
--kwami-btn-face-border       /* Border style */

/* TEXT */
--kwami-btn-text-color        /* Text color */
--kwami-btn-text-size         /* Font size */
--kwami-btn-text-weight       /* Font weight */
--kwami-btn-text-spacing      /* Letter spacing */
--kwami-btn-text-shadow       /* Text shadow */
--kwami-btn-text-transform    /* Text transform */

/* ICON */
--kwami-btn-icon-color        /* Icon color */
--kwami-btn-icon-size         /* Icon dimensions */
--kwami-btn-icon-gap          /* Gap between icon and text */

/* HIGHLIGHT (glass effect) */
--kwami-btn-highlight-bg      /* Highlight gradient */
--kwami-btn-highlight-height  /* Height of effect */

/* DIMENSIONS */
--kwami-btn-min-width         /* Minimum width */
--kwami-btn-height            /* Button height */
--kwami-btn-padding-x         /* Horizontal padding */

/* TRANSITIONS */
--kwami-btn-transition        /* Transition timing */`,

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
    // Create example buttons - Variants
    const primaryBtn = new Button({ label: 'PRIMARY', variant: 'primary' });
    const secondaryBtn = new Button({ label: 'SECONDARY', variant: 'secondary' });
    const dangerBtn = new Button({ label: 'DANGER', variant: 'danger' });
    const miniBtn = new Button({ label: 'Like', icon: 'solar:heart-bold', variant: 'mini' });
    const miniBtn2 = new Button({
      label: 'Settings',
      icon: 'solar:settings-bold',
      variant: 'mini',
    });
    const miniBtn3 = new Button({ label: 'Add', icon: 'solar:add-circle-bold', variant: 'mini' });

    // Size variants
    const smBtn = new Button({ label: 'SMALL', size: 'sm', variant: 'primary' });
    const mdBtn = new Button({ label: 'MEDIUM', size: 'md', variant: 'primary' });
    const lgBtn = new Button({ label: 'LARGE', size: 'lg', variant: 'primary' });

    // With icons
    const iconLeftBtn = new Button({
      label: 'SAVE',
      icon: 'solar:diskette-bold',
      iconPosition: 'left',
      variant: 'primary',
    });
    const iconRightBtn = new Button({
      label: 'NEXT',
      icon: 'solar:arrow-right-bold',
      iconPosition: 'right',
      variant: 'secondary',
    });

    // States
    const disabledBtn = new Button({ label: 'DISABLED', disabled: true, variant: 'secondary' });
    const loadingBtn = new Button({ label: 'LOADING', loading: true, variant: 'primary' });

    // Store for hydration
    this.examples.set('primary', primaryBtn);
    this.examples.set('secondary', secondaryBtn);
    this.examples.set('danger', dangerBtn);
    this.examples.set('mini', miniBtn);
    this.examples.set('mini2', miniBtn2);
    this.examples.set('mini3', miniBtn3);
    this.examples.set('sm', smBtn);
    this.examples.set('md', mdBtn);
    this.examples.set('lg', lgBtn);
    this.examples.set('icon-left', iconLeftBtn);
    this.examples.set('icon-right', iconRightBtn);
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
    const cssCustomCodeBlock = new CodeBlock({
      code: CODE_EXAMPLES.cssCustomization,
      title: 'CSS Customization Examples',
    });
    const cssVarsCodeBlock = new CodeBlock({
      code: CODE_EXAMPLES.cssVariablesRef,
      title: 'CSS Variables Reference',
    });
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
    this.codeBlocks.set('cssCustom', cssCustomCodeBlock);
    this.codeBlocks.set('cssVars', cssVarsCodeBlock);
    this.codeBlocks.set('configurator', configuratorCodeBlock);

    return `
            <div class="kwami-button-docs">
                <!-- =============================================
                     BUTTON COMPONENT SECTION
                     ============================================= -->
                <div class="kwami-docs-section">
                    <h3 class="kwami-docs-title">Button Component</h3>
                    <p class="kwami-docs-desc">A versatile, neumorphic button component with four distinct variants: <strong>primary</strong> for main actions, <strong>secondary</strong> for neutral actions, <strong>danger</strong> for destructive operations, and <strong>mini</strong> for compact icon-only buttons.</p>
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
                        <code class="kwami-docs-type">'primary' | 'secondary' | 'danger' | 'mini'</code>
                    </h4>
                    <div class="kwami-docs-examples kwami-docs-examples--row">
                        <div class="kwami-docs-example" data-example="primary">${primaryBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="secondary">${secondaryBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="danger">${dangerBtn.render()}</div>
                    </div>
                    <p class="kwami-docs-hint">
                        <iconify-icon icon="solar:info-circle-linear" width="12" height="12"></iconify-icon>
                        Mini variant is a compact icon-only button:
                    </p>
                    <div class="kwami-docs-examples kwami-docs-examples--row kwami-docs-examples--mini">
                        <div class="kwami-docs-example" data-example="mini">${miniBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="mini2">${miniBtn2.render()}</div>
                        <div class="kwami-docs-example" data-example="mini3">${miniBtn3.render()}</div>
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

                <!-- =============================================
                     CSS CUSTOMIZATION SECTION
                     ============================================= -->
                <div class="kwami-docs-divider">
                    <span class="kwami-docs-divider-text">Style Customization</span>
                </div>

                <div class="kwami-docs-section">
                    <h3 class="kwami-docs-title">
                        <iconify-icon icon="solar:palette-linear" width="18" height="18"></iconify-icon>
                        Full CSS Control
                    </h3>
                    <p class="kwami-docs-desc">Every visual aspect of the Button component can be customized via CSS custom properties. Override these variables in your own CSS to create completely unique button styles while keeping all the interactive functionality.</p>
                </div>

                <!-- CSS Customization Examples -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:code-linear" width="14" height="14"></iconify-icon>
                        Customization Examples
                    </h4>
                    <div class="kwami-docs-code" data-code="cssCustom">${cssCustomCodeBlock.render()}</div>
                </div>

                <!-- CSS Variables Reference -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <iconify-icon icon="solar:document-text-linear" width="14" height="14"></iconify-icon>
                        CSS Variables Reference
                    </h4>
                    <div class="kwami-docs-code" data-code="cssVars">${cssVarsCodeBlock.render()}</div>
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
                                    <td>Button text (used as aria-label for mini variant)</td>
                                </tr>
                                <tr>
                                    <td><code>variant</code></td>
                                    <td><code>'primary' | 'secondary' | 'danger' | 'mini'</code></td>
                                    <td><code>'primary'</code></td>
                                    <td>Visual style variant</td>
                                </tr>
                                <tr>
                                    <td><code>size</code></td>
                                    <td><code>'sm' | 'md' | 'lg'</code></td>
                                    <td><code>'md'</code></td>
                                    <td>Button size (ignored for mini variant)</td>
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
                                    <td>Iconify icon name (required for mini variant)</td>
                                </tr>
                                <tr>
                                    <td><code>iconPosition</code></td>
                                    <td><code>'left' | 'right'</code></td>
                                    <td><code>'left'</code></td>
                                    <td>Icon placement relative to text</td>
                                </tr>
                                <tr>
                                    <td><code>fullWidth</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                    <td>Expand to container width (not for mini)</td>
                                </tr>
                                <tr>
                                    <td><code>type</code></td>
                                    <td><code>'button' | 'submit' | 'reset'</code></td>
                                    <td><code>'button'</code></td>
                                    <td>HTML button type attribute</td>
                                </tr>
                                <tr>
                                    <td><code>onClick</code></td>
                                    <td><code>(e: MouseEvent) => void</code></td>
                                    <td><code>undefined</code></td>
                                    <td>Click handler callback</td>
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
