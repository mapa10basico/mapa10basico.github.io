var Filters = {"Departamen": "str"};
function filterFunc() {
  map.eachLayer(function(lyr){
  if ("options" in lyr && "dataVar" in lyr["options"]){
    features = this[lyr["options"]["dataVar"]].features.slice(0);
    try{
      for (key in Filters){
        if (Filters[key] == "str" || Filters[key] == "bool"){
          var selection = [];
          var options = document.getElementById("sel_" + key).options
          for (var i=0; i < options.length; i++) {
            if (options[i].selected) selection.push(options[i].value);
          }
            try{
              if (key in features[0].properties){
                for (i = features.length - 1;
                  i >= 0; --i){
                  if (selection.indexOf(
                  features[i].properties[key])<0
                  && selection.length>0) {
                  features.splice(i,1);
                  }
                }
              }
            } catch(err){
          }
        }
        } catch(err){
        }
      this[lyr["options"]["layerName"]].clearLayers();
      this[lyr["options"]["layerName"]].addData(features);
      }
      })
    }
