import { useState, useEffect } from 'react';


// The scroll distance (in pixels) before the hiding effect is activated.
const THRESHOLD = 200;

function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState('up'); 

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      // Always show header at the very top
      if (scrollY <= THRESHOLD) {
        setScrollDirection('up'); 
        lastScrollY = scrollY;
        return;
      }

      // Scroll down (Y increases) -> Hide header
      if (scrollY > lastScrollY) {
        setScrollDirection('down');
      } 
      // Scroll up (Y decreases) -> Show header
      else if (scrollY < lastScrollY) {
        setScrollDirection('up');
      }

      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', updateScrollDirection);
    
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []); 

  return scrollDirection;
}

export default useScrollDirection;