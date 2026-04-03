import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import profileImg from './assets/profile.jpeg';
import project1Img from './assets/project1.png'; // Using as Chatbot thumb
import project2Img from './assets/project2.png'; // Using as ATM thumb
import project3Img from './assets/project3.png'; // Using as Agentic AI thumb

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef();
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus(null);

    emailjs.sendForm('service_5pi24e5', 'template_wb4zw5g', formRef.current, 'JUmOjQ7SAa0-ySOLT')
      .then((result) => {
          setIsSending(false);
          setSubmitStatus('success');
          e.target.reset();
          setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
          setIsSending(false);
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = ["Full Stack Developer"];

  const [activeFilter, setActiveFilter] = useState('All');

  const allProjects = [
    {
      title: "Chatbot (NLP)",
      category: "AI/ML",
      desc: "Developed a basic chatbot capable of understanding and responding to user inputs using Natural Language Processing techniques.",
      tech: ["Python", "NLTK", "Jupyter"],
      img: project1Img,
      status: "Completed",
      github: "https://github.com/Abdul-Affan/"
    },
    {
      title: "ATM Management System",
      category: "Desktop App",
      desc: "Built an ATM Management System using Java Swing with features like login, transactions, and PIN change via JDBC.",
      tech: ["Java", "Swing", "MySQL", "JDBC"],
      img: project2Img,
      status: "Completed",
      github: "https://github.com/Abdul-Affan/"
    },
    {
      title: "Agentic AI for Life Skills Assistant for Disable Children",
      category: "Web App",
      desc: "An AI-powered web platform that helps children with developmental disabilities learn daily life skills through interactive lessons, voice guidance, and progress tracking.",
      tech: ["HTML", "CSS", "JavaScript", "Python", "Flask", "MongoDB"],
      img: project3Img,
      status: "Completed",
      github: "https://github.com/Abdul-Affan/"
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }
      
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const reveals = document.querySelectorAll('[data-reveal]');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-outline" ref={cursorOutlineRef}></div>
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-content">
          <div className="logo">&lt;/&gt; Affan.dev</div>
          <ul className="nav-links">
            <li><a href="#about">ABOUT</a></li>
            <li><a href="#skills">SKILLS</a></li>
            <li><a href="#projects">PROJECTS</a></li>
            <li><a href="#education">EDUCATION</a></li>
            <li><a href="#contact">CONTACT</a></li>
          </ul>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="cta-button" style={{ fontSize: '0.9rem', padding: '0.6rem 1.5rem', boxShadow: '0 0 15px rgba(37, 99, 235, 0.4)' }}>
            <span style={{ marginRight: '8px' }}>↓</span> View Resume
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container hero-container">
            <div className="hero-content" data-reveal>
              <div className="availability-tag">Available for Work</div>
              <h1>I'm <span>Abdul Affan</span></h1>
              <h3 className="hero-subtitle">
                {text}
                <span className="cursor" style={{ marginLeft: '5px' }}>|</span>
              </h3>
              <p>Building premium web experiences with <strong>modern technologies</strong>. Passionate about clean code, UI design, and solving complex problems.</p>

              <div className="cta-group">
                <a href="#contact" className="cta-button">Get In Touch</a>
                <a href="#projects" className="cta-button secondary">View Projects</a>
              </div>

              <div className="contact-info-mini">
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Bangalore, India
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  abdul.mca24@cmrit.ac.in
                </span>
              </div>

              <div className="social-icons-mini">
                <a href="https://github.com/Abdul-Affan/" target="_blank" rel="noreferrer" className="social-icon-circle">GH</a>
                <a href="https://www.linkedin.com/in/abdul-affan-64471a31a/" target="_blank" rel="noreferrer" className="social-icon-circle">IN</a>
                <a href="https://leetcode.com/AbdulAffan/" target="_blank" rel="noreferrer" className="social-icon-circle">LC</a>
              </div>
            </div>

            <div className="profile-img-wrapper" data-reveal>
              <div className="profile-img-container">
                <img src={profileImg} alt="Abdul Affan" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about">
          <div className="container" data-reveal style={{ textAlign: 'center' }}>
            <h2 className="gradient-text section-title">About Me</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3.5rem', fontSize: '1.1rem' }}>
              A passionate developer bridging the gap between design and functionality.
            </p>

            <div className="about-cards">
              <div className="glass about-card">
                <div className="about-icon-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </div>
                <span className="about-label">Role</span>
                <span className="about-value">Full Stack Developer</span>
              </div>

              <div className="glass about-card">
                <div className="about-icon-circle" style={{ color: '#c084fc' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
                <span className="about-label">Experience</span>
                <span className="about-value">Fresher</span>
              </div>

              <div className="glass about-card">
                <div className="about-icon-circle" style={{ color: '#38bdf8' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <span className="about-label">Education</span>
                <span className="about-value">MCA</span>
              </div>

              <div className="glass about-card">
                <div className="about-icon-circle" style={{ color: '#fbbf24' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.45.98.95 1.21 1.2 1.21 2.05 2.7 2.05 4.46"></path><path d="M12 2C9.5 2 7 4.5 7 7c0 .55.45 1 1 1h8c.55 0 1-.45 1-1 0-2.5-2.5-5-5-5z"></path></svg>
                </div>
                <span className="about-label">Achievements</span>
                <span className="about-value">5+ Projects</span>
              </div>
            </div>

            <div className="glass about-detailed-v2" data-reveal>
              <div className="about-text-v2">
                <h3>Driven by <span className="gradient-text">Innovation</span></h3>
                <p>
                  Passionate about building practical software that solves real-world problems and improves everyday life. 
                  Whether it's writing clean, efficient code, optimizing system performance, or exploring new technologies, 
                  I'm always ready for a challenge.
                </p>
                <p>
                  I'm seeking an environment where I can grow, contribute meaningfully, and collaborate with a team 
                  that values creativity and effective problem-solving.
                </p>
              </div>
              <div className="soft-skills-v2">
                <h4>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                  Soft Skills
                </h4>
                <div className="soft-skills-grid">
                  {['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability', 'Time Management', 'Critical Thinking'].map(skill => (
                    <span key={skill} className="soft-skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <div className="container">
            <div className="projects-header" data-reveal>
              <div className="projects-title-area">
                <h2 className="gradient-text">Featured Projects</h2>
                <p style={{ color: 'var(--text-muted)' }}>Showcasing my latest work and experiments.</p>
              </div>
              <div className="filter-container">
                {['All', 'AI/ML', 'Web App', 'Desktop App'].map(filter => (
                  <button
                    key={filter}
                    className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="project-grid-v2">
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="project-card-v2" data-reveal>
                  <div className="project-img-container">
                    <img src={project.img} alt={project.title} />
                    <div className="category-badge">{project.category}</div>
                  </div>
                  <div className="project-content-v2">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                      <a href={project.github} target="_blank" rel="noreferrer" className="github-link-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      </a>
                    </div>
                    <p className="project-desc-v2">{project.desc}</p>
                    <div className="tech-stack-v2">
                      {project.tech.map(t => <span key={t} className="tech-tag-v2">{t}</span>)}
                    </div>
                    <div className="project-footer-v2">
                      <div className="status-indicator">
                        <span className="status-dot"></span>
                        {project.status}
                      </div>
                      <a href="#" className="details-link">
                        Details
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education">
          <div className="container" data-reveal>
            <div className="education-header">
              <h2 className="gradient-text">Education Journey</h2>
              <p style={{ color: 'var(--text-muted)' }}>My academic path and qualifications.</p>
            </div>

            <div className="education-timeline">
              {[
                {
                  degree: "Masters of Computer Application (Pursuing)",
                  college: "CMR Institute of Technology, Bangalore",
                  year: "2026 (Expected)",
                  location: "Bangalore, India",
                  desc: "Currently pursuing MCA with a focus on advanced computing. Holding a CGPA of 8.68."
                },
                {
                  degree: "Bachelor of Computer Applications",
                  college: "DVS College of Arts and Science, Shivamogga",
                  year: "2024",
                  location: "Shivamogga, Karnataka",
                  desc: "Graduated with 8.65 CGPA. Built a strong foundation in computer science principles."
                },
                {
                  degree: "Senior Secondary (12th Commerce)",
                  college: "Sri Vijaya PU College, Honnali",
                  year: "2021",
                  location: "Honnali, Karnataka",
                  desc: "Completed 12th grade in Commerce stream with 73.5%."
                },
                {
                  degree: "Secondary School (10th)",
                  college: "Bharateeya Vidya Samsthe High School, Honnali",
                  year: "2019",
                  location: "Honnali, Karnataka",
                  desc: "Completed 10th grade with 76.16%."
                }
              ].map((edu, idx) => (
                <div key={idx} className="timeline-item" data-reveal>
                  <div className="timeline-dot"></div>
                  <div className="glass timeline-card">
                    <div className="timeline-card-header">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                      {edu.degree}
                    </div>
                    <h3>{edu.college}</h3>
                    <div className="timeline-meta">
                      <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {edu.year}
                      </span>
                      <span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {edu.location}
                      </span>
                    </div>
                    <p className="timeline-desc">{edu.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications">
          <div className="container" data-reveal>
            <h2 className="gradient-text section-title">Certifications</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3.5rem', fontSize: '1.1rem' }}>
              Continuous learning and professional development.
            </p>

            <div className="certifications-grid">
              {[
                {
                  title: "Java Certification",
                  org: "Udemy",
                  status: "Completed",
                  skills: ["Java", "OOP", "Backend Development"],
                  link: "/certificates/java-cert.pdf"
                },
                {
                  title: "Front End Web Developer [Springboard]",
                  org: "Springboard",
                  status: "Completed",
                  skills: ["React.js", "HTML5", "CSS3", "JavaScript", "Responsive Design"],
                  link: "/certificates/frontend-cert.pdf"
                },

              ].map((cert, index) => (
                <div key={index} className="glass cert-card">
                  <div className="cert-header">
                    <div className="cert-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.45.98.95 1.21 1.2 1.21 2.05 2.7 2.05 4.46"></path><path d="M12 2C9.5 2 7 4.5 7 7c0 .55.45 1 1 1h8c.55 0 1-.45 1-1 0-2.5-2.5-5-5-5z"></path></svg>
                    </div>
                    <a href={cert.link} target="_blank" rel="noreferrer" className="cert-link-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  </div>
                  <div className="cert-info">
                    <h3>{cert.title}</h3>
                    <div className="cert-meta">
                      <span>{cert.org}</span>
                      <span>•</span>
                      <span>{cert.status}</span>
                    </div>
                  </div>
                  <div className="cert-tags">
                    {cert.skills.map(skill => (
                      <span key={skill} className="cert-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <div className="container" data-reveal>
            <div className="arsenal-header">
              <h2 className="gradient-text">Technical Arsenal</h2>
              <p style={{ color: 'var(--text-muted)' }}>Tools and technologies I use to bring ideas to life.</p>
            </div>

            <div className="arsenal-grid">
              <div className="glass arsenal-card">
                <h3>Frontend</h3>
                <div className="arsenal-tags">
                  {['HTML5', 'CSS3', 'JavaScript', 'React.js'].map(skill => (
                    <span key={skill} className="arsenal-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="glass arsenal-card">
                <h3>Backend</h3>
                <div className="arsenal-tags">
                  {['Java', 'C', 'Python', 'PHP'].map(skill => (
                    <span key={skill} className="arsenal-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="glass arsenal-card">
                <h3>Database</h3>
                <div className="arsenal-tags">
                  {['MySQL', 'SQL'].map(skill => (
                    <span key={skill} className="arsenal-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="glass arsenal-card">
                <h3>Tools</h3>
                <div className="arsenal-tags">
                  {['VS Code', 'Eclipse IDE', 'GitHub', 'Jupyter'].map(skill => (
                    <span key={skill} className="arsenal-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="container" data-reveal>
            <div className="contact-header">
              <h2 className="gradient-text">Get In Touch</h2>
              <p style={{ color: 'var(--text-muted)' }}>Have a project in mind or want to say hi? I'd love to hear from you.</p>
            </div>

            <div className="contact-split">
              <div className="glass contact-info-v2">
                <h3>Contact Information</h3>

                <div className="info-item-v2">
                  <div className="info-icon-v2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div className="info-content-v2">
                    <h4>Email</h4>
                    <p>abdul.mca24@cmrit.ac.in</p>
                  </div>
                </div>

                <div className="info-item-v2">
                  <div className="info-icon-v2" style={{ color: '#a855f7' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div className="info-content-v2">
                    <h4>Phone</h4>
                    <p>+91 9380145316</p>
                  </div>
                </div>

                <div className="info-item-v2">
                  <div className="info-icon-v2" style={{ color: '#14b8a6' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="info-content-v2">
                    <h4>Location</h4>
                    <p>Bangalore, India</p>
                  </div>
                </div>

                <div className="follow-me-v2">
                  <h4>FOLLOW ME</h4>
                  <div className="social-icons-mini" style={{ marginTop: '0' }}>
                    <a href="https://github.com/Abdul-Affan/" target="_blank" rel="noreferrer" className="social-icon-circle">GH</a>
                    <a href="https://www.linkedin.com/in/abdul-affan-64471a31a/" target="_blank" rel="noreferrer" className="social-icon-circle">IN</a>
                    <a href="https://leetcode.com/AbdulAffan/" target="_blank" rel="noreferrer" className="social-icon-circle">LC</a>
                  </div>
                </div>
              </div>

              <form ref={formRef} onSubmit={sendEmail} className="glass contact-form-v2">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Abdul Affan" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="abdul.mca24@cmrit.ac.in" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="title" placeholder="Project Inquiry" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" placeholder="Your message here..." required></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={isSending} style={isSending ? {opacity: 0.7, cursor: 'not-allowed'} : {}}>
                  {isSending ? (
                    'Sending...'
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-20deg)' }}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      Send Message
                    </>
                  )}
                </button>
                {submitStatus === 'success' && <p style={{ color: '#10b981', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>Message sent successfully!</p>}
                {submitStatus === 'error' && <p style={{ color: '#ef4444', marginTop: '1rem', textAlign: 'center', fontWeight: '500' }}>Failed to send message. Please check your EmailJS details and try again.</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 Abdul Affan. Professional Portfolio.</p>
      </footer>
    </div>
  );
};

export default App;
