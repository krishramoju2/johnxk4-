
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
      throw new Error(errorMsg);
    }
    const html = await response.text();
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.insertAdjacentHTML('beforeend', html);
    } else {
      const errorMsg = `Target element not found: ${targetSelector}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    // Return a success flag to the calling function
    return true; 
  } catch (err) {
    console.error(`Error loading ${file}:`, err);
    // Return a failure flag instead of re-throwing
    return false;
  }
}

// Use an async function to manage sequential loading
async function initializeApp() {
  // Use Promise.all to load sections concurrently and handle individual failures
  const sectionPromises = [
    loadSection('about-us', '#content'),
    loadSection('innovations', '#content'),
    loadSection('statistics', '#content'),
    loadSection('chatbot', '#content'),
    loadSection('neuroverse', '#content'),
    loadSection('team-neuroos', '#content'),
    loadSection('case-studies', '#content'),
    loadSection('careers', '#content'),
    loadSection('acknowledgements', '#content'),
    loadSection('contact', '#content'),
  ];
  
  // Wait for all sections to attempt loading, without failing the entire app on one error
  await Promise.allSettled(sectionPromises);
  
  // Now, safely initialize the chatbot by checking if its elements exist
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  // Check if all chatbot elements are in the DOM before proceeding
  if (chatMessages && chatForm && chatInput) {
    // These functions should be defined outside this block or within a scope accessible here
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

    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const userMsg = chatInput.value.trim();
      if (!userMsg) return;
      addMessage(userMsg, 'user');
      setTimeout(() => {
        addMessage(basicSkillGapBot(userMsg), 'bot');
      }, 500);
      chatInput.value = '';
    });
  } else {
    // Log a warning if the chatbot elements are not found
    console.warn("Chatbot elements not found. Initialization skipped.");
  }
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










document.addEventListener('DOMContentLoaded', function() {
    // Check if careers section exists
    const careersSection = document.getElementById('careers');
    if (!careersSection) {
        console.error('Careers section not found!');
        return;
    }
    
    const careersContainer = document.querySelector('#careers .grid');
    if (!careersContainer) {
        console.error('Careers container not found!');
        return;
    }
    
   // ✅ Use the one already in HTML
    const overlay = document.getElementById('career-overlay');

    
    // Career data
    const careerData = [
        {
            title: "Healthcare AI Engineer",
            location: "Toronto, ON",
            company: "MedAI Labs",
            description: "Develop ML models for clinical diagnostics and patient risk prediction.",
            fullDescription: "As a Healthcare AI Engineer, you'll design and implement machine learning algorithms to analyze medical data, build predictive models for disease diagnosis, and collaborate with clinical teams to deploy AI solutions in healthcare settings. Experience with TensorFlow, PyTorch, and healthcare data standards (HL7, FHIR) is required."
        },
        {
            title: "Cloud HealthOps Engineer",
            location: "Seattle, WA",
            company: "HealthCloud Services",
            description: "Architect and manage HIPAA-compliant cloud infrastructure.",
            fullDescription: "You will design, implement, and maintain secure cloud infrastructure that meets stringent healthcare compliance requirements. Responsibilities include managing AWS/Azure environments, implementing security protocols, and ensuring high availability of critical healthcare applications. HIPAA and HITRUST certification experience is essential."
        },
        {
            title: "Senior Software Engineer",
            location: "Boston, MA",
            company: "CareTech Solutions",
            description: "Lead backend development for hospital system integrations.",
            fullDescription: "Lead the design and development of scalable backend systems that integrate with various hospital EHR systems. You'll mentor junior developers, establish coding standards, and ensure the reliability of healthcare data exchange through APIs and integration pipelines. Experience with FHIR, HL7, and healthcare interoperability standards is required."
        },
        {
            title: "Data Scientist (Healthcare)",
            location: "San Francisco, CA",
            company: "LifeAnalytics",
            description: "Analyze medical datasets to drive insights and improve outcomes.",
            fullDescription: "Apply statistical modeling and machine learning techniques to large healthcare datasets to identify patterns, predict outcomes, and provide actionable insights to healthcare providers. You'll work with electronic health records, claims data, and patient-generated data to improve care delivery and patient outcomes."
        },
        {
            title: "Frontend Developer",
            location: "Remote",
            company: "PatientPortal Labs",
            description: "Build accessible patient-facing apps for web and mobile.",
            fullDescription: "Develop responsive and accessible user interfaces for healthcare applications that serve both patients and providers. You'll ensure compliance with WCAG accessibility standards, optimize performance, and create intuitive experiences for users of all technical abilities. Experience with React, Vue, or Angular is required."
        },
        {
            title: "Health Data Security Analyst",
            location: "New York, NY",
            company: "SecureHealth Systems",
            description: "Safeguard healthcare systems from emerging threats.",
            fullDescription: "Monitor, detect, and respond to security incidents in healthcare environments. Conduct vulnerability assessments, implement security controls, and ensure compliance with healthcare regulations. You'll work with cutting-edge security tools to protect sensitive patient data from cyber threats."
        },
        {
            title: "Bioinformatics Scientist",
            location: "Cambridge, MA",
            company: "GeneSight Therapeutics",
            description: "Analyze genomic data to identify disease markers and therapeutic targets.",
            fullDescription: "Apply computational methods to analyze large-scale genomic and proteomic datasets. Develop algorithms to identify genetic variants associated with diseases, and collaborate with wet lab scientists to validate findings. Experience with Python, R, and bioinformatics tools is essential."
        },
        {
            title: "Clinical Informatics Specialist",
            location: "Rochester, MN",
            company: "Mayo Clinic",
            description: "Implement and optimize Electronic Health Record (EHR) systems.",
            fullDescription: "Bridge the gap between clinical workflows and technology by optimizing EHR systems for maximum efficiency and usability. Train healthcare staff, customize system configurations, and ensure that technology supports rather than hinders patient care delivery."
        },
        {
            title: "Medical Device Software Engineer",
            location: "Irvine, CA",
            company: "MedTech Innovators",
            description: "Develop embedded software for next-generation medical devices.",
            fullDescription: "Design and implement software for FDA-regulated medical devices, following IEC 62304 standards. You'll work on everything from low-level embedded code to application logic, ensuring reliability, safety, and efficacy of medical device software."
        },
        {
            title: "User Experience (UX) Researcher",
            location: "Austin, TX",
            company: "HealthLoop",
            description: "Conduct user studies to improve the usability of healthcare platforms.",
            fullDescription: "Plan and execute user research studies with healthcare professionals and patients to identify usability issues and design opportunities. Synthesize findings into actionable insights that inform product design decisions and improve the overall user experience of healthcare applications."
        },
        {
            title: "Cybersecurity Engineer",
            location: "New York, NY",
            company: "SecureHealth Systems",
            description: "Design and implement security protocols to protect patient data.",
            fullDescription: "Architect and implement security solutions for healthcare organizations, including network security, endpoint protection, and data encryption. Develop security policies and procedures, conduct risk assessments, and ensure compliance with healthcare security regulations."
        },
        {
            title: "Health Data Scientist",
            location: "San Francisco, CA",
            company: "LifeAnalytics",
            description: "Use statistical modeling to analyze large-scale health datasets.",
            fullDescription: "Apply advanced statistical techniques and machine learning algorithms to healthcare data to uncover insights, predict outcomes, and support evidence-based decision making. Work with diverse datasets including EHR, claims, wearables, and patient-reported outcomes."
        },
        {
            title: "Machine Learning Engineer",
            location: "Toronto, ON",
            company: "MedAI Labs",
            description: "Build and deploy scalable machine learning models for clinical applications.",
            fullDescription: "Design, develop, and deploy machine learning models that can be integrated into clinical workflows. Focus on model interpretability, robustness, and scalability to ensure that AI solutions can be safely and effectively used in healthcare settings."
        },
        {
            title: "Backend Developer",
            location: "Boston, MA",
            company: "CareTech Solutions",
            description: "Develop robust APIs and services for healthcare system integrations.",
            fullDescription: "Build and maintain the backend infrastructure that enables seamless data exchange between healthcare systems. Develop RESTful APIs, implement data processing pipelines, and ensure the reliability and security of healthcare data integrations."
        },
        {
            title: "Full-Stack Developer",
            location: "Remote",
            company: "PatientPortal Labs",
            description: "Develop and maintain both client-side and server-side components of web applications.",
            fullDescription: "Work across the entire stack to develop patient-facing and provider-facing healthcare applications. Implement responsive frontend interfaces, develop backend APIs, and ensure seamless integration between different system components."
        },
        {
            title: "Cloud Infrastructure Engineer",
            location: "Seattle, WA",
            company: "HealthCloud Services",
            description: "Manage and scale cloud environments for healthcare IT solutions.",
            fullDescription: "Design, implement, and maintain cloud infrastructure that supports healthcare applications. Automate deployment processes, ensure high availability, and optimize costs while maintaining compliance with healthcare regulations."
        },
        {
            title: "Systems Analyst",
            location: "Rochester, MN",
            company: "Mayo Clinic",
            description: "Analyze and improve the efficiency of healthcare IT systems and workflows.",
            fullDescription: "Analyze existing healthcare IT systems and workflows to identify opportunities for improvement. Gather requirements from clinical staff, document processes, and recommend solutions that enhance efficiency and patient care."
        },
        {
            title: "Mobile App Developer",
            location: "Remote",
            company: "PatientPortal Labs",
            description: "Create and maintain native or cross-platform mobile applications for patients and clinicians.",
            fullDescription: "Develop mobile applications that enable patients to manage their health and clinicians to deliver care. Implement features such as appointment scheduling, medication reminders, and telehealth capabilities using native or cross-platform frameworks."
        },
        {
            title: "Data Engineer",
            location: "San Francisco, CA",
            company: "LifeAnalytics",
            description: "Design, build, and maintain data pipelines for healthcare analytics.",
            fullDescription: "Architect and implement scalable data pipelines that process and transform healthcare data for analytics and machine learning. Ensure data quality, implement data governance practices, and optimize data storage and retrieval performance."
        },
        {
            title: "Product Manager (HealthTech)",
            location: "Boston, MA",
            company: "CareTech Solutions",
            description: "Define product roadmaps and lead development teams for health technology products.",
            fullDescription: "Lead the product development process for health technology solutions. Gather requirements from stakeholders, define product vision and strategy, prioritize features, and work with cross-functional teams to deliver products that meet market needs and regulatory requirements."
        },
        {
            title: "Clinical Systems Integrator",
            location: "Atlanta, GA",
            company: "HealthLink Connect",
            description: "Develop and manage integrations between disparate clinical software systems (e.g., HL7, FHIR).",
            fullDescription: "Design and implement integrations between clinical systems such as EHRs, laboratory systems, and radiology systems. Develop interfaces using healthcare standards like HL7 and FHIR, and ensure reliable data exchange between systems."
        },
        {
            title: "Biomedical Engineer",
            location: "Baltimore, MD",
            company: "Johns Hopkins Medicine",
            description: "Apply engineering principles to solve problems in medicine and biology, creating devices and systems.",
            fullDescription: "Apply engineering principles to design and develop medical devices, diagnostic equipment, and therapeutic technologies. Work at the intersection of engineering and medicine to create innovative solutions that improve patient care and outcomes."
        },
        {
            title: "Healthcare Consultant",
            location: "Chicago, IL",
            company: "Apex Health Advisors",
            description: "Advise healthcare organizations on technology strategy and digital transformation.",
            fullDescription: "Provide strategic guidance to healthcare organizations on technology adoption, digital transformation, and process improvement. Analyze current state, identify opportunities, and develop roadmaps for implementing technology solutions that enhance care delivery and operational efficiency."
        },
        {
            title: "Quality Assurance Tester",
            location: "Palo Alto, CA",
            company: "VeriMed Software",
            description: "Ensure the reliability, functionality, and security of healthcare software applications.",
            fullDescription: "Develop and execute test plans for healthcare software applications, including functional testing, regression testing, performance testing, and security testing. Identify, document, and track bugs to resolution, ensuring that software meets quality standards and regulatory requirements."
        },
        {
            title: "Research Scientist (Genomics)",
            location: "Cambridge, MA",
            company: "Broad Institute",
            description: "Conduct research using advanced computational methods on large-scale genomic data.",
            fullDescription: "Apply computational biology and bioinformatics methods to analyze genomic data and answer research questions in human health and disease. Develop novel algorithms, contribute to scientific publications, and collaborate with experimental biologists to validate computational findings."
        },
        {
            title: "DevOps Engineer",
            location: "Remote",
            company: "Optum Health",
            description: "Automate and streamline the software development and deployment processes for health applications.",
            fullDescription: "Implement CI/CD pipelines, automate infrastructure provisioning, and monitor production systems for healthcare applications. Ensure high availability, performance, and security of healthcare software while enabling rapid and reliable deployment of new features."
        },
        {
            title: "EHR Implementation Consultant",
            location: "Dallas, TX",
            company: "Epic Systems",
            description: "Assist hospitals and clinics with the setup and training for Epic's EHR system.",
            fullDescription: "Work with healthcare organizations to implement Epic EHR systems, including configuration, customization, and integration with existing systems. Train end-users, provide go-live support, and ensure successful adoption of the EHR system."
        },
        {
            title: "Technical Writer",
            location: "Redmond, WA",
            company: "Microsoft Healthcare",
            description: "Create clear and concise documentation for health-related software and APIs.",
            fullDescription: "Develop comprehensive documentation for healthcare software, including user guides, API documentation, and implementation guides. Work with product managers and developers to understand technical concepts and translate them into clear, accessible content for diverse audiences."
        },
        {
            title: "Health Data Analyst",
            location: "Remote",
            company: "Teladoc Health",
            description: "Extract and analyze health data to create reports and dashboards for business intelligence.",
            fullDescription: "Extract, transform, and analyze healthcare data to generate insights and support decision-making. Develop reports and dashboards that track key performance indicators, identify trends, and measure the impact of healthcare interventions."
        },
        {
            title: "Cybersecurity Analyst",
            location: "Boston, MA",
            company: "Cynerio",
            description: "Monitor, detect, and respond to cyber threats within healthcare networks and connected devices.",
            fullDescription: "Monitor healthcare networks for security incidents, investigate alerts, and respond to threats in real-time. Analyze security events, implement protective measures, and help healthcare organizations defend against cyber attacks targeting medical devices and health information systems."
        }
    ];

    // Generate career cards
    careerData.forEach((career, index) => {
        const card = document.createElement('div');
        card.className = 'compact-card card';
        card.dataset.index = index;
        
        card.innerHTML = `
            <h3 class="compact-title text-lg space-grotesk">${career.title}</h3>
            <p class="compact-text inter">${career.location} | ${career.company}<br>${career.description}</p>
        `;
        
        careersContainer.appendChild(card);
    });

    // Create expanded view container (initially hidden)
    const expandedView = document.createElement('div');
    expandedView.id = 'career-expanded-view';
    expandedView.className = 'fixed inset-x-0 mx-auto z-50 max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 hidden';
    expandedView.style.top = '50%';
    expandedView.style.transform = 'translateY(-50%)';
    
    expandedView.innerHTML = `
        <button id="close-expanded" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h3 id="expanded-title" class="text-2xl font-bold mb-2 space-grotesk"></h3>
        <p id="expanded-location" class="text-gray-600 dark:text-gray-300 mb-4 inter"></p>
        <p id="expanded-description" class="text-gray-700 dark:text-gray-200 mb-6 inter"></p>
    `;
    
    document.body.appendChild(expandedView);
    
    // Add event listeners to cards after a brief delay to ensure DOM is ready
    setTimeout(function() {
        const cards = document.querySelectorAll('.compact-card');
        const expandedTitle = document.getElementById('expanded-title');
        const expandedLocation = document.getElementById('expanded-location');
        const expandedDescription = document.getElementById('expanded-description');
        const closeButton = document.getElementById('close-expanded');
        
        if (!cards.length || !expandedTitle || !expandedLocation || !expandedDescription || !closeButton) {
            console.error('Required elements not found!');
            return;
        }
        
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const index = this.dataset.index;
                const career = careerData[index];
                
                // Update expanded view content
                expandedTitle.textContent = career.title;
                expandedLocation.textContent = `${career.location} | ${career.company}`;
                expandedDescription.textContent = career.fullDescription;
                
                // Show expanded view and overlay
                expandedView.classList.remove('hidden');
                overlay.classList.remove('hidden');
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close expanded view when clicking close button
        closeButton.addEventListener('click', closeExpandedView);
        
        // Close expanded view when clicking overlay
        overlay.addEventListener('click', closeExpandedView);
        
        // Close expanded view when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeExpandedView();
            }
        });
        
        function closeExpandedView() {
            expandedView.classList.add('hidden');
            overlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 100);
});
