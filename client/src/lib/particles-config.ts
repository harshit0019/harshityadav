import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export async function loadParticles(containerId: string) {
  try {
    // Initialize tsParticles and load the preset
    await loadSlim(tsParticles);
    
    // Load the particles configuration
    await tsParticles.load({
      id: containerId,
      options: {
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 900
            }
          },
          color: {
            value: ["#4A90E2", "#9B51E0", "#F06292"],
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            polygon: {
              sides: 5
            }
          },
          opacity: {
            value: 0.6,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.3,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.3,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#4A90E2",
            opacity: 0.4,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.1
            }
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: ["grab", "bubble"]
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.8
              }
            },
            bubble: {
              distance: 200,
              size: 6,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 6
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        detectRetina: true
      }
    });
  } catch (error) {
    console.error("Failed to load particles:", error);
  }
}
