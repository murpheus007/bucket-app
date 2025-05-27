import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowModal = ({ visible = true, title = '', message = '', onClose }) => {
   const modal = {
      visible,
      title,
      message,
      onClose,
   };

   const navigate = useNavigate();

   if (!modal.visible) return null;

   return (
      <div className='fixed inset-0 flex items-center justify-center z-50 bg-black/50'>
         <div className='bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md text-center'>
            <h2 className='text-xl font-semibold mb-4'>{modal.title}</h2>
            <p className='text-gray-700 mb-6'>{modal.message}</p>
            <div className='flex justify-center space-x-4'>
               <button
                  className='modal-button'
                  onClick={() => navigate('/images')}>
                  {' '}
                  See Image{' '}
               </button>
               <button
                  onClick={modal.onClose}
                  className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded hover:cursor-pointer'>
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};

export default ShowModal;
