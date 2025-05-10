// js/script.js
// Toggle mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Contact form submission (Formspree AJAX)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = new FormData(form);
  status.textContent = 'Sending...';
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      status.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    } else {
      status.textContent = 'Oops! There was a problem sending your message.';
    }
  } catch (error) {
    status.textContent = 'Oops! There was a problem sending your message.';
  }
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  // Initialize 3D background
  initParticleBackground();
  
  // Initialize dynamic text rotation
  initDynamicTextRotation();
  
  // Initialize modal functionality
  initializeModal();
});

// Modal Functions
function initializeModal() {
  // Pre-load modal images
  const modalImages = document.querySelectorAll('.gallery-thumbs img');
  modalImages.forEach(img => {
    const image = new Image();
    image.src = img.src;
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  // Reset modal content position
  const modalContent = modal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.style.transform = 'translateY(-50px)';
  }
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Trigger animations
  requestAnimationFrame(() => {
    modal.classList.add('show');
    if (modalContent) {
      modalContent.style.transform = 'translateY(0)';
    }
    
    // Animate list items
    const listItems = modal.querySelectorAll('.modal-info li');
    listItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 200 + (index * 100));
    });
  });
}

// Slideshow logic for modal
let currentSlide = 0;
const slides = [
  { type: 'image', src: 'images/hotel/figma.png' },
  { type: 'image', src: 'images/hotel/php.png' },
  { type: 'image', src: 'images/hotel/figma.png' },
  { type: 'image', src: 'images/hotel/php.png' },
  { type: 'video', src: 'videos/view.mp4' }
];

function showSlide(index) {
  currentSlide = index;
  const mainImage = document.getElementById('mainImage');
  const mainVideo = document.getElementById('mainVideo');
  if (!mainImage || !mainVideo) return;

  if (slides[index].type === 'image') {
    mainImage.src = slides[index].src;
    mainImage.style.display = 'block';
    mainVideo.style.display = 'none';
    mainVideo.pause();
  } else if (slides[index].type === 'video') {
    mainVideo.src = slides[index].src;
    mainImage.style.display = 'none';
    mainVideo.style.display = 'block';
    mainVideo.load();
    mainVideo.play();
  }
  // Update active thumbnail
  const thumbs = document.querySelectorAll('.gallery-thumbs img');
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

function changeSlide(direction) {
  let newIndex = currentSlide + direction;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  showSlide(newIndex);
}

// Initialize first slide when modal opens
const originalOpenModal = openModal;
openModal = function(modalId) {
  originalOpenModal(modalId);
  showSlide(0);
};

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content');
  modal.classList.remove('show');
  if (modalContent) {
    modalContent.style.transform = 'translateY(-50px)';
  }

  // Reset animations
  const listItems = modal.querySelectorAll('.modal-info li');
  listItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
  });

  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

function changeImage(src) {
  const mainImage = document.getElementById('mainImage');
  if (!mainImage) return;

  // Add fade out effect
  mainImage.style.opacity = '0';
  
  setTimeout(() => {
    mainImage.src = src;
    // Add fade in effect
    requestAnimationFrame(() => {
      mainImage.style.opacity = '1';
    });
  }, 200);

  // Update active thumbnail
  const thumbs = document.querySelectorAll('.gallery-thumbs img');
  thumbs.forEach(thumb => {
    thumb.classList.toggle('active', thumb.src === src);
  });
}

// Event Listeners
document.addEventListener('click', function(event) {
  // Close modal when clicking outside
  if (event.target.classList.contains('modal')) {
    const modalId = event.target.id;
    closeModal(modalId);
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
      if (modal.style.display === 'flex') {
        closeModal(modal.id);
      }
    }
  }
});

