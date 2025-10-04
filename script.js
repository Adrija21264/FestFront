// ===== Open & Close Modals =====
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
  
    // Reset modal state each time it opens
    resetModal(modal);
  }
  
  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
  }
  
  // Close modal if click outside content
  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });
  
  // ===== Reset Modal (initial state) =====
  function resetModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
  
    // Show Register button if present and enabled
    const regBtn = modalContent.querySelector('.register-btn');
    if (regBtn) regBtn.style.display = regBtn.disabled ? 'none' : 'block';
  
    // Remove any existing dynamic form or success messages
    modalContent.querySelectorAll('.register-form, .thank-you-msg').forEach(el => el.remove());
  }
  
  // ===== Handle Register Button & Form (delegated) =====
  document.addEventListener('click', (e) => {
    // only act on buttons with the register-btn class that are NOT disabled
    if (e.target.classList && e.target.classList.contains('register-btn') && !e.target.disabled) {
      const modalContent = e.target.closest('.modal-content');
      if (!modalContent) return;
  
      // Hide the register button
      e.target.style.display = 'none';
  
      // Create and insert registration form
      const form = document.createElement('form');
      form.className = 'register-form';
      form.innerHTML = `
        <input name="name" type="text" placeholder="Your Name" required>
        <input name="email" type="email" placeholder="Your Email" required>
        <button type="submit">Submit</button>
      `;
      modalContent.appendChild(form);
  
      // Handle form submission
      form.addEventListener('submit', (event) => {
        event.preventDefault();
  
        
        // Remove the form
        form.remove();
  
        // Show success message
        const success = document.createElement('p');
        success.className = 'thank-you-msg';
        success.innerHTML = '✅ <strong>Thank you for registering!</strong> 🎉<br>We’ll be in touch soon.';
        modalContent.appendChild(success);

       
       success.style.opacity = 0;
       success.style.transition = 'opacity 0.8s ease, transform 0.5s ease';
       success.style.transform = 'translateY(-10px)';

       setTimeout(() => {
       success.style.opacity = 1;
       success.style.transform = 'translateY(0)';
       }, 50);
      });
    }
  });
  