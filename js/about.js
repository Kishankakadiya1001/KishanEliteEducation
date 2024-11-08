document.addEventListener('DOMContentLoaded', function() {
    
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const current = parseInt(stat.textContent);
            const increment = target / 50; 
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment);
                setTimeout(() => animateStats(), 40);
            } else {
                stat.textContent = target;
            }
        });
    };

    
    const statsSection = document.querySelector('.stats-section');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateStats();
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    
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