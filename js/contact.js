document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const inquiry = document.getElementById('inquiry').value;
        const message = document.getElementById('message').value;

        if (!validateForm(name, email, inquiry, message)) {
            return;
        }

        showSubmissionMessage('Sending message...');
        
        
        setTimeout(() => {
            showSubmissionMessage('Message sent successfully!', 'success');
            contactForm.reset();
        }, 1500);
    });

    function validateForm(name, email, inquiry, message) {
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showSubmissionMessage('Please enter a valid email address', 'error');
            return false;
        }

        if (!name || !inquiry || !message) {
            showSubmissionMessage('Please fill in all required fields', 'error');
            return false;
        }

        return true;
    }

    function showSubmissionMessage(message, type = 'info') {
        const existingMessage = document.querySelector('.submission-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `submission-message ${type}`;
        messageElement.textContent = message;

        
        contactForm.insertAdjacentElement('afterend', messageElement);

        
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }

        const revealOnScroll = () => {
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); 
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    const style = document.createElement('style');
    style.textContent = `
        .popup {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: #333;
            color: white;
            padding: 15px 30px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .popup.success { background: #28a745; }
        .popup.error { background: #dc3545; }
        .popup.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);


    function showPopup(message, type = 'success') {
        
        const existingPopup = document.querySelector('.popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create and show new popup
        const popup = document.createElement('div');
        popup.className = `popup ${type}`;
        popup.textContent = message;
        document.body.appendChild(popup);

        
        setTimeout(() => popup.classList.add('show'), 10);

        // Remove popup after 3 seconds
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 3000);
    }

    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            showPopup('Please fill in all required fields', 'error');
            return;
        }

        if (!email.includes('@')) {
            showPopup('Please enter a valid email address', 'error');
            return;
        }

        // Show success message and reset form
        showPopup('Message sent successfully! We\'ll get back to you soon.');
        contactForm.reset();
    });
});