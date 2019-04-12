module.exports = function urlLoader(prefix, limit) {
  return {
    loader: 'url-loader',
    options: {
      limit,
      name: `${prefix}/[name][hash].[ext]`,
    },
  };
};
