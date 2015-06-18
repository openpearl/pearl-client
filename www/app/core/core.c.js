module.exports = function(app) {
  // app.run("coreController", [
  //   CoreController]);

  // FIXME: Should the app even run a controller? This seems wrong.
  app.run(CoreController);
}

function CoreController() {
}
