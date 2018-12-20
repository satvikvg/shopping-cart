module.exports = api => {
  let envOpts = {
    modules: false
  };

  let presets = [["@babel/preset-env", envOpts], "@babel/preset-react"];

  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  return {
    presets
  };
};
