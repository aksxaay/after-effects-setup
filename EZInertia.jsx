//EZ Inertia v1.0
// March 2013 by Owen Chikazawa    
    
    
    
    
{    
    
    function EZInertia(thisObj)
	{
      
// Globals      
        var ezInertiaData = new Object();
        ezInertiaData.aboutTxt = "EZ Inertia\n" +
                                                "Copyright © 2013 Owen Chikazawa\n" +
                                                "EZ Inertia is a script that allows you to easily apply\n" +
                                                "the inertia expression to a layer with easy controls."
                                                
                                                
        var expStringLayer = 'n = 0;\n'+
                                       'if (numKeys > 0){\n'+
                                       'n = nearestKey(time).index;\n'+ 
                                       'if (key(n).time > time){\n'+
                                       'n--;\n'+
                                       '}\n'+
                                       '}\n'+
                                       'if (n == 0){\n'+
                                       't = 0;\n'+
                                       '}else{\n'+
                                       't = time - key(n).time;\n'+
                                       '}\n'+
                                       '\n'+
                                       'if (n > 0){\n'+
                                       'v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\n'+
                                       'amp = (effect("Amplitude")("Slider"))/100;\n'+
                                       'freq = effect("Frequency")("Slider");\n'+
                                       'decay = effect("Decay")("Slider");\n'+
                                       'value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n'+
                                       '}else{\n'+
                                       'value;\n'+
                                       '}\n';
                          
        
        var expStringComp = 'n = 0;\n'+
                                        'if (numKeys > 0){\n'+
                                        'n = nearestKey(time).index;\n'+
                                        'if (key(n).time > time){\n'+
                                        'n--;\n'+
                                        '}\n'+
                                        '}\n'+
                                        'if (n == 0){\n'+
                                        't = 0;\n'+
                                        '}else{\n'+
                                        't = time - key(n).time;\n'+
                                        '}\n'+
                                        '\n'+
                                        'if (n > 0){\n'+
                                        'v = velocityAtTime(key(n).time - thisComp.frameDuration/10);\n'+
                                        'amp = (thisComp.layer("Physics Adjustment").effect("Amplitude")("Slider"))/100;\n'+
                                        'freq = thisComp.layer("Physics Adjustment").effect("Frequency")("Slider");\n'+
                                        'decay = thisComp.layer("Physics Adjustment").effect("Decay")("Slider");\n'+
                                        'value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n'+
                                        '}else{\n'+
                                        'value;\n'+
                                        '}\n';    
                                                
    


		function EZInertia_buildUI(thisObj)
		{
			var pal = (thisObj instanceof Panel) ? thisObj : new Window("palette", "EZ Inertia", undefined, {resizeable:true});

			if (pal != null)
			{
                var res =
                "group { orientation: 'column', alignment:['left','top'], alignChildren:['fill','fill'], \
                    checks: Group { alignment:['fill','top'], \
                            compBtn: RadioButton { text: 'Composition'}, \
                            layerBtn: RadioButton { text: 'Layer'}, \
                        }, \
                    properties: Group { alignment: ['fill','top'], \
                            pos: Checkbox { text: 'P'}, \
                            scale: Checkbox { text: 'S'}, \
                            rot: Checkbox { text: 'R'}, \
                            opacity: Checkbox { text: 'T'}, \
                            anchor: Checkbox { text: 'A'}, \
                        }, \
                    footer: Group { alignment: ['fill','top'], \
                            about: Button { text:'?', maximumSize:[30,20] }, \
                            clear: Button { text:'Clear', maximumSize:[60,20] }, \
                            apply: Button { text: 'Apply', maximumSize:[60,20] }, \
                            }, \
                }";
                
                pal.grp = pal.add(res);
                
                var compBtn = pal.grp.checks.compBtn;
                var layerBtn = pal.grp.checks.layerBtn;
                
                compBtn.value = true;
                
                pal.grp.footer.about.onClick = about;
                pal.grp.footer.clear.onClick = clearOne;
                pal.grp.footer.apply.onClick = applyOne;
                

    
                }
                return pal;
            }

   
// ABOUT -------------------------------------------------------------------------------

function about(){
    alert (ezInertiaData.aboutTxt);
    }
       

// CLEAR --------------------------------------------------------------------------------

function clearOne(){
    var selItem = app.project.activeItem.selectedLayers[0];
    if (selItem == null){
        alert ("Please select a layer and try again.");
        }
    else if (myPal.grp.properties.pos.value == "0" && myPal.grp.properties.scale.value == "0" && myPal.grp.properties.rot.value == "0" && myPal.grp.properties.opacity.value == "0" && myPal.grp.properties.anchor.value == "0"){
        alert ("Please select a property and try again.");
        }
    else {
        clear();
        }
    }

//----------------------------------------------------------------------------------------

function clear(){
    app.beginUndoGroup("EZ Inertia Clear");
    var selItem = app.project.activeItem.selectedLayers;

    if (myPal.grp.properties.pos.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].position.expression = "";
            }
        }
    else if (myPal.grp.properties.pos.value == "0"){
        }

 
    if (myPal.grp.properties.scale.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].scale.expression = "";
            }
        }
    else if (myPal.grp.properties.scale.value == "0"){
        }

 
    for (var i = 0; i < selItem.length; i++){
        if (myPal.grp.properties.rot.value == "1" && selItem[i].threeDLayer == false){
            selItem[i].rotation.expression = "";
            }
        else if (myPal.grp.properties.rot.value == "1" && selItem[i].threeDLayer == true){
            selItem[i].xRotation.expression = "";
            selItem[i].yRotation.expression = "";
            selItem[i].zRotation.expression = "";
            }
        else if (myPal.grp.properties.rot.value == "0"){
            }
        }


    if (myPal.grp.properties.opacity.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].opacity.expression = "";
            }
        }
    else if (myPal.grp.properties.opacity.value == "0"){
        }


    if (myPal.grp.properties.anchor.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].anchorPoint.expression = "";
            }
        }
    else if (myPal.grp.properties.anchor.value == "0"){
        }

    
    app.endUndoGroup();
}

    
    

