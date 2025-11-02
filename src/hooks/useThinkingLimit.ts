// hooks/useThinkingLimit.ts
import { useState, useEffect } from 'react';

interface ThinkingLimit {
  count: number;
  date: string;
}

export function useThinkingLimit() {
  const [remainingThinking, setRemainingThinking] = useState(3);
  const [isThinkingEnabled, setIsThinkingEnabled] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('thinking-limit');
    const today = new Date().toDateString();

    if (stored) {
      const data: ThinkingLimit = JSON.parse(stored);
      
      // Reset if different day
      if (data.date !== today) {
        const newData: ThinkingLimit = { count: 3, date: today };
        localStorage.setItem('thinking-limit', JSON.stringify(newData));
        setRemainingThinking(3);
      } else {
        setRemainingThinking(data.count);
      }
    } else {
      // First time
      const newData: ThinkingLimit = { count: 3, date: today };
      localStorage.setItem('thinking-limit', JSON.stringify(newData));
    }
  }, []);

  const consumeThinking = () => {
    if (remainingThinking > 0) {
      const today = new Date().toDateString();
      const newCount = remainingThinking - 1;
      const newData: ThinkingLimit = { count: newCount, date: today };
      
      localStorage.setItem('thinking-limit', JSON.stringify(newData));
      setRemainingThinking(newCount);
      return true;
    }
    return false;
  };

  const canUseThinking = remainingThinking > 0 && isThinkingEnabled;

  return {
    remainingThinking,
    isThinkingEnabled,
    setIsThinkingEnabled,
    consumeThinking,
    canUseThinking,
  };
}
