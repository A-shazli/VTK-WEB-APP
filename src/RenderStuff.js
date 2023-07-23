import '@kitware/vtk.js/favicon';
import vtkWidgetManager from '@kitware/vtk.js/Widgets/Core/WidgetManager';
import vtkImageCroppingWidget from '@kitware/vtk.js/Widgets/Widgets3D/ImageCroppingWidget';
import vtkDistanceWidget from '@kitware/vtk.js/Widgets/Widgets3D/DistanceWidget';
// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import vtkITKImageReader from '@kitware/vtk.js/IO/Misc/ITKImageReader';
import readImageArrayBuffer from 'itk/readImageArrayBuffer'; 
// Force DataAccessHelper to have access to various data source
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
// import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkCubeSource from '@kitware/vtk.js/Filters/Sources/CubeSource';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkPlane from '@kitware/vtk.js/Common/DataModel/Plane';
import vtkAnnotatedCubeActor from '@kitware/vtk.js/Rendering/Core/AnnotatedCubeActor';
import vtkOrientationMarkerWidget from '@kitware/vtk.js/Interaction/Widgets/OrientationMarkerWidget';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
// import { CellGhostTypes } from '@kitware/vtk.js/Common/DataModel/DataSetAttributes';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
// import vtkColorMaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps';
import { vec3, quat, mat4 } from 'gl-matrix';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/Rendering/Profiles/Glyph';
// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [1, 1, 1],
});

// const coneSource = vtkCubeSource.newInstance();
// const mapper1 = vtkMapper.newInstance();
// mapper1.setInputConnection(coneSource.getOutputPort());
// const actor1 = vtkActor.newInstance();
// actor1.setMapper(mapper1);


// 
const renderer = vtkRenderer.newInstance();
renderer.setBackground(0, 0, 0);
renderer.setViewport([0.2, 0.302, 0.599, 1]);

const renderer1 = vtkRenderer.newInstance();
renderer1.setBackground(0, 0, 0, 0);
renderer1.setViewport([0.6, 0.3, 1, 1]);
renderer1.getActiveCamera().setParallelProjection(true)

const rendererI = vtkRenderer.newInstance();
rendererI.setBackground(0, 0, 0);
rendererI.setViewport([0.2, 0, 0.469, 0.3]);
const cameraI = rendererI.getActiveCamera();
cameraI.setViewUp(0, 0, 1) 
cameraI.setPosition(1, 0, 0)



const rendererJ = vtkRenderer.newInstance();
rendererJ.setBackground(0, 0, 0);
rendererJ.setViewport([0.47, 0, 0.739, 0.3]);
const cameraJ = rendererJ.getActiveCamera();
cameraJ.setPosition(0, -1, 0)



const rendererK = vtkRenderer.newInstance();
rendererK.setBackground(0, 0, 0);
rendererK.setViewport([0.74, 0, 1, 0.3]);
const cameraK = rendererK.getActiveCamera();
cameraK.setPosition(0, 0, -1)
cameraK.setViewUp(0, -1, 0) 

export const renderWindow = fullScreenRenderer.getRenderWindow();

renderWindow.getInteractor().setDesiredUpdateRate(15.0);

// const renderer1 = fullScreenRenderer.getRenderer();
// renderer1.addActor(actor1);
// renderer1.resetCamera();
renderWindow.addRenderer(renderer);
renderWindow.addRenderer(renderer1);
renderWindow.addRenderer(rendererI);
renderWindow.addRenderer(rendererJ);
renderWindow.addRenderer(rendererK);

const interactor1 = vtkRenderWindowInteractor.newInstance();
console.log("hu")
console.log(renderWindow.getInteractor())
console.log("hu")
rendererK.setInteractive(0)
rendererI.setInteractive(0)
rendererJ.setInteractive(0)




const actor = vtkVolume.newInstance();
const mapper = vtkVolumeMapper.newInstance({
  sampleDistance: 0.8,
});
actor.setMapper(mapper);

const imageActorI = vtkImageSlice.newInstance();
const imageActorJ = vtkImageSlice.newInstance();
const imageActorK = vtkImageSlice.newInstance();

renderer1.addActor(imageActorK);
renderer1.addActor(imageActorJ);
renderer1.addActor(imageActorI);

rendererI.addActor(imageActorI)
rendererJ.addActor(imageActorJ)
rendererK.addActor(imageActorK)

