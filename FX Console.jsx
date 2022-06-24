function FXConsole(thisObj)
{
	var isWin = (File.fs == "Windows");
	
	var currentPath = Folder.current.absoluteURI;
	var iconPath = currentPath + "/VideoCopilot/FXConsole/icons/";
	var pluginPath = File(currentPath).parent.parent.fsName + "/Plug-ins/VideoCopilot/";
	
    var libFilename = (isWin) ? "FXConsole.aex" : "FXConsole.plugin";

	if(!File(pluginPath + libFilename).exists)
	{
		alert("FX Console: Could not load plugin FX Console.");
		return;
	}
		
    var myToolsPanel = createUI(thisObj);
    if(this instanceof Panel)
        myToolsPanel.show();
	
    function createUI(thisObj)
    {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "FX Console", [100, 100, 500, 600], {resizeable:true});
		
		try
		{
			var consoleLib = new ExternalObject("lib:" + pluginPath + libFilename);
			consoleLib.execute("requeststatus");
			consoleLib.unload();
	
			//image buttons are sprites with 3 or 4 images placed vertically, we use this panel to crop one at a time.
			var buttonGroup = myPanel.add("group", {x:5, y:8, width:193, height:28});
	
			//create buttons
			var screenBtn = addButton(buttonGroup, {x:0, y:0, width:28, height:112}, "screenshot", button0Hex);
			var galleryBtn = addButton(buttonGroup,{x:39, y:0, width:28, height:84}, "gallery", button2Hex);
			var exportBtn = addButton(buttonGroup, {x:78, y:0, width:28, height:84}, "export", button1Hex);
			var prefsBtn = addButton(buttonGroup, {x:117, y:0, width:28, height:84}, "preferences", button3Hex);
			var logoBtn = addButton(buttonGroup, {x:165, y:0, width:28, height:84}, "logo", button4Hex);
			
			//tooltips
			screenBtn.helpTip = "Take a screenshot";
			exportBtn.helpTip = "Export";
			galleryBtn.helpTip = "Open Gallery";
			prefsBtn.helpTip = "Settings";
		}
		catch(e)
		{
			alert(e);
		}
		
		return myPanel;
    }
	
	function addButton(palette, rect, cmd, bmp)
	{
		//we need two images because for some reason, if the image has a bitmap, event listeners do not work.
		var bitmap = palette.add("image", rect, bmp);
		var button = palette.add("group", rect);
		
		button.bitmap = bitmap;
		button.state = "normal";
		button.mouseDown = false;
		button.mouseHover = false;
		
		button.callback = onButton;
		button.cmd = cmd;
		
		button.addEventListener('mouseover', onMouse, false);
		button.addEventListener('mousedown', onMouse, false);
		button.addEventListener('mouseup', onMouse, false);
		
		return button;
	}
	
	function onMouse(event)
	{
		switch (event.type)
		{
			case "mouseover":
			{
				//add the event listener 2 times, because just 1 time does not actually adds it in here.
				this.addEventListener("mouseout", onMouse, false);
				this.addEventListener("mouseout", onMouse, false);
				
				this.bitmap.location.y = -28;
				this.mouseHover = true;
				break;
			}

			case "mouseout":
			{
				//remove the event listener here so AE does not dump errors during render when the user moves the mouse over the buttons.
				this.removeEventListener("mouseout", onMouse, false);
				
				this.bitmap.location.y = 0; 
				this.mouseHover = false;
				this.mouseDown = false;
				break;
			}
		
			case "mousedown":
			{
				if (this.cmd == "screenshot")
					this.bitmap.location.y = -84;
					
				this.mouseDown = true;
				break;
			}
		
			case "mouseup":
			{
				if (this.mouseHover)
				{
					this.bitmap.location.y = -28;
				}
				else
				{
					this.bitmap.location.y = 0;
					this.removeEventListener("mouseout", onMouse, false);
				}
				
				this.mouseDown = false;
				
				this.callback(this.cmd);
				break;
			}
		}
	}
	
	function onDropDown()
	{
		try
		{
			var consoleLib = new ExternalObject("lib:" + pluginPath + libFilename);
			consoleLib.execute("shortcut", this.selection.index);
			consoleLib.unload();
		}
		catch (e)
		{
			alert(e);
		}
	}

	function onButton(cmd)
	{
		try
		{
			var consoleLib = new ExternalObject("lib:" + pluginPath + libFilename);
			var value = consoleLib.execute(cmd);
			consoleLib.unload();
			
			return value;
		}
		catch (e)
		{
			alert(e);
		}
		
		return -1;
	}
}

FXConsole(this);