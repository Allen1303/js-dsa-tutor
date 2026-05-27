import React, { useEffect, useState } from "react";

export default function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = [
      "bg-red-500",
      "bg-yellow-400",
      "bg-blue-500",
      "bg-emerald-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-400",
    ];

    // Generate 45 celebratory particle pieces with varying drop patterns
    const newPieces = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Horizontal coordinate percent
      y: -10 - Math.random() * 20, // Initial offset above target view
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 0.6,
    }));

    setPieces(newPieces);

    // Fade out after completion
    const timer = setTimeout(() => {
      setPieces([]);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className={`absolute w-3 h-3 rounded-sm ${p.color} shadow-sm animate-bounce`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: `scale(${p.scale}) rotate(${Math.random() * 360}deg)`,
            opacity: 0.9,
            animation: `fall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
