// Reasons database
const reasons = [
    { 
        text: "I love the way your smile lights up my entire world, making even the darkest days feel warm and bright. 💖", 
        emoji: "✨",
        gif: "gif1.gif"
    },
    { 
        text: "I love how you understand me without a single word, being my perfect partner and my safe haven. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif"
    },
    { 
        text: "I love your kind heart, your cute laughter, and the way you care so deeply for everything and everyone. 💫 ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "I love the beautiful future I see in your eyes, and how every moment spent with you is a memory I cherish forever. 🌹 ", 
        emoji: "❤️",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Custom Cursor & Particle Trail
const cursor = document.querySelector('.custom-cursor');
const trailContainer = document.querySelector('.cursor-trail-container');
const trailSymbols = ['💖', '🌹', '❤️', '💕', '✨', '💍'];

let lastMove = 0;
document.addEventListener('mousemove', (e) => {
    // Smooth custom cursor movement
    gsap.to(cursor, {
        x: e.clientX - 12,
        y: e.clientY - 12,
        duration: 0.1
    });
    
    const now = Date.now();
    if (now - lastMove > 60) {
        lastMove = now;
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    if (!trailContainer) return;
    const p = document.createElement('div');
    p.className = 'heart-particle';
    p.textContent = trailSymbols[Math.floor(Math.random() * trailSymbols.length)];
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    
    const dx = (Math.random() - 0.5) * 100;
    const dy = (Math.random() - 0.5) * 100 - 30;
    const rot = Math.random() * 360;
    
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.setProperty('--rot', `${rot}deg`);
    
    trailContainer.appendChild(p);
    
    setTimeout(() => {
        p.remove();
    }, 1500);
}

// Background Music Control
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

if (bgMusic && musicToggle) {
    // Attempt autoplay (browsers might block until user click, but CTA on landing page helps)
    bgMusic.volume = 0.55;
    
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.remove('paused');
        } else {
            bgMusic.pause();
            musicToggle.classList.add('paused');
        }
    });

    // Make sure rotation matches state
    document.addEventListener('click', () => {
        if (!bgMusic.paused) {
            musicToggle.classList.remove('paused');
        }
    }, { once: true });
}

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Love Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        // Clear previous cards with a quick fade out
        const existingCard = reasonsContainer.querySelector('.reason-card');
        if (existingCard) {
            gsap.to(existingCard, {
                opacity: 0,
                y: -30,
                duration: 0.3,
                onComplete: () => {
                    existingCard.remove();
                    renderNextCard();
                }
            });
        } else {
            renderNextCard();
        }
    } else {
        // Handle navigation to storylane
        gsap.to('body', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
    }
}

function renderNextCard() {
    const card = createReasonCard(reasons[currentReasonIndex]);
    reasonsContainer.appendChild(card);
    
    // Update counter
    reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
    currentReasonIndex++;

    // Check if we should transform the button & show ending surprise
    if (currentReasonIndex === reasons.length) {
        gsap.to(shuffleButton, {
            scale: 1.1,
            duration: 0.5,
            ease: "elastic.out",
            onComplete: () => {
                shuffleButton.textContent = "Enter Our Storylane 🌹";
                shuffleButton.classList.add('story-mode');
                
                // Show surprise ending section
                const teddy = document.querySelector('.teddy-hug');
                const endingText = document.querySelector('.ending-text');
                
                if (teddy) {
                    teddy.style.transform = 'scale(1) rotate(-3deg)';
                }
                if (endingText) {
                    gsap.to(endingText, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: 0.3
                    });
                }
            }
        });
    }

    createFloatingElement();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 400);
}

// Floating elements in background
function createFloatingElement() {
    const elements = ['🌹', '✨', '💖', '❤️', '💕'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 50 + 'px';
    element.style.fontSize = (Math.random() * 20 + 15) + 'px';
    element.style.position = 'fixed';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.7';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -window.innerHeight - 150,
        x: Math.random() * 100 - 50,
        duration: Math.random() * 8 + 8,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Create initial floating elements
setInterval(createFloatingElement, 1800);