// APPLY --------------------------------------------------------------------------------

function applyOne(){
    var selItem = app.project.activeItem.selectedLayers[0];
    if (selItem == null){
        alert("Please select a layer and try again.");
        }
    else if (myPal.grp.properties.pos.value == "0" && myPal.grp.properties.scale.value == "0" && myPal.grp.properties.rot.value == "0" && myPal.grp.properties.opacity.value == "0" && myPal.grp.properties.anchor.value == "0"){
        alert ("Please select a property and try again.");
        }
    else {
        applyTwo();
        }
    }

function applyTwo(){
    if (myPal.grp.checks.compBtn.value == true){
        applyComp();
        }
    else {
        applyLayer();
        }
    }

//------------------------------------------------------------------------------------------------------------------------------
function applyComp(){
    app.beginUndoGroup("EZ Inertia");
    
    var curItem = app.project.activeItem;
    var selItem = app.project.activeItem.selectedLayers;
    var highItem = app.project.activeItem.selectedLayers[0].selectedProperties[0];
    
    if (curItem.layer("Physics Adjustment") == null){
        control = curItem.layers.addSolid([0,0,0], "Physics Adjustment", curItem.width, curItem.height, curItem.pixelAspect, curItem.duration);
        control.adjustmentLayer = true; 
        
        amp = control.Effects.addProperty("Slider Control");
        amp.property("Slider").setValue(3.0);
        amp.name = ("Amplitude");
        fre = control.Effects.addProperty("Slider Control");
        fre.property("Slider").setValue(2.5);
        fre.name = ("Frequency");
        dec = control.Effects.addProperty("Slider Control");
        dec.property("Slider").setValue(5);
        dec.name = ("Decay");
        }


    if (myPal.grp.properties.pos.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].position.expression = expStringComp;
            }
        }
    else if (myPal.grp.properties.pos.value == "0"){
        }


    if (myPal.grp.properties.scale.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].scale.expression = expStringComp;
            }
        }
    else if (myPal.grp.properties.scale.value == "0"){
        }


    for (var i = 0; i < selItem.length; i++){
        if (myPal.grp.properties.rot.value == "1" && selItem[i].threeDLayer == false){
            selItem[i].rotation.expression = expStringComp;
            }
        else if (myPal.grp.properties.rot.value == "1" && selItem[i].threeDLayer == true){
            selItem[i].xRotation.expression = expStringComp;
            selItem[i].yRotation.expression = expStringComp;
            selItem[i].zRotation.expression = expStringComp;
            }
        else if (myPal.grp.properties.rot.value == "0"){
            }
        }
    

    if (myPal.grp.properties.opacity.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].opacity.expression = expStringComp;
            }
        }
    else if (myPal.grp.properties.opacity.value == "0"){
        }


    if (myPal.grp.properties.anchor.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].anchorPoint.expression = expStringComp;
            }
        }
    else if (myPal.grp.properties.anchor.value == "0"){
        }


    app.endUndoGroup();
}



