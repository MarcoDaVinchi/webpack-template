module.exports = function sassLoader(sourceMap) {
  return {
    loader: 'sass-loader',
    options: {
      sourceMap,
    },
  };
};
