// Navigation
const navItems = document.querySelectorAll('.nav-item');
const toolContainers = document.querySelectorAll('.tool-container');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const tool = item.dataset.tool;
        
        // Update navigation
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Update tool container
        toolContainers.forEach(container => {
            container.classList.remove('active');
            if (container.id === `${tool}-tool`) {
                container.classList.add('active');
            }
        });
    });
});

// JSON Formatter
const jsonInput = document.getElementById('json-input');
const formatJsonBtn = document.getElementById('format-json');
const minifyJsonBtn = document.getElementById('minify-json');
const copyJsonBtn = document.getElementById('copy-json');

formatJsonBtn.addEventListener('click', () => {
    try {
        const json = JSON.parse(jsonInput.value);
        jsonInput.value = prettier.format(JSON.stringify(json), {
            parser: "json",
            plugins: prettierPlugins
        });
    } catch (error) {
        alert('Invalid JSON: ' + error.message);
    }
});

minifyJsonBtn.addEventListener('click', () => {
    try {
        const json = JSON.parse(jsonInput.value);
        jsonInput.value = JSON.stringify(json);
    } catch (error) {
        alert('Invalid JSON: ' + error.message);
    }
});

copyJsonBtn.addEventListener('click', () => {
    copyToClipboard(jsonInput);
});

// Base64 Converter
const base64Input = document.getElementById('base64-input');
const encodeBase64Btn = document.getElementById('encode-base64');
const decodeBase64Btn = document.getElementById('decode-base64');
const copyBase64Btn = document.getElementById('copy-base64');

encodeBase64Btn.addEventListener('click', () => {
    try {
        base64Input.value = btoa(base64Input.value);
    } catch (error) {
        alert('Error encoding to Base64: ' + error.message);
    }
});

decodeBase64Btn.addEventListener('click', () => {
    try {
        base64Input.value = atob(base64Input.value);
    } catch (error) {
        alert('Error decoding from Base64: ' + error.message);
    }
});

copyBase64Btn.addEventListener('click', () => {
    copyToClipboard(base64Input);
});

// URL Encoder
const urlInput = document.getElementById('url-input');
const encodeUrlBtn = document.getElementById('encode-url');
const decodeUrlBtn = document.getElementById('decode-url');
const copyUrlBtn = document.getElementById('copy-url');

encodeUrlBtn.addEventListener('click', () => {
    try {
        urlInput.value = encodeURIComponent(urlInput.value);
    } catch (error) {
        alert('Error encoding URL: ' + error.message);
    }
});

decodeUrlBtn.addEventListener('click', () => {
    try {
        urlInput.value = decodeURIComponent(urlInput.value);
    } catch (error) {
        alert('Error decoding URL: ' + error.message);
    }
});

copyUrlBtn.addEventListener('click', () => {
    copyToClipboard(urlInput);
});

// Hash Generator
const hashInput = document.getElementById('hash-input');
const hashOutput = document.getElementById('hash-output');
const hashAlgorithm = document.getElementById('hash-algorithm');
const generateHashBtn = document.getElementById('generate-hash');
const copyHashBtn = document.getElementById('copy-hash');

generateHashBtn.addEventListener('click', async () => {
    try {
        const text = hashInput.value;
        const algorithm = hashAlgorithm.value.toLowerCase().replace('-', '');
        
        // Convert the text to an ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        
        // Generate the hash
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        
        // Convert the ArrayBuffer to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        hashOutput.textContent = hashHex;
    } catch (error) {
        alert('Error generating hash: ' + error.message);
    }
});

copyHashBtn.addEventListener('click', () => {
    if (hashOutput.textContent) {
        navigator.clipboard.writeText(hashOutput.textContent)
            .then(() => {
                const originalText = copyHashBtn.textContent;
                copyHashBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyHashBtn.textContent = originalText;
                }, 1500);
            })
            .catch(err => {
                alert('Error copying to clipboard: ' + err.message);
            });
    }
});

// Utility function to copy text to clipboard
function copyToClipboard(element) {
    element.select();
    element.setSelectionRange(0, 99999); // For mobile devices
    
    navigator.clipboard.writeText(element.value)
        .then(() => {
            const parentActions = element.closest('.tool-container').querySelector('.actions');
            const copyBtn = parentActions.querySelector('button:last-child');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1500);
        })
        .catch(err => {
            alert('Error copying to clipboard: ' + err.message);
        });
}

// Add dark mode to syntax highlighting
document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();
});