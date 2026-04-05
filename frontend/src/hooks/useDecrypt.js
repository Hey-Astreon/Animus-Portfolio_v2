import { useState, useEffect, useCallback } from 'react';

/**
 * useDecrypt: A lightweight hook for "text-shuffle" decryption effects.
 * Inspired by the Animus/Abstergo data loading aesthetic.
 */
export const useDecrypt = (originalText, trigger = false, speed = 30) => {
  const [displayText, setDisplayText] = useState(originalText);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+<>?';

  const decrypt = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        originalText
          .split('')
          .map((char, index) => {
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [originalText, speed, chars]);

  useEffect(() => {
    if (trigger) {
      decrypt();
    } else {
      setDisplayText(originalText);
    }
  }, [trigger, decrypt, originalText]);

  return displayText;
};
