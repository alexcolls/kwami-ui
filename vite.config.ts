import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            rollupTypes: true
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'KwamiUI',
            fileName: (format) => `kwami-ui.${format}.js`
        },
        rollupOptions: {
            // Externalize deps that shouldn't be bundled
            external: ['iconify-icon'],
            output: {
                globals: {
                    'iconify-icon': 'IconifyIcon'
                }
            }
        }
    }
});
