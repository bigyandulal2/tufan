import React from 'react';
import '../../style/index.css'; // make sure this includes your @font-face

const SplashScreen = () => {
  return (
    <div
      style={{
        backgroundColor: '#f97316',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <h1
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: '13rem',
          color: 'black',
        }}
      >
        Tufan
      </h1>
    </div>
  );
};

export default SplashScreen;
