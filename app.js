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

const caseInput = document.getElementById('case-input');
const uppercaseBtn = document.getElementById('uppercase');
const lowercaseBtn = document.getElementById('lowercase');
const titlecaseBtn = document.getElementById('titlecase');
const sentencecaseBtn = document.getElementById('sentencecase');
const copyCaseBtn = document.getElementById('copy-case');

uppercaseBtn.addEventListener('click', () => {
    caseInput.value = caseInput.value.toUpperCase();
});

lowercaseBtn.addEventListener('click', () => {
    caseInput.value = caseInput.value.toLowerCase();
});

titlecaseBtn.addEventListener('click', () => {
    caseInput.value = caseInput.value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
});

sentencecaseBtn.addEventListener('click', () => {
    caseInput.value = caseInput.value
        .toLowerCase()
        .split('. ')
        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join('. ');
});

copyCaseBtn.addEventListener('click', () => {
    copyToClipboard(caseInput);
});

// Lorem Ipsum Generator
const loremType = document.getElementById('lorem-type');
const loremCount = document.getElementById('lorem-count');
const generateLoremBtn = document.getElementById('generate-lorem');
const copyLoremBtn = document.getElementById('copy-lorem');
const loremOutput = document.getElementById('lorem-output');

const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua"
];

function generateWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function generateSentence() {
    const length = Math.floor(Math.random() * 10) + 5;
    let sentence = generateWord().charAt(0).toUpperCase() + generateWord().slice(1);
    for (let i = 1; i < length; i++) {
        sentence += ' ' + generateWord();
    }
    return sentence + '.';
}

function generateParagraph() {
    const length = Math.floor(Math.random() * 5) + 3;
    return Array(length).fill().map(() => generateSentence()).join(' ');
}

generateLoremBtn.addEventListener('click', () => {
    const count = parseInt(loremCount.value);
    const type = loremType.value;
    let result = '';

    switch (type) {
        case 'words':
            result = Array(count).fill().map(() => generateWord()).join(' ');
            break;
        case 'sentences':
            result = Array(count).fill().map(() => generateSentence()).join(' ');
            break;
        case 'paragraphs':
            result = Array(count).fill().map(() => generateParagraph()).join('\n\n');
            break;
    }

    loremOutput.value = result;
});

copyLoremBtn.addEventListener('click', () => {
    copyToClipboard(loremOutput);
});

// Color Converter
const colorPicker = document.getElementById('color-picker');
const colorInput = document.getElementById('color-input');
const convertColorBtn = document.getElementById('convert-color');
const copyColorBtn = document.getElementById('copy-color');
const colorPreview = document.querySelector('.color-preview');
const colorValues = document.querySelector('.color-values');

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function updateColorDisplay(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    colorPreview.style.backgroundColor = hex;
    colorValues.innerHTML = `
        <div class="color-value">HEX: ${hex}</div>
        <div class="color-value">RGB: rgb(${rgb.r}, ${rgb.g}, ${rgb.b})</div>
        <div class="color-value">HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</div>
    `;
}

colorPicker.addEventListener('input', (e) => {
    colorInput.value = e.target.value;
    updateColorDisplay(e.target.value);
});

colorInput.addEventListener('input', (e) => {
    if (e.target.value.match(/^#[0-9A-Fa-f]{6}$/)) {
        colorPicker.value = e.target.value;
        updateColorDisplay(e.target.value);
    }
});

convertColorBtn.addEventListener('click', () => {
    if (colorInput.value.match(/^#[0-9A-Fa-f]{6}$/)) {
        updateColorDisplay(colorInput.value);
    } else {
        alert('Please enter a valid hex color (e.g., #FF0000)');
    }
});

copyColorBtn.addEventListener('click', () => {
    const values = Array.from(colorValues.querySelectorAll('.color-value'))
        .map(div => div.textContent)
        .join('\n');
    navigator.clipboard.writeText(values);
    copyColorBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyColorBtn.textContent = 'Copy';
    }, 1500);
});

// Password Generator
const passwordLength = document.getElementById('password-length');
const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const generatePasswordBtn = document.getElementById('generate-password');
const copyPasswordBtn = document.getElementById('copy-password');
const generatedPassword = document.getElementById('generated-password');
const passwordStrength = document.getElementById('password-strength');

const charset = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function generatePassword() {
    let chars = '';
    let password = '';

    if (!includeUppercase.checked && !includeLowercase.checked && 
        !includeNumbers.checked && !includeSymbols.checked) {
        alert('Please select at least one character type');
        return;
    }

    if (includeUppercase.checked) chars += charset.uppercase;
    if (includeLowercase.checked) chars += charset.lowercase;
    if (includeNumbers.checked) chars += charset.numbers;
    if (includeSymbols.checked) chars += charset.symbols;

    for (let i = 0; i < passwordLength.value; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}

function checkPasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 12) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^A-Za-z0-9]/)) score++;

    passwordStrength.className = 'password-strength';
    if (score <= 2) passwordStrength.classList.add('weak');
    else if (score <= 4) passwordStrength.classList.add('medium');
    else passwordStrength.classList.add('strong');
}

generatePasswordBtn.addEventListener('click', () => {
    const password = generatePassword();
    if (password) {
        generatedPassword.value = password;
        checkPasswordStrength(password);
    }
});

copyPasswordBtn.addEventListener('click', () => {
    if (generatedPassword.value) {
        navigator.clipboard.writeText(generatedPassword.value);
        copyPasswordBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyPasswordBtn.textContent = 'Copy';
        }, 1500);
    }
});

// Initialize the first color preview
updateColorDisplay('#000000');

