// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Initialize smooth scrolling
    initializeSmoothScroll();
    
    // Initialize chat functionality
    initializeChat();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize navigation interactions
    initializeNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Add interactive features
    addInteractiveFeatures();
    
    // Fix molecular structure positioning
    fixMolecularStructure();
}

// Fix molecular structure to prevent scroll movement
function fixMolecularStructure() {
    const molecularStructure = document.querySelector('.molecular-structure');
    if (molecularStructure) {
        // Force hardware acceleration and lock position
        molecularStructure.style.position = 'absolute';
        molecularStructure.style.transform = 'translate(-50%, -50%) translateZ(0)';
        molecularStructure.style.willChange = 'transform';
        molecularStructure.style.backfaceVisibility = 'hidden';
        molecularStructure.style.perspective = '1000px';
        
        // Ensure orbits are also hardware accelerated
        const orbits = molecularStructure.querySelectorAll('.orbit');
        orbits.forEach(orbit => {
            orbit.style.transform += ' translateZ(0)';
            orbit.style.willChange = 'transform';
            orbit.style.backfaceVisibility = 'hidden';
        });
    }
}

// Smooth scrolling functionality
function initializeSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToAssistant();
        });
    }
    
    // Handle navigation links
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        if (btn.tagName === 'A') {
            btn.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        scrollToElement(targetElement);
                    }
                }
            });
        }
    });
}

function scrollToAssistant() {
    const assistantSection = document.getElementById('ai-assistant');
    if (assistantSection) {
        scrollToElement(assistantSection);
        
        // Comment out or remove these lines in initializeChat():
        // setTimeout(() => {
        //     chatInput.focus();
        // }, 1000);
    }
}

