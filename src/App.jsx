import { useState, useRef, useEffect } from 'react'
import './index.css'

const ENROLL_URL = 'https://www.lawctopuslawschool.com/courses/cdn6-months/'

const months = [
  { n: '01', title: 'Essential Clauses & Fundamentals', rec: 25, live: 4, topics: ['Pre-contractual instruments & skeleton', 'Definition, Recitals, Identification clauses', 'Operative: Indemnity, Confidentiality, IP, Termination', 'Boilerplate: Force Majeure, Severability, Waiver'], img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { n: '02', title: 'Execution & Basic Negotiation', rec: 18, live: 4, topics: ['Stamp Duty, Registration, Witnesses, Signatures', 'Employment Agreements, Software Licensing, NDAs', 'Core negotiation concepts & techniques', 'Contract Lab & Negotiation Table Exercise'], img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
  { n: '03', title: 'International & Advanced Negotiation', rec: 15, live: 8, topics: ['International commercial contracts', 'Loan, Employment, and NDAs', 'Mock negotiation of Service Level Agreements', 'Negotiation Skills & Freelancing Session 1'], img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80' },
  { n: '04', title: 'IP, Tech & Website Terms', rec: 13, live: 8, topics: ['Trademark, Patent & Copyright Licensing', 'SaaS & Joint Venture IP Agreements', 'Terms of Use, Privacy Policy, Refund Policy', 'Freelancing Session 2'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { n: '05', title: 'Real Estate Agreements', rec: 4, live: 6, topics: ['Sale Deeds & Leave and License Agreements', 'Power of Attorney & Franchisee Agreements', 'Networking Skills & Freelancing Session 3'], img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80' },
  { n: '06', title: 'Business & Commercial', rec: 8, live: 6, topics: ['Sports Sponsorship & Shareholders Agreements', 'Share Purchase & Subscription Agreements', 'Partnership & Joint Venture Agreements'], img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
]

const faculty = [
  { name: 'Shashank Sardesai', role: 'Litigator & Company Secretary', bio: 'Co-founded EverTrust Legal. Ex-Wadia Ghandy & Co. Diploma in International Business Laws (SLS Pune).', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Akanksha Mishra', role: 'Head of Lawctopus Law School', bio: 'Taught 1500+ learners. Litigator at Bombay High Court. Corporate counsel for startups. Gold medalist LLM.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Pranjal Doshi', role: 'Associate, Walker Morris LLP, UK', bio: 'Specializes in M&A and private equity. Previously with Trilegal and Khaitan & Co. Cambridge Alumnus.', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Arunima Jha', role: 'Head Legal Counsel, Omnicom', bio: '10+ years experience. Expert in privacy law, data security, and media law. Ex-BookMyShow.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { name: 'Gourav Mohanty', role: 'Advocate, Bombay High Court', bio: 'Gold medalist from Symbiosis Law School. Former Senior Associate at Shardul Amarchand Mangaldas & Co.', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80' },
  { name: 'Tanuj Kalia', role: 'Founding CEO of Lawctopus', bio: 'Author of "Law as a Career". TEDx speaker. Has negotiated deals ranging from lakhs to crores.', img: 'https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=400&q=80' },
  { name: 'Anup Menon V', role: 'Top-Rated UpWork Freelancer', bio: 'Rank holder from Karnataka State Law University. Extensive experience advising clients in India and USA.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bhumesh Verma', role: 'Managing Partner, Corp Comm Legal', bio: '25+ years experience. Former partner at Khaitan & Co. Author of "Practical Guide to Drafting Commercial Contracts".', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
]

const whyJoin = [
  ['Comprehensive Coverage', 'From basic NDAs to complex Joint Ventures and SaaS agreements.'],
  ['Practical & Hands-On', '17 mandatory assignments with personalized, line-by-line feedback.'],
  ['Freelancing Focus', 'Dedicated sessions on building a profile on Upwork and LinkedIn.'],
  ['Top-Tier Faculty', 'Learn from practicing advocates and general counsels of major firms.']
]

const compRows = [
  ['Goal', 'Learn basics', 'Mastery + Freelancing'],
  ['Live Classes', '8', '55'],
  ['Assignments', '2', '17 + Feedback'],
  ['Duration', '2 Months', '6 Months'],
  ['Freelancing Training', '✕', '✓'],
  ['Networking Sessions', '✕', '✓'],
  ['1-on-1 Coaching', '✕', '✓'],
];

const reqRows = [
  ['Eligibility', 'Any law student', 'Graduates & Final Year'],
  ['Time Required', '3-4 hrs / week', '7-8 hrs / week'],
  ['Intensity', 'Beginner Friendly', 'Rigorous & Demanding'],
  ['Prerequisites', 'None', 'Basic Contract Law'],
  ['Tools Needed', 'MS Word & Internet', 'MS Word & Internet'],
]

function App() {
  const [dossierTab, setDossierTab] = useState('overview');
  const [nextTab, setNextTab] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('rtl');
  const [selectedGoals, setSelectedGoals] = useState([]);

  const toggleGoal = (goalIndex) => {
    setSelectedGoals(prev =>
      prev.includes(goalIndex)
        ? prev.filter(g => g !== goalIndex)
        : [...prev, goalIndex]
    );
  };

  const handleTabChange = (tab) => {
    if (tab === dossierTab || isFlipping) return;

    const dir = tab === 'requirements' ? 'rtl' : 'ltr';
    setFlipDirection(dir);
    setNextTab(tab);
    setIsFlipping(true);

    setTimeout(() => {
      setDossierTab(tab);
      setIsFlipping(false);
      setNextTab(null);
    }, 800);
  }

  const renderLeftPage = (tab) => (
    <div className="dossier-page left-page">
      <div className="dossier-header">
        <h3>2-Month Basic</h3>
        <div className="dossier-badge">Fundamentals</div>
      </div>
      <div className="dossier-list-wrap">
        <ul className="dossier-list">
          {(tab === 'overview' ? compRows : reqRows).map(([label, a, b], i) => (
            <li key={`basic-${tab}-${i}`}>
              <span className="dossier-label">{label}</span>
              <span className="dossier-value">{a === '✓' ? 'Included' : a === '✕' ? '—' : a}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderRightPage = (tab) => (
    <div className="dossier-page right-page">
      <div className="dossier-header highlight">
        <h3>6-Month Expert</h3>
        <div className="dossier-badge">Mastery</div>
      </div>
      <div className="dossier-list-wrap">
        <ul className="dossier-list">
          {(tab === 'overview' ? compRows : reqRows).map(([label, a, b], i) => (
            <li key={`expert-${tab}-${i}`}>
              <span className="dossier-label">{label}</span>
              <span className="dossier-value highlight-val">{b === '✓' ? 'Included' : b === '✕' ? '—' : b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const carouselRef = useRef(null)

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const track = trackRef.current;

      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // If we haven't reached the section, track is at 0
      if (window.scrollY < sectionTop) {
        track.style.transform = `translateX(0px)`;
        return;
      }

      // Calculate how far down the 400vh section we have scrolled
      let progress = (window.scrollY - sectionTop) / (sectionHeight - windowHeight);
      progress = Math.max(0, Math.min(1, progress));

      const maxScroll = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * maxScroll}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // init on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);


  return (
    <div className="app-wrapper">

      {/* Topbar */}
      <div className="topbar">
        <div className="wrap topbar-inner">
          <div className="topbar-logo">
            <span className="topbar-logo-icon">L</span>
            <span className="topbar-logo-text">awctopus</span>
          </div>
          <div className="topbar-center">
            <a href="#about">About</a>
            <a href="#curriculum">Curriculum</a>
            <a href="#faculty">Faculty</a>
            <a href="#pricing">Pricing</a>
          </div>
          <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="btn-enroll">Join Course</a>
        </div>
      </div>

      {/* Hero Section (FrontendMasters Style) */}
      <section className="hero">
        {/* Background Video */}
        <div className="hero-bg-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/video.mp4"
          />
        </div>
        <div className="hero-gradient-overlay"></div>

        <div className="wrap">
          <div className="hero-content">
            <h1>The Complete Intro to Contract Drafting</h1>
            <p className="hero-desc">
              Learn to draft real-world contracts and build a freelance career. Use expert techniques to master 24 complex agreements and secure high-paying clients.
            </p>

            <div className="course-card-mini">
              <div className="course-card-img">

                {/* Background Contract */}
                <div className="wireframe-contract wf-bg">
                  <div className="wf-line" style={{ width: '100%' }}></div>
                  <div className="wf-line" style={{ width: '80%' }}></div>
                  <div className="wf-line" style={{ width: '90%' }}></div>
                  <div className="wf-space"></div>
                  <div className="wf-line" style={{ width: '100%' }}></div>
                  <div className="wf-line" style={{ width: '60%' }}></div>
                </div>

                {/* Foreground Contract */}
                <div className="wireframe-contract">
                  <div className="wf-header">CONFIDENTIAL</div>
                  <div className="wf-title">COMMERCIAL AGREEMENT</div>
                  <div className="wf-line" style={{ width: '100%' }}></div>
                  <div className="wf-line" style={{ width: '85%' }}></div>
                  <div className="wf-line" style={{ width: '90%' }}></div>
                  <div className="wf-space"></div>
                  <div className="wf-clause"><span>§ 1</span><div className="wf-line" style={{ width: '60%' }}></div></div>
                  <div className="wf-clause"><span>§ 2</span><div className="wf-line" style={{ width: '75%' }}></div></div>
                  <div className="wf-clause"><span>§ 3</span><div className="wf-line" style={{ width: '50%' }}></div></div>
                  <div className="wf-signature">
                    <div className="wf-sig-line"></div>
                    <div className="wf-sig-line"></div>
                  </div>
                </div>

              </div>
              <div className="course-card-title">
                COMPLETE INTRO <span className="version">V1</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                Watch Course
              </a>
              <a href="https://www.youtube.com/watch?v=CfiCtSm0Km0&pp=ygUobWFzdGVyaW5nIGNvbW1lcmljYWwgY29udHJhY3RzIGxhd2N0b3B1c9IHCQlBCwGHKiGM7w%3D%3D" target="_blank" rel="noopener noreferrer" className="btn-outline-grey">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                Watch Trailer
              </a>
            </div>
          </div>
        </div>

        <div className="hero-bottom-curve"></div>
      </section>

      {/* Hero Testimonial Strip */}
      <div className="hero-testimonial">
        <div className="hero-test-inner">
          <div className="hero-test-quote-icon">“</div>
          <div className="hero-test-content">
            <p>I've been studying law for 2+ years, but I learned so many interesting things about contract drafting I didn't know before. I really enjoy Lawctopus's teaching style as they teach in a highly practical and interactive way.</p>
            <div className="hero-test-author">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Student" />
              <span>Rahul Sharma</span>
              <a href="#about" className="hero-test-link">See More Reviews ↓</a>
            </div>
          </div>
        </div>
      </div>

      {/* MasterClass Feature (About) */}
      <section id="about" className="masterclass-feature">
        <div className="mc-header">
          <h2>Meet the world's best.<br />Learn the art of contract drafting.</h2>
        </div>

        <div className="mc-card">
          <div className="mc-image">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80" alt="Featured Instructor" />
          </div>
          <div className="mc-content-overlay">
            <div className="mc-content-right">
              <div className="mc-badge">New Class</div>
              <h3 className="mc-serif-title">Mastering<br />Commercial Contracts</h3>
              <div className="mc-divider"></div>
              <p className="mc-subtitle">Learn high-stakes drafting and negotiation from top industry experts.</p>
              <div className="hero-actions">
                <a href={ENROLL_URL} target="_blank" rel="noopener noreferrer" className="btn-solid-red">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Watch Course
                </a>
                <a href="https://www.youtube.com/watch?v=CfiCtSm0Km0&pp=ygUobWFzdGVyaW5nIGNvbW1lcmljYWwgY29udHJhY3RzIGxhd2N0b3B1c9IHCQlBCwGHKiGM7w%3D%3D" target="_blank" rel="noopener noreferrer" className="btn-outline-grey">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  Watch Trailer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MasterClass Breakout Card (Why Join) */}
      <section id="why-join" className="section breakout-section">
        <div className="breakout-card">
          <div className="breakout-image">
            <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80" alt="Legal professional drafting and signing a document" />
          </div>
          <div className="breakout-content">
            <div className="brand-header">Lawctopus <span>at Work</span></div>
            <h2 className="breakout-title">MASTER YOUR DRAFTING</h2>
            <p className="breakout-desc">See why hundreds of law students and professionals rely on Lawctopus for highly practical, hands-on training and career development.</p>

            <div className="breakout-actions">
              <a href={ENROLL_URL} className="btn-solid-red">Enroll Now</a>
              <a href="#curriculum" className="btn-text-link">Learn More &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum - Sticky Horizontal Scroll */}
      <section id="curriculum" className="sticky-scroll-container" ref={sectionRef}>
        <div className="sticky-view">
          <div className="wrap text-center sticky-header">
            <h2 className="massive-heading">COURSE WORK</h2>
            <p className="massive-subheading">Scroll down to explore your 6-month journey to mastery.</p>
          </div>

          <div className="curriculum-horizontal-track" ref={trackRef}>
            {months.map((m, i) => (
              <div className="curriculum-slide" key={i}>
                <div className="slide-inner">

                  <div className="slide-image">
                    <img src={m.img} alt={m.title} />
                    {i === months.length - 1 && (
                      <div className="cert-badge">
                        <svg viewBox="0 0 100 100" width="120" height="120"><circle cx="50" cy="50" r="45" fill="none" stroke="#f39c12" strokeWidth="2" strokeDasharray="6 4" /><path id="curve" d="M 15 50 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" fill="none" /><text fontSize="9.5" fill="#f39c12" letterSpacing="2"><textPath href="#curve" startOffset="0%">★ CERTIFICATE OF COMPLETION ★</textPath></text></svg>
                      </div>
                    )}
                  </div>

                  <div className="slide-content">
                    <div className="slide-label">Module {m.n}</div>
                    <h3 className="slide-title">{m.title}</h3>
                    <div className="slide-list">
                      {m.topics.map((topic, j) => (
                        <div className="slide-list-item" key={j}>
                          <div className="slide-list-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          </div>
                          <div className="slide-list-text">{topic}</div>
                        </div>
                      ))}

                      <div className="slide-list-item" style={{ marginTop: '16px' }}>
                        <div className="slide-list-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <div className="slide-list-text"><strong>{m.live} hours</strong> live instruction</div>
                      </div>
                      <div className="slide-list-item">
                        <div className="slide-list-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        </div>
                        <div className="slide-list-text"><strong>{m.rec} hours</strong> on-demand</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty - MasterClass Style Split */}
      <section id="faculty" className="section">
        <div className="wrap">
          <div className="faculty-split">
            {/* Left Side - Typography & Checklist */}
            <div className="faculty-left">
              <h2 className="mc-headline">LEARN FROM THE BEST,<br />BE YOUR BEST.</h2>
              <p className="mc-subline">Get unlimited access to practical drafting skills and expert feedback.</p>
              <div className="mc-dash"></div>

              <div className="mc-question">What brings you to Lawctopus today?</div>

              <div className="mc-checklist">
                {[
                  "Master contract drafting & negotiation",
                  "Build a freelance career on Upwork",
                  "Draft complex SaaS & Tech agreements",
                  "Understand International Contracts",
                  "Get 1-on-1 feedback on my drafts"
                ].map((goal, idx) => (
                  <div
                    key={idx}
                    className={`mc-check-item ${selectedGoals.includes(idx) ? 'selected' : ''}`}
                    onClick={() => toggleGoal(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="mc-check-box"></div>
                    {goal}
                  </div>
                ))}
              </div>

              {selectedGoals.length > 0 && (
                <div style={{ marginTop: '24px', animation: 'fadeIn 0.3s ease' }}>
                  <a href="#pricing" className="btn-solid-red" style={{ display: 'inline-flex', padding: '12px 24px' }}>
                    Start Learning Today
                  </a>
                </div>
              )}
            </div>

            {/* Right Side - Masonry Scrolling Marquee */}
            <div className="faculty-right">
              <div className="faculty-marquee-wrapper">
                {/* Column 1 */}
                <div className="marquee-column">
                  <div className="marquee-track track-1">
                    {[...faculty.filter((_, i) => i % 2 === 0), ...faculty.filter((_, i) => i % 2 === 0)].map((f, i) => (
                      <div className="faculty-card-mc" key={`c1-${i}`}>
                        <img src={f.img} alt={f.name} />
                        <div className="fm-overlay">
                          <span className="fm-name">{f.name}</span>
                          <span className="fm-role">{f.role}</span>
                          <div className="fm-bio-wrap">
                            <p className="fm-bio">{f.bio}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="marquee-column">
                  <div className="marquee-track track-2">
                    {[...faculty.filter((_, i) => i % 2 !== 0), ...faculty.filter((_, i) => i % 2 !== 0)].map((f, i) => (
                      <div className="faculty-card-mc" key={`c2-${i}`}>
                        <img src={f.img} alt={f.name} />
                        <div className="fm-overlay">
                          <span className="fm-name">{f.name}</span>
                          <span className="fm-role">{f.role}</span>
                          <div className="fm-bio-wrap">
                            <p className="fm-bio">{f.bio}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Integration - Fons Mans Inspired Split Layout */}
      <section id="ai" className="ai-split-section">
        <div className="ai-split-left">
          {/* A striking, deep red cinematic visual representing AI & Law */}
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80" alt="AI & Law" className="ai-abstract-img" />
          <div className="ai-left-content">
            <h2 className="ai-massive-title">AI IN LAW</h2>
            <p className="ai-left-desc">
              AI is no longer optional.<br />
              It is a core professional skill.
            </p>
          </div>
        </div>

        <div className="ai-split-right">
          <div className="ai-right-inner">
            <div className="ai-header-text">
              <div className="ai-col-header">The Curriculum</div>
              <p className="ai-intro-text">Master practical AI tools for Indian legal work, research, and high-stakes contract analysis.</p>
            </div>

            <div className="ai-lists-grid">
              {/* Column 1 */}
              <div className="ai-list-col">
                <h4 className="ai-list-title">Live Sessions</h4>
                <ul className="ai-clean-list">
                  <li><span>Indian Kanoon AI</span><span className="ai-meta">Live</span></li>
                  <li><span>Practical Tools</span><span className="ai-meta">60m</span></li>
                  <li><span>Legal Research</span><span className="ai-meta">Core</span></li>
                  <li><span>Drafting & Analysis</span><span className="ai-meta">Core</span></li>
                </ul>

                <h4 className="ai-list-title" style={{ marginTop: '40px' }}>Included Tools</h4>
                <ul className="ai-clean-list">
                  <li><span>IK Prism Access</span><span className="ai-meta">1 Month</span></li>
                  <li><span>AI Prompts eBook</span><span className="ai-meta">31 pgs</span></li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="ai-list-col">
                <h4 className="ai-list-title">4-Hour Workshop</h4>
                <ul className="ai-clean-list">
                  <li><span>Legal Research</span><span className="ai-meta">Rec</span></li>
                  <li><span>Argumentation</span><span className="ai-meta">Rec</span></li>
                  <li><span>Contract Drafting</span><span className="ai-meta">Rec</span></li>
                  <li><span>Technology & Ethics</span><span className="ai-meta">Rec</span></li>
                </ul>

                <h4 className="ai-list-title" style={{ marginTop: '40px' }}>Support</h4>
                <ul className="ai-clean-list">
                  <li><span>Mentor Insights</span><span className="ai-meta">Ongoing</span></li>
                  <li><span>Q&A Forums</span><span className="ai-meta">24/7</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Comparison */}
      <section id="pricing" className="section section-alt">
        <div className="wrap">
          <h2 className="section-title">Choose Your Path</h2>
          <p className="section-subtitle">Lawctopus Law School offers specialized tracks for contract drafting.</p>

          <div className="pricing-cards-stacked">

            {/* Left Card: Basic */}
            <div className="price-card tier-left">
              <h3>2-Month Basic</h3>
              <div className="duration">Fundamentals</div>
              <div className="price-original" style={{ opacity: 0 }}>₹0</div>
              <div className="price-current">₹7,999</div>

              <ul className="feat-list">
                <li>8 Live Classes</li>
                <li>2 Assignments</li>
                <li>Money-back guarantee</li>
                <li className="disabled">No freelancing</li>
              </ul>
              <a href="https://www.lawctopuslawschool.com/contract-drafting-negotiation/" className="btn-outline-full">Enroll Now</a>
            </div>

            {/* Center Card: Premium */}
            <div className="price-card featured">
              <div className="floating-badge badge-bottom-right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                3,000+ enrolled
              </div>

              <div className="mc-badge" style={{ margin: '0 auto 16px', display: 'inline-block' }}>Most Popular</div>
              <h3>6-Month Expert</h3>
              <div className="duration">Mastering Drafting & Freelancing</div>
              <div className="price-original">₹60,000</div>
              <div className="price-current">₹24,999 <span>/ full</span></div>

              <ul className="feat-list">
                <li>55 Live Classes</li>
                <li>17 Assignments + Feedback</li>
                <li>Comprehensive freelancing training</li>
                <li>Monthly networking sessions</li>
              </ul>
              <a href={ENROLL_URL} className="btn-cta-full">Register by June 30</a>
            </div>

            {/* Right Card: Standard */}
            <div className="price-card tier-right">
              <h3>4-Month Standard</h3>
              <div className="duration">Advanced Modules</div>
              <div className="price-original">₹25,000</div>
              <div className="price-current">₹15,999</div>

              <ul className="feat-list">
                <li>24 Live Classes</li>
                <li>8 Assignments</li>
                <li>Money-back guarantee</li>
                <li className="disabled">No networking</li>
              </ul>
              <a href="#" className="btn-outline-full">Enroll Now</a>
            </div>

          </div>
        </div>
      </section>

      {/* Dossier Book Comparison */}
      <section id="comparison" className="section">
        <div className="wrap">
          <h2 className="section-title">The Curriculum Dossier</h2>
          <p className="section-subtitle">A side-by-side breakdown of what's inside each track.</p>

          <div className={`dossier-book ${isFlipping ? 'flipping' : ''}`}>
            {/* Top Tabs (Decorative) */}
            <div className="dossier-top-tabs">
              <div
                className={`dossier-top-tab ${dossierTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                Overview
              </div>
              <div
                className={`dossier-top-tab ${dossierTab === 'requirements' ? 'active' : ''}`}
                onClick={() => handleTabChange('requirements')}
              >
                Requirements
              </div>
            </div>

            {/* Center Spine */}
            <div className="dossier-spine"></div>

            {/* Base Left Page */}
            {renderLeftPage(isFlipping && flipDirection === 'ltr' ? nextTab : dossierTab)}

            {/* Base Right Page */}
            {renderRightPage(isFlipping && flipDirection === 'rtl' ? nextTab : dossierTab)}

            {/* The 3D Flipping Page */}
            {isFlipping && (
              <div className={`page-turner ${flipDirection}`}>
                <div className="flip-front">
                  {flipDirection === 'rtl' ? renderRightPage(dossierTab) : renderLeftPage(dossierTab)}
                </div>
                <div className="flip-back">
                  {flipDirection === 'rtl' ? renderLeftPage(nextTab) : renderRightPage(nextTab)}
                </div>
              </div>
            )}

            {/* Side Tabs */}
            <div className="dossier-tabs">
              <div className={`dossier-tab ${dossierTab === 'overview' ? 'active' : ''}`} onClick={() => handleTabChange('overview')}>Features</div>
              <div className={`dossier-tab ${dossierTab === 'requirements' ? 'active' : ''}`} onClick={() => handleTabChange('requirements')}>Reqs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">

            <div className="footer-brand-col">
              <div className="topbar-logo" style={{ marginBottom: '20px' }}>
                <span className="topbar-logo-icon">L</span>
                <span className="topbar-logo-text">awctopus</span>
              </div>
              <p className="footer-mission">
                Building AI-ready legal careers. Premium education for modern advocates, law students, and legal professionals.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-icon">IN</a>
                <a href="#" className="social-icon">TW</a>
                <a href="#" className="social-icon">IG</a>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>Curriculum</h4>
              <a href="#">Contract Drafting</a>
              <a href="#">Negotiation Masterclass</a>
              <a href="#">Legal Tech & AI</a>
              <a href="#">Freelancing Track</a>
            </div>

            <div className="footer-links-col">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Our Faculty</a>
              <a href="#">Alumni Success</a>
              <a href="#">Careers</a>
            </div>

            <div className="footer-links-col">
              <h4>Support</h4>
              <a href="#">Contact Us</a>
              <a href="#">FAQ</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>

          </div>

          <div className="footer-bottom">

            <div className="footer-bottom-links">
              <a href="#">Cookie Policy</a>
              <a href="#">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
