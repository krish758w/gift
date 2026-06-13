// Custom Cursor Following & Particle Trail
const cursor = document.querySelector('.cursor');
const trailContainer = document.querySelector('.cursor-trail-container');
const trailSymbols = ['💖', '🌹', '❤️', '💕', '✨', '💍'];

let lastMove = 0;
document.addEventListener('mousemove', (e) => {
    // Position the main cursor
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    const now = Date.now();
    if (now - lastMove > 60) { // Throttle particle creation
        lastMove = now;
        createParticle(e.clientX, e.clientY);
    }
});

// Scale cursor on click/hover
document.addEventListener('mousedown', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
});
document.addEventListener('mouseup', () => {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
});

function createParticle(x, y) {
    if (!trailContainer) return;
    const p = document.createElement('div');
    p.className = 'heart-particle';
    p.textContent = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    
    // Spread math
    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100 - 30; // Tend upward
    const rot = Math.random() * 360;
    
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.setProperty('--rot', `${rot}deg`);
    
    trailContainer.appendChild(p);
    
    setTimeout(() => {
        p.remove();
    }, 1500);
}

// Envelope Interaction & Greeting Typing Effect
const envelope = document.querySelector('.envelope');
const letterText = document.querySelector('.letter-text');
const greetingElement = document.querySelector('.greeting');
const ctaBtn = document.querySelector('.cta-button');

const greetingText = "Hey, my love! From the moment you walked into my life, you've made every single day brighter, warmer, and infinitely more beautiful. You have my whole heart, today and forever. 💖";
let charIndex = 0;
let envelopeOpened = false;

envelope.addEventListener('click', () => {
    if (envelopeOpened) return;
    envelopeOpened = true;
    
    envelope.classList.add('open');
    
    // Start letter fade-in and text typing after open transition (~800ms)
    setTimeout(() => {
        letterText.style.opacity = '1';
        typeGreeting();
    }, 800);
});

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 60); // Elegant, smooth typing speed
    } else {
        // Reveal CTA Button
        gsap.to(ctaBtn, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out"
        });
    }
}

// Drifting hearts in background
const floatingElements = ['💖', '❤️', '🌹', '💕', '✨'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = '110vh';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    element.style.position = 'absolute';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -window.innerHeight - 200,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        duration: Math.random() * 8 + 6,
        opacity: 0.6,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Initialize floating elements
window.addEventListener('load', () => {
    setInterval(createFloating, 1500);
});

// Hover and Click effects on the CTA button
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
    });

    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop envelope click propagation
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                window.location.href = 'cause.html';
            }
        });
    });
});