function scrollToElement(element) {
    const headerHeight = getHeaderHeight();
    const elementPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

function getHeaderHeight() {
    const header = document.querySelector('.header');
    return header ? header.offsetHeight : 160; // Updated to match new header height
}

// Chat functionality
function initializeChat() {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    if (chatInput && chatSend && chatMessages) {
        // Send button click handler
        chatSend.addEventListener('click', function(e) {
            e.preventDefault();
            sendChatMessage();
        });
        
        // Enter key handler for chat input
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
        
        // Focus input when clicking in chat area
        chatMessages.addEventListener('click', function() {
            chatInput.focus();
        });
        
        // REMOVED: Auto-focus the input on page load
        // setTimeout(() => {
        //     chatInput.focus();
        // }, 1000);
    }
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        addChatMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI response after delay
        setTimeout(() => {
            hideTypingIndicator();
            const aiResponse = generateAIResponse(message);
            addChatMessage(aiResponse, 'ai');
        }, 1500 + Math.random() * 1500); // Random delay between 1.5-3 seconds
    }
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${sender === 'user' ? 'user-message' : 'ai-message'}`;
    
    const messageContent = document.createElement('p');
    if (sender === 'user') {
        messageContent.innerHTML = `<strong>You:</strong> ${escapeHtml(message)}`;
    } else {
        messageContent.innerHTML = `<strong>AI Assistant:</strong> ${escapeHtml(message)}`;
    }
    
    messageElement.appendChild(messageContent);
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom smoothly
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const typingElement = document.createElement('div');
    typingElement.className = 'chat-message ai-message typing-indicator';
    typingElement.id = 'typing-indicator';
    
    const typingContent = document.createElement('p');
    typingContent.innerHTML = '<strong>AI Assistant:</strong> <span class="typing-dots">Analyzing<span>.</span><span>.</span><span>.</span></span>';
    
    typingElement.appendChild(typingContent);
    chatMessages.appendChild(typingElement);
    
    // Scroll to bottom
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
    
    // Add CSS for typing animation if not already added
    if (!document.getElementById('typing-animation-style')) {
        const style = document.createElement('style');
        style.id = 'typing-animation-style';
        style.textContent = `
            .typing-dots span {
                animation: typingDots 1.5s infinite;
            }
            .typing-dots span:nth-child(1) { animation-delay: 0s; }
            .typing-dots span:nth-child(2) { animation-delay: 0.3s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.6s; }
            
            @keyframes typingDots {
                0%, 60%, 100% { opacity: 0; }
                30% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Enhanced response generation based on keywords
    if (message.includes('test') || message.includes('analyze') || message.includes('substance')) {
        return "I can help you analyze various compounds and substances. Please provide more details about what you'd like to test - its appearance, suspected composition, or any other relevant information. I'll recommend appropriate testing protocols, safety measures, and interpretation guidelines.";
    }
    
    if (message.includes('safety') || message.includes('safe') || message.includes('harm') || message.includes('protection')) {
        return "Safety is our top priority in all testing procedures. I recommend always using proper protective equipment (gloves, eye protection, ventilation), testing in well-ventilated areas, and following established protocols. Would you like specific safety guidelines for a particular compound or testing procedure?";
    }
    
    if (message.includes('protocol') || message.includes('method') || message.includes('procedure') || message.includes('how')) {
        return "I can provide detailed testing protocols based on your specific needs. Different compounds require different analytical approaches. What type of analysis are you looking to perform? Qualitative identification, purity assessment, contamination screening, or quantitative analysis?";
    }
    
    if (message.includes('regulation') || message.includes('legal') || message.includes('compliance') || message.includes('law')) {
        return "Regulatory compliance varies significantly by jurisdiction and compound type. I can help you understand the legal framework for your specific situation. Please specify your location and the type of research you're conducting for more targeted guidance on applicable regulations.";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('start')) {
        return "Hello! I'm here to assist you with compound analysis and testing procedures. I can help with substance identification, safety protocols, testing methodologies, and regulatory compliance. How can I help you today? Are you looking to identify a specific substance, need safety protocols, or want guidance on testing methods?";
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
        return "I'm here to help! I can assist with: compound identification and analysis, testing protocol recommendations, safety guidelines and best practices, regulatory compliance assistance, and interpretation of results. What specific area would you like support with?";
    }
    
    if (message.includes('mdma') || message.includes('ecstasy') || message.includes('molly')) {
        return "For MDMA testing, I recommend using the Marquis reagent as a primary test (should turn purple/black), followed by Mecke (blue/black) and Simon's (blue) for confirmation. Always test in small amounts and ensure proper ventilation. Would you like detailed protocols for interpretation and safety measures?";
    }
    
    if (message.includes('lsd') || message.includes('acid') || message.includes('tab')) {
        return "LSD testing requires special considerations due to light sensitivity and low concentrations. The Ehrlich reagent is most commonly used (should turn purple/pink). Hofmann reagent can provide additional confirmation. Handle samples with tweezers and avoid direct light exposure. Need specific protocols?";
    }
    
    if (message.includes('cocaine') || message.includes('coke')) {
        return "Cocaine testing typically uses the Cobalt Thiocyanate reagent (blue color change) as a presumptive test. For confirmation, the Scott test (blue to pink) is recommended. Always use minimal amounts and ensure proper ventilation due to potential adulterants. Would you like detailed safety protocols?";
    }
    
    if (message.includes('fentanyl') || message.includes('opiate') || message.includes('opioid')) {
        return "Fentanyl testing requires extreme caution due to potency. Use fentanyl-specific test strips for detection. Never handle suspected fentanyl without proper PPE. Even microscopic amounts can be dangerous. I recommend professional laboratory analysis for opioid identification. Need safety protocols?";
    }
    
    if (message.includes('purity') || message.includes('quality') || message.includes('concentration')) {
        return "Purity testing requires quantitative methods beyond basic reagent tests. I can guide you through colorimetric analysis, melting point determination, and other semi-quantitative approaches. For precise purity assessment, consider instrumental analysis like HPLC or GC-MS. What substance are you analyzing?";
    }
    
    if (message.includes('adulterant') || message.includes('contaminant') || message.includes('cutting agent')) {
        return "Common adulterants require specific testing approaches. For stimulants, test for caffeine, inositol, and lactose. For depressants, check for quinine and phenacetin. I can provide multi-stage testing protocols to identify both active compounds and adulterants. What type of substance are you screening?";
    }
    
    // Default response with encouragement to be more specific
    return `I'm analyzing your query about "${userMessage}". To provide the most helpful guidance, could you be more specific about: the type of substance you're testing, your testing goals (identification, purity, safety screening), your experience level with testing, and any specific concerns you have? This will help me tailor my recommendations to your needs.`;
}

// Scroll animations
function initializeScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'ai-assistant') {
                    entry.target.classList.add('visible');
                }
                
                // Add animation classes to feature cards
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);
    
    // Observe AI assistant section
    const aiSection = document.getElementById('ai-assistant');
    if (aiSection) {
        observer.observe(aiSection);
    }
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Navigation interactions with updated header fade threshold
function initializeNavigation() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for visual changes (increased threshold for taller header)
        if (currentScrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll with adjusted threshold for taller header
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
    }, 16)); // 60fps throttling
    
    // Add enhanced navigation button effects
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 25px rgba(50, 184, 198, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const header = document.querySelector('.header');
    const navContent = document.querySelector('.nav-content');
    
    if (header && navContent) {
        // Adjust header height based on content
        const updateHeaderHeight = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth <= 768) {
                // Allow natural height for mobile stacked layout but maintain minimum
                header.style.height = 'auto';
                header.style.minHeight = '140px'; // Updated minimum height for mobile
            } else {
                header.style.height = '160px'; // Updated to new header height
                header.style.minHeight = 'auto';
            }
        };
        
        updateHeaderHeight();
        window.addEventListener('resize', throttle(updateHeaderHeight, 100));
    }
}

