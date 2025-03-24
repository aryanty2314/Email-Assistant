console.log("Email Writer Extension - Content Script Loading")

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI-reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function createToneSelector() {
    const toneContainer = document.createElement('div');
    toneContainer.className = 'tone-selector';
    toneContainer.style.position = 'absolute';
    toneContainer.style.backgroundColor = 'white';
    toneContainer.style.border = '1px solid #ccc';
    toneContainer.style.borderRadius = '4px';
    toneContainer.style.padding = '8px';
    toneContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    toneContainer.style.zIndex = '999';
    toneContainer.style.display = 'none';

    const tones = ['Professional', 'Friendly', 'Casual', 'Formal', 'Enthusiastic'];
    
    tones.forEach(tone => {
        const option = document.createElement('div');
        option.className = 'tone-option';
        option.innerHTML = tone;
        option.style.padding = '6px 12px';
        option.style.cursor = 'pointer';
        option.style.borderRadius = '2px';
        
        option.addEventListener('mouseover', () => {
            option.style.backgroundColor = '#f1f1f1';
        });
        
        option.addEventListener('mouseout', () => {
            option.style.backgroundColor = 'transparent';
        });
        
        option.addEventListener('click', async () => {
            generateReply(tone.toLowerCase());
            toneContainer.style.display = 'none';
        });
        
        toneContainer.appendChild(option);
    });
    
    return toneContainer;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '[role="presentation"]',
        '.gmail_quote'
    ];
    
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}

function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

async function generateReply(tone) {
    const button = document.querySelector('.ai-reply-button');
    try {
        button.innerHTML = 'Generating...';
        button.disabled = true;
        
        const emailContent = getEmailContent();
        const response = await fetch('http://localhost:8080/email/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailContent: emailContent,
                tone: tone
            })
        });
        
        if (!response.ok) {
            throw new Error('API not found');
        }
        
        const generatedReply = await response.text();
        const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');
        if (composeBox) {
            composeBox.focus();
            document.execCommand('insertText', false, generatedReply);
        } else {
            console.log('Compose Box not Found');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to generate reply');
    } finally {
        button.innerHTML = 'AI Reply';
        button.disabled = false;
    }
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) {
        existingButton.remove();
    }
    
    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }
    
    console.log("Toolbar found, creating AI button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');
    
    const toneSelector = createToneSelector();
    document.body.appendChild(toneSelector);
    
    button.addEventListener('click', () => {
        const rect = button.getBoundingClientRect();
        toneSelector.style.top = `${rect.bottom + window.scrollY}px`;
        toneSelector.style.left = `${rect.left + window.scrollX}px`;
        toneSelector.style.display = toneSelector.style.display === 'none' ? 'block' : 'none';
    });
    
    // Close tone selector when clicking outside
    document.addEventListener('click', (event) => {
        if (!button.contains(event.target) && !toneSelector.contains(event.target)) {
            toneSelector.style.display = 'none';
        }
    });
    
    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(
            node => node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role = "dialog"]') || 
             node.querySelector('.aDh, .btC, [role = "dialog"]'))
        );
        
        if (hasComposeElements) {
            console.log("Compose Window detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});