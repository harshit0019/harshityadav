import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";

export async function loadParticles(containerId: string) {
  try {
    await loadFull(tsParticles);
    await tsParticles.load({
      id: containerId,
      options: {
        fpsLimit: 60,
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#4A90E2", "#9B51E0", "#F06292"],
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#4A90E2",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outModes: "out",
            bounce: false,
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            },
            push: {
              particles_nb: 4
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
