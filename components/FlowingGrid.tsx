import React, { useRef, useEffect } from 'react';
import { THEME_COLORS } from '../constants';

const FlowingGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Grid configuration
    const gridSize = 40; // Size of grid cells
    const horizon = canvas.height * 0.4; // Where the "horizon" is
    const speed = 0.02;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      // Clear with a slight fade for trail effect (optional, but clean clear is better for grid)
      ctx.fillStyle = '#0f0505'; // Very dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      
      // Perspective parameters
      const fov = 300;
      const viewY = -100; // Camera height offset

      ctx.strokeStyle = THEME_COLORS.grid;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';

      time += speed;

      ctx.beginPath();

      // We draw a grid on the X-Z plane and project it to 2D
      // Z moves from near (bottom of screen) to far (horizon)
      
      const cols = 40;
      const rows = 40;
      const spacing = 100;

      // Draw Vertical Lines
      for (let x = -cols; x <= cols; x++) {
        // Calculate the base X position in 3D space
        const x3d = x * spacing;
        
        ctx.moveTo(0, 0); // Temporary move, will be overwritten by first point

        let firstPoint = true;

        for (let z = 0; z < rows; z++) {
            // Move Z towards the camera (or away). Let's move away.
            // Add time to Z to make it flow forward
            const currentZ = (z * spacing) - (time * 100) % spacing;
            const z3d = currentZ + 200; // Push it forward so it's in front of camera

            if (z3d <= 0) continue; // Behind camera

            // Create a wave effect on Y (height)
            const dist = Math.sqrt(x3d*x3d + z3d*z3d);
            const y3d = Math.sin(dist * 0.005 - time * 2) * 30 + viewY;

            // Project to 2D
            const scale = fov / (fov + z3d);
            const x2d = (x3d * scale) + width / 2;
            const y2d = (y3d * scale) + height / 2;

            if (firstPoint) {
                ctx.moveTo(x2d, y2d);
                firstPoint = false;
            } else {
                ctx.lineTo(x2d, y2d);
            }
        }
      }

      // Draw Horizontal Lines
      for (let z = 0; z < rows; z++) {
        const currentZ = (z * spacing) - (time * 100) % spacing;
        const z3d = currentZ + 200;

        if (z3d <= 0) continue;

        ctx.moveTo(0,0);
        let firstPoint = true;

        for (let x = -cols; x <= cols; x++) {
            const x3d = x * spacing;

            // Same wave logic
            const dist = Math.sqrt(x3d*x3d + z3d*z3d);
            const y3d = Math.sin(dist * 0.005 - time * 2) * 30 + viewY;

             // Project to 2D
             const scale = fov / (fov + z3d);
             const x2d = (x3d * scale) + width / 2;
             const y2d = (y3d * scale) + height / 2;

            if (firstPoint) {
                ctx.moveTo(x2d, y2d);
                firstPoint = false;
            } else {
                ctx.lineTo(x2d, y2d);
            }
        }
      }

      // Add a glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = THEME_COLORS.primary;
      
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default FlowingGrid;
