document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('feeCalculator');
    
    const programFees = {
        computer_science: 12000,
        mechanical: 11000,
        bba: 9500,
        finance: 9000,
        biology: 8500,
        biotech: 10000,
        journalism: 8000,
        history: 7000,              
        nutrition: 9000,
        medlab: 9500
    };

    
    const accommodationCost = 5000;

    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        select#program {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            color: var(--text-color);
            background-color: white;
        }

        select#program optgroup {
            font-weight: bold;
            color: var(--primary-color);
            background-color: #f5f5f5;
        }

        select#program option {
            padding: 8px;
            color: var(--text-color);
            background-color: white;
        }

        select#program:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
        }
    `;
    document.head.appendChild(styleSheet);

    
    function calculateFees(e) {
        e.preventDefault();
        
        const program = document.getElementById('program').value;
        const semesters = parseInt(document.getElementById('semester').value);
        const accommodation = document.getElementById('accommodation').checked;

        const tuitionTotal = programFees[program] * semesters;
        const accommodationTotal = accommodation ? (accommodationCost * semesters) : 0;
        const total = tuitionTotal + accommodationTotal;

        
        animateValue('tuitionCost', tuitionTotal);
        animateValue('accommodationCost', accommodationTotal);
        animateValue('mealCost', 0); 
        animateValue('totalCost', total);

        
        const resultContainer = document.getElementById('calculatorResult');
        resultContainer.style.animation = 'fadeIn 0.5s ease-in-out';
    }

    // Animate number counting
    function animateValue(elementId, final) {
        const element = document.getElementById(elementId);
        const start = parseInt(element.textContent.replace(/\D/g, '')) || 0;
        const duration = 1000; 
        const steps = 20; 
        const increment = (final - start) / steps;
        let current = start;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            element.textContent = `$${Math.round(current).toLocaleString()}`;

            if (step >= steps) {
                clearInterval(timer);
                element.textContent = `$${final.toLocaleString()}`;
            }
        }, duration / steps);
    }

    
    function validateForm() {
        const program = document.getElementById('program').value;
        const semester = document.getElementById('semester').value;

        if (!program || !semester) {
            showError('Please fill in all required fields');
            return false;
        }

        if (semester < 1 || semester > 8) {
            showError('Semester must be between 1 and 8');
            return false;
        }

        return true;
    }
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        const form = document.getElementById('feeCalculator');
        form.insertBefore(errorDiv, form.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    
    calculator.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            calculateFees(e);
        }
    });

    
    document.getElementById('program').addEventListener('change', function(e) {
        if (validateForm()) {
            calculateFees(e);
        }
    });

    document.getElementById('semester').addEventListener('input', function(e) {
        if (validateForm()) {
            calculateFees(e);
        }
    });

    document.getElementById('accommodation').addEventListener('change', function(e) {
        if (validateForm()) {
            calculateFees(e);
        }
    });
});