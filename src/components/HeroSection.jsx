import React, {useEffect, useState} from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [typewriterText, setTypewriterText] = useState('');
  const phrases = ["faster", "tailored", "more powerful"];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  useEffect(() => {
    const typeSpeed = 200; // Speed of typing in milliseconds
    const eraseSpeed = 200; // Speed of erasing in milliseconds
    const delayBetweenPhrases = 3000; // Delay between phrases in milliseconds

    const type = () => {
      const currentPhrase = phrases[phraseIndex];
      const showText = isDeleting ? currentPhrase.substring(0, charIndex--) : currentPhrase.substring(0, charIndex++);

      setTypewriterText(showText);

      let typeSpeedVar = isDeleting ? eraseSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end of phrase
        typeSpeedVar = delayBetweenPhrases;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to the next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length; // Loop back to the first phrase
      }

      setTimeout(type, typeSpeedVar);
    };

    type();
  }, []);
  
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-40">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Your resume, <br /> but <span id="typewriter">{typewriterText}</span>
        <span id="cursor" className="cursor">|</span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Empower your creativity and bring your VR app ideas to life with our
        intuitive development tools. Get started today and turn your imagination
        into immersive reality!
      </p>
      <div className="flex justify-center my-10 space-x-12 items-center">
        <a
          href="#"
          className="bg-gradient-to-r from-yellow-100 to-green-200 py-3 px-4 border rounded-lg"
        >
          Get Started
        </a>
        <a href="#" className="bg-gradient-to-r from-green-200 to-blue-400 py-3 px-4 rounded-lg">
          Sign In
        </a>
      </div>
    </div>
  );
};

export default HeroSection;