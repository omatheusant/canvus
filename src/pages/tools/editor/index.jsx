import { useState, useEffect } from 'react';

import { fabric } from 'fabric';

import { Header } from './components/Header';
import { SideBar } from './components/SideBar';

import { AddImage } from './components/tools/AddImage';
import { AddText } from './components/tools/AddText';
import { Resize } from './components/tools/Resize';
import { Background } from './components/tools/Background';
import { Eraser } from './components/tools/Eraser';

const Editor = () => {
  const [canvas, setCanvas] = useState(null);
 const [size, setSize] = useState({ width: 1700, height: 1200 });

 const initCanvas = () => {
   if (canvas) {
     canvas.dispose();
   }
   const newCanvas = new fabric.Canvas('canvas', {
     height: size.height,
     width: size.width,
     backgroundColor: 'white'
   });
   setCanvas(newCanvas);
 };

 useEffect(() => {
   initCanvas();
 }, [size]);

 useEffect(() => {
   if (canvas) {
     const handleKeyDown = (e) => {
       if (e.key === 'Delete') {
         const activeObjects = canvas.getActiveObjects();
         if (activeObjects.length > 0) {
           canvas.discardActiveObject();
           canvas.remove(...activeObjects);
           canvas.requestRenderAll();
         }
       }
     };

     window.addEventListener('keydown', handleKeyDown);

     return () => {
       window.removeEventListener('keydown', handleKeyDown);
     };
   }
 }, [canvas]);

 useEffect(() => {
   if (canvas) {
     const handleDoubleClick = (e) => {
       const target = canvas.findTarget(e);
       if (target) {
         canvas.bringToFront(target);
         canvas.requestRenderAll();
       }
     };

     canvas.on('mouse:dblclick', handleDoubleClick);

     return () => {
       canvas.off('mouse:dblclick', handleDoubleClick);
     };
   }
 }, [canvas]);

 return (
   <>
     <Header canvas={canvas} />
     <SideBar>
       <Resize setSize={setSize} />
       <AddText canvas={canvas} />
       <AddImage canvas={canvas} />
       <Eraser canvas={canvas} />
       <Background canvas={canvas} />
     </SideBar>

     <div className='w-full mt-10 flex justify-center z-0'>
       <canvas id="canvas"></canvas>
     </div>
   </>
 );
}

export default Editor