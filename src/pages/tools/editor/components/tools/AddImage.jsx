import { fabric } from 'fabric'
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddImage = ({ canvas }) => {
 const handleImage = (e) => {
 const reader = new FileReader();
 reader.onload = (event) => {
   const imgObj = new Image();
   imgObj.src = event.target.result;
   imgObj.onload = () => {
     const fabricImage = new fabric.Image(imgObj);
     fabricImage.set({
       angle: 0,
       padding: 10,
       selectable: true,
       cornerColor: 'rgba(255, 255, 255, 0.7)', // set the color of the corners
       cornerStrokeColor: 'rgb(0, 0, 0)', // set the color of the corners
       transparentCorners: false, // make the corners not transparent
       borderColor: 'rgb(43, 0, 78)', // set the color of the border
       cornerStyle: 'circle', // set the style of the corners
       cornerSize: 40
     });
     canvas.centerObject(fabricImage);
     canvas.add(fabricImage);
     canvas.setActiveObject(fabricImage);
     canvas.renderAll();
   }
 }
 reader.readAsDataURL(e.target.files[0]);
 }

 return (
  <li className='text-[--light] text-[1vw]'>
  <div className='flex flex-col items-center cursor-pointer'>
    <label className='flex flex-col items-center cursor-pointer' htmlFor="file_input">
      <FaCloudUploadAlt className='text-[2vw]' />
      Uploads
    </label>
    <input className='hidden' id="file_input" type="file" onChange={handleImage} />
  </div>
</li>
 );
}

export default AddImage