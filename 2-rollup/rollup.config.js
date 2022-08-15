import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";

export default {
  input: "main.ts",
  plugins: [
    resolve(),
    commonjs(),
    typescript({ jsx: "preserve" }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "runtime",
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts", ".tsx"],
    }),
  ],
  output: {
    file: "dist/bundle.js",
    format: "esm",
    sourcemap: true,
    plugins: [
      getBabelOutputPlugin({
        presets: ["@babel/preset-env"],
      }),
    ],
  },
};
