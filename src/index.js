import { toggleParallel, renderWindow } from './RenderStuff'
import './styles/main.scss'
import Brain from './assets/Brain.svg'
import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import vtkOrientationMarkerWidget from '@kitware/vtk.js/Interaction/Widgets/OrientationMarkerWidget';
import vtkAnnotatedCubeActor from '@kitware/vtk.js/Rendering/Core/AnnotatedCubeActor';
const BrainImg = document.getElementById('brainImg')
BrainImg.src = Brain

const LoadBtn = document.getElementById('Toggle_parallel')
LoadBtn.addEventListener('click', toggleParallel)

///////////////////////////SETUP THE ORIENTATION CUBE/////////////////////////////////
const axes = vtkAnnotatedCubeActor.newInstance();
axes.setDefaultStyle({
  text: '+X',
  fontStyle: 'bold',
  fontFamily: 'Arial',
  fontColor: 'black',
  fontSizeScale: (res) => res / 2,
  faceColor: '#99CC99',
  faceRotation: 0,
  edgeThickness: 0.1,
  edgeColor: 'black',
  resolution: 400,
});
// axes.setXPlusFaceProperty({ text: '+X' });
axes.setXMinusFaceProperty({
  text: '-X',
  faceColor: '#99CC99',
  faceRotation: 90,
  fontStyle: 'italic',
});
axes.setYPlusFaceProperty({
  text: '+Y',
  faceColor: '#993300',
  fontSizeScale: (res) => res / 4,
});
axes.setYMinusFaceProperty({
  text: '-Y',
  faceColor: '#993300',
  fontColor: 'white',
});
axes.setZPlusFaceProperty({
    text: '+Z',
    faceColor: '#FFFF00',
     edgeColor: 'yellow',
});
axes.setZMinusFaceProperty({
    text: '-Z',
    faceColor: '#FFFF00',
    faceRotation: 45,
    edgeThickness: 0
});

// create orientation widget
const orientationWidget = vtkOrientationMarkerWidget.newInstance({
  actor: axes,
  interactor: renderWindow.getInteractor(),
});
orientationWidget.setEnabled(true);
orientationWidget.setViewportCorner(
  vtkOrientationMarkerWidget.Corners.TOP_RIGHT
);
orientationWidget.setViewportSize(0.10);
orientationWidget.setMinPixelSize(100);
orientationWidget.setMaxPixelSize(300);

renderWindow.render();
/////////////////////////////////////////////////////////////////////////////
  



  
