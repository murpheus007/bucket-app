import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbBucket } from '../lib/bucket.js';
import ShowModal from '../components/ShowModal.jsx';

const FormPage = () => {
   const navigate = useNavigate();
   const [nickname, setNickname] = useState('');
   const [description, setDescription] = useState('');
   const [image, setImage] = useState('');
   const [loading, setLoading] = useState(false);
   const [modal, setModal] = useState({
      visible: false,
      title: '',
      message: '',
   });

   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);
      const dateStarted = new Date().toISOString();
      try {
         const file = await dbBucket.createImage({
            file: image,
         });

         await dbBucket.createDocument({
            data: {
               nickname: nickname,
               description: description,
               fileId: file.$id,
               timestamp: dateStarted,
            },
         });

         setModal({
            title: 'Success',
            message: 'Image and description uploaded successfully!',
            visible: true,
         });
      } catch (error) {
         console.error('Error uploading image:', error);

         setModal({
            title: 'Failed',
            message:
               'Failed to upload image and description. Please try again.',
            visible: true,
         });
         return;
      } finally {
         setLoading(false);
         setNickname('');
         setDescription('');
         setImage('');
      }

      console.log('Form submitted');
   };

   if (modal.visible)
      return (
         <ShowModal
            {...modal}
            onClose={() => setModal({ ...modal, visible: false })}
         />
      );

   return (
      <form
         onSubmit={handleSubmit}
         className='flex flex-col items-start px-4 py-8 space-y-4 bg-white border-2 rounded-sm shadow-md max-w-md mx-auto'>
         <div className='flex flex-col w-full'>
            <label className='w-full mb-2 text-sm font-medium text-blue-900'>
               Enter your nickname:
            </label>
            <input
               type='text'
               className='w-full border border-blue-200 bg-blue-50 rounded-md px-4 py-2 text-sm'
               placeholder='Nickname'
               value={nickname}
               onChange={(e) => setNickname(e.target.value)}
               required
            />
         </div>
         <div className='flex flex-col  w-full'>
            <label className='w-full mb-2 text-sm font-medium text-blue-900'>
               Enter your description:
            </label>
            <input
               type='text'
               className='w-full border border-blue-200 bg-blue-50 rounded-md px-4 py-2 text-sm'
               placeholder='Description'
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               required
            />
         </div>
         <div className='flex flex-col w-full'>
            <label className='w-full mb-2 text-sm font-medium text-blue-900'>
               Select an Image:
            </label>
            <input
               type='file'
               accept='image/*,.pdf'
               onChange={(e) => setImage(e.target.files[0])}
               className='w-full border border-blue-200 bg-blue-50 rounded-md px-4 py-2 text-sm'
               required
            />
         </div>

         <button
            type='submit'
            className={`${
               loading ? 'active-button' : 'inactive-button'
            } w-full text-white font-semibold py-2 px-4 rounded-md  hover:cursor-pointer transition-colors duration-200`}>
            {loading ? 'Uploading...' : 'Upload'}
         </button>

         <p
            onClick={() => navigate('/images')}
            className='text-sm text-blue-950 text-center self-center hover:text-blue-500 hover:cursor-pointer'>
            See Images
         </p>
      </form>
   );
};

export default FormPage;
