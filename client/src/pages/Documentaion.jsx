import React, { useEffect } from 'react';

const Documentation = () => {
  useEffect(() => {
    // Redirect to the specified URL
    window.location.replace('https://documenter.getpostman.com/view/32285870/2sAYBPmEH6');
  }, []);

  return null; // No need to render anything since we're redirecting
};

export default Documentation;