//---------------------------------------------------------------------------------------------------------------------

function applyLayer(){
    app.beginUndoGroup("EZ Inertia");
    
    var curItem = app.project.activeItem;
    var selItem = app.project.activeItem.selectedLayers;
    var highItem = app.project.activeItem.selectedLayers[0].selectedProperties[0];
    
    if (curItem.selectedLayers[0].Effects.property("Amplitude") == null){ 
        for (var i = 0; i < selItem.length; i++){
            amp = selItem[i].Effects.addProperty("Slider Control");
            amp.property("Slider").setValue(3.0);
            amp.name = ("Amplitude");
            fre = selItem[i].Effects.addProperty("Slider Control");
            fre.property("Slider").setValue(2.5);
            fre.name = ("Frequency");
            dec = selItem[i].Effects.addProperty("Slider Control");
            dec.property("Slider").setValue(5);
            dec.name = ("Decay");
            }
        }
    
    if (myPal.grp.properties.pos.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].position.expression = expStringLayer;
            }
        }
    else if (myPal.grp.properties.pos.value == "0"){
        }
    
    
    if (myPal.grp.properties.scale.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].scale.expression = expStringLayer;
            }
        }
    else if (myPal.grp.properties.scale.value == "0"){
        }
    
    
    for (var i = 0; i < selItem.length; i++){
        if (myPal.grp.properties.rot.value == "1" && selItem[i].threeDLayer == false){
            selItem[i].rotation.expression = expStringLayer;
            }
        else if (myPal.grp.properties.rot.value == "1" && selItem[i].threeDLayer == true){
            selItem[i].xRotation.expression = expStringLayer;
            selItem[i].yRotation.expression = expStringLayer;
            selItem[i].zRotation.expression = expStringLayer;
            }
        else if (myPal.grp.properties.rot.value == "0"){
            }
        }
    
  
    if (myPal.grp.properties.opacity.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].opacity.expression = expStringLayer;
            }
        }
    else if (myPal.grp.properties.opacity.value == "0"){
        }
    

    if (myPal.grp.properties.anchor.value == "1"){
        for (var i = 0; i < selItem.length; i++){
            selItem[i].anchorPoint.expression = expStringLayer;
            }
        }
    else if (myPal.grp.properties.anchor.value == "0"){
        }
    

    app.endUndoGroup();
}
    
   

        
// Build   --------------------------------------------------------------------------------

    if (parseFloat(app.version) < 8.0)
			alert("This script requires AE CS3 or greater");
    else
    {        

        var myPal = EZInertia_buildUI(thisObj);
        if (myPal != null)
		{

			if (myPal instanceof Window)
			{
				// Show the palette
				myPal.center();
				myPal.show();
			}
			else
				{myPal.layout.layout(true);}
          }
      }
    }
    EZInertia(this);
}