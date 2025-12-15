
import React, { useEffect, useRef } from 'react';

export const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const particles: any[] = [];
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];

    // Create explosion from center
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 25 + 5;
      
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 100,
        decay: Math.random() * 0.03 + 0.015,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let particlesAlive = false;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        if (p.life > 0) {
          particlesAlive = true;
          p.life -= p.decay;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.5; // Gravity
          p.rotation += p.rotationSpeed;
          
          // Air resistance
          p.vx *= 0.95;
          p.vy *= 0.95;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life / 100);
          
          // Draw confetti shape (rectangle)
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      }
      
      if (particlesAlive) {
         animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
};
