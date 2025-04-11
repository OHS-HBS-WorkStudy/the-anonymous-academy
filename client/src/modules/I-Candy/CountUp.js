import React, { useRef, useEffect } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

export default function CountUpComponent({ endValue, duration }) {
  const countUpRef = useRef(null);

  const handleVisibilityChange = (isVisible) => {
    if (isVisible && countUpRef.current) {
      countUpRef.current.start();
    }
  };

  return (
    <VisibilitySensor onChange={handleVisibilityChange} partialVisibility>
      <CountUp end={endValue} duration={duration} ref={countUpRef} />
    </VisibilitySensor>
  );
}