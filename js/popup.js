const BOT_URL = 'https://github.com/88venom14/hysteriaconfigbot';
const FEEDBACK_URL = 'https://github.com/88venom14/hysteriaconfigbot/issues';

const adButton = document.getElementById('adLink');
const feedbackLink = document.getElementById('feedbackLink');
const clickCountEl = document.getElementById('clickCount');
const visitCountEl = document.getElementById('visitCount');
const notification = document.getElementById('notification');
if (!adButton || !clickCountEl || !visitCountEl || !notification) {
    console.error('Не найдены необходимые элементы DOM');
}

chrome.storage.local.get(['clickCount', 'visitCount'], (result) => {
    const clicks = result.clickCount || 0;
    const visits = result.visitCount || 0;

    if (clickCountEl) clickCountEl.textContent = clicks;
    if (visitCountEl) visitCountEl.textContent = visits + 1;

    chrome.storage.local.set({ visitCount: visits + 1 });
});

if (adButton) {
    adButton.addEventListener('click', () => {
        chrome.storage.local.get(['clickCount'], (result) => {
            const clicks = (result.clickCount || 0) + 1;
            chrome.storage.local.set({ clickCount: clicks }, () => {
                if (clickCountEl) clickCountEl.textContent = clicks;
            });
        });

        if (notification) {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 1500);
        }

        window.open(BOT_URL, '_blank');
    });
}

if (feedbackLink) {
    feedbackLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(FEEDBACK_URL, '_blank');
    });
}
