import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  alpha: number;
}

interface ParticleBackgroundProps {
  particleDensity?: number;
  connectionDistance?: number;
  mouseRepelRadius?: number;
  mouseRepelStrength?: number;
}

export function ParticleBackground({
  particleDensity = 0.05,
  connectionDistance = 150,
  mouseRepelRadius = 100,
  mouseRepelStrength = 0.1
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Colors based on theme
  const primaryColor = isDark ? 'hsl(207, 90%, 64%)' : 'hsl(207, 90%, 54%)';
  const secondaryColor = isDark ? 'hsl(277, 81%, 73%)' : 'hsl(277, 81%, 63%)';
  const accentColor = isDark ? 'hsl(195, 83%, 73%)' : 'hsl(195, 83%, 63%)';
  const tertiaryColor = isDark ? 'hsl(350, 100%, 76%)' : 'hsl(350, 100%, 66%)';
  
  // Mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  
  // Animation state
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>(0);
  const orbs = useRef([
    { x: 0, y: 0, size: 32, color: primaryColor, angle: 0, radius: 20, initialX: 0, initialY: 0 },
    { x: 0, y: 0, size: 48, color: secondaryColor, angle: Math.PI/3, radius: 30, initialX: 0, initialY: 0 },
    { x: 0, y: 0, size: 40, color: accentColor, angle: Math.PI/1.5, radius: 25, initialX: 0, initialY: 0 },
  ]);
  
  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize particles on resize
      initParticles();
      
      // Position orbs
      orbs.current[0].initialX = canvas.width - 100;
      orbs.current[0].initialY = 100;
      
      orbs.current[1].initialX = 100;
      orbs.current[1].initialY = canvas.height - 100;
      
      orbs.current[2].initialX = canvas.width - 150;
      orbs.current[2].initialY = canvas.height / 2;
    };
    
    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.floor(window.innerWidth * particleDensity);
      particles.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          color: getRandomColor(),
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          alpha: Math.random() * 0.5 + 0.3
        });
      }
    };
    
    // Get random color from theme colors
    const getRandomColor = () => {
      const colors = [primaryColor, secondaryColor, accentColor, tertiaryColor];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Draw grid pattern
    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;
      
      const gridSize = 30;
      
      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      ctx.restore();
    };
    
    // Update and animate orbs
    const updateOrbs = (timestamp: number) => {
      orbs.current.forEach((orb, index) => {
        // Update orbit position
        orb.angle += 0.002;
        orb.x = orb.initialX + Math.cos(orb.angle) * orb.radius;
        orb.y = orb.initialY + Math.sin(orb.angle) * orb.radius;
        
        // Pulsate size and opacity
        const scale = 1 + 0.2 * Math.sin(timestamp * 0.001 + index);
        
        // Draw orb with glow
        ctx.save();
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size * scale * 1.5
        );
        
        gradient.addColorStop(0, orb.color.replace(')', ', 0.6)').replace('hsl', 'hsla'));
        gradient.addColorStop(1, orb.color.replace(')', ', 0)').replace('hsl', 'hsla'));
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(orb.x, orb.y, orb.size * scale * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.fillStyle = orb.color;
        ctx.globalAlpha = 0.8 + 0.2 * Math.sin(timestamp * 0.002 + index * 2);
        ctx.arc(orb.x, orb.y, orb.size * scale * 0.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };
    
    // Draw gradient background
    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (isDark) {
        gradient.addColorStop(0, 'rgba(15, 23, 42, 1)'); // Dark blue
        gradient.addColorStop(1, 'rgba(23, 21, 35, 1)'); // Dark purple
      } else {
        gradient.addColorStop(0, 'rgba(240, 249, 255, 1)'); // Light blue
        gradient.addColorStop(1, 'rgba(249, 240, 255, 1)'); // Light purple
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Draw mouse cursor effect
    const drawMouseEffect = () => {
      if (!isMouseInCanvas) return;
      
      // Glow ring
      ctx.save();
      const radius = 40 + Math.sin(Date.now() * 0.003) * 10;
      const gradient = ctx.createRadialGradient(
        mousePosition.x, mousePosition.y, 0,
        mousePosition.x, mousePosition.y, radius
      );
      
      gradient.addColorStop(0, isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 255, 0.2)');
      gradient.addColorStop(1, isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 255, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(mousePosition.x, mousePosition.y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    
    // Draw particles and connections
    const drawParticles = () => {
      // Update and draw particles
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        // Mouse repulsion
        if (isMouseInCanvas) {
          const dx = particle.x - mousePosition.x;
          const dy = particle.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRepelRadius) {
            const force = (mouseRepelRadius - distance) / mouseRepelRadius;
            const angle = Math.atan2(dy, dx);
            particle.x += Math.cos(angle) * force * mouseRepelStrength;
            particle.y += Math.sin(angle) * force * mouseRepelStrength;
          }
        }
        
        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Draw connections
      ctx.save();
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              particles.current[i].x, particles.current[i].y,
              particles.current[j].x, particles.current[j].y
            );
            
            gradient.addColorStop(0, particles.current[i].color.replace(')', ', ' + (opacity * 0.5) + ')').replace('hsl', 'hsla'));
            gradient.addColorStop(1, particles.current[j].color.replace(')', ', ' + (opacity * 0.5) + ')').replace('hsl', 'hsla'));
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = opacity * 1.5;
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    };
    
    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw layers in order
      drawBackground();
      drawGrid();
      drawParticles();
      updateOrbs(timestamp);
      drawMouseEffect();
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const handleMouseEnter = () => {
      setIsMouseInCanvas(true);
    };
    
    const handleMouseLeave = () => {
      setIsMouseInCanvas(false);
    };
    
    // Add event listeners
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Initialize
    resizeCanvas();
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isDark, primaryColor, secondaryColor, accentColor, tertiaryColor, particleDensity, connectionDistance, mouseRepelRadius, mouseRepelStrength]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-auto" 
      style={{ opacity: 0.9 }}
    />
  );
}