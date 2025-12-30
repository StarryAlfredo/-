import React, { useRef, useEffect } from 'react';
import { THEME_COLORS } from '../constants';

/**
 * Pure JavaScript Class for Canvas Rendering.
 * Strictly decoupled from React logic to ensure performance and simplicity.
 */
class GridRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number = 0;
  private time: number = 0;
  private width: number = 0;
  private height: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error("Could not get 2D context");
    this.ctx = context;
    
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  public start() {
    this.animate();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize.bind(this));
  }

  private animate() {
    this.render();
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  private render() {
    this.time += 0.015;
    
    // Clear Background
    this.ctx.fillStyle = THEME_COLORS.bg;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Grid Settings
    const fov = 350;
    const viewY = -150;
    const gridSize = 60; // Spacing
    const rows = 30;
    const cols = 40;
    const speed = 80; // Movement speed

    this.ctx.lineWidth = 1.5;
    this.ctx.lineCap = 'round';

    // Helper to project 3D point to 2D
    const project = (x: number, y: number, z: number) => {
      const scale = fov / (fov + z);
      return {
        x: (x * scale) + this.width / 2,
        y: (y * scale) + this.height / 2,
        scale: scale
      };
    };

    // Draw Vertical Lines
    for (let i = -cols; i <= cols; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = i === 0 ? THEME_COLORS.gridHighlight : THEME_COLORS.grid;
      
      for (let j = 0; j < rows; j++) {
        // Z moves towards us, modulo for infinite loop
        const z = (j * gridSize) - (this.time * speed) % gridSize + 100;
        const x = i * gridSize;
        // Wavy effect
        const y = viewY + Math.sin((x + this.time * 200) * 0.002) * 20;

        const p = project(x, y, z);
        
        if (z > 0) {
           if (j === 0) this.ctx.moveTo(p.x, p.y);
           else this.ctx.lineTo(p.x, p.y);
        }
      }
      this.ctx.stroke();
    }

    // Draw Horizontal Lines
    for (let j = 0; j < rows; j++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = THEME_COLORS.grid;

      // Calculate Z for this row
      const zBase = (j * gridSize) - (this.time * speed) % gridSize + 100;
      if (zBase <= 0) continue;

      let first = true;
      for (let i = -cols; i <= cols; i++) {
        const x = i * gridSize;
        const y = viewY + Math.sin((x + this.time * 200) * 0.002) * 20;
        const p = project(x, y, zBase);

        if (first) {
            this.ctx.moveTo(p.x, p.y);
            first = false;
        } else {
            this.ctx.lineTo(p.x, p.y);
        }
      }
      
      // Distance Fade
      const alpha = Math.max(0, 1 - zBase / (rows * gridSize * 0.6));
      this.ctx.globalAlpha = alpha;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1.0;
    }
  }
}

const FlowingGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GridRenderer | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize pure JS renderer
    rendererRef.current = new GridRenderer(canvasRef.current);
    rendererRef.current.start();

    return () => {
      rendererRef.current?.stop();
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