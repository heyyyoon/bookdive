import React, { useState } from 'react';
import Login from './Login';
import '../index.css';

function Modal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-96 bg-white border-2 p-8 z-10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="modal-content">
            <Login />
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    </div>
  );
}

export default Modal;
