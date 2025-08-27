
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
/**
 * Asynchronously loads an HTML section from a file and inserts it into the DOM.
 * @param {string} file The name of the HTML file (e.g., 'about-us').
 * @param {string} targetSelector A CSS selector for the target container (e.g., '#content-container').
 * @returns {Promise<void>} A promise that resolves when the section is loaded, or rejects on error.
 */
async function loadSection(file, targetSelector) {
  try {
    const response = await fetch(`sections/${file}.html`);
    if (!response.ok) {
      const errorMsg = `Failed to load ${file}.html: ${response.status}`;
      console.error(errorMsg);
      // Throw an error to be caught by the outer catch block or a .catch() handler
      throw new Error(errorMsg);
    }
    const html = await response.text();
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      // Corrected to use insertAdjacentHTML to append content
      targetElement.insertAdjacentHTML('beforeend', html);
    } else {
      const errorMsg = `Target element not found: ${targetSelector}`;
      console.error(errorMsg);
      // Throw an error if the target element doesn't exist
      throw new Error(errorMsg);
    }
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
    // Re-throw the error to be caught by a calling function's .catch()
    throw err;
  }
}

// Use an async function to manage sequential loading
async function initializeApp() {
  try {
    // Load sections sequentially to ensure correct order in the DOM
    await loadSection('about-us', '#content');
    await loadSection('innovations', '#content');
    await loadSection('statistics', '#content');
    await loadSection('chatbot', '#content');
    await loadSection('neuroverse', '#content');
    await loadSection('team-neuroos', '#content');
    await loadSection('case-studies', '#content');
    await loadSection('careers', '#content');
    await loadSection('acknowledgements', '#content');
    await loadSection('contact', '#content');

    
      
// Once all sections are loaded, safely initialize the chatbot
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

   // Core Skill Combos
   if (input.includes('python') && input.includes('cloud')) {
     return "Python and cloud skills are a powerful combo. To specialize in healthcare, you should focus on: 1. **HL7/FHIR Integration**: Learn to parse and create FHIR resources using libraries like `fhirclient` or `py-fhir`. 2. **Cloud Healthcare APIs**: Get hands-on with services like Google Cloud Healthcare API or AWS HealthLake for ingesting and managing healthcare data. 3. **Data Security**: Implement robust authentication and authorization, and understand HIPAA-compliant data handling in the cloud.";
   }
   if (input.includes('javascript') || input.includes('react') || input.includes('angular') || input.includes('vue')) {
     return "A strong web development background is a great starting point. To pivot to healthcare, focus on: 1. **FHIR & SMART on FHIR**: Build a front-end application that can query and display data from a FHIR server securely. 2. **User Experience (UX)**: Design intuitive interfaces for clinicians and patients, ensuring accessibility and ease of use. 3. **Telehealth**: Explore real-time communication technologies like WebRTC for video calls, and integrate with remote patient monitoring devices.";
   }
   if (input.includes('machine learning') || input.includes('ml')) {
     return "Your ML experience is highly valuable. To apply it in healthcare, you need to: 1. **Data Preprocessing**: Master handling complex medical datasets, including unstructured text from clinical notes and image data (DICOM). 2. **Model Interpretation**: Learn techniques for model explainability (XAI) to build trust with medical professionals. 3. **Clinical Applications**: Focus on specific domains like medical imaging analysis (e.g., tumor detection), disease risk prediction, or clinical decision support systems.";
   }

   // Advanced/Specific Queries
   if (input.includes('dicom') || input.includes('medical imaging')) {
     return "To work with medical images, you need to master the DICOM standard. Use Python libraries like `pydicom` to read, write, and manipulate DICOM files. Explore deep learning frameworks like MONAI for medical-specific models, and learn about image segmentation, classification, and registration techniques.";
   }
   if (input.includes('nlp') || input.includes('natural language processing')) {
     return "NLP is key for unlocking insights from clinical notes. Focus on: 1. **Named Entity Recognition (NER)**: Extracting medical terms like diseases, medications, and procedures. 2. **De-identification**: Building models to automatically remove Protected Health Information (PHI) from text. 3. **Clinical Text Summarization**: Creating concise summaries of long patient records.";
   }
   if (input.includes('iot') || input.includes('wearables')) {
     return "Internet of Things (IoT) in healthcare is all about remote monitoring. You should focus on: 1. **Device Integration**: Connecting to health wearables and medical devices via Bluetooth or other protocols. 2. **Real-time Data Processing**: Designing systems to ingest and analyze streaming data from these devices. 3. **Interoperability**: Ensuring data from different devices can be aggregated and shared via standards like FHIR.";
   }
   if (input.includes('blockchain') || input.includes('decentralized')) {
     return "Blockchain offers a new way to manage secure health records. Learn about: 1. **Smart Contracts**: Building logic for patient consent management and data access. 2. **Interoperability**: Creating decentralized identity solutions for patients and providers. 3. **Security & Privacy**: Understanding how to design systems that maintain patient anonymity while allowing for data verification.";
   }
   if (input.includes('cybersecurity') || input.includes('hipaa')) {
     return "Cybersecurity is non-negotiable in healthcare. Your learning path should include: 1. **Risk Assessment**: Identifying vulnerabilities in healthcare systems. 2. **HIPAA/GDPR Compliance**: Implementing and documenting technical safeguards. 3. **Secure Coding**: Writing code that prevents common vulnerabilities like SQL injection and cross-site scripting.";
   }
   if (input.includes('big data') || input.includes('spark') || input.includes('kafka')) {
     return "Handling large-scale healthcare data requires expertise in Big Data technologies. Master distributed processing with Apache Spark for analytics and real-time data streaming with Apache Kafka for applications like remote patient monitoring and clinical alerts.";
   }
   if (input.includes('telehealth') || input.includes('video call')) {
     return "For telehealth, focus on secure, real-time communication. You should learn about: 1. **WebRTC**: The standard for browser-based video calls. 2. **Secure Communication**: Ensuring end-to-end encryption for all video and chat data. 3. **UX**: Designing a smooth and reliable user experience for both patients and clinicians.";
   }

   // Experience-level based queries
   if (input.includes('beginner') || input.includes('no experience')) {
     return "Start with the fundamentals. Pick a programming language like Python or JavaScript. Then, learn about basic data structures, algorithms, and version control (Git). Once you have a strong foundation, start exploring healthcare-specific topics like HL7 and FHIR with introductory online courses.";
   }
   if (input.includes('experienced') && input.includes('software engineer')) {
     return "As an experienced SE, you can quickly bridge the gap. Focus on: 1. **Healthcare Standards**: A deep dive into FHIR, HL7, and DICOM. 2. **Domain Knowledge**: Read up on clinical workflows, regulatory requirements (HIPAA, FDA), and common challenges in healthcare IT. 3. **Specialization**: Pick a niche, like AI in diagnostics, telehealth, or interoperability, and build a project to showcase your expertise.";
   }

   // Default/General responses
   return "I'm designed to help you find your learning path in healthcare software. Please list your current skills (e.g., Python, web, mobile, ML) or a specific area of interest (e.g., telehealth, medical imaging) so I can give you a tailored recommendation!";
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

} catch (err) {
 console.error("Failed to load sections and initialize the app:", err);
}





























































    
// Start the application
initializeApp();















        
        
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



      animate();
    });