// Add interactive features for better UX
function addInteractiveFeatures() {
    // Add hover effects to molecular structure - ensure it stays positioned
    const molecularStructure = document.querySelector('.molecular-structure');
    if (molecularStructure) {
        molecularStructure.addEventListener('mouseenter', function() {
            const orbits = this.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                orbit.style.animationPlayState = 'paused';
            });
        });
        
        molecularStructure.addEventListener('mouseleave', function() {
            const orbits = this.querySelectorAll('.orbit');
            orbits.forEach(orbit => {
                orbit.style.animationPlayState = 'running';
            });
        });
    }
    
    // Add click effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            const originalTransform = this.style.transform;
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 150);
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS if not exists
    if (!document.getElementById('ripple-animation-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Enhanced logo effects - NO SHADOWS
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    const orbits = document.querySelectorAll('.orbit');
    const atomCenter = document.querySelector('.atom-center');
    
    if (document.hidden) {
        // Pause animations when tab is not visible
        orbits.forEach(orbit => {
            orbit.style.animationPlayState = 'paused';
        });
        if (atomCenter) {
            atomCenter.style.animationPlayState = 'paused';
        }
    } else {
        // Resume animations when tab becomes visible
        orbits.forEach(orbit => {
            orbit.style.animationPlayState = 'running';
        });
        if (atomCenter) {
            atomCenter.style.animationPlayState = 'running';
        }
    }
});

// Performance optimization: throttle function
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility functions
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Handle resize events for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Update molecular structure size on different screen sizes
    const molecularStructure = document.querySelector('.molecular-structure');
    if (molecularStructure) {
        if (window.innerWidth <= 480) {
            molecularStructure.style.width = '250px';
            molecularStructure.style.height = '250px';
        } else if (window.innerWidth <= 768) {
            molecularStructure.style.width = '300px';
            molecularStructure.style.height = '300px';
        } else {
            molecularStructure.style.width = '400px';
            molecularStructure.style.height = '400px';
        }
        
        // Re-fix positioning after resize
        fixMolecularStructure();
    }
    
    // Update header height for mobile
    const header = document.querySelector('.header');
    if (header) {
        if (window.innerWidth <= 768) {
            header.style.height = 'auto';
            header.style.minHeight = '140px'; // Updated minimum for mobile
        } else {
            header.style.height = '160px'; // Updated header height
            header.style.minHeight = 'auto';
        }
    }
}, 200));

// Prevent molecular structure from moving during scroll
window.addEventListener('scroll', throttle(() => {
    const molecularStructure = document.querySelector('.molecular-structure');
    if (molecularStructure) {
        // Force lock the position regardless of scroll
        molecularStructure.style.position = 'absolute';
        molecularStructure.style.transform = 'translate(-50%, -50%) translateZ(0)';
    }
}, 16));

// Debug function for testing scroll functionality
function debugScrollToAI() {
    console.log('Debug: Attempting to scroll to AI assistant');
    const aiSection = document.getElementById('ai-assistant');
    if (aiSection) {
        console.log('AI section found:', aiSection);
        scrollToElement(aiSection);
        aiSection.classList.add('visible');
    } else {
        console.log('AI section not found');
    }
}

// Expose debug function globally for testing
window.debugScrollToAI = debugScrollToAI;