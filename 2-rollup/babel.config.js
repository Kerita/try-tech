module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        debug: true,
        // targets:
        //   process.env.POLYFILL === "true"
        //     ? "> 0%, not dead"
        //     : "Chrome >= 61, Firefox >= 67, Safari >= 10.1, Edge >= 79, iOS >= 10.3",
        targets: "> 0%, not dead",
        corejs: 3,
        useBuiltIns: "usage",
        shippedProposals: false,
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        corejs: false,
        regenerator: false,
      },
    ],
  ],
};
