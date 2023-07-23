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
/**
 * Setup all UI elements once the loading was completed.
 */
function setupUi() {

    // VOLUME
    if (_data.volume.file != null) {
      
      // update threshold slider
      jQuery('#threshold-volume').dragslider("option", "max", volume.max);
      jQuery('#threshold-volume').dragslider("option", "min", volume.min);
      jQuery('#threshold-volume').dragslider("option", "values",
          [4, volume.max]);
      volume.lowerThreshold = 4;
      
      // update window/level slider
      jQuery('#windowlevel-volume').dragslider("option", "max", volume.max);
      jQuery('#windowlevel-volume').dragslider("option", "min", volume.min);
      jQuery('#windowlevel-volume').dragslider("option", "values",
          [volume.min, volume.max]);
      
      // update 3d opacity
      jQuery('#opacity-volume').slider("option", "value", 5);
      volume.opacity = 0.05; // re-propagate
      volume.modified();
      
      // update 2d slice sliders
      var dim = volume.dimensions;
      jQuery("#yellow_slider").slider("option", "disabled", false);
      jQuery("#yellow_slider").slider("option", "min", 0);
      jQuery("#yellow_slider").slider("option", "max", dim[0] - 1);
      jQuery("#yellow_slider").slider("option", "value", volume.indexX);
      jQuery("#red_slider").slider("option", "disabled", false);
      jQuery("#red_slider").slider("option", "min", 0);
      jQuery("#red_slider").slider("option", "max", dim[1] - 1);
      jQuery("#red_slider").slider("option", "value", volume.indexY);
      jQuery("#green_slider").slider("option", "disabled", false);
      jQuery("#green_slider").slider("option", "min", 0);
      jQuery("#green_slider").slider("option", "max", dim[2] - 1);
      jQuery("#green_slider").slider("option", "value", volume.indexZ);
      
      jQuery('#volume .menu').removeClass('menuDisabled');
      
      jQuery('#volume .menu').stop().animate({
       'marginLeft': '-2px'
      }, 1000);
      has_volume = true;
      
    } else {
      
      if (!has_volume) {
          // no volume
          jQuery('#volume .menu').addClass('menuDisabled');
          jQuery("#yellow_slider").slider("option", "disabled", true);
          jQuery("#red_slider").slider("option", "disabled", true);
          jQuery("#green_slider").slider("option", "disabled", true);
      }
      
    }
    
    // LABELMAP
    if (_data.labelmap.file != null) {
      
      jQuery('#labelmapSwitch').show();
      
      jQuery('#opacity-labelmap').slider("option", "value", 40);
      volume.labelmap.opacity = 0.4; // re-propagate
      
  
    } else {
      
      // no labelmap
      jQuery('#labelmapSwitch').hide();
      
    }
  
    // MESH
    if (_data.mesh.file != null) {
      
      jQuery('#opacity-mesh').slider("option", "value", 100);
      mesh.opacity = 1.0; // re-propagate
      
      mesh.color = [0, 0, 1];
      
      jQuery('#mesh .menu').removeClass('menuDisabled');
      
      jQuery('#mesh .menu').stop().animate({
       'marginLeft': '-2px'
      }, 1000);
      has_mesh = true;
      
    } else {
      
      if (!has_mesh) {
          // no mesh
          jQuery('#mesh .menu').addClass('menuDisabled');
      }
    
    }
    
    // SCALARS
    if (_data.scalars.file != null) {
      
      var combobox = document.getElementById("scalars-selector");
      combobox.value = 'Scalars 1';
      
      jQuery("#threshold-scalars").dragslider("option", "disabled", false);
      jQuery("#threshold-scalars").dragslider("option", "min",
          mesh.scalars.min * 100);
      jQuery("#threshold-scalars").dragslider("option", "max",
          mesh.scalars.max * 100);
      jQuery("#threshold-scalars").dragslider("option", "values",
          [mesh.scalars.min * 100, mesh.scalars.max * 100]);
      
    } else {
      
      var combobox = document.getElementById("scalars-selector");
      combobox.disabled = true;
      jQuery("#threshold-scalars").dragslider("option", "disabled", true);
      
    }
    
    // FIBERS
    if (_data.fibers.file != null) {
      
      jQuery('#fibers .menu').removeClass('menuDisabled');
      
      jQuery("#threshold-fibers").dragslider("option", "min", fibers.scalars.min);
      jQuery("#threshold-fibers").dragslider("option", "max", fibers.scalars.max);
      jQuery("#threshold-fibers").dragslider("option", "values",
          [fibers.scalars.min, fibers.scalars.max]);
      jQuery('#fibers .menu').stop().animate({
       'marginLeft': '-2px'
      }, 1000);
      has_fibers = true;
      
    } else {
      
      if (!has_fibers) {
          // no fibers
          jQuery('#fibers .menu').addClass('menuDisabled');
      }
      
    }
  
  
      jQuery('#rotate-rate').slider({
          slide: rotateAnimateRate
        });
          jQuery('#rotate-rate').width(140);
            jQuery("#rotate-rate").slider("option", "max", 10);
              jQuery("#rotate-rate").slider("option", "value", 2);
            jQuery('#animations .menu').stop().animate({
                 'marginLeft': '-2px'
                 }, 1000);
    
  }
  
  function volumerenderingOnOff(bool) {
  
    if (!volume) {
      return;
    }
    
    volume.volumeRendering = bool;
    
  
  }
  
  function thresholdVolume(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.lowerThreshold = ui.values[0];
    volume.upperThreshold = ui.values[1];
    
  
  }
  
  function windowLevelVolume(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.windowLow = ui.values[0];
    volume.windowHigh = ui.values[1];
    
  
  }
  
  function opacity3dVolume(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.opacity = ui.value / 100;
    
  
  }
  
  function volumeslicingX(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.indexX = Math
        .floor(jQuery('#yellow_slider').slider("option", "value"));
    
  }
  
  function volumeslicingY(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.indexY = Math.floor(jQuery('#red_slider').slider("option", "value"));
    
  }
  
  function volumeslicingZ(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.indexZ = Math.floor(jQuery('#green_slider').slider("option", "value"));
    
  }
  
  function fgColorVolume(hex, rgb) {
  
    if (!volume) {
      return;
    }
    
    volume.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    
  
  }
  
  function bgColorVolume(hex, rgb) {
  
    if (!volume) {
      return;
    }
    
    volume.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    
  
  }
  
  //
  // LABELMAP
  //
  function opacityLabelmap(event, ui) {
  
    if (!volume) {
      return;
    }
    
    volume.labelmap.opacity = ui.value / 100;
    
  
  }
  
  function toggleLabelmapVisibility() {
  
    if (!volume) {
      return;
    }
    
    volume.labelmap.visible = !volume.labelmap.visible;
    
  
  }
  
  //
  // MESH
  //
  function toggleMeshVisibility() {
  
    if (!mesh) {
      return;
    }
    
    mesh.visible = !mesh.visible;
    
  
  }
  
  function meshColor(hex, rgb) {
  
    if (!mesh) {
      return;
    }
    
    mesh.color = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    
  
  }
  
  function opacityMesh(event, ui) {
  
    if (!mesh) {
      return;
    }
    
    mesh.opacity = ui.value / 100;
    
  
  }
  
  function thresholdScalars(event, ui) {
  
    if (!mesh) {
      return;
    }
    
    mesh.scalars.lowerThreshold = ui.values[0] / 100;
    mesh.scalars.upperThreshold = ui.values[1] / 100;
    
  
  }
  
  function scalarsMinColor(hex, rgb) {
  
    if (!mesh) {
      return;
    }
    
    mesh.scalars.minColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    
  
  }
  
  function scalarsMaxColor(hex, rgb) {
  
    if (!mesh) {
      return;
    }
    
    mesh.scalars.maxColor = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
    
  
  }
  
  //
  // Fibers
  //
  function toggleFibersVisibility() {
  
    if (!fibers) {
      return;
    }
    
    fibers.visible = !fibers.visible;
    
  
  }
  
  function thresholdFibers(event, ui) {
  
    if (!fibers) {
      return;
    }
    
    fibers.scalars.lowerThreshold = ui.values[0];
    fibers.scalars.upperThreshold = ui.values[1];
    
  
  }