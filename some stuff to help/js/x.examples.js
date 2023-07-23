/*

    .----.                    _..._                                                     .-'''-.                           
   / .--./    .---.        .-'_..._''.                          _______                '   _    \                         
  ' '         |   |.--.  .' .'      '.\     __.....__           \  ___ `'.           /   /` '.   \_________   _...._      
  \ \         |   ||__| / .'            .-''         '.    ,.--. ' |--.\  \         .   |     \  '\        |.'      '-.   
   `.`'--.    |   |.--.. '             /     .-''"'-.  `. //    \| |    \  ' .-,.--.|   '      |  '\        .'```'.    '. 
     `'-. `.  |   ||  || |            /     /________\   \\\    /| |     |  '|  .-. \    \     / /  \      |       \     \
         `. \ |   ||  || |            |                  | `'--' | |     |  || |  | |`.   ` ..' /    |     |        |    |
           \ '|   ||  |. '            \    .-------------' ,.--. | |     ' .'| |  | |   '-...-'`     |      \      /    . 
            | |   ||  | \ '.          .\    '-.____...---.//    \| |___.' /' | |  '-                 |     |\`'-.-'   .'  
            | |   ||__|  '. `._____.-'/ `.             .' \\    /_______.'/  | |                     |     | '-....-'`    
           / /'---'        `-.______ /    `''-...... -'    `'--'\_______|/   | |                    .'     '.             
     /...-'.'                       `                                        |_|                  '-----------'           
    /--...-'                                                                                                              
    
    Slice:Drop - Instantly view scientific and medical imaging data in 3D.
    
     http://slicedrop.com
     
    Copyright (c) 2012 The Slice:Drop and X Toolkit Developers <dev@goXTK.com>
    
    Slice:Drop is licensed under the MIT License:
      http://www.opensource.org/licenses/mit-license.php    
      
    CREDITS: http://slicedrop.com/LICENSE
     
*/
// load all examples

URL_PREFIX = 'https://socr.umich.edu/HTML5/BrainViewer/data/';

function loadVol() {

  // now switch to the viewer
  switchToViewer();
  
  // init renderers
  initializeRenderers();
  createData();
  
  // now the fun part, arrrr
  volume = new X.volume();
  volume.file = URL_PREFIX+'original.mgh';
  _data.volume.file = volume.file;
  
  ren3d.add(volume);
  
  ren3d.render();
  
  configurator = function() {
	ren3d.camera.view = new X.matrix(
	    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
	     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
	     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, -330],
	     [0, 0, 0, 1]]);

  };
  
}

function loadTestMatrix() {

  // now switch to the viewer
  switchToViewer();
  
  // init renderers
  initializeRenderers();
  createData();
  
  // now the fun part, arrrr
  volume = new X.volume();
  volume.file = URL_PREFIX+'original.mgh';
  _data.volume.file = volume.file;
  
  ren3d.add(volume);
  
  mesh = new X.mesh();
  mesh.file = URL_PREFIX+'example.stl';
  _data.mesh.file = mesh.file;
  mesh.transform.matrix = new X.matrix(
	  [[1, 0, 0, -103], [0, 1, 0, -115],
	  [0, 0, 1, -100], [0, 0, 0, 1]]);
  
  ren3d.add(mesh);
  
  ren3d.render();
  
  configurator = function() {
	ren3d.camera.view = new X.matrix(
	    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
	     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
	     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, -330],
	     [0, 0, 0, 1]]);

  };
}

function loadShape(isRandom) {

  // now switch to the viewer
  switchToViewer();
  
  // init renderers
  initializeRenderers();
  createData();

  // now the fun part, yahoooo
  for (i=1; i<=9; i++) {
	  mesh = new X.mesh();
	  mesh.file = URL_PREFIX+'trunk/TranslateTo_1.-output-0'+i+'.fsm';
	  mesh.color = [Math.random(),Math.random(),Math.random()];
	  _data.mesh.file = mesh.file;
	  if (isRandom) {
	  mesh.transform.matrix = new X.matrix(
	  [[1, 0, 0, -300*Math.random()], [0, 1, 0, -300*Math.random()],
	  [0, 0, 1, -300*Math.random()], [0, 0, 0, 1]]);

	  }
	  ren3d.add(mesh);
  }
  for (i=10; i<=56; i++) {
	  mesh = new X.mesh();
	  mesh.file = URL_PREFIX+'trunk/TranslateTo_1.-output-'+i+'.fsm';
	  mesh.color = [Math.random(),Math.random(),Math.random()];
	  _data.mesh.file = mesh.file;
	  if (isRandom) {
	        mesh.transform.matrix = new X.matrix(
	 	[[1, 0, 0, -300*Math.random()], [0, 1, 0, -300*Math.random()],
	  	  [0, 0, 1, -300*Math.random()], [0, 0, 0, 1]]);
	  }
	  ren3d.add(mesh);
  }
  
  
  ren3d.render();
  
  configurator = function() {

    var zoom = -380;
    if (isRandom) {
    	zoom = -600;
    }

  	ren3d.camera.view = new X.matrix(
	    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
	     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
	     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, zoom],
	     [0, 0, 0, 1]]);
  };
}


