import React, { useEffect } from 'react';

const Documentation = () => {
  useEffect(() => {
    // Redirect to the specified URL
    window.location.replace('https://documenter.getpostman.com/view/32285870/2sAYBPmECc#03dc9854-8836-41a9-b65e-b0ec5becd4d3');
  }, []);

  return null; // No need to render anything since we're redirecting
};

export default Documentation;
