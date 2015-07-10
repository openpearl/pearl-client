// TODO: Figure out how this works.
// I think it gets overwritten if the plugin actually exists.
// TODO: Move this to a place more appropriate.
window.plugins = {
  "healthkit": {
    available:function(abc){
      return false; 
    }
  }
};
