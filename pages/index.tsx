import React, { useState } from "react";
import Head from "next/head";
import { cubicBezier, motion } from "framer-motion";
import { Navigation } from "../components/Navigation/Navigation";
import { useTheme } from "../components/ThemeProvider";
import useSwr from "swr";
import ReactGa from "react-ga";

interface indexProps {}

interface Ireply {
  id: number;
  name: string;
  userName: string;
  reply: string;
}

const locomotiveScroll =
  typeof window !== `undefined` ? require("locomotive-scroll").default : null;

const hoverEffect =
  typeof window !== `undefined` ? require("hover-effect").default : null;

const transition: { duration: number; ease: any } = {
  duration: 1.4,
  ease: cubicBezier(0.6, 0.01, -0.05, 0.9),
  // ease: [0.6, 0.01, -0.05, 0.9],
};

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const index: React.FC<indexProps> = () => {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const { data: reviews, error } = useSwr("/api/tweets", fetcher);

  if (error) console.log(error);

  const refScroll = React.useRef(null);
  const lscrollRef = React.useRef<any>(null);

  React.useEffect(() => {
    ReactGa.initialize("UA-177100391-3");
    ReactGa.pageview(window.location.pathname + window.location.search);

    if (!refScroll.current) return;
    // @ts-ignore
    lscrollRef.current = new locomotiveScroll({
      el: refScroll.current,
      smooth: true,
      reloadOnContextChange: true,
      multiplier: 0.75,
      inertia: 0.5,
    });

    // update locomotive scroll
    const handleLoad = () => {
      if (lscrollRef.current) lscrollRef.current.update();
    };
    window.addEventListener("load", handleLoad);

    // image hover effect
    const hoverEffects: any[] = [];
    Array.from(document.querySelectorAll(".project-card__middle")).forEach(
      (el: any) => {
        const imgs: any = Array.from(el.querySelectorAll("img"));
        const effect = new hoverEffect({
          parent: el,
          intensity: 0.2,
          speedIn: el.dataset.speedin || undefined,
          speedOut: el.dataset.speedout || undefined,
          easing: el.dataset.easing || undefined,
          hover: el.dataset.hover || undefined,
          image1: imgs[0].getAttribute("src"),
          image2: imgs[1].getAttribute("src"),
          displacementImage: el.dataset.displacement,
        });
        hoverEffects.push(effect);
      }
    );

    // header cursor
    const cursor = document.querySelector(".cursor");
    const handleMouseMove = (e: any) => {
      if (cursor) {
        cursor.setAttribute("style", `top: ${e.pageY}px; left: ${e.pageX}px;`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("mousemove", handleMouseMove);
      if (lscrollRef.current) lscrollRef.current.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (lscrollRef.current) {
      setTimeout(() => {
        lscrollRef.current.update();
      }, 500);
    }
  }, [theme]);

  function toggleBodyScroll(isToggleOpen: boolean) {
    if (isToggleOpen === false) {
      setIsToggleOpen(true);
    } else if (isToggleOpen === true) {
      setIsToggleOpen(false);
    }
  }

  return (
    <>
      <div id="menu-target" data-scroll-container ref={refScroll}>
        <Head>
          <link rel="icon" href="svg/favicon.svg" />
          <link href="https://adeolaadeoti.xyz/" rel="canonical" />
          <meta name="theme-color" content="#10101A" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#10101A"
          />
          <title>Harshit Yadav 🚀 &mdash; Data Analyst & Engineer</title>
          <meta
            name="description"
            content="I'm a Data Analyst and Engineer skilled in Power BI, Python, and SQL, transforming raw datasets into actionable insights."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Harshit Yadav 🚀 &mdash; Data Analyst & Engineer"
          />
          <meta property="og:url" content="https://harshityadav.com/" />
          <meta property="og:image" content="webp/preview-image.png" />
          <meta
            property="og:description"
            content="Data Analyst and Engineer skilled in Power BI, Python, and SQL."
          />
          <meta
            name="twitter:title"
            content="Harshit Yadav 🚀 &mdash; Data Analyst & Engineer"
          />
          <meta
            name="twitter:description"
            content="Data Analyst and Engineer skilled in Power BI, Python, and SQL."
          />
          <meta name="twitter:image" content="webp/preview-image.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content="https://harshityadav.com/" />
        </Head>
        <motion.div
          data-scroll
          data-scroll-sticky
          data-scroll-target="#menu-target"
          animate={{ top: "-100vh", transition: { ...transition, delay: 9 } }}
          className="preloader"
        >
          <div className="preloader__wrapper">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__left"
            >
              <span style={{ fontSize: "2.4rem", fontWeight: "bold", fontFamily: "var(--font-secondary)", color: "var(--color-white)" }}>HARSHIT YADAV</span>
            </motion.div>
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1, transition: { ...transition } }}
              className="preloader__right"
            >
              <p className="preloader__text">PYTHON</p>
              <p className="preloader__text">SQL</p>
              <p className="preloader__text">POWER BI</p>
              <p className="preloader__text">DATA MODELING</p>
              <p className="preloader__text">ETL PIPELINES</p>
              <p className="preloader__text">FABRIC</p>
              <p className="preloader__text">AUTOMATION</p>
            </motion.div>
          </div>
        </motion.div>
        <div className="cursor"></div>
        <Navigation
          isOpen={isToggleOpen}
          toggleOpen={() => toggleBodyScroll(isToggleOpen)}
        />
        <div className="header-wrapper">
          <header className="header">
            <div className="header__hero">
              <div className="header__hero--heading">
                <span>transforming raw </span> <br />
                <span>data into </span>
                <span className="header__hero--heading-gradient">
                  insights{" "}
                </span>
                <br />
                <span>is my calling.</span>
              </div>
              <a
                data-scroll-to
                className="header__hero--cta"
                href="/my-works"
              >
                VIEW ANALYTICS
              </a>
            </div>
          </header>
          <div className="header__footer">
            <div className="header__footer--left">
              <div className="speaker" onClick={toggleTheme}>
                <div
                  className={`${"speaker__toggle"} ${
                    theme === "light"
                      ? `${"speaker__toggle--anim"}`
                      : ``
                  }`}
                >
                  &nbsp;
                </div>
                <div className="speaker__muted">
                  <span style={{ fontSize: "1.2rem" }}>🌙</span>
                </div>
                <div className="speaker__unmuted">
                  <span style={{ fontSize: "1.2rem" }}>☀️</span>
                </div>
              </div>
            </div>
            <div className="header__footer--right">
              <a
                href="https://github.com/harshit0019"
                rel="noopener"
                target="_blank"
              >
                👾 GH
              </a>
              <a
                href="https://linkedin.com/in/harshitydv"
                rel="noopener"
                target="_blank"
              >
                💼 LD
              </a>
              <a
                href="mailto:yadavharshit1901@gmail.com"
                rel="noopener"
                target="_blank"
              >
                📧 MAIL
              </a>
            </div>
          </div>
        </div>
        <main className="container">
          <p className="about-text">
            Hello! 👋 I'm Harshit Yadav, a data analyst and Power BI developer passionate about transforming complex data into actionable insights that drive business decisions.
          </p>
          <section id="sectionExperience" className="section-projects" style={{ marginTop: "10rem" }}>
            <h1 className="heading-1">
              <span>Experience</span> <small>💼</small>
            </h1>
            <div className="project-card" style={{ flexDirection: "column", alignItems: "flex-start", padding: "4rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: "2rem" }}>
                <h2 className="heading-2">Associate Programmer</h2>
                <span style={{ fontSize: "1.8rem", color: "var(--color-gray)" }}>RMX JOSS | July 2024 – Present</span>
              </div>
              <ul style={{ color: "var(--text-color)", fontSize: "1.8rem", lineHeight: "1.6", listStyle: "none" }}>
                <li>• Developed Carbon Emission Tracking App for Scope 1–3 ESG Reporting using Python & SQL.</li>
                <li>• Automated data entry/cleaning, reducing manual effort by 80%.</li>
                <li>• Designed Daily Transaction Report Power BI Dashboards, cutting reporting time by 60%.</li>
                <li>• Created ETL pipelines using SQL and Power BI for real-time SAP Business One reporting.</li>
              </ul>
            </div>
          </section>
          <section id="sectionProjects" className="section-projects">
            <h1 className="heading-1">
              <span>Selected Works</span> <small>📊</small>
            </h1>
            <p className="paragraph">
              Translating complex data into clear stories.
            </p>

            <div className="project-grid">
              <div className="project-card">
                <div
                  className="project-card__middle"
                  data-displacement="webp/myDistorsionImage.webp"
                >
                  <img src="webp/alexxandria-1.webp" alt="telecom churn" />
                  <img src="webp/alexxandria-2.webp" alt="telecom logo" />
                </div>
                <div className="project-card__right">
                  <h2 className="heading-2">Telecom Churn Analysis</h2>
                  <p className="paragraph" style={{ fontSize: "1.6rem", marginBottom: "2rem" }}>
                    Power BI dashboard analyzing customer retention and churn drivers.
                  </p>
                  <a rel="noopener" target="_blank" href="#" className="project-card__link">
                    VIEW DASHBOARD
                  </a>
                </div>
              </div>

              <div className="project-card">
                <div
                  className="project-card__middle"
                  data-displacement="webp/myDistorsionImage.webp"
                >
                  <img src="webp/safarika-1.webp" alt="banking risk" />
                  <img src="webp/safarika-2.webp" alt="banking logo" />
                </div>
                <div className="project-card__right">
                  <h2 className="heading-2">Banking Risk Analysis</h2>
                  <p className="paragraph" style={{ fontSize: "1.6rem", marginBottom: "2rem" }}>
                    Python & Power BI integration for credit risk and pattern identification.
                  </p>
                  <a rel="noopener" target="_blank" href="#" className="project-card__link">
                    VIEW PROJECT
                  </a>
                </div>
              </div>
            </div>

            <div className="view-all-container">
              <a href="/my-works" className="view-all-btn">VIEW ALL WORK</a>
            </div>
          </section>

          <section id="sectionCertificates" className="certificate-section">
            <h1 className="heading-1">
              <span>Certificates & Badges</span> <small>📜</small>
            </h1>
            <div className="certificate-section__grid">
              <div className="cert-card">
                <h3>Data Analytics Masters</h3>
                <p>Udemy</p>
              </div>
              <div className="cert-card">
                <h3>Microsoft Power BI & Fabric</h3>
                <p>Udemy</p>
              </div>
              <div className="cert-card">
                <h3>PostgreSQL and SQL</h3>
                <p>Udemy</p>
              </div>
              <div className="cert-card">
                <h3>Programming with Python</h3>
                <p>Internshala</p>
              </div>
            </div>
          </section>
          <section
            data-scroll
            data-scroll-offset="35%"
            data-scroll-repeat={true}
            data-scroll-class="section-reviews__bg"
            className="section-reviews"
          >
            <div className="section-reviews__top">
              <h1 className="heading-1">
                <span>Mmmm, a little brag </span> <small>😊</small>
              </h1>
              <p className="paragraph paragraph__sub">
                What people are saying about my last portfolio
              </p>
            </div>
            <div className="section-reviews__bottom">
              <div className="section-reviews__bottom-wrapper review-card__anim1">
                {reviews?.data.map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        <img src="svg/twitter.svg" alt="twitter icon" />
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="section-reviews__bottom-wrapper review-card__anim2">
                {reviews?.data.sort().map((review: Ireply) => (
                  <div key={review.id} className="review-card">
                    <div className="review-card__top">
                      <div className="review-card__top--left">
                        <p className="review-card__p">{review.name}</p>
                        <h3 className="review-card__h3">{review.userName}</h3>
                      </div>
                      <div className="review-card__top--right">
                        <img src="svg/twitter.svg" alt="twitter icon" />
                      </div>
                    </div>
                    <div className="review-card__bottom">
                      <h2 className="review-card__h2">{review.reply}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="section-contact">
            <h1 className="heading-1">
              <span>Ready for insights? </span> <small>🤙</small>
            </h1>
            <h2 className="section-contact__h2">
              Thanks for stopping by, I’m currently looking for new opportunities to
              collaborate on data-driven projects. If you think we might be a
              good fit, send me an
              <a
                href="mailto:yadavharshit1901@gmail.com"
                rel="noopener"
                target="_blank"
              >
                &nbsp; email 📧
              </a>
              .
            </h2>
          </section>
          <section className="section-socials">
            <h1 className="heading-1">
              <span>Dont be a stranger!</span> <small>👋</small>
            </h1>
            <p className="paragraph">Connect with me online</p>
            <div className="section-socials--links">
              <a
                href="https://github.com/harshit0019"
                rel="noopener"
                target="_blank"
              >
                👾 GitHub
              </a>
              <a
                href="https://linkedin.com/in/harshitydv"
                rel="noopener"
                target="_blank"
              >
                💼 LinkedIn
              </a>
              <a
                href="mailto:yadavharshit1901@gmail.com"
                rel="noopener"
                target="_blank"
              >
                📧 Email
              </a>
            </div>
          </section>
        </main>
        <footer className="footer">
          <p style={{ fontSize: "1.4rem", color: "var(--color-gray)", textAlign: "center", width: "100%", marginBottom: "2rem" }}>&copy; 2026 Harshit Yadav</p>
          <div className="footer__socials">
            <a
              href="https://github.com/harshit0019"
              target="_blank"
              rel="noopener"
            >
              <img src="svg/github.svg" alt="github logo" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;
