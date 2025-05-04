import { motion } from "framer-motion";
import { fadeIn } from "@/lib/framer-animations";
import { Tilt } from "react-tilt";
import profileImage from "../../assets/profile.png";

export function AboutSection() {
  const defaultTiltOptions = {
    reverse: false,
    max: 10,
    perspective: 1500,
    scale: 1.03,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: true,
    maxGlare: 0.3
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-4xl font-poppins font-bold text-center mb-16"
        >
          <span className="gradient-text">About</span> Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <Tilt options={defaultTiltOptions} className="shadow-lg rounded-lg overflow-hidden max-w-md mx-auto lg:ml-auto">
              <div className="relative bg-gradient-to-tr from-primary/10 to-secondary/10 p-2 rounded-lg">
                <img
                  src={profileImage}
                  alt="Portrait of Harshit Yadav"
                  className="w-full h-auto object-contain rounded-lg"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-overlay"></div>
              </div>
            </Tilt>
          </motion.div>

          <motion.div 
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6 font-josefin text-gray-700 dark:text-gray-300">
              <p className="text-lg">
                Hey! I'm Harshit Yadav — part-time coder, full-time problem solver. I'm all about turning ideas into cool digital stuff 🌐💡.
              </p>
              <p>
                Whether it's tracking carbon footprints with Python + Streamlit, building slick dashboards in Power BI, or whipping up AI tools with ChatGPT & Replit, I'm in my zone when tech meets impact.
              </p>
              <p>
                I've cooked up projects like a personal carbon tracker and an AI-powered SEO tag analyzer, and I'm currently leveling up as an Associate Programmer @ RMX Joss, where I build tools that actually do something — saving time, reducing emissions, and making data make sense.
              </p>
              <p>
                Big fan of frontend design, a sucker for clean UI, and always experimenting with the latest in prompt engineering, Tailwind, and React. When I'm not coding, I'm gaming, vibing to lo-fi, or creating content just for fun 🎮🎨✨.
              </p>
              <p className="text-lg font-medium">
                Let's build something awesome together 🚀
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div 
                variants={fadeIn("up", 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
              >
                <div className="text-primary text-4xl mb-2">🗂</div>
                <div className="text-2xl font-bold mb-1 gradient-text">12+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm text-center">Projects Completed</div>
              </motion.div>

              <motion.div 
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
              >
                <div className="text-primary text-4xl mb-2">⏳</div>
                <div className="text-2xl font-bold mb-1 gradient-text">1+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm text-center">Years of Experience</div>
              </motion.div>

              <motion.div 
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center"
              >
                <div className="text-primary text-4xl mb-2">💻</div>
                <div className="text-2xl font-bold mb-1 gradient-text">10+</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm text-center">Technologies Mastered</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
