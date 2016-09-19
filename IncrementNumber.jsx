function getSelectedLayersIndex(){
      var selectedLayers = new Array;
      var ref = new ActionReference();
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
      var desc = executeActionGet(ref);
      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){
         desc = desc.getList( stringIDToTypeID( 'targetLayers' ));
          var c = desc.count
          var selectedLayers = new Array();
          for(var i=0;i<c;i++){
            try{
               activeDocument.backgroundLayer;
               selectedLayers.push(  desc.getReference( i ).getIndex() );
            }catch(e){
               selectedLayers.push(  desc.getReference( i ).getIndex()+1 );
            }
          }
       }else{
         var ref = new ActionReference();
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
         try{
            activeDocument.backgroundLayer;
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1);
         }catch(e){
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));
         }
      }
      return selectedLayers;
}

var docRef = app.activeDocument

var layers = getSelectedLayersIndex()

startNumber = Number(docRef.layers[docRef.layers.length - layers[0]].textItem.contents)

// alert(startNumber)

for(var i = 0; i <= layers.length - 1; i++){
  docRef.layers[Number(docRef.layers.length - layers[i])].textItem.contents = startNumber+i
}
