import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
};

type FloatingOrb = {
  x: number;
  y: number;
  size: number;
  color: string;
  angleOffset: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  angle: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
};

type CursorRing = {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  pulseSize: number;
  pulseSpeed: number;
};

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [cursorRing, setCursorRing] = useState<CursorRing>({
    x: 0,
    y: 0,
    size: 30,
    color: '#3B82F6',
    opacity: 0.5,
    pulseSize: 1,
    pulseSpeed: 0.02,
  });
  
  const particlesRef = useRef<Particle[]>([]);
  const floatingOrbsRef = useRef<FloatingOrb[]>([]);
  const animationRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  
  // Initialize particles and orbs
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize particles and orbs on resize
      createParticles();
      createFloatingOrbs();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create particles
    function createParticles() {
      const particles: Particle[] = [];
      const count = Math.min(Math.floor(window.innerWidth * window.innerHeight / 12000), 150);
      
      // Fixed colors for consistency
      const primaryColor = '#3B82F6'; // Blue
      const secondaryColor = '#8B5CF6'; // Purple
      const accentColor = '#06B6D4'; // Cyan
      const tertiaryColor = '#EC4899'; // Pink
      const colors = [primaryColor, secondaryColor, accentColor, tertiaryColor];
      
      // Create particles with varying sizes and speeds
      for (let i = 0; i < count; i++) {
        // Create clusters of particles in certain areas for a more natural look
        let x, y;
        const clusterEffect = Math.random() > 0.3;
        
        if (clusterEffect) {
          // Create a cluster around a random point
          const clusterX = Math.random() * canvas.width;
          const clusterY = Math.random() * canvas.height;
          const radius = 100 + Math.random() * 200;
          
          // Position within the cluster with some gaussian-like distribution
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * radius;
          x = clusterX + Math.cos(angle) * distance;
          y = clusterY + Math.sin(angle) * distance;
        } else {
          // Random position
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
        }
        
        // Vary particle sizes for more visual interest
        const size = Math.random() * 2.5 + 0.8;
        
        // Create some particles with higher speeds for more dynamic movement
        const speedMultiplier = Math.random() > 0.8 ? 1.5 : 1;
        
        particles.push({
          x,
          y,
          size,
          speedX: (Math.random() - 0.5) * 0.5 * speedMultiplier,
          speedY: (Math.random() - 0.5) * 0.5 * speedMultiplier,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      
      particlesRef.current = particles;
    }
    
    // Create floating orbs
    function createFloatingOrbs() {
      // Fixed colors for consistency
      const primaryColor = '#3B82F6'; // Blue
      const secondaryColor = '#8B5CF6'; // Purple
      const accentColor = '#06B6D4'; // Cyan
      const tertiaryColor = '#EC4899'; // Pink
      const quaternaryColor = '#10B981'; // Green
      
      const orbs: FloatingOrb[] = [
        // Top-right primary orb
        {
          x: canvas.width * 0.85,
          y: canvas.height * 0.15,
          size: 38,
          color: primaryColor,
          angleOffset: 0,
          radiusX: 40,
          radiusY: 30,
          speed: 0.003,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.6,
          pulse: 1,
          pulseSpeed: 0.01,
        },
        // Bottom-left secondary orb
        {
          x: canvas.width * 0.15,
          y: canvas.height * 0.85,
          size: 52,
          color: secondaryColor,
          angleOffset: Math.PI / 3,
          radiusX: 50,
          radiusY: 35,
          speed: 0.002,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.6,
          pulse: 1,
          pulseSpeed: 0.005,
        },
        // Middle-right accent orb
        {
          x: canvas.width * 0.85,
          y: canvas.height * 0.5,
          size: 45,
          color: accentColor,
          angleOffset: Math.PI / 6,
          radiusX: 35,
          radiusY: 40,
          speed: 0.0015,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.6,
          pulse: 1,
          pulseSpeed: 0.008,
        },
        // Top-left tertiary orb
        {
          x: canvas.width * 0.20,
          y: canvas.height * 0.20,
          size: 32,
          color: tertiaryColor,
          angleOffset: Math.PI / 4,
          radiusX: 30,
          radiusY: 45,
          speed: 0.0025,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.5,
          pulse: 0,
          pulseSpeed: 0.012,
        },
        // Bottom-right quaternary orb
        {
          x: canvas.width * 0.75,
          y: canvas.height * 0.80,
          size: 34,
          color: quaternaryColor,
          angleOffset: Math.PI / 5,
          radiusX: 45,
          radiusY: 25,
          speed: 0.0018,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.5,
          pulse: 0.5,
          pulseSpeed: 0.007,
        },
        // Center small primary orb
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.3,
          size: 25,
          color: primaryColor,
          angleOffset: Math.PI / 2,
          radiusX: 60,
          radiusY: 30,
          speed: 0.0035,
          angle: Math.random() * Math.PI * 2,
          opacity: 0.4,
          pulse: 0.8,
          pulseSpeed: 0.015,
        },
      ];
      
      floatingOrbsRef.current = orbs;
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      if (isPausedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      const particles = particlesRef.current;
      
      // Draw connections between particles
      ctx.lineWidth = 0.5;
      ctx.lineCap = 'round';
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            // Create gradient line
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            const opacity1 = Math.floor((1 - distance / 120) * 255).toString(16).padStart(2, '0');
            const opacity2 = Math.floor((1 - distance / 120) * 255).toString(16).padStart(2, '0');
            gradient.addColorStop(0, p1.color + opacity1);
            gradient.addColorStop(1, p2.color + opacity2);
            
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = (1 - distance / 120) * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      // Update and draw each particle
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Mouse repulsion
        if (mousePosition) {
          const dx = p.x - mousePosition.x;
          const dy = p.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            const force = (80 - distance) / 80;
            p.speedX += (dx / distance) * force * 0.2;
            p.speedY += (dy / distance) * force * 0.2;
          }
          
          // Apply slight velocity dampening for stability
          p.speedX *= 0.99;
          p.speedY *= 0.99;
        }
        
        // Draw particle with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow for better performance
        ctx.shadowBlur = 0;
      }
      
      // Update and draw floating orbs
      const orbs = floatingOrbsRef.current;
      
      for (const orb of orbs) {
        // Update orb position in an elliptical orbit
        orb.angle += orb.speed;
        const actualX = orb.x + Math.cos(orb.angle + orb.angleOffset) * orb.radiusX;
        const actualY = orb.y + Math.sin(orb.angle + orb.angleOffset) * orb.radiusY;
        
        // Update pulse
        orb.pulse += orb.pulseSpeed;
        const scaleFactor = 0.9 + Math.sin(orb.pulse) * 0.1;
        const actualSize = orb.size * scaleFactor;
        orb.opacity = 0.5 + Math.sin(orb.pulse) * 0.1;
        
        // Draw orb with glow effect
        const gradient = ctx.createRadialGradient(
          actualX, actualY, 0,
          actualX, actualY, actualSize
        );
        
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.globalAlpha = orb.opacity;
        ctx.shadowBlur = 20;
        ctx.shadowColor = orb.color;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(actualX, actualY, actualSize, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
      
      // Draw cursor ring
      if (mousePosition) {
        // Update pulse
        cursorRing.pulseSize += cursorRing.pulseSpeed;
        const ringScaleFactor = 0.9 + Math.sin(cursorRing.pulseSize) * 0.1;
        const actualSize = cursorRing.size * ringScaleFactor;
        
        // Draw glow ring
        const ringGradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, actualSize
        );
        
        ringGradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
        ringGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
        ringGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = ringGradient;
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, actualSize, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition]);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update cursor ring
      setCursorRing(prev => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    };
    
    const handleMouseLeave = () => {
      setMousePosition(null);
    };
    
    const handleVisibilityChange = () => {
      isPausedRef.current = document.hidden;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}