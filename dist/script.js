(() => {
  const scenes = [...document.querySelectorAll('.scene')];
  const show = (name) => {
    scenes.forEach((scene) => {
      const active = scene.dataset.scene === name;
      scene.classList.toggle('is-active', active);
      scene.setAttribute('aria-hidden', String(!active));
      if (active && name === 'letter') scene.scrollTop = 0;
    });
  };

  const paperSound = new Audio('assets/paperSound.mp3');
  paperSound.preload = 'auto';
  const mainSound = document.querySelector('#main-sound');
  let transitionPending = false;

  const playPaperSound = () => {
    paperSound.pause();
    paperSound.currentTime = 0;
    paperSound.play().catch(() => {});
  };

  const startMainSound = () => {
    if (!mainSound.paused) return;
    mainSound.play().catch(() => {});
  };

  document.querySelector('.sealed-card').addEventListener('click', () => {
    if (transitionPending) return;
    transitionPending = true;
    playPaperSound();
    window.setTimeout(() => {
      show('open');
      transitionPending = false;
    }, 500);
  });
  const openCard = document.querySelector('.open-card');
  openCard.addEventListener('click', () => {
    if (transitionPending || openCard.disabled) return;
    transitionPending = true;
    openCard.disabled = true;
    openCard.classList.add('is-pulling');
    playPaperSound();
    window.setTimeout(() => {
      show('letter');
      startMainSound();
      transitionPending = false;
    }, 500);
  });

  const detailsButton = document.querySelector('.details');
  let openingRsvp = false;
  detailsButton.addEventListener('click', () => {
    if (openingRsvp) return;
    openingRsvp = true;
    detailsButton.animate(
      [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(-5px) scale(1.03)' }, { transform: 'translateY(0) scale(1)' }],
      { duration: 420, easing: 'cubic-bezier(.22,1,.36,1)' }
    );
    window.setTimeout(() => show('rsvp'), 420);
  });

  document.querySelector('.rsvp-back').addEventListener('click', () => {
    openingRsvp = false;
    show('letter');
  });

})();
