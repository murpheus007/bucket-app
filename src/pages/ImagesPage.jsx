import React, { useEffect, useState } from 'react';
import { dbBucket } from '../lib/bucket';
import { projectId } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../components/formatDate.js';

function ImagesPage() {
   const [items, setItems] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            // 1. Get all images (files)
            const filesRes = await dbBucket.getImages();
            console.log('Files:', filesRes);

            // 2. Get all related documents
            const docs = await dbBucket.listDocuments();
            console.log('Documents:', docs);
            // 3. Match each document with its image using fileId
            const merged = docs.documents.map((doc) => {
               const matchingFile = filesRes.files.find(
                  (f) => f.$id === doc.fileId,
               );
               console.log(
                  'Matching file for document:',
                  doc.$id,
                  matchingFile,
               );
               return {
                  ...doc,
                  file: matchingFile,
               };
            });

            setItems(merged);
         } catch (error) {
            console.error('Failed to fetch items:', error);
         }
      };

      fetchData();
   }, []);

   return (
      <div className='flex flex-col items-center justify-center'>
         <button
            onClick={() => navigate('/')}
            className='text-sm text-blue-950 text-center self-center hover:text-blue-200 hover:bg-blue-950 hover:cursor-pointer border border-blue-200 px-4 py-1 rounded'>
            Upload your own image?
         </button>

         <div className='auto-fit-grid gap-2 p-4 max-w-2xl'>
            {items.map(
               (item) =>
                  item.file && (
                     <div
                        key={item.$id}
                        className='border border-blue-100 shadow-xl rounded-md overflow-clip'>
                        <img
                           src={`https://cloud.appwrite.io/v1/storage/buckets/${item.file.bucketId}/files/${item.file.$id}/view?project=${projectId}`}
                           alt={item.file.name}
                           className='w-full object-cover aspect-video'
                        />
                        <div className='mt-2 text-sm p-2'>
                           <div className='flex flex-col justify-start items-start'>
                              <p className='text-blue-950 font-medium'>
                                 Who Posted?
                              </p>
                              <p className='font-bold'>{item.nickname}</p>
                           </div>
                           <div className='flex flex-col justify-start items-start'>
                              <p className='text-blue-950 font-medium'>
                                 {' '}
                                 Reason why?
                              </p>
                              <p className='font-bold'>{item.description}</p>
                           </div>
                           <div className='self-end text-right font-medium text-blue-600'>
                              <p>{formatDate(item.timestamp)}</p>
                           </div>
                        </div>
                     </div>
                  ),
            )}
         </div>
      </div>
   );
}

export default ImagesPage;
