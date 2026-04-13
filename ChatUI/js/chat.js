/*
 * AuraChat — chat.js
 * Author: Student
 * Description: All chat functionality using jQuery
 */

$(function () {

  /* ── MOCK AI RESPONSES ────────────────────────────────── */
  const aiResponses = [
    "That's a great question! Let me break it down for you step by step so it's easy to understand.",
    "Sure! Here's a clear explanation: the concept works by combining several underlying principles together to achieve the result you're looking for.",
    "Absolutely. The short answer is yes, but there's some nuance worth knowing. The key factors are the context and the specific requirements of your use case.",
    "Great thinking! Here are the main points to keep in mind:\n\n1. Start with the fundamentals — they always matter.\n2. Build incrementally and test often.\n3. Refactor when things get complex.\n4. Document as you go.",
    "I understand what you're asking. The best approach here is to analyze the problem from a high level first, then drill into the details. This prevents getting stuck in the weeds early on.",
    "Interesting! Here's how I'd approach that:\n\n• Define the goal clearly.\n• Identify the constraints.\n• Generate possible solutions.\n• Evaluate and pick the best one.\n• Execute and iterate.",
    "That's a common challenge many developers face. The trick is to separate concerns and keep each part of your code focused on a single responsibility — the Single Responsibility Principle really helps here.",
    "Here's a quick analogy that might help: think of it like building a house. You need a strong foundation (core logic), solid walls (structure), and good wiring (data flow) before worrying about the paint (UI).",
    "Yes, definitely! One practical tip: always start with a minimal working version, then layer on features. This is sometimes called the 'walking skeleton' approach.",
    "Let me think through that carefully. The answer depends on your specific constraints, but generally the recommended pattern is to keep things simple, explicit, and well-tested.",
  ];

  /* ── STATE ────────────────────────────────────────────── */
  let messageCount = 0;
  let isTyping = false;
  let darkMode = true; // default dark

  /* ── HELPERS ──────────────────────────────────────────── */

  /** Format current time as HH:MM AM/PM */
  function getTime () {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  }

  /** Random integer between min and max (inclusive) */
  function randInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Pick a random AI response */
  function getAIResponse () {
    return aiResponses[randInt(0, aiResponses.length - 1)];
  }

  /** Scroll chat area to bottom smoothly */
  function scrollToBottom () {
    const $chatArea = $('#chat-area');
    $chatArea.animate({ scrollTop: $chatArea[0].scrollHeight }, 300);
  }

  /* ── ADD MESSAGE ──────────────────────────────────────── */
  /**
   * Creates and appends a message bubble.
   * @param {string} text   - Message content
   * @param {string} sender - 'user' | 'ai'
   */
  function addMessage (text, sender) {
    const isUser   = sender === 'user';
    const rowClass  = isUser ? 'usr-row' : 'ai-row';
    const avatarCls = isUser ? 'usr-avatar' : 'ai-avatar';
    const avatarLetter = isUser ? 'S' : 'A';
    const senderName   = isUser ? 'You' : 'AuraChat';
    const time = getTime();

    const $row = $(`
      <div class="message-row ${rowClass}">
        <div class="msg-avatar ${avatarCls}">${avatarLetter}</div>
        <div class="msg-bubble">
          <div class="msg-meta">
            <span class="msg-name">${senderName}</span>
            <span class="msg-time">${time}</span>
          </div>
          <p class="msg-text">${escapeHtml(text)}</p>
        </div>
      </div>
    `);

    $('#messages-container').append($row);
    messageCount++;
    scrollToBottom();
  }

  /** Escape HTML to prevent XSS */
  function escapeHtml (str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ── SHOW / HIDE TYPING INDICATOR ────────────────────── */
  function showTyping () {
    $('#typing-indicator').removeClass('hidden');
    scrollToBottom();
  }

  function hideTyping () {
    $('#typing-indicator').addClass('hidden');
  }

  /* ── HIDE WELCOME SCREEN ──────────────────────────────── */
  function hideWelcome () {
    $('#welcome-screen').fadeOut(300, function () {
      $(this).remove();
    });
  }

  /* ── SEND MESSAGE FLOW ────────────────────────────────── */
  function sendMessage () {
    if (isTyping) return;

    const text = $('#user-input').val().trim();
    if (!text) return;

    // Hide welcome on first message
    if (messageCount === 0) hideWelcome();

    // Show user message
    addMessage(text, 'user');

    // Clear input
    $('#user-input').val('').trigger('input');

    // Disable send while typing
    isTyping = true;
    $('#send-btn').prop('disabled', true);

    // Simulate AI typing delay (1–2 seconds)
    const delay = randInt(1000, 2000);
    showTyping();

    setTimeout(function () {
      hideTyping();
      addMessage(getAIResponse(), 'ai');
      isTyping = false;
      // Re-check if input has content
      toggleSendBtn();
    }, delay);
  }

  /* ── SEND BUTTON ENABLE / DISABLE ────────────────────── */
  function toggleSendBtn () {
    const hasText = $('#user-input').val().trim().length > 0;
    $('#send-btn').prop('disabled', !hasText || isTyping);
  }

  /* ── AUTO-RESIZE TEXTAREA ─────────────────────────────── */
  function autoResize () {
    const el = document.getElementById('user-input');
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 200) + 'px';
  }

  /* ── DARK / LIGHT MODE TOGGLE ─────────────────────────── */
  function toggleTheme () {
    darkMode = !darkMode;
    $('body').toggleClass('light-mode', !darkMode);
    const $icon = $('#theme-icon');
    $icon.toggleClass('fa-moon', darkMode);
    $icon.toggleClass('fa-sun',  !darkMode);
  }

  /* ── SIDEBAR OPEN / CLOSE (mobile) ───────────────────── */
  function openSidebar () {
    $('#sidebar').addClass('open');
    $('#sidebar-overlay').addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeSidebar () {
    $('#sidebar').removeClass('open');
    $('#sidebar-overlay').removeClass('active');
    $('body').css('overflow', '');
  }

  /* ── ADD CHAT TO HISTORY ──────────────────────────────── */
  function addToHistory (text) {
    const shortText = text.length > 28 ? text.substring(0, 28) + '…' : text;
    const $item = $(`
      <li class="history-item">
        <i class="fa-regular fa-message"></i>
        <span>${escapeHtml(shortText)}</span>
      </li>
    `);
    // Remove active from others, add to new item
    $('.history-item').removeClass('active');
    $item.addClass('active');
    $('#history-list').prepend($item);
  }

  /* ── NEW CHAT RESET ───────────────────────────────────── */
  function newChat () {
    if (messageCount > 0) {
      const lastMsg = $('#messages-container .message-row.usr-row .msg-text').first().text();
      if (lastMsg) addToHistory(lastMsg);
    }

    $('#messages-container').empty();
    messageCount = 0;
    isTyping = false;

    // Re-add welcome screen if removed
    if ($('#welcome-screen').length === 0) {
      const $welcome = $(`
        <div id="welcome-screen">
          <div class="welcome-inner">
            <div class="welcome-icon"><i class="fa-solid fa-bolt"></i></div>
            <h1 class="welcome-title">What can I help with?</h1>
            <p class="welcome-sub">Ask me anything — I'm here to assist.</p>
            <div class="suggestion-grid">
              <div class="suggestion-card" data-text="Explain quantum computing in simple terms">
                <div class="card-icon"><i class="fa-solid fa-atom"></i></div>
                <div class="card-body-text"><h3>Explain a concept</h3><p>Quantum computing in simple terms</p></div>
              </div>
              <div class="suggestion-card" data-text="Write a Python function to sort a list of dictionaries">
                <div class="card-icon"><i class="fa-solid fa-code"></i></div>
                <div class="card-body-text"><h3>Write some code</h3><p>Sort a list of dictionaries in Python</p></div>
              </div>
              <div class="suggestion-card" data-text="What are the best productivity tips for developers?">
                <div class="card-icon"><i class="fa-solid fa-lightbulb"></i></div>
                <div class="card-body-text"><h3>Get advice</h3><p>Best productivity tips for developers</p></div>
              </div>
              <div class="suggestion-card" data-text="Summarize the key differences between SQL and NoSQL databases">
                <div class="card-icon"><i class="fa-solid fa-database"></i></div>
                <div class="card-body-text"><h3>Compare topics</h3><p>SQL vs NoSQL databases</p></div>
              </div>
            </div>
          </div>
        </div>
      `);
      $('#chat-area').prepend($welcome);
    } else {
      $('#welcome-screen').show();
    }

    hideTyping();
    toggleSendBtn();
    closeSidebar();
  }

  /* ── EVENT LISTENERS ──────────────────────────────────── */

  // Send button click
  $('#send-btn').on('click', sendMessage);

  // Enter to send, Shift+Enter for new line
  $('#user-input').on('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Input change — resize + toggle send button
  $('#user-input').on('input', function () {
    autoResize();
    toggleSendBtn();
  });

  // Suggestion card clicks (delegated for dynamic re-adds)
  $('#chat-area').on('click', '.suggestion-card', function () {
    const text = $(this).data('text');
    if (text) {
      $('#user-input').val(text).trigger('input');
      sendMessage();
    }
  });

  // Theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // New Chat button (sidebar)
  $('#new-chat-btn').on('click', newChat);

  // New Chat button (mobile topbar)
  $('#new-chat-mobile').on('click', newChat);

  // Hamburger — open sidebar on mobile
  $('#hamburger').on('click', openSidebar);

  // Overlay — close sidebar
  $('#sidebar-overlay').on('click', closeSidebar);

  // History item clicks
  $('#history-list').on('click', '.history-item', function () {
    $('.history-item').removeClass('active');
    $(this).addClass('active');
    closeSidebar();
  });

  // Attach button (UI only for this assignment)
  $('#attach-btn').on('click', function () {
    alert('File attachment would open here in a full implementation!');
  });

  /* ── INIT ─────────────────────────────────────────────── */
  toggleSendBtn(); // ensure correct state on load

}); // end document ready