// Dynamic text rotation with matching backgrounds
function initDynamicTextRotation() {
  // Get the element where we'll display the changing text
  const dynamicTextElement = document.getElementById('dynamic-text');
  if (!dynamicTextElement) return;
  
  // Define professional titles with their associated colors, themes, and background settings
  const titles = [
    {
      text: "WEB DEVELOPER",
      color: "#00a8e8",
      secondaryColor: "#0077cc",
      particleColor: [0.0, 0.5, 1.0],
      icons: ['code', 'database'],
      role: 'frontend',
      backgroundTheme: {
        particleCount: 300,
        size: 0.15,
        speed: 0.02,
        pattern: 'grid',
        symbols: ['<div>', '</div>', '{', '}', '()', '[]', '//']
      }
    },
    {
      text: "UI/UX DESIGNER",
      color: "#7b68ee",
      secondaryColor: "#5a48cd",
      particleColor: [0.5, 0.4, 0.9],
      icons: ['design', 'palette'],
      role: 'ui-ux',
      backgroundTheme: {
        particleCount: 200,
        size: 0.2,
        speed: 0.015,
        pattern: 'circular',
        symbols: ['◯', '◉', '◎', '●', '◐', '◑', '◒', '◓']
      }
    },
    {
      text: "BACKEND DEV",
      color: "#ff5e62",
      secondaryColor: "#ff2e55",
      particleColor: [1.0, 0.3, 0.4],
      icons: ['code', 'database'],
      role: 'backend',
      backgroundTheme: {
        particleCount: 250,
        size: 0.18,
        speed: 0.025,
        pattern: 'maze',
        symbols: ['⟁', '⟲', '⟳', '⊛', '⊕', '⊗', '≡', '≢']
      }
    },
    {
      text: "PROBLEM SOLVER",
      color: "#2ecc71",
      secondaryColor: "#27ae60",
      particleColor: [0.2, 0.8, 0.4],
      icons: ['code', 'database'],
      role: 'problem-solver',
      backgroundTheme: {
        particleCount: 180,
        size: 0.16,
        speed: 0.018,
        pattern: 'device',
        symbols: ['📱', '⌨️', '🖥️', '💻', '📲', '🔌']
      }
    }
  ];
  
  let currentIndex = 0;
  let particleSystem = null;
  let digitalParticles = [];
  let autoRotationInterval = null;
  
  // Create digital particles for tech ambiance
  createDigitalParticles();
  
  // Get all role elements
  const roleElements = document.querySelectorAll('.role');
  
  // Add click event listeners to role elements
  roleElements.forEach(element => {
    element.addEventListener('click', () => {
      const roleType = element.getAttribute('data-role');
      const titleIndex = titles.findIndex(title => title.role === roleType);
      
      if (titleIndex !== -1) {
        // Clear auto-rotation interval
        if (autoRotationInterval) {
          clearInterval(autoRotationInterval);
          autoRotationInterval = null;
        }
        
        // Update to the selected role
        currentIndex = titleIndex;
        updateDynamicText();
        
        // Restart auto-rotation after a delay
        autoRotationInterval = setInterval(autoRotateText, 7000);
      }
    });
  });
  
  // Update the text and apply style
  function updateDynamicText() {
    const title = titles[currentIndex];
    
    // Apply text and color to the dynamic text element with animation
    dynamicTextElement.style.opacity = 0;
    
    setTimeout(() => {
      dynamicTextElement.textContent = title.text;
      dynamicTextElement.style.background = `linear-gradient(45deg, ${title.color}, ${title.secondaryColor})`;
      dynamicTextElement.style.backgroundClip = 'text';
      dynamicTextElement.style.webkitBackgroundClip = 'text';
      dynamicTextElement.style.color = 'transparent';
      dynamicTextElement.style.textShadow = `0 0 10px ${title.color}40, 0 0 20px ${title.color}20`;
      dynamicTextElement.style.opacity = 1;
      
      // Update particle colors
      updateParticleColors(title.particleColor);
      
      // Update background theme
      updateBackgroundTheme(title.backgroundTheme);
      
      // Update digital particles theme
      updateDigitalParticles(title.backgroundTheme.symbols);
      
      // Update active role
      updateActiveRole(title.role);
    }, 300);
  }
  
  // Auto-rotate through text options
  function autoRotateText() {
    // Move to next title
    currentIndex = (currentIndex + 1) % titles.length;
    updateDynamicText();
  }
  
  // Update which role is active
  function updateActiveRole(activeRole) {
    // Remove active class from all roles
    roleElements.forEach(element => {
      element.classList.remove('active');
    });
    
    // Add active class to current role
    const activeElement = document.querySelector(`.role[data-role="${activeRole}"]`);
    if (activeElement) {
      activeElement.classList.add('active');
    }
  }
  
  // Update particle colors to match current theme
  function updateParticleColors(baseColor) {
    if (!window.THREE) return;
    
    const scene = window.scene;
    if (!scene) return;
    
    // Find particle system
    scene.traverse(object => {
      if (object.isPoints) {
        particleSystem = object;
      }
    });
    
    if (!particleSystem) return;
    
    // Update colors of particles
    const colors = particleSystem.geometry.attributes.color;
    const count = colors.count;
    
    // Create variations of the base color
    const colorVariations = [
      baseColor,
      [baseColor[0] * 0.8, baseColor[1] * 0.8, baseColor[2] * 0.8],
      [baseColor[0] * 1.2, baseColor[1] * 1.2, baseColor[2] * 1.2],
      [baseColor[0], baseColor[1] * 0.7, baseColor[2] * 1.1],
      [baseColor[0] * 1.1, baseColor[1] * 1.1, baseColor[2] * 0.8]
    ];
    
    // Apply color changes gradually over time
    let colorChangeProgress = 0;
    const colorChangeSpeed = 0.02;
    const originalColors = [];
    
    // Store original colors
    for (let i = 0; i < count; i++) {
      originalColors.push([
        colors.array[i * 3],
        colors.array[i * 3 + 1],
        colors.array[i * 3 + 2]
      ]);
    }
    
    // Animation function to gradually change colors
    function animateColorChange() {
      if (colorChangeProgress < 1) {
        colorChangeProgress += colorChangeSpeed;
        
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          
          // For main spiral particles
          if (i < count * 0.8) {
            // Get a color variation based on particle position
            const variation = colorVariations[i % colorVariations.length];
            
            // Interpolate between original and new color
            colors.array[i3] = originalColors[i][0] * (1 - colorChangeProgress) + variation[0] * colorChangeProgress;
            colors.array[i3 + 1] = originalColors[i][1] * (1 - colorChangeProgress) + variation[1] * colorChangeProgress;
            colors.array[i3 + 2] = originalColors[i][2] * (1 - colorChangeProgress) + variation[2] * colorChangeProgress;
          }
        }
        
        colors.needsUpdate = true;
        requestAnimationFrame(animateColorChange);
      }
    }
    
    // Start color animation
    animateColorChange();
  }
  
  // Update background theme based on current profession
  function updateBackgroundTheme(theme) {
    if (!window.THREE || !particleSystem) return;
    
    // Adjust particle size and movement pattern
    const sizes = particleSystem.geometry.attributes.size;
    
    // Apply size changes gradually
    let sizeChangeProgress = 0;
    const sizeChangeSpeed = 0.04;
    const originalSizes = [];
    
    // Store original sizes
    for (let i = 0; i < sizes.count; i++) {
      originalSizes.push(sizes.array[i]);
    }
    
    // Animation function for size changes
    function animateSizeChange() {
      if (sizeChangeProgress < 1) {
        sizeChangeProgress += sizeChangeSpeed;
        
        for (let i = 0; i < sizes.count; i++) {
          // Adjust size based on theme
          const newSize = originalSizes[i] * (theme.pattern === 'grid' ? 0.8 : 
                         theme.pattern === 'circular' ? 1.2 : 
                         theme.pattern === 'maze' ? 1.0 : 
                         theme.pattern === 'device' ? 0.9 : 1.1);
          
          sizes.array[i] = originalSizes[i] * (1 - sizeChangeProgress) + newSize * sizeChangeProgress;
        }
        
        sizes.needsUpdate = true;
        requestAnimationFrame(animateSizeChange);
      }
    }
    
    // Start size animation
    animateSizeChange();
    
    // Adjust movement pattern of particles
    // This is done by modifying the motion in the animation loop
    window.currentTheme = theme;
  }
  
  // Highlight tech icons related to current title
  function highlightTechIcons(iconTypes) {
    // Find all tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    if (!techIcons.length) return;
    
    // Reset all icons
    techIcons.forEach(icon => {
      icon.classList.remove('highlighted');
    });
    
    // Highlight relevant icons
    iconTypes.forEach(iconType => {
      const matchingIcons = document.querySelectorAll(`.tech-icon[data-type="${iconType}"]`);
      matchingIcons.forEach(icon => {
        icon.classList.add('highlighted');
        // Add pulsing animation
        icon.style.animation = 'pulse 1.5s infinite';
      });
    });
  }
  
  // Create floating digital particles in the background
  function createDigitalParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Remove any existing digital particles
    const existingParticles = document.querySelectorAll('.digital-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('span');
      particle.classList.add('digital-particle');
      
      // Random position
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 12 + 8;
      particle.style.fontSize = `${size}px`;
      
      // Random opacity
      particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      
      // Add random movement
      particle.style.animation = `float ${Math.random() * 20 + 10}s linear infinite`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Add to hero section
      heroSection.appendChild(particle);
      
      // Store for later updates
      digitalParticles.push(particle);
    }
  }
  
  // Update digital particles with new symbols
  function updateDigitalParticles(symbols) {
    digitalParticles.forEach(particle => {
      // Change to a random symbol from the current theme
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      particle.textContent = randomSymbol;
      
      // Update color to match theme
      const titleObj = titles[currentIndex];
      particle.style.color = Math.random() > 0.5 ? titleObj.color : titleObj.secondaryColor;
      
      // Add fade out/in effect
      particle.style.opacity = 0;
      setTimeout(() => {
        particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
      }, 300);
    }
    )}
  
  // Define keyframes for floating animation
  const floatKeyframes = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0.1;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      transform: translateY(-20px) translateX(10px) rotate(5deg);
      opacity: 0.2;
    }
    75% {
      opacity: 0.4;
    }
    100% {
      transform: translateY(-40px) translateX(0) rotate(0deg);
      opacity: 0;
    }
  }`;
  
  // Add keyframes to document
  const styleSheet = document.createElement('style');
  styleSheet.textContent = floatKeyframes;
  document.head.appendChild(styleSheet);
  
  // Initial update
  updateDynamicText();
  updateActiveRole(titles[currentIndex].role);
  
  // Set interval for text rotation (7 seconds)
  autoRotationInterval = setInterval(autoRotateText, 7000);
}

// Store scene reference for later access
window.scene = null;

// 3D particle background
function initParticleBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !window.THREE) return;
  
  const scene = new THREE.Scene();
  window.scene = scene;
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMappingExposure = 1.2;
  canvas.appendChild(renderer.domElement);
  
  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000);
  const initialCameraX = 0;
  const initialCameraY = 5;
  camera.position.set(initialCameraX, initialCameraY, 30);
  camera.lookAt(0, 0, 0);
  
  const particleCount = 15000;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  const galaxyRadius = 20;
  const galaxyHeight = 8;
  const spiralArms = 5;
  const spiralTightness = 4.5;
  
  const colorPalette = [
    [0.0, 0.5, 1.0], [0.4, 0.2, 1.0], [0.7, 0.3, 1.0],
    [1.0, 0.2, 0.8], [1.0, 0.4, 0.6], [0.0, 0.8, 1.0],
    [0.2, 0.9, 0.5]
  ];
  
  function getColor(distance, height, angle) {
    const armIndex = Math.floor(((angle % (Math.PI * 2)) / (Math.PI * 2)) * spiralArms) % colorPalette.length;
    const nextIndex = (armIndex + 1) % colorPalette.length;
    const baseColor = colorPalette[armIndex];
    const nextColor = colorPalette[nextIndex];
    const mixFactor = Math.sin((angle * spiralArms) % Math.PI) * 0.5 + 0.5;
    const brightnessFactor = 1.0 - Math.abs(height) / galaxyHeight * 0.4;
    return [
      (baseColor[0] * (1 - mixFactor) + nextColor[0] * mixFactor) * brightnessFactor,
      (baseColor[1] * (1 - mixFactor) + nextColor[1] * mixFactor) * brightnessFactor,
      (baseColor[2] * (1 - mixFactor) + nextColor[2] * mixFactor) * brightnessFactor
    ];
  }
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    let distance, angle, z, spiralOffset;
    const particleType = Math.random();
    if (particleType < 0.65) {
      distance = Math.pow(Math.random(), 2) * galaxyRadius;
      angle = Math.random() * Math.PI * 2;
      spiralOffset = (distance / galaxyRadius) * spiralTightness;
      const armIndex = Math.floor(Math.random() * spiralArms);
      const spiralAngle = angle + spiralOffset + (Math.PI * 2 * armIndex / spiralArms);
      z = ((Math.random() - 0.5) * galaxyHeight) * (1 - Math.pow(distance / galaxyRadius, 2) * 0.5);
      positions[i3] = Math.cos(spiralAngle) * distance;
      positions[i3 + 1] = z;
      positions[i3 + 2] = Math.sin(spiralAngle) * distance;
      sizes[i] = Math.max(0.05, 0.15 - (distance / galaxyRadius) * 0.05 + Math.random() * 0.1);
    } else if (particleType < 0.85) {
      const clusterCount = 6;
      const clusterIndex = Math.floor(Math.random() * clusterCount);
      const clusterRadius = 8 + Math.random() * 4;
      const clusterAngle = (clusterIndex / clusterCount) * Math.PI * 2;
      const clusterX = Math.cos(clusterAngle) * (galaxyRadius * 0.4);
      const clusterY = (Math.random() - 0.5) * 5;
      const clusterZ = Math.sin(clusterAngle) * (galaxyRadius * 0.4);
      const randomRadius = Math.random() * clusterRadius;
      const randomAngle = Math.random() * Math.PI * 2;
      positions[i3] = clusterX + Math.cos(randomAngle) * randomRadius;
      positions[i3 + 1] = clusterY + (Math.random() - 0.5) * 3;
      positions[i3 + 2] = clusterZ + Math.sin(randomAngle) * randomRadius;
      sizes[i] = 0.08 + Math.random() * 0.08;
    } else {
      distance = galaxyRadius * 2 + Math.random() * galaxyRadius * 6;
      const theta = Math.random() * Math.PI;
      angle = Math.random() * Math.PI * 2;
      positions[i3] = distance * Math.sin(theta) * Math.cos(angle);
      positions[i3 + 1] = distance * Math.sin(theta) * Math.sin(angle);
      positions[i3 + 2] = distance * Math.cos(theta);
      sizes[i] = Math.random() * 0.03 + 0.01;
    }
    let colorValue;
    if (particleType < 0.65) {
      colorValue = getColor( Math.sqrt(positions[i3]**2 + positions[i3+2]**2), positions[i3+1], Math.atan2(positions[i3+2], positions[i3]) );
    } else if (particleType < 0.85) {
      const techColor = Math.random() < 0.5 ? [0.2,0.8,1.0] : [0.6,0.3,1.0];
      colorValue = [ techColor[0] + (Math.random()-0.5)*0.2, techColor[1] + (Math.random()-0.5)*0.2, techColor[2] + (Math.random()-0.5)*0.2 ];
    } else {
      const brightness = 0.7 + Math.random()*0.3;
      colorValue = [brightness, brightness, brightness + Math.random()*0.2];
    }
    colors[i3]=colorValue[0]; colors[i3+1]=colorValue[1]; colors[i3+2]=colorValue[2];
  }
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: {
      pointTexture: { value: createParticleTexture() },
      uTime: { value: 0.0 }
    },
    vertexShader: `
      attribute float size;
      varying vec3 vColor;
      uniform float uTime;
      void main() {
        vColor = color;
        vec3 pos = position;
        if (position.y < 8.0 && position.y > -8.0) {
          float frequency = 0.8;
          float amplitude = 0.08;
          pos.y += sin(uTime * frequency + position.x * 0.5 + position.z * 0.5) * amplitude;
        }
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        float pointSize = size * (320.0 / -mvPosition.z);
        pointSize *= 1.0 + sin(uTime * 1.5 + position.x * 0.5) * 0.05;
        gl_PointSize = pointSize;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      void main() {
        vec4 texColor = texture2D(pointTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor, texColor.r);
        gl_FragColor.rgb *= 1.2;
      }
    `,
    blending: THREE.AdditiveBlending,
    depthTest: false,
    transparent: true,
    vertexColors: true
  });
  
  const particleSystem = new THREE.Points(particles, material);
  scene.add(particleSystem);
  
  addTechGrids(scene, galaxyRadius);
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight1 = new THREE.PointLight(0x00a8ff, 1, 100);
  pointLight1.position.set(10, 5, 15);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0x7b68ee, 1, 100);
  pointLight2.position.set(-15, -7, 10);
  scene.add(pointLight2);
  
  const bloomPass = createBloomEffect(scene, camera, renderer);
  
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let targetCameraOffsetX = 0, targetCameraOffsetY = 0; // For camera parallax
  
  function handleMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotationX = mouseY * 0.3;
    targetRotationY = mouseX * 0.3;
    targetCameraOffsetX = mouseX * 2; // Parallax effect strength for X
    targetCameraOffsetY = mouseY * 1.5; // Parallax effect strength for Y
  }
  document.addEventListener('mousemove', handleMouseMove);
  
  function addTechGrids(scene, radius) {
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        color1: { value: new THREE.Color(0x00a8e8) },
        color2: { value: new THREE.Color(0x7b68ee) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        float grid(vec2 p, float width) {
          vec2 grid = abs(fract(p - 0.5) - 0.5) / width;
          float line = min(grid.x, grid.y);
          return 1.0 - min(line, 1.0);
        }
        void main() {
          vec2 p = vUv * 40.0;
          p.y += uTime * 0.2;
          float width = 0.05;
          float intensity = grid(p, width);
          float largeGrid = grid(vUv * 10.0 + uTime * 0.1, 0.1) * 0.5;
          float dist = distance(vUv, vec2(0.5));
          float fade = 1.0 - smoothstep(0.2, 0.5, dist);
          vec3 color = mix(color1, color2, vUv.x);
          gl_FragColor = vec4(color, (intensity * 0.4 + largeGrid * 0.2) * fade);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const gridPlane1 = new THREE.PlaneGeometry(radius * 2.5, radius * 2.5, 1, 1);
    const gridMesh1 = new THREE.Mesh(gridPlane1, gridMaterial);
    gridMesh1.rotation.x = Math.PI / 2;
    gridMesh1.position.y = -5;
    scene.add(gridMesh1);
    const gridPlane2 = new THREE.PlaneGeometry(radius * 2, radius * 2, 1, 1);
    const gridMaterial2 = gridMaterial.clone();
    gridMaterial2.uniforms.color1.value = new THREE.Color(0x7b68ee);
    gridMaterial2.uniforms.color2.value = new THREE.Color(0xff5e62);
    const gridMesh2 = new THREE.Mesh(gridPlane2, gridMaterial2);
    gridMesh2.rotation.x = Math.PI / 2;
    gridMesh2.position.y = -3;
    gridMesh2.rotation.z = Math.PI / 4;
    scene.add(gridMesh2);
    window.techGrids = {
      grid1: { mesh: gridMesh1, material: gridMaterial },
      grid2: { mesh: gridMesh2, material: gridMaterial2 }
    };
  }
  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128; canvas.height = 128;
    const centerX = canvas.width / 2, centerY = canvas.height / 2, radius = canvas.width / 2;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.1, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.2, 'rgba(220,220,255,0.7)');
    gradient.addColorStop(0.4, 'rgba(160,160,240,0.4)');
    gradient.addColorStop(0.6, 'rgba(100,100,220,0.2)');
    gradient.addColorStop(1, 'rgba(0,0,80,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  function createBloomEffect(scene, camera, renderer) {
    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2(window.innerWidth, window.innerHeight), 1.8, 0.5, 0.75 );
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    return composer;
  }

  let currentRotationX = 0, currentRotationY = 0;
  let currentCameraOffsetX = 0, currentCameraOffsetY = 0; // For camera parallax
  const rotationSpeed = 0.0003;
  const smoothing = 0.03;
  const clock = new THREE.Clock();
  window.currentTheme = null;
  
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    material.uniforms.uTime.value = elapsedTime;
    if (window.techGrids) {
      window.techGrids.grid1.material.uniforms.uTime.value = elapsedTime;
      window.techGrids.grid2.material.uniforms.uTime.value = elapsedTime * 0.7;
    }
    
    currentRotationX += (targetRotationX - currentRotationX) * smoothing;
    currentRotationY += (targetRotationY - currentRotationY) * smoothing;
    particleSystem.rotation.x = currentRotationX;
    particleSystem.rotation.y += rotationSpeed + currentRotationY * smoothing;

    // Camera parallax smoothing
    currentCameraOffsetX += (targetCameraOffsetX - currentCameraOffsetX) * smoothing;
    currentCameraOffsetY += (targetCameraOffsetY - currentCameraOffsetY) * smoothing;
    camera.position.x = initialCameraX + currentCameraOffsetX;
    camera.position.y = initialCameraY + currentCameraOffsetY;
    camera.lookAt(0, 0, 0); // Ensure camera always looks at the center of the scene
    
    const positions = particleSystem.geometry.attributes.position.array;
    const theme = window.currentTheme;
    for (let i = 0; i < particleCount * 0.65; i++) {
      const i3 = i * 3;
      const x = positions[i3], y = positions[i3 + 1], z = positions[i3 + 2];
      const distance = Math.sqrt(x*x + z*z);
      if (theme) {
        if (theme.pattern === 'grid') {
          positions[i3 + 1] = y + Math.sin(elapsedTime * theme.speed + distance * 0.5) * 0.03;
          const gridSize = 2, snapFactor = 0.01;
          positions[i3] += (Math.round(x / gridSize) * gridSize - x) * snapFactor;
          positions[i3 + 2] += (Math.round(z / gridSize) * gridSize - z) * snapFactor;
        } else if (theme.pattern === 'circular') {
          const angle = elapsedTime * theme.speed * 0.2;
          positions[i3] += Math.cos(angle + i * 0.01) * 0.01;
          positions[i3 + 2] += Math.sin(angle + i * 0.01) * 0.01;
          positions[i3 + 1] = y + Math.sin(elapsedTime * 0.3 + i * 0.02) * 0.02;
        } else if (theme.pattern === 'maze') {
          const noiseScale = 0.2;
          const nx = Math.sin(x * noiseScale + elapsedTime * theme.speed);
          const nz = Math.cos(z * noiseScale + elapsedTime * theme.speed);
          positions[i3] += nx * 0.01;
          positions[i3 + 2] += nz * 0.01;
          positions[i3 + 1] = y + (nx * nz) * 0.02;
        } else if (theme.pattern === 'device') {
          const planeAttraction = 0.005;
          const planeY = Math.floor(i / 200) * 2 - 4;
          positions[i3 + 1] += (planeY - positions[i3 + 1]) * planeAttraction;
          positions[i3] += Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.01;
          positions[i3 + 2] += Math.cos(elapsedTime * 0.3 + i * 0.05) * 0.01;
        } else if (theme.pattern === 'network') {
          const nodeRadius = 5, nodeCount = 5, nodeAttraction = 0.002;
          let minDist = 100, closestNodeX = 0, closestNodeY = 0, closestNodeZ = 0;
          for (let n = 0; n < nodeCount; n++) {
            const nx = Math.sin(n * Math.PI * 2 / nodeCount + elapsedTime * 0.1) * nodeRadius;
            const ny = Math.cos(n * Math.PI / nodeCount) * 2;
            const nz = Math.cos(n * Math.PI * 2 / nodeCount + elapsedTime * 0.1) * nodeRadius;
            const dist = Math.sqrt( (positions[i3]-nx)**2 + (positions[i3+1]-ny)**2 + (positions[i3+2]-nz)**2 );
            if (dist < minDist) { minDist=dist; closestNodeX=nx; closestNodeY=ny; closestNodeZ=nz; }
          }
          positions[i3] += (closestNodeX - positions[i3]) * nodeAttraction;
          positions[i3+1] += (closestNodeY - positions[i3+1]) * nodeAttraction;
          positions[i3+2] += (closestNodeZ - positions[i3+2]) * nodeAttraction;
        } else {
          positions[i3 + 1] = y + Math.sin(elapsedTime * 0.2 + distance * 0.5) * 0.02;
        }
      } else {
        if (distance < galaxyRadius) {
          positions[i3 + 1] = y + Math.sin(elapsedTime * 0.2 + distance * 0.5) * 0.02;
        }
      }
    }
    for (let i = Math.floor(particleCount * 0.65); i < Math.floor(particleCount * 0.85); i++) {
      const i3 = i * 3;
      const pulseFreq = 0.3 + (i % 5) * 0.1, pulseAmp = 0.05;
      positions[i3 + 1] += Math.sin(elapsedTime * pulseFreq) * pulseAmp;
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;
    
    if (bloomPass && bloomPass.render) {
      bloomPass.render();
    } else {
      renderer.render(scene, camera);
    }
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (bloomPass && bloomPass.setSize) {
      bloomPass.setSize(window.innerWidth, window.innerHeight);
    }
  });
}