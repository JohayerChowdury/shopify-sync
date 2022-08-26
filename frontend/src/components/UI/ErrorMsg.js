import React from 'react';

const ErrorMsg = (props) => {
  return (
    <div style={{ padding: '10px' }}>
      <span style={{ color: 'red' }}>
        <b>{props.msg}</b>
      </span>
    </div>
  );
};
export default ErrorMsg;
