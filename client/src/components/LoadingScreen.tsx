import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { 
  Bolt, 
  Code, 
  Layers, 
  Smartphone, 
  Sparkles, 
  Star, 
  Zap,
  Gem,
  CircleDot,
  ScanLine,
  FlaskConical,
  Orbit
} from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  blur?: boolean;
  icon?: boolean;
  iconType?: number;
}

const LoadingScreen = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [waveParticles, setWaveParticles] = useState<Particle[]>([]);
  const [orbitParticles, setOrbitParticles] = useState<Particle[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random particles for the background
  useEffect(() => {
    const colors = ["primary", "purple", "blue", "violet", "indigo", "green"];
    const iconTypes = [0, 1, 2, 3]; // Different icon types
    
    // Standard floating particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      blur: Math.random() > 0.8, // Some particles are blurred
      icon: Math.random() > 0.85, // Some particles are icons
      iconType: iconTypes[Math.floor(Math.random() * iconTypes.length)]
    }));
    
    // Wave-like particles at the bottom
    const newWaveParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i + 100,
      x: (i / 20) * 100, // Evenly distribute horizontally
      y: 90 + Math.random() * 10, // Position at the bottom
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2
    }));
    
    // Orbit particles around the logo
    const orbitCount = 12;
    const newOrbitParticles = Array.from({ length: orbitCount }, (_, i) => ({
      id: i + 200,
      x: 50, // Center X (will be positioned via transform)
      y: 50, // Center Y (will be positioned via transform)
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: i * (2 / orbitCount), // Staggered delays
      duration: 5 + Math.random() * 3
    }));
    
    setParticles(newParticles);
    setWaveParticles(newWaveParticles);
    setOrbitParticles(newOrbitParticles);
  }, []);

  // Generate polygon path for the loading shape
  const generatePolygonPath = (sides: number, radius: number, center = { x: 0, y: 0 }) => {
    let path = '';
    const angle = (2 * Math.PI) / sides;
    
    for (let i = 0; i < sides; i++) {
      const x = center.x + radius * Math.cos(angle * i - Math.PI / 2);
      const y = center.y + radius * Math.sin(angle * i - Math.PI / 2);
      
      if (i === 0) {
        path += `M ${x},${y} `;
      } else {
        path += `L ${x},${y} `;
      }
    }
    
    return path + 'Z';
  };

  const icons = [
    <Bolt key="bolt" className="h-8 w-8 text-primary" />,
    <Code key="code" className="h-8 w-8 text-purple-500" />,
    <Layers key="layers" className="h-8 w-8 text-green-500" />,
    <Smartphone key="smartphone" className="h-8 w-8 text-blue-500" />
  ];

  const smallIcons = [
    <CircleDot size={10} />,
    <Star size={10} />,
    <Bolt size={10} />,
    <Gem size={10} />
  ];

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Mark animation as complete after a slight delay
        setTimeout(() => {
          setAnimationComplete(true);
        }, 800);
      }
      
      setLoadingProgress(progress);
      
      // Animate the progress bar
      controls.start({
        width: `${progress}%`,
        transition: { duration: 0.4, ease: "easeInOut" }
      });
      
    }, 150);

    // Cycle through icons for visual interest
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(iconInterval);
    };
  }, [controls, icons.length]);

  const logoVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const iconContainerVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      rotate: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    complete: {
      scale: [1, 1.1, 1],
      filter: ["drop-shadow(0 0 0px rgba(124,58,237,0))", "drop-shadow(0 0 15px rgba(124,58,237,0.7))", "drop-shadow(0 0 0px rgba(124,58,237,0))"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.8,
      rotateY: 90,
      filter: "blur(5px)"
    },
    enter: { 
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      filter: "blur(3px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Background elements
  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (custom: number) => ({
      scale: 1,
      opacity: 0.2,
      transition: { 
        delay: custom * 0.2,
        duration: 1,
        ease: "easeOut"
      }
    })
  };

  // Particle animation
  const particleVariants = {
    initial: (custom: number) => ({
      opacity: 0,
      scale: 0
    }),
    animate: (custom: Particle) => ({
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0.5],
      y: [0, -20 - Math.random() * 20, -40 - Math.random() * 20],
      x: custom.icon ? [0, Math.random() * 10 - 5, Math.random() * 20 - 10] : 0,
      rotate: custom.icon ? [0, 360, 720] : 0,
      transition: {
        delay: custom.delay,
        duration: custom.duration,
        repeat: Infinity,
        repeatDelay: Math.random() * 2
      }
    })
  };

  // Wave particles (moving up from bottom)
  const waveParticleVariants = {
    initial: { 
      opacity: 0,
      y: 20 
    },
    animate: (custom: Particle) => ({
      opacity: [0, 0.7, 0],
      y: [0, -30 - Math.random() * 30, -60 - Math.random() * 40],
      x: [0, Math.sin(custom.id) * 20, Math.cos(custom.id) * 20],
      transition: {
        delay: custom.delay,
        duration: custom.duration,
        repeat: Infinity,
        repeatDelay: Math.random()
      }
    })
  };

  // Orbit particles (circling around the logo)
  const orbitParticleVariants = {
    initial: { 
      opacity: 0,
      scale: 0
    },
    animate: (custom: Particle) => {
      const angle = (custom.id % 200) * (Math.PI * 2 / 12);
      return {
        opacity: [0, 0.8, 0.8, 0],
        scale: [0, 1, 1, 0],
        x: [
          Math.cos(angle) * 40, 
          Math.cos(angle + Math.PI/2) * 40, 
          Math.cos(angle + Math.PI) * 40, 
          Math.cos(angle + Math.PI*1.5) * 40
        ],
        y: [
          Math.sin(angle) * 40, 
          Math.sin(angle + Math.PI/2) * 40, 
          Math.sin(angle + Math.PI) * 40, 
          Math.sin(angle + Math.PI*1.5) * 40
        ],
        transition: {
          delay: custom.delay,
          duration: custom.duration,
          repeat: Infinity,
          ease: "linear"
        }
      };
    }
  };

  const progressTextVariants = {
    initial: { scale: 1 },
    pulse: (custom: boolean) => ({
      scale: custom ? [1, 1.2, 1] : 1,
      color: custom ? [
        "rgba(124,58,237,1)", 
        "rgba(168,85,247,1)", 
        "rgba(124,58,237,1)"
      ] : "rgba(124,58,237,1)",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: custom ? Infinity : 0
      }
    })
  };

  // Complete animation
  const completeVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  };

  const polygonPath = generatePolygonPath(6, 14);

  // Render individual particles
  const renderParticles = () => {
    return particles.map(particle => (
      <motion.div
        key={particle.id}
        className={`absolute rounded-full ${
          particle.color === "primary" ? "bg-primary" :
          particle.color === "purple" ? "bg-purple-500" :
          particle.color === "blue" ? "bg-blue-500" :
          particle.color === "violet" ? "bg-violet-500" :
          particle.color === "indigo" ? "bg-indigo-500" :
          "bg-green-500"
        } ${particle.blur ? "blur-sm" : ""}`}
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: particle.icon ? "auto" : `${particle.size}px`,
          height: particle.icon ? "auto" : `${particle.size}px`,
          opacity: 0
        }}
        variants={particleVariants}
        initial="initial"
        animate="animate"
        custom={particle}
      >
        {particle.icon && smallIcons[particle.iconType || 0]}
      </motion.div>
    ));
  };

  // Render wave particles
  const renderWaveParticles = () => {
    return waveParticles.map(particle => (
      <motion.div
        key={particle.id}
        className={`absolute rounded-full ${
          particle.color === "primary" ? "bg-primary" :
          particle.color === "purple" ? "bg-purple-500" :
          particle.color === "blue" ? "bg-blue-500" :
          particle.color === "violet" ? "bg-violet-500" :
          particle.color === "indigo" ? "bg-indigo-500" :
          "bg-green-500"
        }`}
        style={{
          left: `${particle.x}%`,
          bottom: "0",
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: 0
        }}
        variants={waveParticleVariants}
        initial="initial"
        animate="animate"
        custom={particle}
      />
    ));
  };

  // Render orbit particles
  const renderOrbitParticles = () => {
    return orbitParticles.map(particle => (
      <motion.div
        key={particle.id}
        className={`absolute rounded-full ${
          particle.color === "primary" ? "bg-primary" :
          particle.color === "purple" ? "bg-purple-500" :
          particle.color === "blue" ? "bg-blue-500" :
          particle.color === "violet" ? "bg-violet-500" :
          particle.color === "indigo" ? "bg-indigo-500" :
          "bg-green-500"
        }`}
        style={{
          left: "50%",
          top: "50%",
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          opacity: 0,
          marginLeft: "-2px",
          marginTop: "-2px"
        }}
        variants={orbitParticleVariants}
        initial="initial"
        animate="animate"
        custom={particle}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-background via-background/95 to-background/90 overflow-hidden">
      {/* Particle animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {renderParticles()}
        {renderWaveParticles()}
      </div>

      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-1/4 -left-10 w-40 h-40 rounded-full bg-green-400 blur-3xl opacity-0"
        variants={circleVariants}
        initial="initial"
        animate="animate"
        custom={1}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-10 w-60 h-60 rounded-full bg-primary blur-3xl opacity-0"
        variants={circleVariants}
        initial="initial"
        animate="animate"
        custom={2}
      />
      <motion.div 
        className="absolute top-3/4 left-1/4 w-48 h-48 rounded-full bg-blue-400 blur-3xl opacity-0"
        variants={circleVariants}
        initial="initial"
        animate="animate"
        custom={3}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-400 blur-3xl opacity-0"
        variants={circleVariants}
        initial="initial"
        animate="animate"
        custom={1.5}
      />

      <div ref={containerRef} className="w-full max-w-md px-4 relative z-10">
        {/* Logo Container */}
        <motion.div 
          className="text-center mb-12"
          variants={logoVariants}
          initial="initial"
          animate={animationComplete ? "pulse" : "animate"}
        >
          <motion.div 
            className="relative inline-block"
            variants={iconContainerVariants}
            initial="initial"
            animate={animationComplete ? "complete" : "animate"}
          >
            {/* Small decorative stars around the logo */}
            <motion.div 
              className="absolute -top-6 -right-4 text-yellow-400"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.8, 
                scale: [1, 1.1, 1],
                rotate: 15,
                y: [0, -5, 0]
              }}
              transition={{ 
                delay: 0.8, 
                duration: 0.5,
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Sparkles size={16} />
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -left-4 text-primary"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.8, 
                scale: [1, 1.1, 1],
                rotate: -10,
                y: [0, -4, 0]
              }}
              transition={{ 
                delay: 1, 
                duration: 0.5,
                scale: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                },
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }
              }}
            >
              <Star size={14} />
            </motion.div>
            <motion.div 
              className="absolute -top-2 -left-8 text-green-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.8, 
                scale: [1, 1.1, 1],
                rotate: 10,
                y: [0, -3, 0]
              }}
              transition={{ 
                delay: 1.1, 
                duration: 0.5,
                scale: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                y: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <FlaskConical size={14} />
            </motion.div>
            <motion.div 
              className="absolute top-1/2 -right-8 text-blue-500"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 0.8, 
                scale: [1, 1.2, 1],
                rotate: 5,
                x: [0, 3, 0]
              }}
              transition={{ 
                delay: 1.2, 
                duration: 0.5,
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror"
                },
                x: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "mirror"
                }
              }}
            >
              <Zap size={14} />
            </motion.div>

            {/* Orbit particles around the logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
              {renderOrbitParticles()}
            </div>

            {/* Main logo container */}
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/30 backdrop-blur-sm mb-6 shadow-lg overflow-hidden relative">
              {/* Animated background for the logo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.15) 50%, rgba(59,130,246,0.15) 100%)",
                    "linear-gradient(225deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.15) 50%, rgba(59,130,246,0.15) 100%)",
                    "linear-gradient(315deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.15) 50%, rgba(59,130,246,0.15) 100%)",
                    "linear-gradient(45deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.15) 50%, rgba(59,130,246,0.15) 100%)",
                    "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.15) 50%, rgba(59,130,246,0.15) 100%)"
                  ]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Hexagon shape behind icon */}
              <motion.svg 
                width="100" 
                height="100" 
                viewBox="-20 -20 40 40" 
                className="absolute"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  rotate: 360
                }}
                transition={{
                  opacity: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear"
                  }
                }}
              >
                <motion.path 
                  d={polygonPath} 
                  fill="none" 
                  stroke="rgba(124,58,237,0.3)" 
                  strokeWidth="0.5"
                  strokeDasharray="40"
                  initial={{ strokeDashoffset: 40 }}
                  animate={{ strokeDashoffset: [40, 0, 40] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.svg>
              
              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="absolute w-full h-1 bg-primary/40 blur-sm left-0"
                  initial={{ y: -10 }}
                  animate={{ y: [0, 80, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 0.5
                  }}
                />
              </motion.div>
              
              {/* Icon animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIcon}
                  variants={iconVariants}
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    perspective: 1000
                  }}
                >
                  {icons[currentIcon]}
                </motion.div>
              </AnimatePresence>

              {/* Rotating circles around the icon */}
              <motion.div
                className="absolute w-24 h-24 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div
                className="absolute w-16 h-16 rounded-full border border-purple-500/20"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Pulsating border effect */}
              <motion.div 
                className="absolute inset-0 border border-white/10 rounded-2xl z-10"
                animate={{ 
                  boxShadow: [
                    "0 0 0px rgba(124,58,237,0)", 
                    "0 0 20px rgba(124,58,237,0.5)", 
                    "0 0 0px rgba(124,58,237,0)"
                  ],
                  borderColor: [
                    "rgba(255,255,255,0.1)",
                    "rgba(124,58,237,0.3)",
                    "rgba(255,255,255,0.1)"
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              />

              {/* Inner ring animation */}
              <motion.div 
                className="w-20 h-20 rounded-full border border-primary/20 absolute"
                animate={{ 
                  rotate: 360,
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  rotate: {
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity
                  },
                  scale: {
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity
                  },
                  opacity: {
                    duration: 5,
                    ease: "easeInOut", 
                    repeat: Infinity
                  }
                }}
              />
              
              {/* Corner accents */}
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={`corner-${i}`}
                  className="absolute w-3 h-3 bg-primary/30 rounded-full"
                  style={{
                    top: i < 2 ? '5%' : '95%',
                    left: i % 2 === 0 ? '5%' : '95%',
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            
            {/* Logo text with animation */}
            <motion.h1 
              className="text-4xl font-bold"
              animate={animationComplete ? { 
                scale: [1, 1.02, 1],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              } : {}}
            >
              <motion.span 
                className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Harshit <span className="font-extrabold">Yadav</span>
              </motion.span>
            </motion.h1>
            
            {/* "Loading complete" checkmark for 100% */}
            {loadingProgress === 100 && (
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-12"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
                  variants={completeVariants}
                  initial="initial"
                  animate="animate"
                >
                  <motion.svg 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12"
                  >
                    <motion.path
                      d="M2 6L5 9L10 3"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
        
        {/* Progress Bar with advanced effects */}
        <div className="relative w-full h-3 bg-gray-200/30 backdrop-blur-sm rounded-full overflow-hidden mb-8 shadow-inner">
          {/* Main progress fill */}
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={controls}
          />
          
          {/* Shimmering overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            style={{ width: '100%' }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />

          {/* Progress bar glow effect */}
          <motion.div 
            className="absolute top-0 bottom-0 right-0 w-20 bg-white opacity-20 filter blur-sm"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
          />
          
          {/* Loading completion starburst effect */}
          {loadingProgress === 100 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.3, 0] 
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  repeat: 2,
                  repeatDelay: 0.5
                }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Loading Text with improved transitions */}
        <div className="text-center text-sm font-medium mb-3 h-5">
          <AnimatePresence mode="wait">
            {loadingProgress < 40 && (
              <motion.p
                key="loading-1"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-muted-foreground"
              >
                <motion.span 
                  className="inline-block"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ScanLine className="inline-block w-4 h-4 mr-1 text-primary" />
                </motion.span>
                Loading assets and components...
              </motion.p>
            )}
            
            {loadingProgress >= 40 && loadingProgress < 80 && (
              <motion.p
                key="loading-2"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-muted-foreground"
              >
                <motion.span 
                  className="inline-block"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                >
                  <Orbit className="inline-block w-4 h-4 mr-1 text-purple-500" />
                </motion.span>
                Preparing animation sequences...
              </motion.p>
            )}
            
            {loadingProgress >= 80 && (
              <motion.div
                key="loading-3"
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-muted-foreground flex items-center justify-center"
              >
                <motion.span 
                  className="inline-block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Sparkles className="inline-block w-4 h-4 mr-1 text-blue-500" />
                </motion.span>
                <motion.span
                  animate={{ 
                    color: loadingProgress === 100 ? [
                      "rgba(107, 114, 128, 0.8)",
                      "rgba(16, 185, 129, 0.8)",
                      "rgba(107, 114, 128, 0.8)"
                    ] : "rgba(107, 114, 128, 0.8)"
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                >
                  {loadingProgress === 100 ? "Experience ready!" : "Finalizing experience..."}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Loading Percentage with enhanced effects */}
        <motion.div 
          className="flex justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="flex items-center bg-gray-100/10 backdrop-blur-md px-3 py-1 rounded-full"
          >
            <motion.p 
              className="text-lg font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent mr-1"
              variants={progressTextVariants}
              initial="initial"
              animate="pulse"
              custom={loadingProgress === 100}
            >
              {loadingProgress}%
            </motion.p>
            <motion.div
              className={`h-2 w-2 rounded-full ${loadingProgress === 100 ? 'bg-green-500' : 'bg-primary'}`}
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5
              }}
            />
          </motion.div>
          
          {/* Pulse animation when complete */}
          {loadingProgress === 100 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 15],
                  opacity: [0.2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen; 