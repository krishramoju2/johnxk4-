
    document.addEventListener('DOMContentLoaded', () => {
      const canvas = document.getElementById('background-canvas');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene.fog = new THREE.Fog(0x111827, 10, 400);
      const createParticles = (particleCount, size, color) => {
        const particleGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 1000;
          positions[i + 1] = (Math.random() - 0.5) * 1000;
          positions[i + 2] = Math.random() * 1000;
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({
          size,
          color: new THREE.Color(color),
          transparent: true,
          opacity: 0.8,
          blending: THREE.AdditiveBlending
        });
        return new THREE.Points(particleGeometry, particleMaterial);
      };
      const fastParticles = createParticles(4000, 1.8, 0x34d399);
      const slowParticles = createParticles(2000, 1, 0x2563eb);
      fastParticles.position.z = -100;
      slowParticles.position.z = -100;
      scene.add(fastParticles);
      scene.add(slowParticles);
      camera.position.z = 5;
          // Function to load a section into a target element
      async function loadSection(file, targetSelector) {
          try {
            const response = await fetch(`sections/${file}.html`);
            if (response.ok) {
              const html = await response.text();
              document.querySelector(targetSelector).insertAdjacentHTML('beforeend', html);
            } else {
              console.error(`Failed to load ${file}.html:`, response.status);
            }
          } catch (err) {
            console.error(`Error loading ${file}:`, err);
          }
      }
      loadSection('about-us', '#content-container');
      function animate() {
        requestAnimationFrame(animate);
        const scrollY = window.scrollY;
        const animateParticles = (particles, baseSpeed) => {
          const particlePositions = particles.geometry.attributes.position.array;
          for (let i = 2; i < particlePositions.length; i += 3) {
            particlePositions[i] -= baseSpeed + scrollY * 0.03;
            if (particlePositions[i] < -1000) {
              particlePositions[i] = 1000;
            }
          }
          particles.geometry.attributes.position.needsUpdate = true;
        };
        animateParticles(fastParticles, 4);
        animateParticles(slowParticles, 1.5);
        renderer.render(scene, camera);
      }
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            speakSectionInfo(targetId.substring(1));
          }
        });
      });
      const voiceIndicator = document.getElementById('voice-indicator');
      const langSelector = document.getElementById('lang-select');
      let currentLanguage = 'en';
      let voices = [];
      const translations = {
        'en': {
          'hero': { title: 'Welcome to Neuronet HealthTech', description: 'Transforming Healthcare with Intelligent Software. We leverage advanced software, AI, and cloud technology to empower healthcare institutions, facilitate research, and improve patient outcomes worldwide.'},
          'about-us': { title: 'About Neuronet HealthTech', description: 'Neuronet HealthTech is a pioneer in healthcare software, combining AI, secure cloud solutions, and medical data analytics. Our vision is to accelerate innovation in diagnostics, treatment, and patient care.'},
          'innovations': { title: 'HealthTech Innovations & Insights', description: 'Explore our insights in clinical AI, security, cloud platforms, and DevOps for healthcare.'},
          'statistics': { title: 'Statistics: SDEs in the Medical Sector', description: 'DAV-based insights on employability, commissions, overtime, and trends for software engineers in healthcare.' },
          'chatbot': { title: 'Skill Gap Chatbot', description: 'Describe your skills and get a custom learning path for healthcare SDEs.'},
          'neuroverse': { title: 'Neuroverse', description: 'Featured projects, podcasts, and documentation – powering healthcare and AI innovation.'},
          'team-neuroos': { title: 'Team NeuroOS', description: 'Meet the team and mentors behind NeuroOS.' },
          'case-studies': { title: 'Case Studies', description: 'How Neuronet HealthTech delivers impact: real results for healthcare organizations.'},
          'careers': { title: 'Careers', description: 'Advance your career in healthcare software. Join us as an engineer, scientist, or developer.'},
          'acknowledgements': { title: 'A Note of Inspiration', description: 'We honor Upskillfam and its founders for inspiring our integrated approach to healthcare technology.' },
          'contact': { title: 'Contact', description: 'For healthcare software inquiries, collaborations, or support, please submit your message below.'}
        },
        'es': {
          'team-neuroos': { title: 'Equipo NeuroOS', description: 'Conozca al equipo y mentores detrás de NeuroOS.' },
        },
        'fr': {
          'team-neuroos': { title: 'Équipe NeuroOS', description: 'Rencontrez l\'équipe et les mentors derrière NeuroOS.' },
        }
      };
      function populateVoices() {
        voices = window.speechSynthesis.getVoices();
      }
      function speakSectionInfo(sectionId) {
        if (!window.speechSynthesis) return;
        const content = translations[currentLanguage]?.[sectionId] || translations['en'][sectionId];
        if (!content) return;
        const textToSpeak = `${content.title}. ${content.description}`;
        window.speechSynthesis.cancel();
        voiceIndicator.classList.add('active');
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        const preferredVoice = voices.find(voice => voice.lang.startsWith(currentLanguage));
        if (preferredVoice) utterance.voice = preferredVoice;
        utterance.onend = () => {
          setTimeout(() => voiceIndicator.classList.remove('active'), 500);
        };
        window.speechSynthesis.speak(utterance);
      }
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        return rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2;
      }
      let lastSpokenSection = null;
      function announceCurrentSection() {
        const sections = document.querySelectorAll('section[id], header[id]');
        for (const section of sections) {
          if (isInViewport(section)) {
            const sectionId = section.getAttribute('id');
            if (lastSpokenSection !== sectionId) {
              lastSpokenSection = sectionId;
              speakSectionInfo(sectionId);
            }
            return;
          }
        }
      }
      langSelector.addEventListener('change', (event) => {
        currentLanguage = event.target.value;
        lastSpokenSection = null;
        announceCurrentSection();
      });
      populateVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoices;
      }
      setTimeout(announceCurrentSection, 500);
      window.addEventListener('scroll', announceCurrentSection, { passive: true });

      // Simple chatbot logic
      const chatMessages = document.getElementById('chat-messages');
      const chatForm = document.getElementById('chat-form');
      const chatInput = document.getElementById('chat-input');
      function addMessage(content, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = type === 'user' ? 'chat-message-user' : 'chat-message-bot';
        msgDiv.textContent = content;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      function basicSkillGapBot(input) {
        input = input.toLowerCase();
        if(input.includes('python') && input.includes('cloud')) {
          return "You have great Python and cloud skills! Consider exploring HL7/FHIR integration, regulatory compliance (HIPAA), and mobile health app development to enhance your healthcare SDE profile.";
        }
        if(input.includes('javascript') || input.includes('react') || input.includes('angular') || input.includes('vue')) {
          return "Strong web development background! Learning about medical data standards (FHIR), security protocols, and AI/ML for healthcare analytics will increase your employability in medical software.";
        }
        if(input.includes('machine learning') || input.includes('ml')) {
          return "With ML experience, try focusing on medical imaging, clinical decision support, and cloud deployment of AI models. Consider TensorFlow, PyTorch, and privacy techniques for healthcare.";
        }
        if(input.includes('mobile')) {
          return "Mobile development is key for telehealth. Learn about healthcare-specific APIs, interoperability standards, and patient UX best practices.";
        }
        if(input.includes('beginner') || input.includes('no experience')) {
          return "Start with Python or JavaScript basics, then move into healthcare data standards (HL7, FHIR) and cloud platforms. Upskilling with online courses and small projects in medical data analytics is recommended.";
        }
        // Default
        return "To get a custom learning path, please list your skills (e.g., Python, ML, cloud, web, mobile) and your experience level. I’ll recommend the best next steps for the healthcare software sector!";
      }
      chatForm.addEventListener('submit', function(e){
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if(!userMsg) return;
        addMessage(userMsg, 'user');
        setTimeout(() => {
          addMessage(basicSkillGapBot(userMsg), 'bot');
        }, 500);
        chatInput.value = '';
      });

      animate();
    });

