
// Associative array[ sectionTitle ] = [objIndex, boolCollapsed ]
var sectionTitleCollapsedArry = new Array();

function doStuff()
{
   var linkContainers = document.getElementsByClassName("linkContainer");

   for( var i = 0; i < linkContainers.length; i++ )
   {
		var link = document.getElementsByClassName("link")[i];
		var linkContent = link.innerHTML;

		document.getElementsByClassName("goButton")[i].setAttribute("onclick","openAddress('"+linkContent+"')");
		link.innerHTML = "";
		link.innerHTML = '<a target="_blank" href="'+linkContent+'">'+	
		 				 	linkContent+"</a>";


   }
   
   var linkSectionTitles = document.getElementsByClassName("linkSectionTitle");
   
   for( var i = 0; i < linkSectionTitles.length; i++ )
   {
	   sectionTitleCollapsedArry[linkSectionTitles[i].innerHTML] = [i, false];
	   linkSectionTitles[i].setAttribute("onclick","clickSectionTitle('"+linkSectionTitles[i].innerHTML+"')")
   }
   
 
}

function openAddress( winURL )
{
	window.open(winURL,"_blank");
}

function collapseSection(title)
{
	var linkSection = document.getElementsByClassName("linkSection")[sectionTitleCollapsedArry[title][0]];
	var children = linkSection.children;
	for( var i = 1; i < children.length; i++ )
	{
		children[i].style.visibility = "hidden";
		linkSection.style.height = "25px";
		sectionTitleCollapsedArry[title][1] = true;
		
		if( children[i].className == "linkSection" )
		{
			var sectionName = children[i].children[0].innerHTML;
			// Recursive call. 
			
			collapseSection(sectionName ); 
		}
	
	}
	
	sectionTitleCollapsedArry[title][1] = true; 
}

function uncollapseSection( title )
{
	var linkSection = document.getElementsByClassName("linkSection")[sectionTitleCollapsedArry[title][0]];
	var children = linkSection.children;
	for( var i = 1; i < children.length; i++ )
	{
		children[i].style.visibility = "visible";
		linkSection.style.height = "inherit";
		if( children[i].className == "linkSection" )
		{
			var sectionName = children[i].children[0].innerHTML;
			// Recursive call. 
			uncollapseSection( sectionName ); 
		}
	
	}
	sectionTitleCollapsedArry[title][1] = false; 
}

function clickSectionTitle( title )
{
	if( sectionTitleCollapsedArry[title][1] )
	{
		// Is collapsed. So we uncollapse. 
		uncollapseSection( title );
	}
	else
	{
		// Is not collapsed. SO we collapse. 
		collapseSection(title);
	}
}


window.onload = doStuff;