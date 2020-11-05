



function createTables() {
 var cont = 0;
 var d = document.getElementById("tables");
 d.className="table table-responsive"
 for (const tblsg of mydata) {
   var t = document.createElement("table");
   t.id = "table"+cont;
   t.className = "table table-bordered table-hover table-striped"
   var body = document.createElement("tbody");
   body.id = "tbody"+cont;
   t.appendChild(body);
   d.appendChild(t)
   cont++;
 }
}



function gethead() {


 var array = []

 for (const tblsg of mydata) {
   array.push(Object.keys(tblsg.features[1].properties))
 }

 return array
}

function writehead(headArrat) {
 var cont = 0

 for (const tblsgheader of headArrat){

   var tblhead = document.getElementById("table"+cont)
   var row = document.createElement("thead");
   for (const element of tblsgheader) {
     var header =null;
     var cell = null
     cell = document.createElement("th");
     cell.style = "white-space: nowrap; padding: 5px"
     header= document.createTextNode(element);
     cell.appendChild(header)
     row.appendChild(cell);
   }
   tblhead.appendChild(row)
   cont++;
 }


}



function mostrarTabla(){
  map.eachLayer

 try{

   var selection = [];
   var options = document.getElementById("sel_" + key).options
   for (var i=0; i < options.length; i++) {
     if (options[i].selected) selection.push(options[i].value);
   }

    function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
 }

    var di = control.getOverlays();
    //console.log(getKeyByValue(di,true));
    var activelayers = getKeyByValue(di,true);
    var campos = activelayers.split("<");
    var capa = campos[0];
    var capajson="json_".concat(capa);

     try{
       var cont =0;

       for (const tblsgheader of gethead()){
         var tblBody = document.getElementById("tbody"+cont)
         tblBody.innerHTML = '';



         mydata[cont].features.forEach(element => {

           if(selection[0] == element.properties.Departamen  ){
             var row = document.createElement("tr");
             var columna = 1;
             var ultima = tblsgheader.length;
             for (const atributte of tblsgheader){

               var cell = document.createElement("td");
               cell.style = "white-space: nowrap"
               var valor = element.properties[atributte];
               var text = document.createTextNode(valor);
              if((valor!=null)&&columna>2&&((columna%2==0)||columna==ultima||columna==ultima-1)){
                text=document.createTextNode(formatNumber(element.properties[atributte]));
              }
               cell.appendChild(text);
               row.appendChild(cell);
               columna = columna +1 ;
             }
             tblBody.appendChild(row)
           }
         });
         cont++;
       }
     } catch(err){
       alert(err)
   }
 } catch(err){
 }
}

function formatNumber(num) {
  if(isNaN(num)){
    return "Q. " + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  else{
     return "Q. " + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
  }
}

function actualizarTabla(){
  document.getElementById("tables").innerHTML="";
  createTables();
  writehead(gethead());
  mostrarTabla();
}

