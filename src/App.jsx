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
]

function App() {
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
      {/* Top Banner */}
      <div className="top-banner">
        <span className="green-text">We noticed you're in India 🇮🇳</span> &nbsp; Good news! You're eligible for regional pricing. 
        <a href="#pricing">See pricing ▸</a>
      </div>

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
          <a href={ENROLL_URL} className="btn-enroll">Join Course</a>
        </div>
      </div>

      {/* Hero Section (FrontendMasters Style) */}
      <section className="hero">
        {/* Background Video */}
        <div className="hero-bg-video">
          {/* Using a reliable placeholder video. Replace 'LXb3EKWsInQ' with your Lawctopus Video ID */}
          <iframe 
            src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&loop=1&playlist=LXb3EKWsInQ&controls=0&showinfo=0&rel=0&modestbranding=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen 
          ></iframe>
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
                {/* Legal Document Icon matching style */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
              </div>
              <div className="course-card-title">
                COMPLETE INTRO <span>V1</span>
              </div>
            </div>

            <div className="hero-actions">
              <a href={ENROLL_URL} className="btn-solid-red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Watch Course
              </a>
              <a href="#curriculum" className="btn-outline-grey">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Course Preview
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
          <h2>Meet the world's best.<br/>Learn the art of contract drafting.</h2>
        </div>
        
        <div className="mc-card">
          <div className="mc-image">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80" alt="Featured Instructor" />
          </div>
          <div className="mc-content-overlay">
            <div className="mc-content-right">
              <div className="mc-badge">New Class</div>
              <h3 className="mc-serif-title">Mastering<br/>Commercial Contracts</h3>
              <div className="mc-divider"></div>
              <p className="mc-subtitle">Learn high-stakes drafting and negotiation from top industry experts.</p>
              <a href="#curriculum" className="mc-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Watch Trailer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MasterClass Breakout Card (Why Join) */}
      <section id="why-join" className="section breakout-section">
        <div className="wrap">
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
                    
                    <div className="slide-list-item" style={{marginTop: '16px'}}>
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
              <h2 className="mc-headline">LEARN FROM THE BEST,<br/>BE YOUR BEST.</h2>
              <p className="mc-subline">Get unlimited access to practical drafting skills and expert feedback.</p>
              <div className="mc-dash"></div>
              
              <div className="mc-question">What brings you to Lawctopus today?</div>
              
              <div className="mc-checklist">
                <div className="mc-check-item"><div className="mc-check-box"></div> Master contract drafting & negotiation</div>
                <div className="mc-check-item"><div className="mc-check-box"></div> Build a freelance career on Upwork</div>
                <div className="mc-check-item"><div className="mc-check-box"></div> Draft complex SaaS & Tech agreements</div>
                <div className="mc-check-item"><div className="mc-check-box"></div> Understand International Contracts</div>
                <div className="mc-check-item"><div className="mc-check-box"></div> Get 1-on-1 feedback on my drafts</div>
              </div>
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

      {/* AI Integration - Darker Variant */}
      <section id="ai" className="section section-gradient">
        <div className="wrap">
          <h2 className="section-title">Building AI-Ready Legal Careers</h2>
          <p className="section-subtitle">AI is no longer optional for lawyers — it is fast becoming a core professional skill.</p>
          
          <div className="text-cards-grid">
            <div className="text-card">
              <h4>1. LIVE AI Sessions with Indian Kanoon</h4>
              <p>Regular LIVE sessions (60-90 min) demonstrating practical AI tools used in Indian legal work — research, drafting, and analysis.</p>
            </div>
            <div className="text-card">
              <h4>2. 4-Hour Recorded Workshop</h4>
              <p>Extensive workshop covering AI for Legal Research, Argumentation, Contract Drafting, and Technology & Ethics Behind AI in Law.</p>
            </div>
            <div className="text-card">
              <h4>3. Indian Kanoon's Prism Access</h4>
              <p>Every learner receives 1-month complimentary access to Indian Kanoon's AI tool for faster legal research and document drafting.</p>
            </div>
            <div className="text-card">
              <h4>4. Extensive AI Resources</h4>
              <p>Ongoing AI insights from mentors during live classes and access to a 31-page eBook on AI Prompts for Lawyers.</p>
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
              <div className="floating-badge badge-top-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                Limited-time offer
              </div>
              <div className="floating-badge badge-bottom-right">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                3,000+ enrolled
              </div>

              <div className="mc-badge" style={{margin: '0 auto 16px', display: 'inline-block'}}>Most Popular</div>
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

      {/* Detailed Comparison Table */}
      <section id="comparison" className="section">
        <div className="wrap">
          <h2 className="section-title left">Feature Comparison</h2>
          <div className="comparison-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>2-Month Course</th>
                  <th>6-Month Expert Course</th>
                </tr>
              </thead>
              <tbody>
                {compRows.map(([label, a, b], i) => (
                  <tr key={i}>
                    <td>{label}</td>
                    <td>{a === '✓' ? <span className="yes-mark">✓</span> : a === '✕' ? <span className="no-mark">—</span> : a}</td>
                    <td className="highlight">{b === '✓' ? <span className="yes-mark">✓</span> : b === '✕' ? <span className="no-mark">—</span> : b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <div className="footer-brand">
            <h2>Lawctopus Law School</h2>
            <p>Empowering the next generation of legal professionals through practical, skill-based education.</p>
          </div>
          <div className="footer-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Refund Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
