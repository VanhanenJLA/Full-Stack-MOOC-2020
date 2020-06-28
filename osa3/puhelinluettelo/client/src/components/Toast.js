import React from 'react'

const Toast = ({ toast }) => {

  if (!toast) return null;

  return (
    <div className={`toast-${toast.style} toast`}>
      <p>{toast.message}</p>
    </div>
  )
}
export default Toast;