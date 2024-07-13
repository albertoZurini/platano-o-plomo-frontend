import React, { useEffect, useState } from 'react';
import './MonkeyJump.css';

interface MonkeyJumpProps {
    image: string;
    direction: 'left' | 'right';
    steps: number;
    resetSteps: () => void;
}

const MonkeyJump: React.FC<MonkeyJumpProps> = ({ image, direction, steps, resetSteps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (steps > 0) {
            const interval = setInterval(() => {
                setCurrentStep((prev) => {
                    const nextStep = prev + 1;
                    if (nextStep >= steps) {
                        clearInterval(interval);
                        resetSteps();
                    }
                    return nextStep;
                });
            }, 500); // Time for each step jump
        }
    }, [steps, resetSteps]);

    return (
        <div className={`monkey-container ${direction}`} style={{ transform: `translateX(${currentStep * 100}px)` }}>
            <img src={image} alt="Monkey" className="monkey-image" />
        </div>
    );
};

export default MonkeyJump;