////////////////////////////////////////////////////////////////////
const overlaySize = 15;
const overlayBorder = 5;
const overlay = document.createElement('div');
overlay.style.position = 'absolute';
overlay.style.width = `${overlaySize}px`;
overlay.style.height = `${overlaySize}px`;
overlay.style.border = `solid ${overlayBorder}px white`;
overlay.style.borderRadius = '100%';
overlay.style.left = '-100px';
overlay.style.pointerEvents = 'none';
document.getElementsByTagName('body')[0].appendChild(overlay);
/////////////////////////////////////////////////////////////////


const widgetManager = vtkWidgetManager.newInstance();
widgetManager.setRenderer(renderer);



const widget = vtkImageCroppingWidget.newInstance();

function widgetRegistration(e) {
  const action = e ? e.currentTarget.dataset.action : 'addWidget';
  const viewWidget = widgetManager[action](widget);
  if (viewWidget) {
    viewWidget.setDisplayCallback((coords) => {
      overlay.style.left = '-100px';
      overlay.style.color = "red"
    });

    renderer.resetCamera();
    renderer.resetCameraClippingRange();
  }
  widgetManager.enablePicking();
  renderWindow.render();
}
widgetRegistration();
//////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////


// const widgetManager = vtkWidgetManager.newInstance();
// widgetManager.setRenderer(renderer);




let isParallel = false;
/*change inner text off i*/
const button = document.getElementById('switch');

export function toggleParallel() {
  isParallel = !isParallel;
  const camera = renderer.getActiveCamera();
  camera.setParallelProjection(isParallel);
  
  renderer.resetCamera();
  
  button.innerText = `(${isParallel ? 'on' : 'off'})`;

  renderWindow.render();
}

let dropArea = document.getElementById('drop-area')

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
  })
  
  function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  ;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
  })
  
  ;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
  })
  
  function highlight(e) {
    dropArea.classList.add('highlight')
  }
  
  function unhighlight(e) {
    dropArea.classList.remove('highlight')
  }

  dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files)
}
function handleFiles(files) {
  ([...files]).forEach(uploadFile)
}


document.getElementById("files").onchange = async function() {
  
  let file = this.files;
  
  handleFiles(file)
  
  // }
  // await reaadern.readAsArrayBuffer(file);
}

async function uploadFile(file) {
  // let reaadern = new FileReader();

  // reaadern.onload = async function () {
    
  let arrayBuffer = await file.arrayBuffer()
  vtkITKImageReader.setReadImageArrayBufferFromITK(readImageArrayBuffer)
  window.niftiReader = vtkITKImageReader.newInstance()
  niftiReader.setFileName(file.name);
  console.log(niftiReader.getFileName())
  niftiReader.update()
  await niftiReader.parseAsArrayBuffer(arrayBuffer).then(() => {
    const imageData = niftiReader.getOutputData();
    console.log(imageData)
    

    const dataArray = imageData.getPointData().getScalars();
    console.log(dataArray)
    const rgbTransferFunction = actor.getProperty().getRGBTransferFunction(0);
    rgbTransferFunction.setRange(...dataArray.getRange());
    mapper.setInputConnection(niftiReader.getOutputPort());
    mapper.setBlendModeToMaximumIntensity();


    // widget.copyImageDataDescription(imageData);
    const cropState = widget.getWidgetState().getCroppingPlanes();
    cropState.onModified(() => {
      const planes = getCroppingPlanes(imageData, cropState.getPlanes());
      mapper.removeAllClippingPlanes();
      planes.forEach((plane) => {
        mapper.addClippingPlane(plane);
        renderWindow.render();
      });
      mapper.modified();
    });
    widget.copyImageDataDescription(imageData);
    
      

    // renderer.getActiveCamera().setViewUp(0, 1, 0);

    // renderer.getActiveCamera().setPosition(0, 0, 800);
    
    // //WIDGET BLOCK will do in 2d mode only
    
    
    // widgetManager.enablePicking();

    // widgetRegistration();
    
    renderer.addVolume(actor);
    renderer.resetCameraClippingRange();
    renderer.resetCamera();
    renderWindow.render();
    
  });
}
/////////////////DISTANCE WIDGET/////////////////////
const widgetManager1 = vtkWidgetManager.newInstance();
widgetManager1.setRenderer(rendererK);
const widget_1 = vtkDistanceWidget.newInstance();


