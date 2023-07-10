import React from 'react';

const DownloadButton = ({ data, filename }) => {
  const handleClick = () => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <button onClick={handleClick}>Download</button>
  );
};

export default DownloadButton;
