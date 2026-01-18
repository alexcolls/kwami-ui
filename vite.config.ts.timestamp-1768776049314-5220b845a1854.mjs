// vite.config.ts
import { defineConfig } from "file:///home/quantium/labs/kwami.io/kwami-ui/node_modules/vite/dist/node/index.js";
import dts from "file:///home/quantium/labs/kwami.io/kwami-ui/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/quantium/labs/kwami.io/kwami-ui";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "KwamiUI",
      fileName: (format) => `kwami-ui.${format}.js`
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["iconify-icon"],
      output: {
        globals: {
          "iconify-icon": "IconifyIcon"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9xdWFudGl1bS9sYWJzL2t3YW1pLmlvL2t3YW1pLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9xdWFudGl1bS9sYWJzL2t3YW1pLmlvL2t3YW1pLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3F1YW50aXVtL2xhYnMva3dhbWkuaW8va3dhbWktdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGR0cyh7XG4gICAgICAgICAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLFxuICAgICAgICAgICAgcm9sbHVwVHlwZXM6IHRydWVcbiAgICAgICAgfSlcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICAgIGxpYjoge1xuICAgICAgICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgICAgICBuYW1lOiAnS3dhbWlVSScsXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYGt3YW1pLXVpLiR7Zm9ybWF0fS5qc2BcbiAgICAgICAgfSxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgLy8gRXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG4gICAgICAgICAgICBleHRlcm5hbDogWydpY29uaWZ5LWljb24nXSxcbiAgICAgICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2ljb25pZnktaWNvbic6ICdJY29uaWZ5SWNvbidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVMsU0FBUyxvQkFBb0I7QUFDOVQsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxJQUFJO0FBQUEsTUFDQSxrQkFBa0I7QUFBQSxNQUNsQixhQUFhO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNILEtBQUs7QUFBQSxNQUNELE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVSxDQUFDLFdBQVcsWUFBWSxNQUFNO0FBQUEsSUFDNUM7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRVgsVUFBVSxDQUFDLGNBQWM7QUFBQSxNQUN6QixRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsVUFDTCxnQkFBZ0I7QUFBQSxRQUNwQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
