import './Knob.css'

export function Knob(): string {
  // Generate LED indicators (11 LEDs for the value display)
  const leds = Array.from({ length: 11 }, (_, i) => 
    `<div class="kwami-knob-led" data-led-index="${i}"></div>`
  ).join('');

  return `
    <div class="kwami-knob-container">
      <div class="kwami-knob-outer">
        <div class="kwami-knob-bezel" aria-hidden="true"></div>
        <div class="kwami-knob-track-ring" aria-hidden="true"></div>
        <div class="kwami-knob-leds" aria-hidden="true">
          ${leds}
        </div>
        <div class="kwami-knob" data-value="50">
          <div class="kwami-knob-edge" aria-hidden="true"></div>
          <div class="kwami-knob-face" aria-hidden="true"></div>
          <div class="kwami-knob-grooves" aria-hidden="true">
            <div class="kwami-knob-groove kwami-knob-groove-1"></div>
            <div class="kwami-knob-groove kwami-knob-groove-2"></div>
            <div class="kwami-knob-groove kwami-knob-groove-3"></div>
            <div class="kwami-knob-groove kwami-knob-groove-4"></div>
          </div>
          <div class="kwami-knob-cap" aria-hidden="true"></div>
          <div class="kwami-knob-track">
            <div class="kwami-knob-indicator"></div>
          </div>
        </div>
      </div>
      <span class="kwami-knob-label">VOLUME</span>
    </div>
  `;
}

export function initKnob(container: HTMLElement): void {
  const knob = container.querySelector('.kwami-knob') as HTMLElement;
  const ledsContainer = container.querySelector('.kwami-knob-leds') as HTMLElement;
  let isDragging = false;
  let currentValue = 50;
  let startY = 0;
  let startValue = 0;

  if (!knob) return;

  const updateLeds = (value: number) => {
    if (!ledsContainer) return;
    const leds = ledsContainer.querySelectorAll('.kwami-knob-led');
    const activeLeds = Math.round((value / 100) * 11);
    
    leds.forEach((led, index) => {
      if (index < activeLeds) {
        led.classList.add('active');
      } else {
        led.classList.remove('active');
      }
    });
  };

  const updateKnob = (value: number) => {
    currentValue = Math.max(0, Math.min(100, value));
    const rotation = (currentValue / 100) * 270 - 135; // -135 to 135 degrees
    const track = knob.querySelector('.kwami-knob-track') as HTMLElement;
    if (track) {
      track.style.transform = `rotate(${rotation}deg)`;
    }
    knob.setAttribute('data-value', currentValue.toString());
    updateLeds(currentValue);
  };

  const handleStart = (clientY: number) => {
    isDragging = true;
    startY = clientY;
    startValue = currentValue;
    knob.classList.add('grabbing');
  };

  const handleMove = (clientY: number) => {
    if (!isDragging) return;
    const deltaY = startY - clientY;
    const sensitivity = 0.5;
    const newValue = startValue + deltaY * sensitivity;
    updateKnob(newValue);
  };

  const handleEnd = () => {
    isDragging = false;
    knob.classList.remove('grabbing');
  };

  knob.addEventListener('mousedown', (e) => {
    handleStart(e.clientY);
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    handleMove(e.clientY);
  });

  document.addEventListener('mouseup', handleEnd);

  // Touch support
  knob.addEventListener('touchstart', (e) => {
    if (e.touches[0]) {
      handleStart(e.touches[0].clientY);
      e.preventDefault();
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientY);
    }
  });

  document.addEventListener('touchend', handleEnd);

  // Mouse wheel support
  knob.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -2 : 2;
    updateKnob(currentValue + delta);
  });

  // Initialize
  updateKnob(50);
}