// widget_1.getWidgetState().onModified(() => {
//   console.log(widget_1.getDistance());
//   const lenbtn = document.getElementById('length')
//   lenbtn.style.visibility = "visible";
//   lenbtn.innerText = (widget_1.getDistance()).toFixed(2) + " cm";
// });
// document.getElementById('Distance').addEventListener('click', () => {
//   widgetManager1.grabFocus(widget_1);
  
// });
/////////////////////////////////////////////////////

function getCroppingPlanes(imageData, ijkPlanes) {
  const rotation = quat.create();
  mat4.getRotation(rotation, imageData.getIndexToWorld());

  const rotateVec = (vec) => {
      const out = [0, 0, 0];
      vec3.transformQuat(out, vec, rotation);
      return out;
  };

  const [iMin, iMax, jMin, jMax, kMin, kMax] = ijkPlanes;
  const origin = imageData.indexToWorld([iMin, jMin, kMin]);
  // opposite corner from origin
  const corner = imageData.indexToWorld([iMax, jMax, kMax]);
  return [
      // X min/max
      vtkPlane.newInstance({ normal: rotateVec([1, 0, 0]), origin }),
      vtkPlane.newInstance({ normal: rotateVec([-1, 0, 0]), origin: corner }),
      // Y min/max
      vtkPlane.newInstance({ normal: rotateVec([0, 1, 0]), origin }),
      vtkPlane.newInstance({ normal: rotateVec([0, -1, 0]), origin: corner }),
      // X min/max
      vtkPlane.newInstance({ normal: rotateVec([0, 0, 1]), origin }),
      vtkPlane.newInstance({ normal: rotateVec([0, 0, -1]), origin: corner }),
  ];
}

function updateFlag(e) {
  const value = !!e.target.checked;
  const name = e.currentTarget.dataset.name;
  widget.set({ [name]: value }); // can be called on either viewWidget or parentWidget

  widgetManager.enablePicking();
  renderWindow.render();
}

const elems = document.getElementsByClassName('flag');
for (let i = 0; i < elems.length; i++) {
  elems[i].addEventListener('change', updateFlag);
}
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////SLICER WIDGET//////////////////////////////////////////
function updateColorLevel(e) {
  const colorLevel = Number(
    (e ? e.target : document.getElementById('clevel')).value
  );
  imageActorI.getProperty().setColorLevel(colorLevel);
  imageActorJ.getProperty().setColorLevel(colorLevel);
  imageActorK.getProperty().setColorLevel(colorLevel);
  renderWindow.render();
}


function updateColorWindow(e) {
  const colorLevel = Number(
    (e ? e.target : document.getElementById('wlevel')).value
  );
  imageActorI.getProperty().setColorWindow(colorLevel);
  imageActorJ.getProperty().setColorWindow(colorLevel);
  imageActorK.getProperty().setColorWindow(colorLevel);
  renderWindow.render();
}

