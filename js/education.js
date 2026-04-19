import { fetchFAQ, fetchRecoveryTips, fetchHealthArticles, submitInquiry } from './api.js';
import { validateEmail, validateName, showMessage, initMobileMenu } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    initMobileMenu();
    await loadFAQ();
    await loadRecoveryTips();
    await loadHealthArticles();
    setupInquiryForm();
});

async function loadFAQ() {
    const faqData = await fetchFAQ();
    const container = document.getElementById('faq-accordion');
    if (!container) return;
    
    container.innerHTML = faqData.map((faq, index) => `
        <div class="faq-item">
            <div class="faq-question" data-index="${index}">
                ${faq.question} <span>▼</span>
            </div>
            <div class="faq-answer" id="faq-answer-${index}">${faq.answer}</div>
        </div>
    `).join('');
    
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = document.getElementById(`faq-answer-${question.dataset.index}`);
            answer.classList.toggle('active');
        });
    });
}

async function loadRecoveryTips() {
    const tips = await fetchRecoveryTips();
    const container = document.getElementById('recovery-tips');
    if (!container) return;
    
    container.innerHTML = tips.map(tip => `
        <div class="recovery-card">
            <h3>${tip.title}</h3>
            <p>${tip.tips}</p>
        </div>
    `).join('');
}

async function loadHealthArticles() {
    const container = document.getElementById('api-articles-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Loading health articles...</div>';
    const articles = await fetchHealthArticles();
    
    if (articles.length === 0) {
        container.innerHTML = '<div class="loading">Unable to load articles. Please check back later.</div>';
        return;
    }
    
    const topics = ['Recovery Tips', 'Patient Stories', 'Health Insights', 'Surgical Advances', 'Wellness Guide', 'Expert Advice'];
    container.innerHTML = articles.map((article, index) => `
        <div class="article-card">
            <h3>${topics[index % topics.length]}</h3>
            <p>${article.body.substring(0, 120)}...</p>
            <div class="article-meta">📅 Updated ${new Date().toLocaleDateString()}</div>
        </div>
    `).join('');
}

function setupInquiryForm() {
    const form = document.getElementById('inquiry-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('inq-name').value.trim();
        const email = document.getElementById('inq-email').value.trim();
        const message = document.getElementById('inq-message').value.trim();
        
        let isValid = true;
        
        if (!validateName(name)) {
            document.getElementById('inq-name-error').textContent = 'Please enter your full name';
            isValid = false;
        } else {
            document.getElementById('inq-name-error').textContent = '';
        }
        
        if (!validateEmail(email)) {
            document.getElementById('inq-email-error').textContent = 'Please enter a valid email';
            isValid = false;
        } else {
            document.getElementById('inq-email-error').textContent = '';
        }
        
        if (!message || message.length < 10) {
            document.getElementById('inq-message-error').textContent = 'Please enter your message (minimum 10 characters)';
            isValid = false;
        } else {
            document.getElementById('inq-message-error').textContent = '';
        }
        
        if (isValid) {
            const inquiryData = {
                id: Date.now(),
                name: name,
                email: email,
                phone: document.getElementById('inq-phone').value,
                procedure: document.getElementById('inq-procedure').value,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
            inquiries.push(inquiryData);
            localStorage.setItem('inquiries', JSON.stringify(inquiries));
            
            const result = await submitInquiry(inquiryData);
            showMessage(document.getElementById('inq-form-message'), result.message, 'success');
            form.reset();
        }
    });
}