// Text Diff Checker
const originalText = document.getElementById('original-text');
const modifiedText = document.getElementById('modified-text');
const compareDiffBtn = document.getElementById('compare-diff');
const copyDiffBtn = document.getElementById('copy-diff');
const diffOutput = document.getElementById('diff-output');

function generateDiff(original, modified) {
    const originalLines = original.split('\n');
    const modifiedLines = modified.split('\n');
    let output = '';

    const diff = [];
    let i = 0, j = 0;

    while (i < originalLines.length || j < modifiedLines.length) {
        if (i >= originalLines.length) {
            diff.push({ type: 'added', line: modifiedLines[j] });
            j++;
        } else if (j >= modifiedLines.length) {
            diff.push({ type: 'removed', line: originalLines[i] });
            i++;
        } else if (originalLines[i] === modifiedLines[j]) {
            diff.push({ type: 'unchanged', line: originalLines[i] });
            i++;
            j++;
        } else {
            diff.push({ type: 'removed', line: originalLines[i] });
            diff.push({ type: 'added', line: modifiedLines[j] });
            i++;
            j++;
        }
    }

    return diff.map(d => {
        const prefix = d.type === 'added' ? '+ ' : d.type === 'removed' ? '- ' : '  ';
        const className = d.type === 'added' ? 'diff-added' : d.type === 'removed' ? 'diff-removed' : '';
        return `<div class="diff-line ${className}">${prefix}${d.line}</div>`;
    }).join('');
}

compareDiffBtn.addEventListener('click', () => {
    diffOutput.innerHTML = generateDiff(originalText.value, modifiedText.value);
});

copyDiffBtn.addEventListener('click', () => {
    const diffText = diffOutput.textContent;
    navigator.clipboard.writeText(diffText);
    copyDiffBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyDiffBtn.textContent = 'Copy';
    }, 1500);
});

// XML Formatter
const xmlInput = document.getElementById('xml-input');
const formatXmlBtn = document.getElementById('format-xml');
const minifyXmlBtn = document.getElementById('minify-xml');
const copyXmlBtn = document.getElementById('copy-xml');

function formatXML(xml) {
    let formatted = '';
    let indent = '';
    const tab = '    ';
    xml.split(/>\s*</).forEach(node => {
        if (node.match(/^\/\w/)) {
            indent = indent.substring(tab.length);
        }
        formatted += indent + '<' + node + '>\r\n';
        if (node.match(/^<?\w[^>]*[^\/]$/)) {
            indent += tab;
        }
    });
    return formatted.substring(1, formatted.length - 3);
}

formatXmlBtn.addEventListener('click', () => {
    try {
        xmlInput.value = formatXML(xmlInput.value.trim());
    } catch (error) {
        alert('Invalid XML: ' + error.message);
    }
});

minifyXmlBtn.addEventListener('click', () => {
    try {
        xmlInput.value = xmlInput.value
            .replace(/>\s+</g, '><')
            .replace(/\s+/g, ' ')
            .trim();
    } catch (error) {
        alert('Invalid XML: ' + error.message);
    }
});

copyXmlBtn.addEventListener('click', () => {
    copyToClipboard(xmlInput);
});

// CSV to JSON Converter
const csvInput = document.getElementById('csv-input');
const firstRowHeaders = document.getElementById('first-row-headers');
const convertCsvBtn = document.getElementById('convert-csv');
const copyCsvBtn = document.getElementById('copy-csv');
const jsonOutput = document.getElementById('json-output');

function csvToJson(csv, headers = true) {
    const lines = csv.split('\n').map(line => 
        line.split(',').map(cell => 
            cell.trim().replace(/^["'](.*)["']$/, '$1')
        )
    );
    
    if (lines.length < 2) return [];
    
    const headerRow = headers ? lines.shift() : 
        Array.from({ length: lines[0].length }, (_, i) => `column${i + 1}`);
    
    return lines.map(line => {
        const obj = {};
        headerRow.forEach((header, i) => {
            obj[header] = line[i] || '';
        });
        return obj;
    });
}

convertCsvBtn.addEventListener('click', () => {
    try {
        const json = csvToJson(csvInput.value, firstRowHeaders.checked);
        jsonOutput.textContent = JSON.stringify(json, null, 2);
    } catch (error) {
        alert('Invalid CSV: ' + error.message);
    }
});

copyCsvBtn.addEventListener('click', () => {
    if (jsonOutput.textContent) {
        navigator.clipboard.writeText(jsonOutput.textContent);
        copyCsvBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyCsvBtn.textContent = 'Copy';
        }, 1500);
    }
});

// Number Base Converter
const numberInput = document.getElementById('number-input');
const numberOutput = document.getElementById('number-output');
const fromBase = document.getElementById('from-base');
const toBase = document.getElementById('to-base');
const convertNumberBtn = document.getElementById('convert-number');
const copyNumberBtn = document.getElementById('copy-number');

function convertBase(num, fromBase, toBase) {
    const decimal = parseInt(num.toString(), fromBase);
    return decimal.toString(toBase).toUpperCase();
}

convertNumberBtn.addEventListener('click', () => {
    try {
        const result = convertBase(
            numberInput.value,
            parseInt(fromBase.value),
            parseInt(toBase.value)
        );
        numberOutput.value = result;
    } catch (error) {
        alert('Invalid number for the selected base');
    }
});

copyNumberBtn.addEventListener('click', () => {
    if (numberOutput.value) {
        navigator.clipboard.writeText(numberOutput.value);
        copyNumberBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyNumberBtn.textContent = 'Copy';
        }, 1500);
    }
});