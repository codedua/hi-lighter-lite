// content.js

document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement('span');
    span.style.backgroundColor = 'yellow';
    span.className = 'highlighted';
    range.surroundContents(span);

    saveHighlights();
  }
});

function saveHighlights() {
  const highlights = [];
  document.querySelectorAll('.highlighted').forEach(span => {
    highlights.push(span.innerHTML);
  });
  chrome.storage.local.set({ highlights });
}

function restoreHighlights() {
  chrome.storage.local.get('highlights', data => {
    if (data.highlights) {
      data.highlights.forEach(text => {
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        span.className = 'highlighted';
        span.innerHTML = text;
        document.body.innerHTML = document.body.innerHTML.replace(text, span.outerHTML);
      });
    }
  });
}

window.addEventListener('load', restoreHighlights);
