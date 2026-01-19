/**
 * Button Documentation Panel - Demo only
 * Shows developer API documentation with live examples
 */

import { Button } from '@kwami/ui';

export interface ButtonDocsProps {
    onExampleClick?: (example: string) => void;
}

export class ButtonDocs {
    private examples: Map<string, Button> = new Map();

    constructor(_props: ButtonDocsProps = {}) {
        // Props reserved for future use
    }

    render(): string {
        // Create example buttons
        const defaultBtn = new Button({ label: 'DEFAULT' });
        const primaryBtn = new Button({ label: 'PRIMARY', variant: 'primary' });
        const dangerBtn = new Button({ label: 'DANGER', variant: 'danger' });
        const ghostBtn = new Button({ label: 'GHOST', variant: 'ghost' });
        
        const smBtn = new Button({ label: 'SMALL', size: 'sm' });
        const mdBtn = new Button({ label: 'MEDIUM', size: 'md' });
        const lgBtn = new Button({ label: 'LARGE', size: 'lg' });

        const iconLeftBtn = new Button({ label: 'SAVE', icon: 'solar:diskette-bold', iconPosition: 'left' });
        const iconRightBtn = new Button({ label: 'NEXT', icon: 'solar:arrow-right-bold', iconPosition: 'right' });
        const iconOnlyBtn = new Button({ label: '', icon: 'solar:heart-bold', variant: 'primary' });

        const disabledBtn = new Button({ label: 'DISABLED', disabled: true });
        const loadingBtn = new Button({ label: 'LOADING', loading: true, variant: 'primary' });

        // Store for hydration
        this.examples.set('default', defaultBtn);
        this.examples.set('primary', primaryBtn);
        this.examples.set('danger', dangerBtn);
        this.examples.set('ghost', ghostBtn);
        this.examples.set('sm', smBtn);
        this.examples.set('md', mdBtn);
        this.examples.set('lg', lgBtn);
        this.examples.set('icon-left', iconLeftBtn);
        this.examples.set('icon-right', iconRightBtn);
        this.examples.set('icon-only', iconOnlyBtn);
        this.examples.set('disabled', disabledBtn);
        this.examples.set('loading', loadingBtn);

        return `
            <div class="kwami-button-docs">
                <div class="kwami-docs-section">
                    <h3 class="kwami-docs-title">Developer API</h3>
                    <p class="kwami-docs-desc">Props available for developers using kwami-ui</p>
                </div>

                <!-- Variants -->
                <div class="kwami-docs-section">
                    <h4 class="kwami-docs-subtitle">
                        <span class="kwami-docs-prop">variant</span>
                        <code class="kwami-docs-type">'default' | 'primary' | 'danger' | 'ghost'</code>
                    </h4>
                    <div class="kwami-docs-examples kwami-docs-examples--row">
                        <div class="kwami-docs-example" data-example="default">${defaultBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="primary">${primaryBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="danger">${dangerBtn.render()}</div>
                        <div class="kwami-docs-example" data-example="ghost">${ghostBtn.render()}</div>
                    </div>
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
                </div>

                <!-- Props Table -->
                <div class="kwami-docs-section kwami-docs-section--table">
                    <h4 class="kwami-docs-subtitle">All Props</h4>
                    <div class="kwami-docs-table-wrap">
                        <table class="kwami-docs-table">
                            <thead>
                                <tr>
                                    <th>Prop</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>label</code></td>
                                    <td><code>string</code></td>
                                    <td><code>'CLICK'</code></td>
                                </tr>
                                <tr>
                                    <td><code>variant</code></td>
                                    <td><code>'default' | 'primary' | 'danger' | 'ghost'</code></td>
                                    <td><code>'default'</code></td>
                                </tr>
                                <tr>
                                    <td><code>size</code></td>
                                    <td><code>'sm' | 'md' | 'lg'</code></td>
                                    <td><code>'md'</code></td>
                                </tr>
                                <tr>
                                    <td><code>disabled</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                </tr>
                                <tr>
                                    <td><code>loading</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                </tr>
                                <tr>
                                    <td><code>icon</code></td>
                                    <td><code>string</code></td>
                                    <td><code>undefined</code></td>
                                </tr>
                                <tr>
                                    <td><code>iconPosition</code></td>
                                    <td><code>'left' | 'right'</code></td>
                                    <td><code>'left'</code></td>
                                </tr>
                                <tr>
                                    <td><code>type</code></td>
                                    <td><code>'button' | 'submit' | 'reset'</code></td>
                                    <td><code>'button'</code></td>
                                </tr>
                                <tr>
                                    <td><code>fullWidth</code></td>
                                    <td><code>boolean</code></td>
                                    <td><code>false</code></td>
                                </tr>
                                <tr>
                                    <td><code>onClick</code></td>
                                    <td><code>(e: MouseEvent) => void</code></td>
                                    <td><code>undefined</code></td>
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
    }

    destroy(): void {
        this.examples.forEach(btn => btn.destroy());
        this.examples.clear();
    }
}
