import React from 'react';
import { Circles } from 'react-loader-spinner';

const LoadingPage = () => {
  return (
    <div className='flex h-[85vh] items-center justify-center'>
      
      <Circles height="80"
width="80"
color="#4fa94d"
ariaLabel="circles-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true} />
    </div>
  );
};

export default LoadingPage;