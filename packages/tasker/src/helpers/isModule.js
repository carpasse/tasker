const isModule = (module) => {
  try {
    require.resolve(module);

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = isModule;