function image_slicer_widget() {

  const data = niftiReader.getOutputData();
  const dataRange = data.getPointData().getScalars().getRange();
  const extent = data.getExtent();

  const imageMapperK = vtkImageMapper.newInstance();
  imageMapperK.setInputData(data);
  imageMapperK.setKSlice(75);
  imageActorK.setMapper(imageMapperK);
  cameraK.setParallelProjection(true);
  
  widget_1.placeWidget(niftiReader.getOutputData().getBounds());
  console.log(niftiReader.getOutputData().getBounds())
  widgetManager1.addWidget(widget_1);
  
  widgetManager1.enablePicking();


  const imageMapperJ = vtkImageMapper.newInstance();
  imageMapperJ.setInputData(data);
  imageMapperJ.setJSlice(120);
  imageActorJ.setMapper(imageMapperJ);
  cameraJ.setParallelProjection(true);

  const imageMapperI = vtkImageMapper.newInstance();
  imageMapperI.setInputData(data);
  imageMapperI.setISlice(120);
  imageActorI.setMapper(imageMapperI);
  cameraI.setParallelProjection(true);
  // cameraI.elevation(90)

  

  renderer1.getActiveCamera().setPosition(0.5, 0.5, 0.5)
  renderer1.resetCamera();
  rendererI.resetCamera();
  rendererJ.resetCamera();
  rendererK.resetCamera();
  renderer1.resetCameraClippingRange();
  rendererI.resetCameraClippingRange();
  rendererJ.resetCameraClippingRange();
  rendererK.resetCameraClippingRange();
  cameraI.setParallelScale(90)
  cameraJ.setParallelScale(90)
  cameraK.setParallelScale(100)
  
 
  
  renderWindow.render();
  
  // Setting slider values
  ['I', 'J', 'K'].forEach((selector, idx) => {
    const el = document.getElementById(selector); 
    el.setAttribute('min', extent[idx * 2 + 0]);
    el.setAttribute('max', extent[idx * 2 + 1]);
    el.setAttribute('value', extent[idx * 2 + 1]/2);
  });

  

  document.getElementById("clevel").setAttribute('max', dataRange[1]);
  document.getElementById("clevel").setAttribute('min', dataRange[0]);
  document.getElementById("clevel").setAttribute('value', dataRange[1] * 0.5);
  document.getElementById("wlevel").setAttribute('max', dataRange[1]);
  document.getElementById("wlevel").setAttribute('min', dataRange[0]);
  document.getElementById("wlevel").setAttribute('value', dataRange[1] * 0.65);
  updateColorLevel();
  updateColorWindow();
  // let sliders = ['I', 'J', 'K'];
  // sliders.forEach((slicer) => {
  //   var slider = document.getElementById(slicer);
  //     slider.addEventListener("wheel", function(e){
  //         if (e.deltaY < 0){
  //           slider.valueAsNumber += 1;
  //           imageActorI.getMapper().setISlice(Number(e.target.value));
  //           renderWindow.render();
  //         }else{
  //           slider.value -= 1;
  //           imageActorI.getMapper().setISlice(Number(e.target.value));
  //           renderWindow.render();
  //         }
  //         e.preventDefault();
  //         e.stopPropagation();
  //     })
  //     slider.addEventListener('input', (e) => {
  //       imageActorI.getMapper().setISlice(Number(e.target.value));
  //       renderWindow.render();
  //     });
  //   }); 
  
  document.getElementById('I').addEventListener('input', (e) => {
    imageActorI.getMapper().setISlice(Number(e.target.value));
   
    

    const dims = data.getDimensions();
    const sliceSize = [
      data.getSpacing()[0] * dims[0],
      data.getSpacing()[1] * dims[1],
      data.getSpacing()[2] * dims[2]
    ];
    const distance = Math.max(sliceSize[0], sliceSize[1], sliceSize[2]) ;
    cameraI.setDistance(distance);
    cameraI.setParallelScale(90)
    renderWindow.render();
  });

  document.getElementById('J').addEventListener('input', (e) => {
    imageActorJ.getMapper().setJSlice(Number(e.target.value));
    cameraJ.setParallelProjection(true);
    
    
    const dims = data.getDimensions();
    const sliceSize = [
      data.getSpacing()[0] * dims[0],
      data.getSpacing()[1] * dims[1],
      data.getSpacing()[2] * dims[2]
    ];
    const distance = Math.max(sliceSize[0], sliceSize[1], sliceSize[2]) ;
    cameraJ.setDistance(distance);
    cameraJ.setParallelScale(90)
    renderWindow.render();
  });
  
  document.getElementById('K').addEventListener('input', (e) => {
    imageActorK.getMapper().setKSlice(Number(e.target.value));
    cameraK.setParallelProjection(true);
    
    
    const dims = data.getDimensions();
    const sliceSize = [
      data.getSpacing()[0] * dims[0],
      data.getSpacing()[1] * dims[1],
      data.getSpacing()[2] * dims[2]
    ];
    const distance = Math.max(sliceSize[0], sliceSize[1], sliceSize[2]) ;
    cameraK.setDistance(distance);
    cameraK.setParallelScale(100)
    renderWindow.render();
  });

document.getElementById('clevel').addEventListener('input', updateColorLevel);
document.getElementById('wlevel').addEventListener('input', updateColorWindow);
  
// let c_w_slider = ["clevel", "wlevel"];
// c_w_slider.forEach((val) => {
//   var c_slider = document.getElementById(val);
 
//   c_slider.addEventListener("wheel", function(e){
//         if (e.deltaY < 0){
//           c_slider.valueAsNumber += 1;
//           updateColorLevel()
//           updateColorWindow()
//         }else{
//           c_slider.value -= 1;
//           updateColorLevel()
//           updateColorWindow()
//         }
//         e.preventDefault();
//         e.stopPropagation();
//       })
//   }); 
}

document.getElementById("mult_slice").addEventListener('click', image_slicer_widget)
//////////////////////////////////////////////////////////////////////////////////////

