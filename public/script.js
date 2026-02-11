// Chat toggle functionality
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const minimizeBtn = document.getElementById('minimizeBtn');

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


chatToggle.addEventListener('click', () => {
  chatWidget.classList.add('open');
  chatToggle.classList.add('hidden');
});

minimizeBtn.addEventListener('click', () => {
  chatWidget.classList.remove('open');
  chatToggle.classList.remove('hidden');
});

// Chat send functionality
async function send() {
  const input = document.getElementById('input');
  const chat = document.getElementById('chat');
  const message = input.value.trim();

  if (!message) return;

  chat.innerHTML += `<div class="message user">${message}</div>`;
  input.value = '';

  const typingId = Date.now();
  chat.innerHTML += `<div class="message bot typing" id="typing-${typingId}">Thinking...</div>`;
  chat.scrollTop = chat.scrollHeight;

  const res = await fetch('/chat', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({message})
  });

  const data = await res.json();

  const typingElement = document.getElementById(`typing-${typingId}`);
  if (typingElement) typingElement.remove();

  const htmlReply = marked.parse(data.reply);
  chat.innerHTML += `<div class="message bot">${htmlReply}</div>`;
  chat.scrollTop = chat.scrollHeight;
}

// Enter key to send
document.getElementById('input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') send();
});