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
          {/* Mobile View layout - Order for mobile: Intro, Image, Content */}
          <div className="lg:hidden space-y-6">
            {/* Introduction - Mobile Only */}
            <motion.p 
              variants={fadeIn("left", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg font-josefin text-gray-700 dark:text-gray-300"
            >
              Hey! I'm Harshit Yadav — part-time coder, full-time problem solver. I'm all about turning ideas into cool digital stuff 🌐💡.
            </motion.p>
            
            {/* Image - Mobile Only */}
            <motion.div 
              variants={fadeIn("right", 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Tilt options={defaultTiltOptions} className="shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
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
          </div>

          {/* Desktop Image - Hidden on Mobile */}
          <motion.div 
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1 hidden lg:block"
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

          {/* Content */}
          <motion.div 
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6 font-josefin text-gray-700 dark:text-gray-300">
              {/* Desktop Only Intro */}
              <p className="text-lg hidden lg:block">
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
              <Tilt options={{...defaultTiltOptions, max: 15}} className="overflow-hidden">
                <motion.div 
                  variants={fadeIn("up", 0.1)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg border border-blue-100 dark:border-gray-700 transition transform hover:shadow-xl flex flex-col items-center"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow-md">
                    <span className="text-2xl">🗂</span>
                  </div>
                  <div className="text-3xl font-bold mb-1 gradient-text">12+</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium text-center">Projects Completed</div>
                </motion.div>
              </Tilt>

              <Tilt options={{...defaultTiltOptions, max: 15}} className="overflow-hidden">
                <motion.div 
                  variants={fadeIn("up", 0.2)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg border border-purple-100 dark:border-gray-700 transition transform hover:shadow-xl flex flex-col items-center"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow-md">
                    <span className="text-2xl">⏳</span>
                  </div>
                  <div className="text-3xl font-bold mb-1 gradient-text">1+</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium text-center">Years of Experience</div>
                </motion.div>
              </Tilt>

              <Tilt options={{...defaultTiltOptions, max: 15}} className="overflow-hidden">
                <motion.div 
                  variants={fadeIn("up", 0.3)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-lg border border-cyan-100 dark:border-gray-700 transition transform hover:shadow-xl flex flex-col items-center"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center mb-3 shadow-md">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div className="text-3xl font-bold mb-1 gradient-text">10+</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium text-center">Technologies Mastered</div>
                </motion.div>
              </Tilt>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
