import React from 'react';

const TextMaxLength = ({ text } : any) => {
  const MAX_LENGTH = 70;

  return (
    <span>
      {text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + '...' : text}
    </span>
  );
};

export default TextMaxLength;