function loadCellvirus(isRandom) {

	  // now switch to the viewer
	  switchToViewer();
	  
	  // init renderers
	  initializeRenderers();
	  createData();

	  // now the fun part, yahoooo
	  // Cell shape
	  	mesh = new X.mesh();
		 mesh.file = URL_PREFIX+'BloodCell.stl';
		 mesh.color = [Math.random(),Math.random(),Math.random()];
		 _data.mesh.file = mesh.file;
		 if (isRandom) {
		  mesh.transform.matrix = new X.matrix(
		  [[1, 0, 0, -300*Math.random()], [0, 1, 0, -300*Math.random()],
		  [0, 0, 1, -300*Math.random()], [0, 0, 0, 1]]);
		 }
		 ren3d.add(mesh);
	  
	   // Virus shape
		  mesh = new X.mesh();
		  mesh.file = URL_PREFIX+'SARS_CoV_2-highpoly2.stl';
		  mesh.color = [Math.random(),Math.random(),Math.random()];
		  _data.mesh.file = mesh.file;
		  if (isRandom) {
		        mesh.transform.matrix = new X.matrix(
		 	[[1, 0, 0, -300*Math.random()], [0, 1, 0, -300*Math.random()],
		  	  [0, 0, 1, -300*Math.random()], [0, 0, 0, 1]]);
		  }
		  ren3d.add(mesh);
	  
	  ren3d.render();
	  
	  configurator = function() {

	    var zoom = -380;
	    if (isRandom) {
	    	zoom = -600;
	    }

	  	ren3d.camera.view = new X.matrix(
		    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
		     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
		     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, zoom],
		     [0, 0, 0, 1]]);
	  };
}


function loadFibers() {

  // now switch to the viewer
  switchToViewer();
  
  // init renderers
  initializeRenderers();
  createData();
  
  // it's a fibers thingie
  fibers = new X.fibers();
  fibers.file = URL_PREFIX+'fibers.trk';
  fibers.transform.matrix = new X.matrix(
	   [[1, 0, 0, -130], [0, 6.123031769111886e-17, 1, -130],
	   [0, -1, 6.123031769111886e-17, 130], [0, 0, 0, 1]]);
  fibers.modified();
  _data.fibers.file = fibers.file;
  
  // now the fun part, arrrr
  volume = new X.volume();
  volume.file = URL_PREFIX+'original.mgh';
  volume.labelmap.file = URL_PREFIX+'label.mgz';
  volume.labelmap.colortable.file = URL_PREFIX+'colormap.txt';
  _data.volume.file = volume.file;
  _data.labelmap.file = volume.labelmap.file;
  
  ren3d.add(volume);
  ren3d.add(fibers);
	    
  ren3d.render();
  
  configurator = function() {
  	
    volume.volumeRendering = true;
    jQuery('#slicing').removeClass('ui-state-active');
    jQuery('#volumerendering').addClass('ui-state-active');
    jQuery('#windowlevel-label').hide();
    jQuery('#windowlevel-volume').hide();
    jQuery('#opacity-label').show();
    jQuery('#opacity-volume').show();
    
  	ren3d.camera.view = new X.matrix(
	    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
	     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
	     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, -330],
	     [0, 0, 0, 1]]);

  };
  
}

function loadLabelMaps() {

  // now switch to the viewer
  switchToViewer();
  
  // init renderers
  initializeRenderers();
  createData();
  
  // now the fun part, arrrr
  volume = new X.volume();
  volume.file = URL_PREFIX+'original.mgh';
  volume.labelmap.file = URL_PREFIX+'label.mgz';
  volume.labelmap.colortable.file = URL_PREFIX+'colormap.txt';
  _data.volume.file = volume.file;
  _data.labelmap.file = volume.labelmap.file;
  
  ren3d.add(volume);
  
  ren3d.render();
  
  configurator = function() {
	ren3d.camera.view = new X.matrix(
	    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
	     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
	     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, -330],
	     [0, 0, 0, 1]]);

  };
  
}



