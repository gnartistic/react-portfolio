import React, { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';
import { useAtom } from "jotai";
import { themeAtom } from "@/state/themeState";
import theme from "@/theme";

const TypewriterText = ({ baseText }: { baseText: string }) => {
  const [currentText, setCurrentText] = useState('');  // The text being displayed
  const [isDeleting, setIsDeleting] = useState(false);  // Track whether it's typing or deleting
  const [typingSpeed, setTypingSpeed] = useState(100);  // Control the speed of typing and deleting
  const [themeName] = useAtom(themeAtom);  // Get the current theme from Jotai

  // Get the active theme's colors from the custom theme
  const activeTheme = theme.colors[themeName] || theme.colors.light;  // Fallback to 'light' theme

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleTyping = () => {
      // If deleting, reduce the text length
      if (isDeleting) {
        setCurrentText((prev) => baseText.substring(0, prev.length - 1));
        setTypingSpeed(50);  // Speed up when deleting
      } else {
        // If typing, increase the text length
        setCurrentText((prev) => baseText.substring(0, prev.length + 1));
        setTypingSpeed(100);  // Normal speed when typing
      }

      // If text has finished typing, wait before deleting
      if (!isDeleting && currentText === baseText) {
        timer = setTimeout(() => setIsDeleting(true), 2000);  // Pause before deleting
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);  // Finished deleting, start typing again
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);  // Cleanup the timer
  }, [currentText, isDeleting, typingSpeed, baseText]);

  return (
    <Text textAlign="right" fontSize={{ base: "30px", lg: "5.80em" }} color={activeTheme.secondary} lineHeight="1">
      {currentText}
      <span className="cursor">|</span>  {/* Cursor effect */}
    </Text>
  );
};

export default TypewriterText;