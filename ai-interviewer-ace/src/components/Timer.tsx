import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimerProps {
  timeLimit: number; // in seconds
  onTimeUp: () => void;
}

const Timer = ({ timeLimit, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / timeLimit) * 100;
  const isWarning = percentage <= 25;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-3"
    >
      <div className="relative">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-muted"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className={isWarning ? 'text-destructive' : 'text-primary'}
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            animate={isWarning ? { opacity: [1, 0.6, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Clock className={`h-5 w-5 ${isWarning ? 'text-destructive' : 'text-primary'}`} />
        </div>
      </div>
      <div>
        <div className={`text-2xl font-bold ${isWarning ? 'text-destructive' : 'text-foreground'}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground">Time Left</div>
      </div>
    </motion.div>
  );
};

export default Timer;
