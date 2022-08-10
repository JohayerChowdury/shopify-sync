import React from 'react';

const SuccessMsg = (props) => {
  return (
    <div style={{ padding: '20px', margin: '10px', border: '1px solid green' }}>
      <span style={{ color: 'green' }}>
        <b>{props.msg}</b>
      </span>
    </div>
  );
};
export default SuccessMsg;