function loadAll() {

  // now switch to the viewer
  switchToViewer();
  
  // init renderers
  initializeRenderers();
  createData();
  
  // now the fun part, arrrr
  volume = new X.volume();
  volume.file = URL_PREFIX+'original.mgh';
  volume.labelmap.file = URL_PREFIX+'label.mgz';
  volume.labelmap.colortable.file = URL_PREFIX+'colormap.txt';
  _data.volume.file = volume.file;
  _data.labelmap.file = volume.labelmap.file;
  
  
  for (i=1; i<=9; i++) {
	  mesh = new X.mesh();
	  mesh.file = URL_PREFIX+'trunk/TranslateTo_1.-output-0'+i+'.fsm';
	  mesh.color = [Math.random(),Math.random(),Math.random()];
	  mesh.transform.matrix = new X.matrix(
		  [[1, 0, 0, -103], [0, 1, 0, -115],
		  [0, 0, 1, -100], [0, 0, 0, 1]]);
	  ren3d.add(mesh);
  }
  for (i=10; i<=56; i++) {
	  mesh = new X.mesh();
	  mesh.file = URL_PREFIX+'trunk/TranslateTo_1.-output-'+i+'.fsm';
	  mesh.color = [Math.random(),Math.random(),Math.random()];
	  if (i == 56) {
	  	_data.mesh.file = mesh.file;
	  }
	  mesh.transform.matrix = new X.matrix(
		  [[1, 0, 0, -103], [0, 1, 0, -115],
		  [0, 0, 1, -100], [0, 0, 0, 1]]);
	  ren3d.add(mesh);
  }
  
  fibers = new X.fibers();
  fibers.file = URL_PREFIX+'fibers.trk';
  fibers.transform.matrix = new X.matrix(
	   [[1, 0, 0, -130], [0, 6.123031769111886e-17, 1, -130],
	   [0, -1, 6.123031769111886e-17, 130], [0, 0, 0, 1]]);
  fibers.modified();
  _data.fibers.file = fibers.file;
  
  
  
  ren3d.add(volume);
  ren3d.add(fibers);
  
  
  ren3d.render();
  
  configurator = function() {
	ren3d.camera.view = new X.matrix(
	    [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
	     [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
	     [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, -330],
	     [0, 0, 0, 1]]);

  };
  
}




function loadFile(file) {

  // now switch to the viewer
  switchToViewer();
  
  jQuery('#blacklogo').hide();
  
  // init renderers
  initializeRenderers();
  createData();
  
  var _fileExtension = file.split('.').pop().toUpperCase();
  
  // check which type of file it is
  if (_data['volume']['extensions'].indexOf(_fileExtension) >= 0) {
  	
    // it's a volume
    volume = new X.volume();
    
  	if (_fileExtension == "HDR") {
  		
  		var imgfile = file.substring(0, file.lastIndexOf(".")) + ".img";
    	volume.file = imgfile;
    	_data.volume.file = volume.file;
    	volume.hdrfile = file;
    	_data.volhdr.file = volume.hdrfile;
    	
  	} else if (_fileExtension == "IMG") {
  		
    	volume.file = file;
    	_data.volume.file = volume.file;
  		var hdrfile = file.substring(0, file.lastIndexOf(".")) + ".hdr";
    	volume.hdrfile = hdrfile;
    	_data.volhdr.file = volume.hdrfile;
    	
  	} else {
  		
    	volume.file = file;
    	_data.volume.file = volume.file;
    	
   	}
   	
    ren3d.add(volume);
    
  } else if (_data['mesh']['extensions'].indexOf(_fileExtension) >= 0) {
    
    // it's a mesh
    mesh = new X.mesh();
    mesh.file = file;
    _data.mesh.file = mesh.file;
    ren3d.add(mesh);
    
  } else if (_data['fibers']['extensions'].indexOf(_fileExtension) >= 0) {
    
    // it's a fibers thingie
    fibers = new X.fibers();
    fibers.file = file;
    fibers.transform.matrix = new X.matrix(
	   [[1, 0, 0, -130], [0, 6.123031769111886e-17, 1, -130],
	   [0, -1, 6.123031769111886e-17, 130], [0, 0, 0, 1]]);
    fibers.modified();
    _data.fibers.file = fibers.file;
    ren3d.add(fibers);
    
  } else {
    
    throw new Error('Unsupported file type!');
    
  }
  
  ren3d.render();
  
  configurator = function() {
    ren3d.camera.view = new X.matrix(
        [[-0.5093217615929089, -0.8570143021091494, -0.07821655290449646, 10],
         [0.15980913879519168, -0.1834973848251334, 0.9699431678814355, 17],
         [-0.8456077000154597, 0.48151344295118087, 0.23041792884205461, -330],
         [0, 0, 0, 1]]);

  };
  
}