import { Portfolio3DScene } from './three-scene';
import { PortfolioApp } from './app';

declare global {
  interface Window {
    portfolioScene?: Portfolio3DScene;
    portfolioApp?: PortfolioApp;
  }
}

function bootstrap(): void {
  const canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement | null;
  if (canvas) {
    try {
      window.portfolioScene = new Portfolio3DScene(canvas);
    } catch (err) {
      console.error('Failed to initialize 3D scene:', err);
    }
  }

  window.portfolioApp = new PortfolioApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
