document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const letterPopup = document.getElementById('letter-popup');
    const closeLetterBtn = document.getElementById('close-letter');
    const navIcons = document.getElementById('nav-icons');
    const envelopeContainer = document.getElementById('envelope-container');

    // Check if page was reloaded
    const navEntry = performance.getEntriesByType("navigation")[0];
    if (navEntry && navEntry.type === 'reload') {
        sessionStorage.removeItem('envelopeOpened');
    }

    // Check if previously opened
    if (sessionStorage.getItem('envelopeOpened') === 'true') {
        navIcons.classList.remove('hidden');
    }

    // Envelope Click Event
    envelopeWrapper.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');

        // Wait for animation to finish before showing modal
        setTimeout(() => {
            letterPopup.classList.remove('hidden');
        }, 1200); // Adjust timing based on CSS transition
    });

    // Close Letter Event
    closeLetterBtn.addEventListener('click', () => {
        letterPopup.classList.add('hidden');
        envelopeWrapper.classList.remove('open'); // Close the flap
        navIcons.classList.remove('hidden'); // Show icons

        // Save state
        sessionStorage.setItem('envelopeOpened', 'true');
    });

    // Create floating petals
    createPetals();
});

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 20;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Randomize properties
        const size = Math.random() * 20 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(petal);
    }
}
