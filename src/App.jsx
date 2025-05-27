import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage.jsx';
import ImagesPage from './pages/ImagesPage.jsx';

function App() {
   return (
      <div className='p-2'>
         <h1 className='glow_text text-4xl font-bold text-center m-8'>
            HELLO APPWRITE BUCKETS
         </h1>
         <p className='text-md text-blue-950 text-center m-4 max-w-md mx-auto'>
            This is a simple example of how to use APPWRITE BUCKETS to upload and get images with descriptions. Run Wild lets see what crazy images you got..!!!
         </p>

         <Router>
            <Routes>
               <Route
                  path='/'
                  element={<FormPage />}
               />
               <Route
                  path='/images'
                  element={<ImagesPage />}
               />
            </Routes>
         </Router>
      </div>
   );
}

export default App;
