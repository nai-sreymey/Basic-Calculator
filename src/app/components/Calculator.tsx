'use client';

import { useState } from 'react';

const Calculator = () => {
  const [result, setResult] = useState<string>('');

  const handleClick = (value: string) => {
    if (value === '=') {
      if (!result.trim() || /[^0-9.+\-*/()]/.test(result)) {
        return;
      }
      try {
        setResult(eval(result).toString());
      } catch (error) {
        return;
      }
      return;
    }
    if (value === 'C') {
      setResult('');
      return;
    }
    setResult((prev) => {
      if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(prev.slice(-1))) {
        return prev.slice(0, -1) + value;
      }
      return prev + value;
    });
  };

  return (
    <div className="w-[450px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-xl p-6">
      <h2 className="text-center text-2xl font-semibold text-white mb-4">Basic Calculator</h2>
      <div className="mb-4">
        <input
          type="text"
          value={result}
          readOnly
          className="w-full bg-white text-right text-3xl p-3 rounded border border-gray-400 focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "/", "0", ".", "=", "*", "C"].map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={`p-4 text-xl font-medium rounded border border-gray-400 transition-all duration-200 ${
              btn === "=" ? "bg-green-500 text-white hover:bg-green-600" :
              btn === "C" ? "bg-red-500 text-white hover:bg-red-600" :
              ["+", "-", "*", "/"].includes(btn) ? "bg-orange-500 text-white hover:bg-orange-700" : "bg-white hover:bg-gray-300"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
