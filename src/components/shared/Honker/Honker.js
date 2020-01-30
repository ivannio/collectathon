import React, { useState } from 'react';
import honkify from 'honkify';

const Honker = () => {
  const initialState = { active: false, unregister: () => {} };
  const [honk, setHonk] = useState(initialState);
  const toggleHonk = () => {
    if (!honk.active) {
      const unregister = honkify();
      setHonk({ active: true, unregister });
    }
    if (honk.active) {
      honk.unregister();
      setHonk(initialState);
    }
  };
  return (
    <div className="honk">
            <p className="honk-text">{honk.active ? 'unhonk' : 'honk'}</p><span className="honk-icon">{honk.active ? <i className="fas fa-volume-down fa-4x" onClick={toggleHonk}></i> : <i className="fas fa-volume-up fa-4x" onClick={toggleHonk}></i>}</span>
          </div>
  );
};
export default Honker;
