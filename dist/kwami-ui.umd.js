(function(u,p){typeof exports=="object"&&typeof module<"u"?p(exports):typeof define=="function"&&define.amd?define(["exports"],p):(u=typeof globalThis<"u"?globalThis:u||self,p(u.KwamiUI={}))})(this,function(u){"use strict";var Mt=Object.defineProperty;var Pt=(u,p,v)=>p in u?Mt(u,p,{enumerable:!0,configurable:!0,writable:!0,value:v}):u[p]=v;var l=(u,p,v)=>Pt(u,typeof p!="symbol"?p+"":p,v);const E=class E{constructor(n){l(this,"id");l(this,"props");l(this,"element",null);l(this,"listeners",[]);this.props=n,this.id=`kwami-${++E.counter}`}mount(n){n.innerHTML=this.render();const t=n.firstElementChild;return this.hydrate(t),t}hydrate(n){this.element=n,this.element.setAttribute("data-kwami-id",this.id),this.onHydrate()}onHydrate(){}addListener(n,t,e){n.addEventListener(t,e),this.listeners.push({el:n,type:t,handler:e})}destroy(){this.listeners.forEach(({el:n,type:t,handler:e})=>{n.removeEventListener(t,e)}),this.listeners=[],this.element=null}update(n){this.props={...this.props,...n}}};l(E,"counter",0);let p=E;const v={primary:"#ff9500",secondary:"#007aff",background:"#e0e5ec",shadow:"rgba(163, 177, 198, 0.6)",light:"rgba(255, 255, 255, 0.8)"},P={primary:"#ff9500",secondary:"#5856d6",background:"#1e1e1e",shadow:"rgba(0, 0, 0, 0.5)",light:"rgba(255, 255, 255, 0.03)"},U={mode:"dark",colors:{light:v,dark:P}};function V(h){return h.mode==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":h.mode}function K(h){const n=document.documentElement,t=document.body,e=()=>{const i=V(h),s=h.colors[i];n.setAttribute("data-theme",i),t.setAttribute("data-theme",i),n.style.setProperty("--accent-primary",s.primary),n.style.setProperty("--accent-secondary",s.secondary),n.style.setProperty("--kwami-accent",s.primary),s.background&&(n.style.setProperty("--kwami-bg",s.background),n.style.setProperty("--kwami-surface",s.background)),s.shadow&&n.style.setProperty("--kwami-shadow-dark",s.shadow),s.light&&n.style.setProperty("--kwami-shadow-light",s.light)};if(e(),h.mode==="system"){const i=window.matchMedia("(prefers-color-scheme: dark)");return i.addEventListener("change",e),()=>{i.removeEventListener("change",e)}}return()=>{}}function x(h,n,t){n/=100,t/=100;const e=n*Math.min(t,1-t),i=s=>{const a=(s+h/30)%12,r=t-e*Math.max(Math.min(a-3,9-a,1),-1);return Math.round(255*r).toString(16).padStart(2,"0")};return`#${i(0)}${i(8)}${i(4)}`}function A(h,n,t){n/=100,t/=100;const e=n*Math.min(t,1-t),i=s=>{const a=(s+h/30)%12;return Math.round(255*(t-e*Math.max(Math.min(a-3,9-a,1),-1)))};return{r:i(0),g:i(8),b:i(4)}}function z(h){const n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null}function D(h,n,t){h/=255,n/=255,t/=255;const e=Math.max(h,n,t),i=Math.min(h,n,t);let s=0,a=0;const r=(e+i)/2;if(e!==i){const o=e-i;switch(a=r>.5?o/(2-e-i):o/(e+i),e){case h:s=((n-t)/o+(n<t?6:0))/6;break;case n:s=((t-h)/o+2)/6;break;case t:s=((h-n)/o+4)/6;break}}return{h:Math.round(s*360),s:Math.round(a*100),l:Math.round(r*100)}}function C(h){if(h=h.trim(),h.startsWith("#")){const e=z(h);if(e)return D(e.r,e.g,e.b)}const n=h.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(n)return D(parseInt(n[1]),parseInt(n[2]),parseInt(n[3]));const t=h.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/i);return t?{h:parseInt(t[1]),s:parseInt(t[2]),l:parseInt(t[3])}:null}function k(h,n){h=h.replace(/^#/,"");let t=parseInt(h.substring(0,2),16),e=parseInt(h.substring(2,4),16),i=parseInt(h.substring(4,6),16);return t=Math.min(255,Math.max(0,t+Math.round(t*n/100))),e=Math.min(255,Math.max(0,e+Math.round(e*n/100))),i=Math.min(255,Math.max(0,i+Math.round(i*n/100))),`#${t.toString(16).padStart(2,"0")}${e.toString(16).padStart(2,"0")}${i.toString(16).padStart(2,"0")}`}function X(h){return{start:k(h,30),light:k(h,15),mid:h,dark:k(h,-10),end:k(h,-25)}}class H extends p{constructor(n={}){super(n)}render(){const{label:n="CLICK",className:t="",disabled:e=!1}=this.props,i=e?"disabled":"";return`
            <div class="kwami-button-bezel ${t} ${e?"kwami-button-disabled":""}" data-kwami-id="${this.id}">
                <button class="kwami-button" ${i}>
                    <span class="kwami-button-face">
                        <span class="kwami-button-highlight"></span>
                        <span class="kwami-button-text">${n}</span>
                    </span>
                </button>
            </div>
        `}onHydrate(){if(!this.element)return;const n=this.element.querySelector(".kwami-button");n&&this.addListener(n,"click",t=>{if(this.props.disabled)return;const e=n;e.classList.add("pressed"),setTimeout(()=>e.classList.remove("pressed"),150),this.props.onClick&&this.props.onClick(t)})}}class b extends p{constructor(t={}){super(t);l(this,"ctx",null);l(this,"isOpen",!1);l(this,"isDragging",!1);l(this,"currentHue",30);l(this,"currentSaturation",100);l(this,"currentLightness",50);l(this,"currentFormat","hex");l(this,"trigger",null);l(this,"popup",null);l(this,"canvas",null);l(this,"cursor",null);l(this,"preview",null);l(this,"brightnessSlider",null);l(this,"formatToggle",null);l(this,"valueInput",null);l(this,"pipetteBtn",null);const e=C(t.defaultColor||"#ff9500");e&&(this.currentHue=e.h,this.currentSaturation=e.s,this.currentLightness=e.l)}render(){const{defaultColor:t="#ff9500",popupDirection:e="up"}=this.props,i=e==="down"?"kwami-colorpicker-popup-down":"";return`
      <div class="kwami-colorpicker" data-kwami-id="${this.id}" data-color="${t}">
          <button class="kwami-colorpicker-trigger" aria-label="Pick a color" title="Pick a color">
        <span class="kwami-colorpicker-preview" style="background-color: ${t}"></span>
        <iconify-icon icon="solar:palette-linear" width="16" height="16"></iconify-icon>
          </button>
          <div class="kwami-colorpicker-popup ${i}">
        <button class="kwami-colorpicker-pipette" aria-label="Pick from screen" title="Pick color from screen">
            <iconify-icon icon="solar:pipette-linear" width="16" height="16"></iconify-icon>
        </button>
        <div class="kwami-colorpicker-wheel">
            <canvas class="kwami-colorpicker-canvas" width="200" height="200"></canvas>
            <div class="kwami-colorpicker-cursor"></div>
        </div>
        <div class="kwami-colorpicker-brightness">
            <iconify-icon icon="solar:sun-linear" width="14" height="14"></iconify-icon>
            <input type="range" class="kwami-colorpicker-brightness-slider" min="0" max="100" value="${this.currentLightness}" />
            <iconify-icon icon="solar:moon-linear" width="14" height="14"></iconify-icon>
        </div>
        <div class="kwami-colorpicker-value-row">
            <button class="kwami-colorpicker-format-toggle" data-format="hex" title="Toggle format">HEX</button>
            <input type="text" class="kwami-colorpicker-value-input" value="${t}" spellcheck="false" />
        </div>
          </div>
      </div>
      `}onHydrate(){this.element&&(this.trigger=this.element.querySelector(".kwami-colorpicker-trigger"),this.popup=this.element.querySelector(".kwami-colorpicker-popup"),this.canvas=this.element.querySelector(".kwami-colorpicker-canvas"),this.cursor=this.element.querySelector(".kwami-colorpicker-cursor"),this.preview=this.element.querySelector(".kwami-colorpicker-preview"),this.brightnessSlider=this.element.querySelector(".kwami-colorpicker-brightness-slider"),this.formatToggle=this.element.querySelector(".kwami-colorpicker-format-toggle"),this.valueInput=this.element.querySelector(".kwami-colorpicker-value-input"),this.pipetteBtn=this.element.querySelector(".kwami-colorpicker-pipette"),!(!this.trigger||!this.popup||!this.canvas||!this.cursor||!this.preview||!this.brightnessSlider||!this.formatToggle||!this.valueInput||!this.pipetteBtn)&&(this.ctx=this.canvas.getContext("2d"),this.ctx&&((!window.EyeDropper||this.props.showPipette===!1)&&(this.pipetteBtn.style.display="none"),this.drawWheel(),this.setupEventListeners())))}setupEventListeners(){if(!this.trigger||!this.canvas||!this.brightnessSlider||!this.formatToggle||!this.valueInput||!this.pipetteBtn||!this.popup)return;this.addListener(this.trigger,"click",s=>{s.stopPropagation(),this.togglePopup()}),this.addListener(this.canvas,"mousedown",s=>{this.isDragging=!0,this.updateFromWheel(s)}),this.addListener(this.canvas,"mousemove",s=>{this.isDragging&&this.updateFromWheel(s)});const t=()=>{this.isDragging=!1};document.addEventListener("mouseup",t),this.addListener(this.canvas,"touchstart",s=>{s.preventDefault(),this.isDragging=!0,this.updateFromWheel(s.touches[0])}),this.addListener(this.canvas,"touchmove",s=>{s.preventDefault(),this.isDragging&&this.updateFromWheel(s.touches[0])}),this.addListener(this.canvas,"touchend",()=>{this.isDragging=!1}),this.addListener(this.brightnessSlider,"input",()=>{this.currentLightness=parseInt(this.brightnessSlider.value),this.drawWheel(),this.updateFinalColor()}),this.addListener(this.formatToggle,"click",s=>{s.stopPropagation(),this.cycleFormat()}),this.addListener(this.pipetteBtn,"click",s=>{s.stopPropagation(),this.pickFromScreen()}),this.addListener(this.valueInput,"input",()=>{this.handleInputChange()}),this.addListener(this.valueInput,"blur",()=>{this.valueInput.value=this.getColorString()}),this.addListener(this.valueInput,"keydown",s=>{s.key==="Enter"&&this.valueInput.blur()});const e=s=>{var a;this.isOpen&&!((a=this.element)!=null&&a.contains(s.target))&&this.closePopup()};document.addEventListener("click",e);const i=s=>{s.key==="Escape"&&this.isOpen&&this.closePopup()};document.addEventListener("keydown",i)}togglePopup(){var t,e;this.isOpen=!this.isOpen,(t=this.popup)==null||t.classList.toggle("active",this.isOpen),(e=this.element)==null||e.classList.toggle("active",this.isOpen)}closePopup(){var t,e;this.isOpen=!1,(t=this.popup)==null||t.classList.remove("active"),(e=this.element)==null||e.classList.remove("active")}drawWheel(){if(!this.ctx||!this.canvas)return;const t=this.canvas.width/2,e=this.canvas.height/2,i=Math.min(t,e)-5;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);for(let s=0;s<360;s++){const a=(s-1)*Math.PI/180,r=(s+1)*Math.PI/180;this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.arc(t,e,i,a,r),this.ctx.closePath();const o=this.ctx.createRadialGradient(t,e,0,t,e,i);o.addColorStop(0,`hsl(${s}, 0%, ${this.currentLightness}%)`),o.addColorStop(1,`hsl(${s}, 100%, ${this.currentLightness}%)`),this.ctx.fillStyle=o,this.ctx.fill()}}updateFromWheel(t){if(!this.canvas||!this.cursor)return;const e=this.canvas.getBoundingClientRect(),i=this.canvas.width/e.width,s=this.canvas.height/e.height,a=(t.clientX-e.left)*i,r=(t.clientY-e.top)*s,o=this.canvas.width/2,c=this.canvas.height/2,d=Math.min(o,c)-5,g=a-o,m=r-c,y=Math.sqrt(g*g+m*m);if(y<=d){this.cursor.style.left=`${a/i}px`,this.cursor.style.top=`${r/s}px`,this.cursor.style.opacity="1";let T=Math.atan2(m,g)*(180/Math.PI);T<0&&(T+=360),this.currentHue=T,this.currentSaturation=Math.min(y/d*100,100),this.updateFinalColor()}}updateCursorPosition(){if(!this.canvas||!this.cursor)return;const t=this.canvas.width/2,e=this.canvas.height/2,i=Math.min(t,e)-5,s=this.currentHue*(Math.PI/180),a=this.currentSaturation/100*i,r=t+Math.cos(s)*a,o=e+Math.sin(s)*a;this.cursor.style.left=`${r}px`,this.cursor.style.top=`${o}px`,this.cursor.style.opacity="1"}getColorString(){const t=A(this.currentHue,this.currentSaturation,this.currentLightness);switch(this.currentFormat){case"hex":return x(this.currentHue,this.currentSaturation,this.currentLightness).toUpperCase();case"rgb":return`rgb(${t.r}, ${t.g}, ${t.b})`;case"hsl":return`hsl(${Math.round(this.currentHue)}, ${Math.round(this.currentSaturation)}%, ${Math.round(this.currentLightness)}%)`}}updateFinalColor(t=!0){var i,s;const e=x(this.currentHue,this.currentSaturation,this.currentLightness);this.preview&&(this.preview.style.backgroundColor=e),(i=this.element)==null||i.setAttribute("data-color",e),t&&this.valueInput&&(this.valueInput.value=this.getColorString()),(s=this.element)==null||s.dispatchEvent(new CustomEvent("colorchange",{detail:{color:e},bubbles:!0})),this.props.onChange&&this.props.onChange(e)}handleInputChange(){if(!this.valueInput)return;const t=C(this.valueInput.value);t&&(this.currentHue=t.h,this.currentSaturation=t.s,this.currentLightness=t.l,this.brightnessSlider&&(this.brightnessSlider.value=String(this.currentLightness)),this.drawWheel(),this.updateCursorPosition(),this.updateFinalColor(!1))}cycleFormat(){const t=["hex","rgb","hsl"],e=t.indexOf(this.currentFormat);this.currentFormat=t[(e+1)%t.length],this.formatToggle&&(this.formatToggle.textContent=this.currentFormat.toUpperCase(),this.formatToggle.setAttribute("data-format",this.currentFormat)),this.valueInput&&(this.valueInput.value=this.getColorString())}async pickFromScreen(){var t,e,i,s;if(!(!window.EyeDropper||!this.pipetteBtn||!this.popup))try{const a=new window.EyeDropper;this.pipetteBtn.classList.add("active"),this.popup.classList.remove("active"),(t=this.element)==null||t.classList.remove("active");const o=(await a.open()).sRGBHex;this.popup.classList.add("active"),(e=this.element)==null||e.classList.add("active");const c=C(o);c&&(this.currentHue=c.h,this.currentSaturation=c.s,this.currentLightness=c.l,this.brightnessSlider&&(this.brightnessSlider.value=String(this.currentLightness)),this.drawWheel(),this.updateCursorPosition(),this.updateFinalColor())}catch{this.popup.classList.add("active"),(i=this.element)==null||i.classList.add("active")}finally{(s=this.pipetteBtn)==null||s.classList.remove("active")}}getColor(){return x(this.currentHue,this.currentSaturation,this.currentLightness)}setColor(t){const e=C(t);e&&(this.currentHue=e.h,this.currentSaturation=e.s,this.currentLightness=e.l,this.brightnessSlider&&(this.brightnessSlider.value=String(this.currentLightness)),this.drawWheel(),this.updateCursorPosition(),this.updateFinalColor())}}const I={label:"CLICK",bezel:{color:"#d0d0d0",radius:14,padding:6,shadowDepth:50},face:{color:"#e8e8e8",radius:10,depth:50,brightness:50},highlight:{color:"#ffffff",opacity:40,height:50},text:{color:"#555555",size:12,spacing:2,weight:600}};class _ extends p{constructor(t={}){super(t);l(this,"config");l(this,"button",null);l(this,"bezelEl",null);l(this,"faceEl",null);l(this,"highlightEl",null);l(this,"textEl",null);l(this,"colorPickers",new Map);this.config={...I,...t.initialConfig}}render(){const{showControls:t=!0}=this.props;this.button=new H({label:this.config.label});const e=t?this.renderControls():"";return`
      <div class="kwami-button-configurator" data-kwami-id="${this.id}">
          <div class="kwami-button-configurator-preview">
        <div class="kwami-button-configurator-container">
            ${this.button.render()}
        </div>
          </div>
          ${e}
      </div>
      `}renderControls(){return`
      <div class="kwami-button-configurator-controls">
          <!-- Part Selector Tabs -->
          <div class="kwami-button-configurator-parts">
        <button class="kwami-button-configurator-part-btn active" data-part="bezel" title="Bezel (outer frame)">
            <span class="part-icon">◰</span>
            <span class="part-label">Bezel</span>
        </button>
        <button class="kwami-button-configurator-part-btn" data-part="face" title="Face (button surface)">
            <span class="part-icon">▣</span>
            <span class="part-label">Face</span>
        </button>
        <button class="kwami-button-configurator-part-btn" data-part="highlight" title="Highlight (shine effect)">
            <span class="part-icon">◐</span>
            <span class="part-label">Shine</span>
        </button>
        <button class="kwami-button-configurator-part-btn" data-part="text" title="Text (label)">
            <span class="part-icon">T</span>
            <span class="part-label">Text</span>
        </button>
          </div>

          <!-- Control Panels -->
          <div class="kwami-button-configurator-panels">
        ${this.renderBezelPanel()}
        ${this.renderFacePanel()}
        ${this.renderHighlightPanel()}
        ${this.renderTextPanel()}
          </div>
      </div>
      `}renderBezelPanel(){const{bezel:t}=this.config;return`
      <div class="kwami-button-configurator-panel active" data-panel="bezel">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="bezel"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Border Radius</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="bezel-radius" min="0" max="30" value="${t.radius}" />
            <span class="kwami-cfg-value">${t.radius}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Padding</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="bezel-padding" min="2" max="16" value="${t.padding}" />
            <span class="kwami-cfg-value">${t.padding}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Shadow Depth</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="bezel-shadow" min="0" max="100" value="${t.shadowDepth}" />
            <span class="kwami-cfg-value">${t.shadowDepth}%</span>
        </div>
          </div>
      </div>
      `}renderFacePanel(){const{face:t}=this.config;return`
      <div class="kwami-button-configurator-panel" data-panel="face">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="face"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Border Radius</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="face-radius" min="0" max="24" value="${t.radius}" />
            <span class="kwami-cfg-value">${t.radius}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">3D Depth</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="face-depth" min="0" max="100" value="${t.depth}" />
            <span class="kwami-cfg-value">${t.depth}%</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Brightness</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="face-brightness" min="0" max="100" value="${t.brightness}" />
            <span class="kwami-cfg-value">${t.brightness}%</span>
        </div>
          </div>
      </div>
      `}renderHighlightPanel(){const{highlight:t}=this.config;return`
      <div class="kwami-button-configurator-panel" data-panel="highlight">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="highlight"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Intensity</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="highlight-opacity" min="0" max="100" value="${t.opacity}" />
            <span class="kwami-cfg-value">${t.opacity}%</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Coverage</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="highlight-height" min="20" max="80" value="${t.height}" />
            <span class="kwami-cfg-value">${t.height}%</span>
        </div>
          </div>
      </div>
      `}renderTextPanel(){const{text:t,label:e}=this.config;return`
      <div class="kwami-button-configurator-panel" data-panel="text">
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Color</label>
        <div class="kwami-cfg-color" data-color-target="text"></div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Content</label>
        <input type="text" class="kwami-cfg-input" data-prop="text-content" value="${e}" maxlength="20" />
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Font Size</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="text-size" min="8" max="18" value="${t.size}" step="1" />
            <span class="kwami-cfg-value">${t.size}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Letter Spacing</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="text-spacing" min="0" max="8" value="${t.spacing}" step="0.5" />
            <span class="kwami-cfg-value">${t.spacing}px</span>
        </div>
          </div>
          <div class="kwami-cfg-row">
        <label class="kwami-cfg-label">Weight</label>
        <div class="kwami-cfg-slider-wrap">
            <input type="range" class="kwami-cfg-slider" data-prop="text-weight" min="400" max="800" value="${t.weight}" step="100" />
            <span class="kwami-cfg-value">${t.weight}</span>
        </div>
          </div>
      </div>
      `}onHydrate(){this.element&&(this.bezelEl=this.element.querySelector(".kwami-button-bezel"),this.faceEl=this.element.querySelector(".kwami-button-face"),this.highlightEl=this.element.querySelector(".kwami-button-highlight"),this.textEl=this.element.querySelector(".kwami-button-text"),this.button&&this.bezelEl&&this.button.hydrate(this.bezelEl),this.setupColorPickers(),this.setupPartSelector(),this.setupSliders(),this.setupTextInput(),this.highlightPart("bezel"))}setupColorPickers(){if(!this.element)return;["bezel","face","highlight","text"].forEach(e=>{var o;const i=(o=this.element)==null?void 0:o.querySelector(`[data-color-target="${e}"]`);if(!i)return;const s=this.getColorForTarget(e),a=new b({defaultColor:s,popupDirection:"up",onChange:c=>this.handleColorChange(e,c)});i.innerHTML=a.render();const r=i.querySelector(".kwami-colorpicker");r&&(a.hydrate(r),this.colorPickers.set(e,a))})}getColorForTarget(t){switch(t){case"bezel":return this.config.bezel.color;case"face":return this.config.face.color;case"highlight":return this.config.highlight.color;case"text":return this.config.text.color;default:return"#ffffff"}}handleColorChange(t,e){switch(t){case"bezel":if(this.config.bezel.color=e,this.bezelEl){const i=k(e,20),s=k(e,-20);this.bezelEl.style.background=`linear-gradient(145deg, ${i} 0%, ${e} 50%, ${s} 100%)`}break;case"face":if(this.config.face.color=e,this.faceEl){const i=k(e,30),s=k(e,15),a=k(e,-10),r=k(e,-25);this.faceEl.style.background=`linear-gradient(160deg, ${i} 0%, ${s} 20%, ${e} 50%, ${a} 80%, ${r} 100%)`}break;case"highlight":this.config.highlight.color=e,this.highlightEl&&(this.highlightEl.style.background=`linear-gradient(180deg, ${e}66 0%, ${e}1a 50%, transparent 100%)`);break;case"text":this.config.text.color=e,this.textEl&&(this.textEl.style.color=e,this.textEl.style.textShadow="none");break}this.emitChange()}setupPartSelector(){if(!this.element)return;const t=this.element.querySelectorAll(".kwami-button-configurator-part-btn"),e=this.element.querySelectorAll(".kwami-button-configurator-panel");t.forEach(i=>{this.addListener(i,"click",()=>{const s=i.getAttribute("data-part");t.forEach(a=>a.classList.remove("active")),i.classList.add("active"),e.forEach(a=>{a.classList.toggle("active",a.getAttribute("data-panel")===s)}),this.highlightPart(s)})})}highlightPart(t){var e,i,s,a,r,o,c,d;switch((e=this.bezelEl)==null||e.classList.remove("kwami-cfg-editing"),(i=this.faceEl)==null||i.classList.remove("kwami-cfg-editing"),(s=this.highlightEl)==null||s.classList.remove("kwami-cfg-editing"),(a=this.textEl)==null||a.classList.remove("kwami-cfg-editing"),t){case"bezel":(r=this.bezelEl)==null||r.classList.add("kwami-cfg-editing");break;case"face":(o=this.faceEl)==null||o.classList.add("kwami-cfg-editing");break;case"highlight":(c=this.highlightEl)==null||c.classList.add("kwami-cfg-editing");break;case"text":(d=this.textEl)==null||d.classList.add("kwami-cfg-editing");break}}setupSliders(){if(!this.element)return;this.element.querySelectorAll(".kwami-cfg-slider").forEach(e=>{var r;const i=e,s=i.getAttribute("data-prop"),a=(r=i.parentElement)==null?void 0:r.querySelector(".kwami-cfg-value");this.addListener(i,"input",()=>{const o=parseFloat(i.value);this.handleSliderChange(s,o,a)})})}handleSliderChange(t,e,i){switch(t){case"bezel-radius":this.config.bezel.radius=e,this.bezelEl&&(this.bezelEl.style.borderRadius=`${e}px`),i&&(i.textContent=`${e}px`);break;case"bezel-padding":this.config.bezel.padding=e,this.bezelEl&&(this.bezelEl.style.padding=`${e}px`),i&&(i.textContent=`${e}px`);break;case"bezel-shadow":this.config.bezel.shadowDepth=e,this.bezelEl&&this.bezelEl.style.setProperty("--shadow-intensity",String(e/100)),i&&(i.textContent=`${e}%`);break;case"face-radius":this.config.face.radius=e,this.faceEl&&(this.faceEl.style.borderRadius=`${e}px`),i&&(i.textContent=`${e}px`);break;case"face-depth":this.config.face.depth=e,this.faceEl&&this.faceEl.style.setProperty("--face-depth",String(e/100)),i&&(i.textContent=`${e}%`);break;case"face-brightness":this.config.face.brightness=e,this.faceEl&&this.faceEl.style.setProperty("--face-brightness",String(e/100)),i&&(i.textContent=`${e}%`);break;case"highlight-opacity":this.config.highlight.opacity=e,this.highlightEl&&(this.highlightEl.style.opacity=String(e/100)),i&&(i.textContent=`${e}%`);break;case"highlight-height":this.config.highlight.height=e,this.highlightEl&&(this.highlightEl.style.height=`${e}%`),i&&(i.textContent=`${e}%`);break;case"text-size":this.config.text.size=e,this.textEl&&(this.textEl.style.fontSize=`${e/16}rem`),i&&(i.textContent=`${e}px`);break;case"text-spacing":this.config.text.spacing=e,this.textEl&&(this.textEl.style.letterSpacing=`${e}px`),i&&(i.textContent=`${e}px`);break;case"text-weight":this.config.text.weight=e,this.textEl&&(this.textEl.style.fontWeight=String(e)),i&&(i.textContent=String(e));break}this.emitChange()}setupTextInput(){if(!this.element)return;const t=this.element.querySelector('.kwami-cfg-input[data-prop="text-content"]');t&&this.addListener(t,"input",()=>{this.config.label=t.value||"CLICK",this.textEl&&(this.textEl.textContent=this.config.label),this.emitChange()})}emitChange(){this.props.onChange&&this.props.onChange({...this.config})}getConfiguration(){return{...this.config}}setConfiguration(t){this.config={...this.config,...t}}}class S extends p{constructor(n){super(n)}render(){const{text:n,as:t="h3"}=this.props,e=n.split("").map((i,s)=>i===" "?`<span class="kwami-title-char kwami-title-space" style="--char-index: ${s}">&nbsp;</span>`:`<span class="kwami-title-char" style="--char-index: ${s}">${i}</span>`).join("");return`
      <${t} class="kwami-title" data-kwami-id="${this.id}">
          <span class="kwami-title-text">${e}</span>
          <span class="kwami-title-glow" aria-hidden="true">${n}</span>
      </${t}>
      `}onHydrate(){}}function J(h,n){return new S({text:h,as:n}).render()}const B={text:"TITLE",glowColor:"#ff9500"};class Q extends p{constructor(t={}){super(t);l(this,"config");l(this,"title",null);l(this,"colorPicker",null);this.config={...B,...t.initialConfig}}render(){const{showControls:t=!0}=this.props;return this.title=new S({text:this.config.text}),`
            <div class="kwami-title-configurator" data-kwami-id="${this.id}">
                <div class="kwami-title-configurator-preview" style="--kwami-accent: ${this.config.glowColor}">
                    ${this.title.render()}
                </div>
                ${t?this.renderControls():""}
            </div>
        `}renderControls(){const{config:t}=this;return`
            <div class="kwami-title-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Text</label>
                    <input type="text" class="kwami-cfg-input" data-prop="text" value="${t.text}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Glow Color</label>
                    <div class="kwami-cfg-color" data-color-target="glow"></div>
                </div>
                <div class="kwami-cfg-row kwami-cfg-hint">
                    <span>Hover over the title to see the glow effect</span>
                </div>
            </div>
        `}onHydrate(){if(!this.element)return;const t=this.element.querySelector(".kwami-title");t&&this.title&&this.title.hydrate(t);const e=this.element.querySelector('[data-color-target="glow"]');if(e){this.colorPicker=new b({defaultColor:this.config.glowColor,popupDirection:"up",onChange:a=>{var o;this.config.glowColor=a;const r=(o=this.element)==null?void 0:o.querySelector(".kwami-title-configurator-preview");r&&r.style.setProperty("--kwami-accent",a),this.emitChange()}}),e.innerHTML=this.colorPicker.render();const s=e.querySelector(".kwami-colorpicker");s&&this.colorPicker.hydrate(s)}const i=this.element.querySelector('[data-prop="text"]');i&&this.addListener(i,"input",()=>{this.config.text=i.value||"TITLE",this.updateTitleText(this.config.text),this.emitChange()})}updateTitleText(t){var s,a;const e=(s=this.element)==null?void 0:s.querySelector(".kwami-title-text"),i=(a=this.element)==null?void 0:a.querySelector(".kwami-title-glow");if(e){const r=t.split("").map((o,c)=>o===" "?`<span class="kwami-title-char kwami-title-space" style="--char-index: ${c}">&nbsp;</span>`:`<span class="kwami-title-char" style="--char-index: ${c}">${o}</span>`).join("");e.innerHTML=r}i&&(i.textContent=t)}emitChange(){this.props.onChange&&this.props.onChange({...this.config})}getConfiguration(){return{...this.config}}}class O extends p{constructor(n){super(n)}render(){const{content:n,size:t="md",weight:e=400,color:i,align:s="left",className:a=""}=this.props,r=[i?`color: ${i}`:"",`font-weight: ${e}`,`text-align: ${s}`].filter(Boolean).join("; ");return`
            <p class="kwami-text kwami-text-${t} ${a}" 
               data-kwami-id="${this.id}"
               style="${r}">
                ${n}
            </p>
        `}onHydrate(){}setContent(n){this.element&&(this.element.textContent=n)}setStyle(n){this.element&&(n.color&&(this.element.style.color=n.color),n.weight&&(this.element.style.fontWeight=String(n.weight)),n.align&&(this.element.style.textAlign=n.align))}}const F={content:"Sample text content",size:"md",weight:400,color:"#333333",align:"left"};class Z extends p{constructor(t={}){super(t);l(this,"config");l(this,"text",null);l(this,"colorPicker",null);this.config={...F,...t.initialConfig}}render(){const{showControls:t=!0}=this.props;return this.text=new O({content:this.config.content,size:this.config.size,weight:this.config.weight,color:this.config.color,align:this.config.align}),`
            <div class="kwami-text-configurator" data-kwami-id="${this.id}">
                <div class="kwami-text-configurator-preview">
                    ${this.text.render()}
                </div>
                ${t?this.renderControls():""}
            </div>
        `}renderControls(){const{config:t}=this;return`
            <div class="kwami-text-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Content</label>
                    <input type="text" class="kwami-cfg-input" data-prop="content" value="${t.content}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-select-group">
                        <button class="kwami-cfg-select-btn ${t.size==="xs"?"active":""}" data-size="xs">XS</button>
                        <button class="kwami-cfg-select-btn ${t.size==="sm"?"active":""}" data-size="sm">SM</button>
                        <button class="kwami-cfg-select-btn ${t.size==="md"?"active":""}" data-size="md">MD</button>
                        <button class="kwami-cfg-select-btn ${t.size==="lg"?"active":""}" data-size="lg">LG</button>
                        <button class="kwami-cfg-select-btn ${t.size==="xl"?"active":""}" data-size="xl">XL</button>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Weight</label>
                    <div class="kwami-cfg-slider-wrap">
                        <input type="range" class="kwami-cfg-slider" data-prop="weight" min="300" max="700" step="100" value="${t.weight}" />
                        <span class="kwami-cfg-value">${t.weight}</span>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="text"></div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Align</label>
                    <div class="kwami-cfg-select-group">
                        <button class="kwami-cfg-select-btn ${t.align==="left"?"active":""}" data-align="left">
                            <iconify-icon icon="solar:align-left-linear" width="16"></iconify-icon>
                        </button>
                        <button class="kwami-cfg-select-btn ${t.align==="center"?"active":""}" data-align="center">
                            <iconify-icon icon="solar:align-horizontal-center-linear" width="16"></iconify-icon>
                        </button>
                        <button class="kwami-cfg-select-btn ${t.align==="right"?"active":""}" data-align="right">
                            <iconify-icon icon="solar:align-right-linear" width="16"></iconify-icon>
                        </button>
                    </div>
                </div>
            </div>
        `}onHydrate(){if(!this.element)return;const t=this.element.querySelector(".kwami-text");t&&this.text&&this.text.hydrate(t);const e=this.element.querySelector('[data-color-target="text"]');if(e){this.colorPicker=new b({defaultColor:this.config.color,popupDirection:"up",onChange:d=>{var g;this.config.color=d,(g=this.text)==null||g.setStyle({color:d}),this.emitChange()}}),e.innerHTML=this.colorPicker.render();const c=e.querySelector(".kwami-colorpicker");c&&this.colorPicker.hydrate(c)}const i=this.element.querySelector('[data-prop="content"]');i&&this.addListener(i,"input",()=>{var c;this.config.content=i.value,(c=this.text)==null||c.setContent(i.value),this.emitChange()});const s=this.element.querySelectorAll("[data-size]");s.forEach(c=>{this.addListener(c,"click",()=>{var m;const d=c.getAttribute("data-size");this.config.size=d,s.forEach(y=>y.classList.remove("active")),c.classList.add("active");const g=(m=this.element)==null?void 0:m.querySelector(".kwami-text");g&&(g.className=`kwami-text kwami-text-${d}`),this.emitChange()})});const a=this.element.querySelector('[data-prop="weight"]'),r=this.element.querySelector(".kwami-cfg-slider-wrap .kwami-cfg-value");a&&this.addListener(a,"input",()=>{var d;const c=parseInt(a.value);this.config.weight=c,r&&(r.textContent=String(c)),(d=this.text)==null||d.setStyle({weight:c}),this.emitChange()});const o=this.element.querySelectorAll("[data-align]");o.forEach(c=>{this.addListener(c,"click",()=>{var g;const d=c.getAttribute("data-align");this.config.align=d,o.forEach(m=>m.classList.remove("active")),c.classList.add("active"),(g=this.text)==null||g.setStyle({align:d}),this.emitChange()})})}emitChange(){this.props.onChange&&this.props.onChange({...this.config})}getConfiguration(){return{...this.config}}}class L extends p{constructor(n){super(n)}render(){const{text:n,size:t="md",required:e=!1,color:i,htmlFor:s,className:a=""}=this.props,r=s?`for="${s}"`:"",o=i?`style="color: ${i}"`:"",c=e?'<span class="kwami-label-required">*</span>':"";return`
            <label class="kwami-label kwami-label-${t} ${a}" 
                   data-kwami-id="${this.id}"
                   ${r}
                   ${o}>
                ${n}${c}
            </label>
        `}onHydrate(){}setText(n){if(this.element){const t=this.element.querySelector(".kwami-label-required");this.element.textContent=n,t&&this.element.appendChild(t)}}setColor(n){this.element&&(this.element.style.color=n)}}const N={text:"Label",size:"md",color:"#666666",required:!1};class tt extends p{constructor(t={}){super(t);l(this,"config");l(this,"label",null);l(this,"colorPicker",null);this.config={...N,...t.initialConfig}}render(){const{showControls:t=!0}=this.props;return this.label=new L({text:this.config.text,size:this.config.size,color:this.config.color,required:this.config.required}),`
            <div class="kwami-label-configurator" data-kwami-id="${this.id}">
                <div class="kwami-label-configurator-preview">
                    ${this.label.render()}
                </div>
                ${t?this.renderControls():""}
            </div>
        `}renderControls(){const{config:t}=this;return`
            <div class="kwami-label-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Text</label>
                    <input type="text" class="kwami-cfg-input" data-prop="text" value="${t.text}" />
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-select-group">
                        <button class="kwami-cfg-select-btn ${t.size==="sm"?"active":""}" data-size="sm">SM</button>
                        <button class="kwami-cfg-select-btn ${t.size==="md"?"active":""}" data-size="md">MD</button>
                        <button class="kwami-cfg-select-btn ${t.size==="lg"?"active":""}" data-size="lg">LG</button>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="label"></div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Required</label>
                    <button class="kwami-cfg-toggle ${t.required?"active":""}" data-prop="required">
                        <span class="kwami-cfg-toggle-track">
                            <span class="kwami-cfg-toggle-thumb"></span>
                        </span>
                    </button>
                </div>
            </div>
        `}onHydrate(){if(!this.element)return;const t=this.element.querySelector(".kwami-label");t&&this.label&&this.label.hydrate(t);const e=this.element.querySelector('[data-color-target="label"]');if(e){this.colorPicker=new b({defaultColor:this.config.color,popupDirection:"up",onChange:o=>{var c;this.config.color=o,(c=this.label)==null||c.setColor(o),this.emitChange()}}),e.innerHTML=this.colorPicker.render();const r=e.querySelector(".kwami-colorpicker");r&&this.colorPicker.hydrate(r)}const i=this.element.querySelector('[data-prop="text"]');i&&this.addListener(i,"input",()=>{var r;this.config.text=i.value,(r=this.label)==null||r.setText(i.value),this.emitChange()});const s=this.element.querySelectorAll("[data-size]");s.forEach(r=>{this.addListener(r,"click",()=>{var d;const o=r.getAttribute("data-size");this.config.size=o,s.forEach(g=>g.classList.remove("active")),r.classList.add("active");const c=(d=this.element)==null?void 0:d.querySelector(".kwami-label");c&&(c.className=`kwami-label kwami-label-${o}`),this.emitChange()})});const a=this.element.querySelector('[data-prop="required"]');a&&this.addListener(a,"click",()=>{var o,c;this.config.required=!this.config.required,a.classList.toggle("active",this.config.required);const r=(o=this.element)==null?void 0:o.querySelector(".kwami-label");if(r&&this.label){r.outerHTML=new L({text:this.config.text,size:this.config.size,color:this.config.color,required:this.config.required}).render(),this.label=new L(this.config);const d=(c=this.element)==null?void 0:c.querySelector(".kwami-label");d&&this.label.hydrate(d)}this.emitChange()})}emitChange(){this.props.onChange&&this.props.onChange({...this.config})}getConfiguration(){return{...this.config}}}class j extends p{constructor(n){super(n)}render(){const{icon:n,size:t=24,color:e,className:i=""}=this.props,s=e?`color: ${e}`:"";return`
            <span class="kwami-icon ${i}" data-kwami-id="${this.id}" style="${s}">
                <iconify-icon icon="${n}" width="${t}" height="${t}"></iconify-icon>
            </span>
        `}onHydrate(){}setIcon(n){var e;const t=(e=this.element)==null?void 0:e.querySelector("iconify-icon");t&&t.setAttribute("icon",n)}setSize(n){var e;const t=(e=this.element)==null?void 0:e.querySelector("iconify-icon");t&&(t.setAttribute("width",String(n)),t.setAttribute("height",String(n)))}setColor(n){this.element&&(this.element.style.color=n)}}const R={icon:"solar:star-bold",size:48,color:"#ff9500"},et=["solar:star-bold","solar:heart-bold","solar:home-2-bold","solar:user-bold","solar:settings-bold","solar:bell-bold","solar:chat-round-dots-bold","solar:folder-bold","solar:camera-bold","solar:music-note-bold","solar:map-point-bold","solar:sun-bold"];class it extends p{constructor(t={}){super(t);l(this,"config");l(this,"icon",null);l(this,"colorPicker",null);this.config={...R,...t.initialConfig}}render(){const{showControls:t=!0}=this.props;return this.icon=new j({icon:this.config.icon,size:this.config.size,color:this.config.color}),`
            <div class="kwami-icon-configurator" data-kwami-id="${this.id}">
                <div class="kwami-icon-configurator-preview">
                    ${this.icon.render()}
                </div>
                ${t?this.renderControls():""}
            </div>
        `}renderControls(){const{config:t}=this,e=et.map(i=>`
            <button class="kwami-icon-preset ${i===t.icon?"active":""}" data-icon="${i}" title="${i}">
                <iconify-icon icon="${i}" width="20" height="20"></iconify-icon>
            </button>
        `).join("");return`
            <div class="kwami-icon-configurator-controls">
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Icon</label>
                    <input type="text" class="kwami-cfg-input kwami-cfg-input-sm" data-prop="icon" value="${t.icon}" placeholder="solar:icon-name" />
                </div>
                <div class="kwami-icon-preset-grid">
                    ${e}
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Size</label>
                    <div class="kwami-cfg-slider-wrap">
                        <input type="range" class="kwami-cfg-slider" data-prop="size" min="16" max="96" value="${t.size}" />
                        <span class="kwami-cfg-value">${t.size}px</span>
                    </div>
                </div>
                <div class="kwami-cfg-row">
                    <label class="kwami-cfg-label">Color</label>
                    <div class="kwami-cfg-color" data-color-target="icon"></div>
                </div>
            </div>
        `}onHydrate(){if(!this.element)return;const t=this.element.querySelector(".kwami-icon");t&&this.icon&&this.icon.hydrate(t);const e=this.element.querySelector('[data-color-target="icon"]');if(e){this.colorPicker=new b({defaultColor:this.config.color,popupDirection:"up",onChange:c=>{var d;this.config.color=c,(d=this.icon)==null||d.setColor(c),this.emitChange()}}),e.innerHTML=this.colorPicker.render();const o=e.querySelector(".kwami-colorpicker");o&&this.colorPicker.hydrate(o)}const i=this.element.querySelector('[data-prop="icon"]');i&&this.addListener(i,"input",()=>{var o;this.config.icon=i.value,(o=this.icon)==null||o.setIcon(i.value),this.updatePresetSelection(i.value),this.emitChange()});const s=this.element.querySelector('[data-prop="size"]'),a=this.element.querySelector(".kwami-cfg-slider-wrap .kwami-cfg-value");s&&this.addListener(s,"input",()=>{var c;const o=parseInt(s.value);this.config.size=o,a&&(a.textContent=`${o}px`),(c=this.icon)==null||c.setSize(o),this.emitChange()}),this.element.querySelectorAll(".kwami-icon-preset").forEach(o=>{this.addListener(o,"click",()=>{var d;const c=o.getAttribute("data-icon");this.config.icon=c,(d=this.icon)==null||d.setIcon(c),i&&(i.value=c),this.updatePresetSelection(c),this.emitChange()})})}updatePresetSelection(t){var i;const e=(i=this.element)==null?void 0:i.querySelectorAll(".kwami-icon-preset");e==null||e.forEach(s=>{s.classList.toggle("active",s.getAttribute("data-icon")===t)})}emitChange(){this.props.onChange&&this.props.onChange({...this.config})}getConfiguration(){return{...this.config}}}class st extends p{constructor(t={}){super(t);l(this,"input",null);l(this,"valueDisplay",null);l(this,"fill",null);l(this,"thumbVisual",null);l(this,"currentValue");this.currentValue=t.value??50}render(){const{min:t=0,max:e=100,value:i=50,step:s=1,label:a="SLIDER"}=this.props,r=(i-t)/(e-t)*100;return`
            <div class="kwami-slider-container" data-kwami-id="${this.id}">
                <div class="kwami-slider-bezel">
                    <div class="kwami-slider-track">
                        <div class="kwami-slider-fill" style="width: ${r}%"></div>
                        <input 
                            type="range" 
                            class="kwami-slider" 
                            min="${t}" 
                            max="${e}" 
                            value="${i}"
                            step="${s}"
                        />
                        <div class="kwami-slider-thumb-visual" style="left: ${r}%"></div>
                    </div>
                </div>
                <div class="kwami-slider-value-container">
                    <span class="kwami-slider-value">${i}</span>
                </div>
                <span class="kwami-slider-label">${a}</span>
            </div>
        `}onHydrate(){this.element&&(this.input=this.element.querySelector(".kwami-slider"),this.valueDisplay=this.element.querySelector(".kwami-slider-value"),this.fill=this.element.querySelector(".kwami-slider-fill"),this.thumbVisual=this.element.querySelector(".kwami-slider-thumb-visual"),this.input&&this.addListener(this.input,"input",()=>{this.handleChange()}))}handleChange(){var s;if(!this.input)return;const{min:t=0,max:e=100}=this.props;this.currentValue=parseFloat(this.input.value);const i=(this.currentValue-t)/(e-t)*100;this.fill&&(this.fill.style.width=`${i}%`),this.thumbVisual&&(this.thumbVisual.style.left=`${i}%`),this.valueDisplay&&(this.valueDisplay.textContent=String(this.currentValue)),(s=this.element)==null||s.dispatchEvent(new CustomEvent("sliderchange",{detail:{value:this.currentValue},bubbles:!0})),this.props.onChange&&this.props.onChange(this.currentValue)}getValue(){return this.currentValue}setValue(t){const{min:e=0,max:i=100}=this.props;this.currentValue=t;const s=(t-e)/(i-e)*100;this.input&&(this.input.value=String(t)),this.fill&&(this.fill.style.width=`${s}%`),this.thumbVisual&&(this.thumbVisual.style.left=`${s}%`),this.valueDisplay&&(this.valueDisplay.textContent=String(t))}}class at extends p{constructor(t){super(t);l(this,"isExpanded",!1);l(this,"isAnimating",!1);l(this,"overlay",null);l(this,"placeholder",null);l(this,"btn",null);l(this,"titleComponent",null);this.titleComponent=new S({text:t.title})}render(){const{content:t,expandableId:e,expandedWidth:i="min(90vw, 500px)",expandedHeight:s="min(90vh, 500px)"}=this.props,a=this.titleComponent?this.titleComponent.render():"";return`
      <div class="kwami-expandable-placeholder" data-placeholder-for="${e}"></div>
      <div class="kwami-expandable" data-kwami-id="${this.id}" data-expandable-id="${e}"
           style="--end-width: ${i}; --end-height: ${s}">
          <div class="kwami-expandable-inner">
        <button class="kwami-expandable-btn" aria-label="Expand" title="Expand">
            <iconify-icon class="kwami-expandable-icon-expand" icon="solar:maximize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
            <iconify-icon class="kwami-expandable-icon-minimize" icon="solar:minimize-square-minimalistic-linear" width="18" height="18"></iconify-icon>
        </button>
        <div class="kwami-expandable-title">
            ${a}
        </div>
        <div class="kwami-expandable-content" data-component="${e}">
            ${t}
        </div>
          </div>
      </div>
      <div class="kwami-expandable-overlay" data-overlay-for="${e}"></div>
      `}onHydrate(){if(!this.element)return;const{expandableId:t}=this.props,e=this.element.parentElement;if(!e||(this.btn=this.element.querySelector(".kwami-expandable-btn"),this.overlay=e.querySelector(`[data-overlay-for="${t}"]`),this.placeholder=e.querySelector(`[data-placeholder-for="${t}"]`),!this.btn||!this.overlay||!this.placeholder))return;const i=this.element.querySelector(".kwami-title");i&&this.titleComponent&&this.titleComponent.hydrate(i),this.addListener(this.btn,"click",a=>{a.stopPropagation(),this.toggle()}),this.addListener(this.overlay,"click",()=>{this.isExpanded&&!this.isAnimating&&this.collapse()});const s=a=>{a.key==="Escape"&&this.isExpanded&&!this.isAnimating&&this.collapse()};document.addEventListener("keydown",s)}toggle(){this.isExpanded?this.collapse():this.expand()}expand(){if(this.isAnimating||!this.element||!this.placeholder||!this.overlay||!this.btn)return;this.isAnimating=!0;const t=this.element.getBoundingClientRect();this.element.style.setProperty("--start-x",`${t.left}px`),this.element.style.setProperty("--start-y",`${t.top}px`),this.element.style.setProperty("--start-width",`${t.width}px`),this.element.style.setProperty("--start-height",`${t.height}px`),this.placeholder.classList.add("active"),this.element.classList.add("expanding"),this.overlay.classList.add("active"),document.body.style.overflow="hidden",this.btn.setAttribute("aria-label","Minimize"),this.btn.setAttribute("title","Minimize");const e=()=>{var i,s,a;(i=this.element)==null||i.removeEventListener("animationend",e),(s=this.element)==null||s.classList.remove("expanding"),(a=this.element)==null||a.classList.add("expanded"),this.isExpanded=!0,this.isAnimating=!1,this.props.onExpand&&this.props.onExpand()};this.element.addEventListener("animationend",e,{once:!0})}collapse(){if(this.isAnimating||!this.element||!this.placeholder||!this.overlay||!this.btn)return;this.isAnimating=!0;const t=this.placeholder.getBoundingClientRect();this.element.style.setProperty("--start-x",`${t.left}px`),this.element.style.setProperty("--start-y",`${t.top}px`),this.element.style.setProperty("--start-width",`${t.width}px`),this.element.style.setProperty("--start-height",`${t.height}px`),this.element.classList.remove("expanded"),this.element.classList.add("collapsing"),this.overlay.classList.remove("active"),this.btn.setAttribute("aria-label","Expand"),this.btn.setAttribute("title","Expand");const e=()=>{var i,s,a;(i=this.element)==null||i.removeEventListener("animationend",e),(s=this.element)==null||s.classList.remove("collapsing"),(a=this.placeholder)==null||a.classList.remove("active"),document.body.style.overflow="",this.isExpanded=!1,this.isAnimating=!1,this.props.onCollapse&&this.props.onCollapse()};this.element.addEventListener("animationend",e,{once:!0})}getIsExpanded(){return this.isExpanded}getContentElement(){var t;return((t=this.element)==null?void 0:t.querySelector(".kwami-expandable-content"))||null}}const nt=[{icon:"solar:sun-bold",label:"Light"},{icon:"solar:moon-bold",label:"Dark"},{icon:"solar:monitor-bold",label:"System"}];class Y extends p{constructor(t={}){super(t);l(this,"currentState");l(this,"states");l(this,"btn",null);l(this,"icon",null);l(this,"label",null);this.states=t.states||nt,this.currentState=t.initialState||0}render(){const{className:t=""}=this.props,e=this.states[this.currentState];return`
            <div class="kwami-toggle ${t}" data-kwami-id="${this.id}" data-state="${this.currentState}">
                <button class="kwami-toggle-btn" title="Click to toggle">
                    <span class="kwami-toggle-highlight"></span>
                    <iconify-icon class="kwami-toggle-icon" icon="${e.icon}" width="20" height="20"></iconify-icon>
                </button>
                <span class="kwami-toggle-label">${e.label}</span>
            </div>
        `}onHydrate(){this.element&&(this.btn=this.element.querySelector(".kwami-toggle-btn"),this.icon=this.element.querySelector(".kwami-toggle-icon"),this.label=this.element.querySelector(".kwami-toggle-label"),!(!this.btn||!this.icon||!this.label)&&this.addListener(this.btn,"click",()=>{this.cycle()}))}updateState(t){var i;if(!this.icon||!this.label)return;this.currentState=t%this.states.length;const e=this.states[this.currentState];this.icon.classList.add("switching"),setTimeout(()=>{var s;this.icon.setAttribute("icon",e.icon),this.label.textContent=e.label,(s=this.element)==null||s.setAttribute("data-state",String(this.currentState)),setTimeout(()=>this.icon.classList.remove("switching"),150)},100),(i=this.element)==null||i.dispatchEvent(new CustomEvent("togglechange",{detail:{state:this.currentState,icon:e.icon,label:e.label},bubbles:!0})),this.props.onChange&&this.props.onChange({index:this.currentState,icon:e.icon,label:e.label})}cycle(){this.updateState(this.currentState+1)}setState(t){t>=0&&t<this.states.length&&this.updateState(t)}getState(){const t=this.states[this.currentState];return{index:this.currentState,icon:t.icon,label:t.label}}}class lt extends p{constructor(t={}){super(t);l(this,"isActive");l(this,"ledColor");l(this,"activator",null);l(this,"led",null);this.isActive=t.active||!1,this.ledColor=t.ledColor||"#ff9500"}render(){const{text:t="PUSH",label:e="",className:i=""}=this.props,s=this.isActive?"active":"";return`
            <div class="kwami-activator-container ${i}" data-kwami-id="${this.id}">
                <div class="kwami-activator-bezel">
                    <button class="kwami-activator ${s}">
                        <span class="kwami-activator-face">
                            <span class="kwami-activator-highlight"></span>
                            <span class="kwami-activator-text">${t}</span>
                        </span>
                        <span class="kwami-activator-led ${s}"></span>
                    </button>
                </div>
                ${e?`<span class="kwami-activator-label">${e}</span>`:""}
            </div>
        `}onHydrate(){this.element&&(this.activator=this.element.querySelector(".kwami-activator"),this.led=this.element.querySelector(".kwami-activator-led"),!(!this.activator||!this.led)&&(this.isActive&&this.updateLedStyle(),this.addListener(this.activator,"click",()=>{this.toggle(),this.props.onClick&&this.props.onClick()})))}updateLedStyle(){if(!this.led||!this.isActive)return;const t=12;this.led.style.background=`radial-gradient(circle at 30% 30%, ${this.adjustBrightness(this.ledColor,40)}, ${this.ledColor})`,this.led.style.boxShadow=`
            0 0 ${t}px ${this.ledColor}cc,
            0 0 ${t*2}px ${this.ledColor}80,
            0 0 ${t*3}px ${this.ledColor}4d
        `}adjustBrightness(t,e){t=t.replace(/^#/,"");let i=parseInt(t.substring(0,2),16),s=parseInt(t.substring(2,4),16),a=parseInt(t.substring(4,6),16);return i=Math.min(255,Math.max(0,i+Math.round(i*e/100))),s=Math.min(255,Math.max(0,s+Math.round(s*e/100))),a=Math.min(255,Math.max(0,a+Math.round(a*e/100))),`#${i.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}`}toggle(){this.setActive(!this.isActive)}setActive(t){var e,i,s,a,r;this.isActive=t,this.isActive?((e=this.led)==null||e.classList.add("active"),(i=this.activator)==null||i.classList.add("active"),this.updateLedStyle()):((s=this.led)==null||s.classList.remove("active"),(a=this.activator)==null||a.classList.remove("active"),this.led&&(this.led.style.background="",this.led.style.boxShadow="")),(r=this.element)==null||r.dispatchEvent(new CustomEvent("activatorchange",{detail:{active:this.isActive},bubbles:!0})),this.props.onChange&&this.props.onChange(this.isActive)}getActive(){return this.isActive}setLedColor(t){this.ledColor=t,this.isActive&&this.updateLedStyle()}}class rt extends p{constructor(t={}){super(t);l(this,"isChecked");l(this,"activeThumbColor");l(this,"activeTrackColor");l(this,"input",null);l(this,"track",null);l(this,"thumb",null);this.isChecked=t.checked||!1,this.activeThumbColor=t.activeThumbColor||"#ff9500",this.activeTrackColor=t.activeTrackColor||"#ffe8cc"}render(){const{label:t="",className:e="",disabled:i=!1}=this.props,s=this.isChecked?"checked":"",a=i?"disabled":"";return`
            <div class="kwami-switch-container ${e}" data-kwami-id="${this.id}">
                <label class="kwami-switch ${i?"kwami-switch-disabled":""}">
                    <input type="checkbox" class="kwami-switch-input" ${s} ${a}>
                    <span class="kwami-switch-bezel">
                        <span class="kwami-switch-track">
                            <span class="kwami-switch-thumb">
                                <span class="kwami-switch-thumb-highlight"></span>
                            </span>
                        </span>
                    </span>
                </label>
                ${t?`<span class="kwami-switch-label">${t}</span>`:""}
            </div>
        `}onHydrate(){this.element&&(this.input=this.element.querySelector(".kwami-switch-input"),this.track=this.element.querySelector(".kwami-switch-track"),this.thumb=this.element.querySelector(".kwami-switch-thumb"),!(!this.input||!this.track||!this.thumb)&&(this.isChecked&&this.updateActiveStyles(),this.addListener(this.input,"change",()=>{var t;this.isChecked=this.input.checked,this.isChecked?this.updateActiveStyles():this.resetStyles(),(t=this.element)==null||t.dispatchEvent(new CustomEvent("switchchange",{detail:{checked:this.isChecked},bubbles:!0})),this.props.onChange&&this.props.onChange(this.isChecked)})))}updateActiveStyles(){if(!this.track||!this.thumb)return;const t=this.adjustBrightness(this.activeTrackColor,10);this.track.style.background=`linear-gradient(145deg, ${this.activeTrackColor} 0%, ${t} 100%)`;const e=this.adjustBrightness(this.activeThumbColor,30),i=this.adjustBrightness(this.activeThumbColor,10),s=this.adjustBrightness(this.activeThumbColor,-15),a=this.adjustBrightness(this.activeThumbColor,-25);this.thumb.style.background=`linear-gradient(160deg, ${e} 0%, ${i} 20%, ${this.activeThumbColor} 50%, ${s} 80%, ${a} 100%)`;const r=10;this.thumb.style.boxShadow=`
            0 3px ${r}px ${this.activeThumbColor}66,
            0 2px 6px ${this.activeThumbColor}4d,
            0 0 ${r*2}px ${this.activeThumbColor}4d,
            inset 0 2px 3px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px ${a}4d
        `}resetStyles(){!this.track||!this.thumb||(this.track.style.background="",this.thumb.style.background="",this.thumb.style.boxShadow="")}adjustBrightness(t,e){t=t.replace(/^#/,"");let i=parseInt(t.substring(0,2),16),s=parseInt(t.substring(2,4),16),a=parseInt(t.substring(4,6),16);return i=Math.min(255,Math.max(0,i+Math.round(i*e/100))),s=Math.min(255,Math.max(0,s+Math.round(s*e/100))),a=Math.min(255,Math.max(0,a+Math.round(a*e/100))),`#${i.toString(16).padStart(2,"0")}${s.toString(16).padStart(2,"0")}${a.toString(16).padStart(2,"0")}`}toggle(){this.setChecked(!this.isChecked)}setChecked(t){this.input&&(this.input.checked=t,this.input.dispatchEvent(new Event("change")))}getChecked(){return this.isChecked}setActiveThumbColor(t){this.activeThumbColor=t,this.isChecked&&this.updateActiveStyles()}setActiveTrackColor(t){this.activeTrackColor=t,this.isChecked&&this.updateActiveStyles()}}class ot extends p{constructor(t={}){super(t);l(this,"input",null);l(this,"wrapper",null);l(this,"highlight",null)}render(){const{placeholder:t="Type here...",value:e="",type:i="text",label:s="",className:a="",disabled:r=!1}=this.props,o=r?"disabled":"";return`
            <div class="kwami-textinput-container ${a} ${r?"kwami-textinput-disabled":""}" data-kwami-id="${this.id}">
                <div class="kwami-textinput-bezel">
                    <div class="kwami-textinput-wrapper">
                        <input 
                            type="${i}" 
                            class="kwami-textinput" 
                            placeholder="${t}"
                            value="${e}"
                            ${o}
                        />
                        <span class="kwami-textinput-highlight"></span>
                    </div>
                </div>
                ${s?`<span class="kwami-textinput-label">${s}</span>`:""}
            </div>
        `}onHydrate(){this.element&&(this.input=this.element.querySelector(".kwami-textinput"),this.wrapper=this.element.querySelector(".kwami-textinput-wrapper"),this.highlight=this.element.querySelector(".kwami-textinput-highlight"),!(!this.input||!this.wrapper||!this.highlight)&&(this.addListener(this.input,"focus",()=>{var t;(t=this.wrapper)==null||t.classList.add("focused"),this.highlight&&(this.highlight.style.width="80%"),this.props.onFocus&&this.props.onFocus()}),this.addListener(this.input,"blur",()=>{var t;(t=this.wrapper)==null||t.classList.remove("focused"),this.highlight&&(this.highlight.style.width="0"),this.props.onBlur&&this.props.onBlur()}),this.addListener(this.input,"input",()=>{this.props.onChange&&this.input&&this.props.onChange(this.input.value)})))}getValue(){var t;return((t=this.input)==null?void 0:t.value)||""}setValue(t){this.input&&(this.input.value=t)}focus(){var t;(t=this.input)==null||t.focus()}blur(){var t;(t=this.input)==null||t.blur()}}class ct extends p{constructor(t={}){super(t);l(this,"textarea",null);l(this,"wrapper",null);l(this,"highlight",null)}render(){const{placeholder:t="Enter text...",value:e="",rows:i=3,label:s="",className:a="",disabled:r=!1,resize:o="vertical"}=this.props,c=r?"disabled":"";return`
            <div class="kwami-textarea-container ${a} ${r?"kwami-textarea-disabled":""}" data-kwami-id="${this.id}">
                <div class="kwami-textarea-bezel">
                    <div class="kwami-textarea-wrapper">
                        <textarea 
                            class="kwami-textarea" 
                            placeholder="${t}"
                            rows="${i}"
                            style="resize: ${o}"
                            ${c}
                        >${e}</textarea>
                        <span class="kwami-textarea-highlight"></span>
                    </div>
                </div>
                ${s?`<span class="kwami-textarea-label">${s}</span>`:""}
            </div>
        `}onHydrate(){this.element&&(this.textarea=this.element.querySelector(".kwami-textarea"),this.wrapper=this.element.querySelector(".kwami-textarea-wrapper"),this.highlight=this.element.querySelector(".kwami-textarea-highlight"),!(!this.textarea||!this.wrapper||!this.highlight)&&(this.addListener(this.textarea,"focus",()=>{var t;(t=this.wrapper)==null||t.classList.add("focused"),this.highlight&&(this.highlight.style.width="80%"),this.props.onFocus&&this.props.onFocus()}),this.addListener(this.textarea,"blur",()=>{var t;(t=this.wrapper)==null||t.classList.remove("focused"),this.highlight&&(this.highlight.style.width="0"),this.props.onBlur&&this.props.onBlur()}),this.addListener(this.textarea,"input",()=>{this.props.onChange&&this.textarea&&this.props.onChange(this.textarea.value)})))}getValue(){var t;return((t=this.textarea)==null?void 0:t.value)||""}setValue(t){this.textarea&&(this.textarea.value=t)}focus(){var t;(t=this.textarea)==null||t.focus()}blur(){var t;(t=this.textarea)==null||t.blur()}}class ht extends p{constructor(t={}){super(t);l(this,"inputs",[]);l(this,"values",[]);const e=t.length||4;this.values=new Array(e).fill("")}render(){const{length:t=4,label:e="",masked:i=!1,className:s="",disabled:a=!1}=this.props,r=a?"disabled":"",o=a?"kwami-pin-disabled":"",c=i?"password":"text",d=Array.from({length:t},(g,m)=>`
            <div class="kwami-pin-digit-wrapper">
                <input 
                    type="${c}" 
                    class="kwami-pin-digit" 
                    maxlength="1"
                    inputmode="numeric"
                    pattern="[0-9]"
                    data-index="${m}"
                    ${r}
                />
                <span class="kwami-pin-digit-highlight"></span>
            </div>
        `).join("");return`
            <div class="kwami-pin-container ${s} ${o}" data-kwami-id="${this.id}">
                <div class="kwami-pin-bezel">
                    <div class="kwami-pin-inputs">
                        ${d}
                    </div>
                </div>
                ${e?`<span class="kwami-pin-label">${e}</span>`:""}
            </div>
        `}onHydrate(){this.element&&(this.inputs=Array.from(this.element.querySelectorAll(".kwami-pin-digit")),this.inputs.forEach((t,e)=>{this.addListener(t,"focus",()=>{var i;(i=t.parentElement)==null||i.classList.add("focused"),t.select()}),this.addListener(t,"blur",()=>{var i;(i=t.parentElement)==null||i.classList.remove("focused")}),this.addListener(t,"input",i=>{const s=i.target;let a=s.value;a=a.replace(/[^0-9]/g,""),s.value=a,this.values[e]=a,a&&e<this.inputs.length-1&&this.inputs[e+1].focus(),this.notifyChange(),this.isComplete()&&this.props.onComplete&&this.props.onComplete(this.getValue())}),this.addListener(t,"keydown",i=>{const s=i.key;s==="Backspace"?(!t.value&&e>0?(this.inputs[e-1].focus(),this.inputs[e-1].value="",this.values[e-1]="",i.preventDefault()):this.values[e]="",this.notifyChange()):s==="ArrowLeft"&&e>0?(i.preventDefault(),this.inputs[e-1].focus()):s==="ArrowRight"&&e<this.inputs.length-1&&(i.preventDefault(),this.inputs[e+1].focus())}),this.addListener(t,"paste",i=>{var o;i.preventDefault();const a=(((o=i.clipboardData)==null?void 0:o.getData("text"))||"").replace(/[^0-9]/g,"").slice(0,this.inputs.length);a.split("").forEach((c,d)=>{this.inputs[d]&&(this.inputs[d].value=c,this.values[d]=c)});const r=Math.min(a.length,this.inputs.length-1);this.inputs[r].focus(),this.notifyChange(),this.isComplete()&&this.props.onComplete&&this.props.onComplete(this.getValue())})}))}notifyChange(){this.props.onChange&&this.props.onChange(this.getValue())}isComplete(){return this.values.every(t=>t!=="")}getValue(){return this.values.join("")}setValue(t){const e=t.replace(/[^0-9]/g,"").slice(0,this.inputs.length);this.values=new Array(this.inputs.length).fill(""),e.split("").forEach((i,s)=>{this.inputs[s]&&(this.inputs[s].value=i,this.values[s]=i)})}clear(){var t;this.inputs.forEach((e,i)=>{e.value="",this.values[i]=""}),(t=this.inputs[0])==null||t.focus()}focus(){var t;(t=this.inputs[0])==null||t.focus()}}const dt=[{value:"option1",label:"Option 1"},{value:"option2",label:"Option 2"},{value:"option3",label:"Option 3"}];class ut extends p{constructor(t={}){super(t);l(this,"isOpen",!1);l(this,"selectedValue");l(this,"selector",null);l(this,"valueDisplay",null);l(this,"dropdown",null);this.selectedValue=t.value||""}render(){const{options:t=dt,placeholder:e="Select...",label:i="",className:s="",disabled:a=!1}=this.props,r=a?"kwami-selector-disabled":"",o=t.find(m=>m.value===this.selectedValue),c=o?o.label:e,d=!o,g=t.map(m=>`
            <div class="kwami-selector-option ${m.value===this.selectedValue?"selected":""}" 
                 data-value="${m.value}" 
                 role="option"
                 tabindex="0">
                ${m.label}
            </div>
        `).join("");return`
            <div class="kwami-selector-container ${s} ${r}" data-kwami-id="${this.id}">
                <div class="kwami-selector-bezel">
                    <div class="kwami-selector" tabindex="0" role="listbox" aria-expanded="false">
                        <div class="kwami-selector-face">
                            <span class="kwami-selector-value" data-placeholder="${d}">${c}</span>
                            <span class="kwami-selector-arrow">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <div class="kwami-selector-dropdown">
                            ${g}
                        </div>
                    </div>
                </div>
                ${i?`<span class="kwami-selector-label">${i}</span>`:""}
            </div>
        `}onHydrate(){if(!this.element||(this.selector=this.element.querySelector(".kwami-selector"),this.valueDisplay=this.element.querySelector(".kwami-selector-value"),this.dropdown=this.element.querySelector(".kwami-selector-dropdown"),!this.selector||!this.valueDisplay||!this.dropdown))return;const t=this.element.querySelectorAll(".kwami-selector-option");this.addListener(this.selector,"click",i=>{i.target.closest(".kwami-selector-option")||this.toggleDropdown()}),t.forEach(i=>{this.addListener(i,"click",()=>{this.selectOption(i)}),this.addListener(i,"keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),this.selectOption(i))})}),this.addListener(this.selector,"keydown",i=>{var a,r,o;switch(i.key){case"Enter":case" ":this.isOpen||(i.preventDefault(),this.toggleDropdown(!0));break;case"Escape":this.toggleDropdown(!1),(a=this.selector)==null||a.focus();break;case"ArrowDown":if(i.preventDefault(),!this.isOpen)this.toggleDropdown(!0);else{const c=(r=this.dropdown)==null?void 0:r.querySelector(".kwami-selector-option:focus"),d=c==null?void 0:c.nextElementSibling;d==null||d.focus()}break;case"ArrowUp":if(i.preventDefault(),this.isOpen){const c=(o=this.dropdown)==null?void 0:o.querySelector(".kwami-selector-option:focus"),d=c==null?void 0:c.previousElementSibling;d==null||d.focus()}break}});const e=i=>{var s;!((s=this.element)!=null&&s.contains(i.target))&&this.isOpen&&this.toggleDropdown(!1)};document.addEventListener("click",e),this.addListener(this.selector,"focusout",i=>{var s;(s=this.selector)!=null&&s.contains(i.relatedTarget)||this.toggleDropdown(!1)})}toggleDropdown(t){var e,i,s,a,r,o;if(this.isOpen=t!==void 0?t:!this.isOpen,(e=this.selector)==null||e.setAttribute("aria-expanded",this.isOpen.toString()),this.isOpen){(i=this.selector)==null||i.classList.add("open");const c=(s=this.dropdown)==null?void 0:s.querySelector(".kwami-selector-option.selected"),d=(a=this.dropdown)==null?void 0:a.querySelector(".kwami-selector-option");(r=c||d)==null||r.focus()}else(o=this.selector)==null||o.classList.remove("open")}selectOption(t){var a,r,o,c;const e=t.getAttribute("data-value")||"",i=((a=t.textContent)==null?void 0:a.trim())||"",s=(r=this.element)==null?void 0:r.querySelectorAll(".kwami-selector-option");s==null||s.forEach(d=>d.classList.remove("selected")),t.classList.add("selected"),this.selectedValue=e,this.valueDisplay&&(this.valueDisplay.textContent=i,this.valueDisplay.setAttribute("data-placeholder","false")),this.toggleDropdown(!1),(o=this.selector)==null||o.focus(),(c=this.element)==null||c.dispatchEvent(new CustomEvent("selectorchange",{detail:{value:e,label:i},bubbles:!0})),this.props.onChange&&this.props.onChange(e,i)}getValue(){return this.selectedValue}setValue(t){var i;const e=(i=this.element)==null?void 0:i.querySelector(`.kwami-selector-option[data-value="${t}"]`);e&&this.selectOption(e)}open(){this.toggleDropdown(!0)}close(){this.toggleDropdown(!1)}}const W=[{value:"a",label:"Option A",checked:!0},{value:"b",label:"Option B",checked:!1},{value:"c",label:"Option C",checked:!1}];class pt extends p{constructor(t={}){super(t);l(this,"selectedValues");const e=t.options||W;this.selectedValues=new Set(e.filter(i=>i.checked).map(i=>i.value))}render(){const{options:t=W,className:e="",disabled:i=!1}=this.props,s=i?"kwami-checkbox-group-disabled":"",a=t.map(r=>`
            <label class="kwami-checkbox">
                <input type="checkbox" value="${r.value}" ${r.checked?"checked":""} ${i?"disabled":""} />
                <span class="kwami-checkbox-box">
                    <iconify-icon icon="solar:check-read-linear" width="14" height="14"></iconify-icon>
                </span>
                <span class="kwami-checkbox-label">${r.label}</span>
            </label>
        `).join("");return`
            <div class="kwami-checkbox-group ${e} ${s}" data-kwami-id="${this.id}">
                ${a}
            </div>
        `}onHydrate(){if(!this.element)return;this.element.querySelectorAll(".kwami-checkbox input").forEach(e=>{this.addListener(e,"change",i=>{var r;const s=i.target,a=s.value;s.checked?this.selectedValues.add(a):this.selectedValues.delete(a),(r=this.element)==null||r.dispatchEvent(new CustomEvent("checkboxchange",{detail:{values:this.getValues(),changed:a,checked:s.checked},bubbles:!0})),this.props.onChange&&this.props.onChange(this.getValues())})})}getValues(){return Array.from(this.selectedValues)}isChecked(t){return this.selectedValues.has(t)}setChecked(t,e){var s;const i=(s=this.element)==null?void 0:s.querySelector(`input[value="${t}"]`);i&&(i.checked=e,e?this.selectedValues.add(t):this.selectedValues.delete(t))}selectAll(){var e;const t=(e=this.element)==null?void 0:e.querySelectorAll(".kwami-checkbox input");t==null||t.forEach(i=>{i.checked=!0,this.selectedValues.add(i.value)})}deselectAll(){var e;const t=(e=this.element)==null?void 0:e.querySelectorAll(".kwami-checkbox input");t==null||t.forEach(i=>{i.checked=!1}),this.selectedValues.clear()}}const G=[{value:"a",label:"Choice A"},{value:"b",label:"Choice B"},{value:"c",label:"Choice C"}];class gt extends p{constructor(t={}){var e,i;super(t);l(this,"selectedValue");l(this,"groupName");this.selectedValue=t.value||((i=(e=t.options)==null?void 0:e[0])==null?void 0:i.value)||G[0].value,this.groupName=t.name||`radio-${this.id}`}render(){const{options:t=G,className:e="",disabled:i=!1}=this.props,s=i?"kwami-radio-group-disabled":"",a=t.map((r,o)=>{const c=r.value===this.selectedValue||o===0&&!this.selectedValue;return`
                <label class="kwami-radio">
                    <input type="radio" name="${this.groupName}" value="${r.value}" ${c?"checked":""} ${i?"disabled":""} />
                    <span class="kwami-radio-circle">
                        <span class="kwami-radio-dot"></span>
                    </span>
                    <span class="kwami-radio-label">${r.label}</span>
                </label>
            `}).join("");return`
            <div class="kwami-radio-group ${e} ${s}" data-kwami-id="${this.id}" role="radiogroup">
                ${a}
            </div>
        `}onHydrate(){if(!this.element)return;this.element.querySelectorAll(".kwami-radio input").forEach(e=>{this.addListener(e,"change",i=>{var a;const s=i.target;this.selectedValue=s.value,(a=this.element)==null||a.dispatchEvent(new CustomEvent("radiochange",{detail:{value:this.selectedValue},bubbles:!0})),this.props.onChange&&this.props.onChange(this.selectedValue)})})}getValue(){return this.selectedValue}setValue(t){var i;const e=(i=this.element)==null?void 0:i.querySelector(`input[value="${t}"]`);e&&(e.checked=!0,this.selectedValue=t)}}class mt extends p{constructor(t={}){super(t);l(this,"currentMonth");l(this,"selectedDate",null);l(this,"isOpen",!1);l(this,"trigger",null);l(this,"popup",null);l(this,"monthLabel",null);l(this,"daysGrid",null);l(this,"prevBtn",null);l(this,"nextBtn",null);l(this,"valueDisplay",null);const{defaultDate:e}=t;e?(this.selectedDate=new Date(e),this.currentMonth=new Date(e.getFullYear(),e.getMonth(),1)):(this.currentMonth=new Date,this.currentMonth.setDate(1))}render(){const{label:t,placeholder:e="Select date",popupDirection:i="up"}=this.props,s=i==="down"?"kwami-datepicker-popup-down":"",a=this.selectedDate?this.formatDate(this.selectedDate):e;return`
            <div class="kwami-datepicker-container" data-kwami-id="${this.id}">
                ${t?`<span class="kwami-datepicker-label">${t}</span>`:""}
                <div class="kwami-datepicker">
                    <button class="kwami-datepicker-trigger" aria-label="Pick a date" title="Pick a date">
                        <span class="kwami-datepicker-value">${a}</span>
                        <iconify-icon icon="solar:calendar-linear" width="16" height="16"></iconify-icon>
                    </button>
                    <div class="kwami-datepicker-popup ${s}">
                        <div class="kwami-datepicker-header">
                            <button class="kwami-datepicker-nav kwami-datepicker-prev" aria-label="Previous month">
                                <iconify-icon icon="solar:alt-arrow-left-linear" width="18" height="18"></iconify-icon>
                            </button>
                            <span class="kwami-datepicker-month-label"></span>
                            <button class="kwami-datepicker-nav kwami-datepicker-next" aria-label="Next month">
                                <iconify-icon icon="solar:alt-arrow-right-linear" width="18" height="18"></iconify-icon>
                            </button>
                        </div>
                        <div class="kwami-datepicker-weekdays">
                            ${this.renderWeekdays()}
                        </div>
                        <div class="kwami-datepicker-days"></div>
                    </div>
                </div>
            </div>
        `}formatDate(t){const{locale:e="en-US"}=this.props;return t.toLocaleDateString(e,{day:"numeric",month:"short",year:"numeric"})}renderWeekdays(){const{firstDayOfWeek:t=0,locale:e="en-US"}=this.props,i=[],s=new Date(2024,0,7);for(let a=0;a<7;a++){const r=(t+a)%7,o=new Date(s);o.setDate(o.getDate()+r),i.push(o.toLocaleDateString(e,{weekday:"short"}).slice(0,2))}return i.map(a=>`<span class="kwami-datepicker-weekday">${a}</span>`).join("")}onHydrate(){this.element&&(this.trigger=this.element.querySelector(".kwami-datepicker-trigger"),this.popup=this.element.querySelector(".kwami-datepicker-popup"),this.monthLabel=this.element.querySelector(".kwami-datepicker-month-label"),this.daysGrid=this.element.querySelector(".kwami-datepicker-days"),this.prevBtn=this.element.querySelector(".kwami-datepicker-prev"),this.nextBtn=this.element.querySelector(".kwami-datepicker-next"),this.valueDisplay=this.element.querySelector(".kwami-datepicker-value"),!(!this.trigger||!this.popup||!this.monthLabel||!this.daysGrid||!this.prevBtn||!this.nextBtn||!this.valueDisplay)&&(this.setupEventListeners(),this.renderMonth()))}setupEventListeners(){if(!this.trigger||!this.prevBtn||!this.nextBtn||!this.daysGrid||!this.popup)return;this.addListener(this.trigger,"click",i=>{i.stopPropagation(),this.togglePopup()}),this.addListener(this.prevBtn,"click",i=>{i.stopPropagation(),this.navigateMonth(-1)}),this.addListener(this.nextBtn,"click",i=>{i.stopPropagation(),this.navigateMonth(1)}),this.addListener(this.daysGrid,"click",i=>{i.stopPropagation();const a=i.target.closest(".kwami-datepicker-day:not(.disabled):not(.outside)");if(a){const r=parseInt(a.dataset.day||"0");r>0&&this.selectDate(r)}});const t=i=>{var s;this.isOpen&&!((s=this.element)!=null&&s.contains(i.target))&&this.closePopup()};document.addEventListener("click",t);const e=i=>{i.key==="Escape"&&this.isOpen&&this.closePopup()};document.addEventListener("keydown",e)}togglePopup(){var t,e,i;this.isOpen=!this.isOpen,(t=this.popup)==null||t.classList.toggle("active",this.isOpen),(i=(e=this.element)==null?void 0:e.querySelector(".kwami-datepicker"))==null||i.classList.toggle("active",this.isOpen)}closePopup(){var t,e,i;this.isOpen=!1,(t=this.popup)==null||t.classList.remove("active"),(i=(e=this.element)==null?void 0:e.querySelector(".kwami-datepicker"))==null||i.classList.remove("active")}navigateMonth(t){this.currentMonth.setMonth(this.currentMonth.getMonth()+t),this.renderMonth()}renderMonth(){if(!this.monthLabel||!this.daysGrid)return;const{locale:t="en-US"}=this.props;this.monthLabel.textContent=this.currentMonth.toLocaleDateString(t,{month:"long",year:"numeric"});const e=this.generateDays();this.daysGrid.innerHTML=e}generateDays(){const{firstDayOfWeek:t=0,minDate:e,maxDate:i}=this.props,s=this.currentMonth.getFullYear(),a=this.currentMonth.getMonth(),r=new Date(s,a,1),c=new Date(s,a+1,0).getDate();let d=r.getDay()-t;d<0&&(d+=7);const g=new Date(s,a,0).getDate(),m=[],y=new Date;y.setHours(0,0,0,0);for(let f=d-1;f>=0;f--){const w=g-f;m.push(`<button class="kwami-datepicker-day outside" disabled>${w}</button>`)}for(let f=1;f<=c;f++){const w=new Date(s,a,f),$=["kwami-datepicker-day"];let M=!1;w.getTime()===y.getTime()&&$.push("today"),this.selectedDate&&w.getFullYear()===this.selectedDate.getFullYear()&&w.getMonth()===this.selectedDate.getMonth()&&w.getDate()===this.selectedDate.getDate()&&$.push("selected"),e&&w<e&&($.push("disabled"),M=!0),i&&w>i&&($.push("disabled"),M=!0),m.push(`<button class="${$.join(" ")}" data-day="${f}"${M?" disabled":""}>${f}</button>`)}const qt=Math.ceil((d+c)/7)*7-(d+c);for(let f=1;f<=qt;f++)m.push(`<button class="kwami-datepicker-day outside" disabled>${f}</button>`);return m.join("")}selectDate(t){var s;const e=this.currentMonth.getFullYear(),i=this.currentMonth.getMonth();this.selectedDate=new Date(e,i,t),this.renderMonth(),this.valueDisplay&&(this.valueDisplay.textContent=this.formatDate(this.selectedDate)),this.closePopup(),(s=this.element)==null||s.dispatchEvent(new CustomEvent("datechange",{detail:{date:new Date(this.selectedDate)},bubbles:!0})),this.props.onChange&&this.props.onChange(new Date(this.selectedDate))}getDate(){return this.selectedDate?new Date(this.selectedDate):null}setDate(t){this.selectedDate=new Date(t),this.currentMonth=new Date(t.getFullYear(),t.getMonth(),1),this.renderMonth(),this.valueDisplay&&(this.valueDisplay.textContent=this.formatDate(this.selectedDate))}clear(){this.selectedDate=null,this.renderMonth(),this.valueDisplay&&(this.valueDisplay.textContent=this.props.placeholder||"Select date")}goToMonth(t,e){this.currentMonth=new Date(t,e,1),this.renderMonth()}}class ft extends p{constructor(t={}){super(t);l(this,"currentValue");l(this,"valueDisplay",null);l(this,"minusBtn",null);l(this,"plusBtn",null);this.currentValue=t.value??0}render(){const{value:t=0,min:e=-10,max:i=10,step:s=1,label:a}=this.props;return`
            <div class="kwami-stepper-container" data-kwami-id="${this.id}">
                ${a?`<span class="kwami-stepper-label">${a}</span>`:""}
                <div class="kwami-stepper" data-value="${t}" data-min="${e}" data-max="${i}" data-step="${s}">
                    <button class="kwami-stepper-btn kwami-stepper-minus" aria-label="Decrease">
                        <iconify-icon icon="solar:minus-circle-linear" width="20" height="20"></iconify-icon>
                    </button>
                    <div class="kwami-stepper-value">${t}</div>
                    <button class="kwami-stepper-btn kwami-stepper-plus" aria-label="Increase">
                        <iconify-icon icon="solar:add-circle-linear" width="20" height="20"></iconify-icon>
                    </button>
                </div>
            </div>
        `}onHydrate(){this.element&&(this.minusBtn=this.element.querySelector(".kwami-stepper-minus"),this.plusBtn=this.element.querySelector(".kwami-stepper-plus"),this.valueDisplay=this.element.querySelector(".kwami-stepper-value"),!(!this.minusBtn||!this.plusBtn||!this.valueDisplay)&&(this.addListener(this.minusBtn,"click",()=>this.decrement()),this.addListener(this.plusBtn,"click",()=>this.increment()),this.updateButtonStates()))}updateButtonStates(){var i,s;const{min:t=-10,max:e=10}=this.props;(i=this.minusBtn)==null||i.classList.toggle("disabled",this.currentValue<=t),(s=this.plusBtn)==null||s.classList.toggle("disabled",this.currentValue>=e)}updateValue(t){var s;const{min:e=-10,max:i=10}=this.props;this.currentValue=Math.max(e,Math.min(i,t)),this.valueDisplay&&(this.valueDisplay.textContent=String(this.currentValue)),this.updateButtonStates(),(s=this.element)==null||s.dispatchEvent(new CustomEvent("stepperchange",{detail:{value:this.currentValue},bubbles:!0})),this.props.onChange&&this.props.onChange(this.currentValue)}increment(){var i;const{step:t=1,max:e=10}=this.props;this.currentValue>=e||(this.updateValue(this.currentValue+t),(i=this.valueDisplay)==null||i.classList.add("bump-up"),setTimeout(()=>{var s;return(s=this.valueDisplay)==null?void 0:s.classList.remove("bump-up")},150))}decrement(){var i;const{step:t=1,min:e=-10}=this.props;this.currentValue<=e||(this.updateValue(this.currentValue-t),(i=this.valueDisplay)==null||i.classList.add("bump-down"),setTimeout(()=>{var s;return(s=this.valueDisplay)==null?void 0:s.classList.remove("bump-down")},150))}getValue(){return this.currentValue}setValue(t){this.updateValue(t)}}class kt extends p{constructor(t={}){super(t);l(this,"currentValue");l(this,"isDragging",!1);l(this,"track",null);l(this,"knob",null);l(this,"fill",null);this.currentValue=t.value??75}render(){const{value:t=75,min:e=0,max:i=100,label:s}=this.props;return`
            <div class="kwami-fader-container" data-kwami-id="${this.id}">
                ${s?`<span class="kwami-fader-label">${s}</span>`:""}
                <div class="kwami-fader" data-value="${t}" data-min="${e}" data-max="${i}">
                    <div class="kwami-fader-track">
                        <div class="kwami-fader-groove"></div>
                        <div class="kwami-fader-fill"></div>
                        <div class="kwami-fader-knob">
                            <div class="kwami-fader-knob-grip"></div>
                            <div class="kwami-fader-knob-grip"></div>
                            <div class="kwami-fader-knob-grip"></div>
                        </div>
                    </div>
                    <div class="kwami-fader-ticks">
                        <span></span><span></span><span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        `}onHydrate(){this.element&&(this.track=this.element.querySelector(".kwami-fader-track"),this.knob=this.element.querySelector(".kwami-fader-knob"),this.fill=this.element.querySelector(".kwami-fader-fill"),!(!this.track||!this.knob||!this.fill)&&(this.setupEventListeners(),this.updatePosition(this.currentValue)))}setupEventListeners(){if(!this.knob||!this.track)return;this.addListener(this.knob,"mousedown",a=>{var r;a.preventDefault(),this.isDragging=!0,(r=this.knob)==null||r.classList.add("dragging")});const t=a=>{this.isDragging&&this.handleMove(a.clientY)};document.addEventListener("mousemove",t);const e=()=>{var a;this.isDragging=!1,(a=this.knob)==null||a.classList.remove("dragging")};document.addEventListener("mouseup",e),this.addListener(this.knob,"touchstart",a=>{var r;a.preventDefault(),this.isDragging=!0,(r=this.knob)==null||r.classList.add("dragging")});const i=a=>{this.isDragging&&this.handleMove(a.touches[0].clientY)};document.addEventListener("touchmove",i);const s=()=>{var a;this.isDragging=!1,(a=this.knob)==null||a.classList.remove("dragging")};document.addEventListener("touchend",s),this.addListener(this.track,"click",a=>{var r;a.target===this.knob||(r=this.knob)!=null&&r.contains(a.target)||this.handleMove(a.clientY)})}handleMove(t){if(!this.track)return;const{min:e=0,max:i=100}=this.props,s=this.track.getBoundingClientRect(),a=s.height-40,r=s.bottom-20-t,o=Math.max(0,Math.min(100,r/a*100)),c=e+o/100*(i-e);this.updatePosition(c)}updatePosition(t){var a;const{min:e=0,max:i=100}=this.props;this.currentValue=Math.max(e,Math.min(i,t));const s=(this.currentValue-e)/(i-e)*100;this.knob&&(this.knob.style.bottom=`calc(${s}% - 20px)`),this.fill&&(this.fill.style.height=`${s}%`),(a=this.element)==null||a.dispatchEvent(new CustomEvent("faderchange",{detail:{value:Math.round(this.currentValue)},bubbles:!0})),this.props.onChange&&this.props.onChange(Math.round(this.currentValue))}getValue(){return Math.round(this.currentValue)}setValue(t){this.updatePosition(t)}}class wt extends p{constructor(t={}){super(t);l(this,"currentValue");l(this,"isDragging",!1);l(this,"startY",0);l(this,"startValue",0);l(this,"knobEl",null);l(this,"track",null);l(this,"ledsContainer",null);this.currentValue=t.value??50}render(){const{label:t="VOLUME"}=this.props,e=Array.from({length:11},(i,s)=>`<div class="kwami-knob-led" data-led-index="${s}"></div>`).join("");return`
            <div class="kwami-knob-container" data-kwami-id="${this.id}">
                <div class="kwami-knob-outer">
                    <div class="kwami-knob-bezel" aria-hidden="true"></div>
                    <div class="kwami-knob-track-ring" aria-hidden="true"></div>
                    <div class="kwami-knob-leds" aria-hidden="true">
                        ${e}
                    </div>
                    <div class="kwami-knob" data-value="${this.currentValue}">
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
                <span class="kwami-knob-label">${t}</span>
            </div>
        `}onHydrate(){this.element&&(this.knobEl=this.element.querySelector(".kwami-knob"),this.track=this.element.querySelector(".kwami-knob-track"),this.ledsContainer=this.element.querySelector(".kwami-knob-leds"),this.knobEl&&(this.setupEventListeners(),this.updateKnob(this.currentValue)))}setupEventListeners(){if(!this.knobEl)return;this.addListener(this.knobEl,"mousedown",s=>{this.handleStart(s.clientY),s.preventDefault()});const t=s=>{this.handleMove(s.clientY)};document.addEventListener("mousemove",t);const e=()=>{this.handleEnd()};document.addEventListener("mouseup",e),this.addListener(this.knobEl,"touchstart",s=>{const a=s.touches[0];a&&(this.handleStart(a.clientY),s.preventDefault())});const i=s=>{const a=s.touches[0];a&&this.handleMove(a.clientY)};document.addEventListener("touchmove",i),document.addEventListener("touchend",()=>this.handleEnd()),this.addListener(this.knobEl,"wheel",s=>{s.preventDefault();const a=s.deltaY>0?-2:2;this.updateKnob(this.currentValue+a)})}handleStart(t){var e;this.isDragging=!0,this.startY=t,this.startValue=this.currentValue,(e=this.knobEl)==null||e.classList.add("grabbing")}handleMove(t){if(!this.isDragging)return;const e=this.startY-t,s=this.startValue+e*.5;this.updateKnob(s)}handleEnd(){var t;this.isDragging=!1,(t=this.knobEl)==null||t.classList.remove("grabbing")}updateLeds(t){if(!this.ledsContainer)return;const e=this.ledsContainer.querySelectorAll(".kwami-knob-led"),i=Math.round(t/100*11);e.forEach((s,a)=>{a<i?s.classList.add("active"):s.classList.remove("active")})}updateKnob(t){var i,s;this.currentValue=Math.max(0,Math.min(100,t));const e=this.currentValue/100*270-135;this.track&&(this.track.style.transform=`rotate(${e}deg)`),(i=this.knobEl)==null||i.setAttribute("data-value",this.currentValue.toString()),this.updateLeds(this.currentValue),(s=this.element)==null||s.dispatchEvent(new CustomEvent("knobchange",{detail:{value:Math.round(this.currentValue)},bubbles:!0})),this.props.onChange&&this.props.onChange(Math.round(this.currentValue))}getValue(){return Math.round(this.currentValue)}setValue(t){this.updateKnob(t)}}const vt=[{id:"tab1",label:"Tab 1",content:"Content 1"},{id:"tab2",label:"Tab 2",content:"Content 2"},{id:"tab3",label:"Tab 3",content:"Content 3"}];class bt extends p{constructor(t={}){var e;super(t);l(this,"tabs");l(this,"activeTabId");l(this,"indicator",null);l(this,"tabButtons",null);l(this,"panels",null);this.tabs=t.tabs||vt,this.activeTabId=t.activeTab||((e=this.tabs[0])==null?void 0:e.id)||""}render(){const{className:t=""}=this.props,e=this.tabs.map(s=>`
            <button 
                class="kwami-tab${s.id===this.activeTabId?" active":""}" 
                role="tab" 
                data-tab="${s.id}" 
                aria-selected="${s.id===this.activeTabId}"
            >${s.label}</button>
        `).join(""),i=this.tabs.map(s=>`
            <div 
                class="kwami-tab-panel${s.id===this.activeTabId?" active":""}" 
                data-panel="${s.id}" 
                role="tabpanel"
            >
                <span>${s.content}</span>
            </div>
        `).join("");return`
            <div class="kwami-tabs ${t}" data-kwami-id="${this.id}">
                <div class="kwami-tabs-list" role="tablist">
                    ${e}
                    <div class="kwami-tabs-indicator"></div>
                </div>
                <div class="kwami-tabs-content">
                    ${i}
                </div>
            </div>
        `}onHydrate(){this.element&&(this.indicator=this.element.querySelector(".kwami-tabs-indicator"),this.tabButtons=this.element.querySelectorAll(".kwami-tab"),this.panels=this.element.querySelectorAll(".kwami-tab-panel"),!(!this.indicator||!this.tabButtons||!this.panels)&&(this.tabButtons.forEach(t=>{this.addListener(t,"click",()=>{const e=t.getAttribute("data-tab");e&&this.activateTab(e)})}),requestAnimationFrame(()=>this.updateIndicator()),this.addListener(window,"resize",()=>{this.updateIndicator()})))}updateIndicator(){if(!this.indicator||!this.element)return;const t=this.element.querySelector(".kwami-tab.active");if(!t)return;const e=this.element.querySelector(".kwami-tabs-list");if(!e)return;const i=e.getBoundingClientRect(),s=t.getBoundingClientRect();this.indicator.style.width=`${s.width}px`,this.indicator.style.left=`${s.left-i.left}px`}activateTab(t){var e;!this.tabButtons||!this.panels||(this.activeTabId=t,this.tabButtons.forEach(i=>{const s=i.getAttribute("data-tab")===t;i.classList.toggle("active",s),i.setAttribute("aria-selected",String(s))}),this.panels.forEach(i=>{const s=i.getAttribute("data-panel")===t;i.classList.toggle("active",s)}),this.updateIndicator(),(e=this.element)==null||e.dispatchEvent(new CustomEvent("tabchange",{detail:{tabId:t},bubbles:!0})),this.props.onChange&&this.props.onChange(t))}setActiveTab(t){this.tabs.some(e=>e.id===t)&&this.activateTab(t)}getActiveTab(){return this.activeTabId}}const yt=[{id:"section1",title:"Section 1",content:"Content for section 1",expanded:!0},{id:"section2",title:"Section 2",content:"Content for section 2"}];class Ct extends p{constructor(t={}){super(t);l(this,"items");l(this,"allowMultiple");this.items=t.items||yt,this.allowMultiple=t.allowMultiple??!0}render(){const{className:t=""}=this.props,e=this.items.map(i=>`
            <div class="kwami-accordion-item${i.expanded?" expanded":""}" data-item="${i.id}">
                <button class="kwami-accordion-header">
                    <span>${i.title}</span>
                    <iconify-icon icon="solar:alt-arrow-down-linear" width="16" height="16"></iconify-icon>
                </button>
                <div class="kwami-accordion-content">
                    <div class="kwami-accordion-body">
                        ${i.content}
                    </div>
                </div>
            </div>
        `).join("");return`
            <div class="kwami-accordion ${t}" data-kwami-id="${this.id}">
                ${e}
            </div>
        `}onHydrate(){if(!this.element)return;const t=this.element.querySelectorAll(".kwami-accordion-item");t.forEach(e=>{const i=e.querySelector(".kwami-accordion-header"),s=e.querySelector(".kwami-accordion-content"),a=e.querySelector(".kwami-accordion-body");!i||!s||!a||(e.classList.contains("expanded")&&(s.style.maxHeight=`${a.offsetHeight}px`),this.addListener(i,"click",()=>{var c;const r=e.classList.contains("expanded"),o=e.getAttribute("data-item")||"";r?(s.style.maxHeight="0",e.classList.remove("expanded")):(this.allowMultiple||t.forEach(d=>{if(d!==e&&d.classList.contains("expanded")){const g=d.querySelector(".kwami-accordion-content");g&&(g.style.maxHeight="0",d.classList.remove("expanded"))}}),s.style.maxHeight=`${a.offsetHeight}px`,e.classList.add("expanded")),(c=this.element)==null||c.dispatchEvent(new CustomEvent("accordionchange",{detail:{itemId:o,expanded:!r},bubbles:!0})),this.props.onChange&&this.props.onChange(o,!r)}))})}expand(t){if(!this.element)return;const e=this.element.querySelector(`[data-item="${t}"]`);if(e&&!e.classList.contains("expanded")){const i=e.querySelector(".kwami-accordion-header");i==null||i.click()}}collapse(t){if(!this.element)return;const e=this.element.querySelector(`[data-item="${t}"]`);if(e&&e.classList.contains("expanded")){const i=e.querySelector(".kwami-accordion-header");i==null||i.click()}}isExpanded(t){if(!this.element)return!1;const e=this.element.querySelector(`[data-item="${t}"]`);return(e==null?void 0:e.classList.contains("expanded"))??!1}}class $t extends p{constructor(t={}){super(t);l(this,"isOpen",!1);l(this,"trigger",null);l(this,"popover",null);l(this,"documentClickHandler",null)}render(){const{className:t="",triggerText:e="INFO",title:i="Popover Title",content:s="This is a neumorphic popover panel with hardware-inspired styling."}=this.props;return`
            <div class="kwami-popover-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-popover-trigger-bezel">
                    <button class="kwami-popover-trigger">
                        <span class="kwami-popover-trigger-face">
                            <span class="kwami-popover-trigger-highlight"></span>
                            <span class="kwami-popover-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
                <div class="kwami-popover hidden">
                    <div class="kwami-popover-content">
                        <h4>${i}</h4>
                        <p>${s}</p>
                    </div>
                    <div class="kwami-popover-arrow"></div>
                </div>
            </div>
        `}onHydrate(){this.element&&(this.trigger=this.element.querySelector(".kwami-popover-trigger"),this.popover=this.element.querySelector(".kwami-popover"),!(!this.trigger||!this.popover)&&(this.addListener(this.trigger,"click",t=>{t.stopPropagation(),this.toggle()}),this.documentClickHandler=t=>{var e;(e=this.element)!=null&&e.contains(t.target)||this.close()},document.addEventListener("click",this.documentClickHandler)))}toggle(){this.isOpen?this.close():this.open()}open(){var t;!this.trigger||!this.popover||this.isOpen||(this.isOpen=!0,this.popover.classList.remove("hidden"),this.trigger.classList.add("active"),(t=this.element)==null||t.dispatchEvent(new CustomEvent("popoverchange",{detail:{isOpen:!0},bubbles:!0})),this.props.onChange&&this.props.onChange(!0))}close(){var t;!this.trigger||!this.popover||!this.isOpen||(this.isOpen=!1,this.popover.classList.add("hidden"),this.trigger.classList.remove("active"),(t=this.element)==null||t.dispatchEvent(new CustomEvent("popoverchange",{detail:{isOpen:!1},bubbles:!0})),this.props.onChange&&this.props.onChange(!1))}getIsOpen(){return this.isOpen}destroy(){this.documentClickHandler&&document.removeEventListener("click",this.documentClickHandler),super.destroy()}}class xt extends p{constructor(t={}){super(t);l(this,"isVisible",!1);l(this,"trigger",null);l(this,"tooltip",null)}render(){const{className:t="",triggerText:e="HOVER",text:i="Helpful tooltip info!"}=this.props;return`
            <div class="kwami-tooltip-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-tooltip-trigger-bezel">
                    <button class="kwami-tooltip-trigger">
                        <span class="kwami-tooltip-trigger-face">
                            <span class="kwami-tooltip-trigger-highlight"></span>
                            <span class="kwami-tooltip-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
                <div class="kwami-tooltip hidden">
                    <span class="kwami-tooltip-text">${i}</span>
                    <div class="kwami-tooltip-arrow"></div>
                </div>
            </div>
        `}onHydrate(){this.element&&(this.trigger=this.element.querySelector(".kwami-tooltip-trigger"),this.tooltip=this.element.querySelector(".kwami-tooltip"),!(!this.trigger||!this.tooltip)&&(this.addListener(this.trigger,"mouseenter",()=>{this.show()}),this.addListener(this.trigger,"mouseleave",()=>{this.hide()}),this.addListener(this.trigger,"focus",()=>{this.show()}),this.addListener(this.trigger,"blur",()=>{this.hide()})))}show(){var t;!this.tooltip||this.isVisible||(this.isVisible=!0,this.tooltip.classList.remove("hidden"),(t=this.element)==null||t.dispatchEvent(new CustomEvent("tooltipchange",{detail:{isVisible:!0},bubbles:!0})),this.props.onChange&&this.props.onChange(!0))}hide(){var t;!this.tooltip||!this.isVisible||(this.isVisible=!1,this.tooltip.classList.add("hidden"),(t=this.element)==null||t.dispatchEvent(new CustomEvent("tooltipchange",{detail:{isVisible:!1},bubbles:!0})),this.props.onChange&&this.props.onChange(!1))}getIsVisible(){return this.isVisible}}class St extends p{constructor(t={}){super(t);l(this,"isOpen",!1);l(this,"trigger",null);l(this,"overlay",null);l(this,"closeBtn",null);l(this,"escHandler",null)}getOverlayHTML(){const{title:t="Modal Title",content:e="This is a neumorphic modal dialog with smooth animations and hardware-inspired styling.",showCloseButton:i=!0}=this.props;return`
            <div class="kwami-modal-overlay hidden" data-modal-id="${this.id}">
                <div class="kwami-modal">
                    <div class="kwami-modal-header">
                        <h3 class="kwami-modal-title">${t}</h3>
                        ${i?`
                            <button class="kwami-modal-close" aria-label="Close modal">
                                <iconify-icon icon="solar:close-circle-linear" width="24" height="24"></iconify-icon>
                            </button>
                        `:""}
                    </div>
                    <div class="kwami-modal-content">
                        <p>${e}</p>
                    </div>
                    <div class="kwami-modal-footer">
                        <button class="kwami-modal-btn kwami-modal-btn-secondary">Cancel</button>
                        <button class="kwami-modal-btn kwami-modal-btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        `}render(){const{className:t="",triggerText:e="OPEN"}=this.props;return`
            <div class="kwami-modal-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-modal-trigger-bezel">
                    <button class="kwami-modal-trigger">
                        <span class="kwami-modal-trigger-face">
                            <span class="kwami-modal-trigger-highlight"></span>
                            <span class="kwami-modal-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
            </div>
        `}onHydrate(){if(!this.element||(this.trigger=this.element.querySelector(".kwami-modal-trigger"),!this.trigger))return;const t=document.createElement("div");t.innerHTML=this.getOverlayHTML(),this.overlay=t.firstElementChild,document.body.appendChild(this.overlay),this.closeBtn=this.overlay.querySelector(".kwami-modal-close"),this.addListener(this.trigger,"click",s=>{s.stopPropagation(),this.open()}),this.closeBtn&&this.addListener(this.closeBtn,"click",()=>{this.close()}),this.addListener(this.overlay,"click",s=>{s.target===this.overlay&&this.close()});const e=this.overlay.querySelector(".kwami-modal-btn-secondary");e&&this.addListener(e,"click",()=>{this.close()});const i=this.overlay.querySelector(".kwami-modal-btn-primary");i&&this.addListener(i,"click",()=>{var s;(s=this.element)==null||s.dispatchEvent(new CustomEvent("modalconfirm",{bubbles:!0})),this.close()}),this.escHandler=s=>{s.key==="Escape"&&this.isOpen&&this.close()},document.addEventListener("keydown",this.escHandler)}open(){var t;!this.trigger||!this.overlay||this.isOpen||(this.isOpen=!0,this.overlay.classList.remove("hidden"),this.trigger.classList.add("active"),document.body.style.overflow="hidden",(t=this.element)==null||t.dispatchEvent(new CustomEvent("modalchange",{detail:{isOpen:!0},bubbles:!0})),this.props.onChange&&this.props.onChange(!0))}close(){var t;!this.trigger||!this.overlay||!this.isOpen||(this.isOpen=!1,this.overlay.classList.add("hidden"),this.trigger.classList.remove("active"),document.body.style.overflow="",(t=this.element)==null||t.dispatchEvent(new CustomEvent("modalchange",{detail:{isOpen:!1},bubbles:!0})),this.props.onChange&&this.props.onChange(!1))}getIsOpen(){return this.isOpen}destroy(){this.escHandler&&document.removeEventListener("keydown",this.escHandler),this.overlay&&this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay),document.body.style.overflow="",super.destroy()}}class Lt extends p{constructor(t={}){super(t);l(this,"isVisible",!1);l(this,"hideTimeout",null);l(this,"trigger",null);l(this,"toast",null);l(this,"closeBtn",null)}getIcon(t){return{info:"solar:info-circle-linear",success:"solar:check-circle-linear",warning:"solar:danger-triangle-linear",error:"solar:close-circle-linear"}[t]}getToastHTML(){const{message:t="This is a notification toast!",type:e="info",position:i="top-right"}=this.props;return`
            <div class="kwami-toast kwami-toast-${e} kwami-toast-${i} hidden" data-toast-id="${this.id}">
                <div class="kwami-toast-icon">
                    <iconify-icon icon="${this.getIcon(e)}" width="20" height="20"></iconify-icon>
                </div>
                <span class="kwami-toast-message">${t}</span>
                <button class="kwami-toast-close" aria-label="Close toast">
                    <iconify-icon icon="solar:close-square-linear" width="18" height="18"></iconify-icon>
                </button>
                <div class="kwami-toast-progress"></div>
            </div>
        `}render(){const{className:t="",triggerText:e="NOTIFY"}=this.props;return`
            <div class="kwami-toast-wrapper ${t}" data-kwami-id="${this.id}">
                <div class="kwami-toast-trigger-bezel">
                    <button class="kwami-toast-trigger">
                        <span class="kwami-toast-trigger-face">
                            <span class="kwami-toast-trigger-highlight"></span>
                            <span class="kwami-toast-trigger-text">${e}</span>
                        </span>
                    </button>
                </div>
            </div>
        `}onHydrate(){if(!this.element||(this.trigger=this.element.querySelector(".kwami-toast-trigger"),!this.trigger))return;const t=document.createElement("div");t.innerHTML=this.getToastHTML(),this.toast=t.firstElementChild,document.body.appendChild(this.toast),this.closeBtn=this.toast.querySelector(".kwami-toast-close"),this.addListener(this.trigger,"click",e=>{e.stopPropagation(),this.show()}),this.closeBtn&&this.addListener(this.closeBtn,"click",()=>{this.hide()})}show(){var i;if(!this.toast)return;this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null),this.isVisible=!0,this.toast.classList.remove("hidden","hiding"),this.toast.classList.add("showing");const t=this.props.duration??3e3,e=this.toast.querySelector(".kwami-toast-progress");e&&t>0&&(e.style.animation="none",e.offsetHeight,e.style.animation=`kwami-toast-progress ${t}ms linear forwards`),(i=this.element)==null||i.dispatchEvent(new CustomEvent("toastchange",{detail:{isVisible:!0},bubbles:!0})),this.props.onChange&&this.props.onChange(!0),t>0&&(this.hideTimeout=setTimeout(()=>{this.hide()},t))}hide(){var t;!this.toast||!this.isVisible||(this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null),this.isVisible=!1,this.toast.classList.remove("showing"),this.toast.classList.add("hiding"),setTimeout(()=>{var e,i;(e=this.toast)==null||e.classList.add("hidden"),(i=this.toast)==null||i.classList.remove("hiding")},300),(t=this.element)==null||t.dispatchEvent(new CustomEvent("toastchange",{detail:{isVisible:!1},bubbles:!0})),this.props.onChange&&this.props.onChange(!1))}getIsVisible(){return this.isVisible}setMessage(t){var i;const e=(i=this.toast)==null?void 0:i.querySelector(".kwami-toast-message");e&&(e.textContent=t)}setType(t){if(!this.toast)return;this.toast.classList.remove("kwami-toast-info","kwami-toast-success","kwami-toast-warning","kwami-toast-error"),this.toast.classList.add(`kwami-toast-${t}`);const e=this.toast.querySelector(".kwami-toast-icon iconify-icon");e&&e.setAttribute("icon",this.getIcon(t))}destroy(){this.hideTimeout&&clearTimeout(this.hideTimeout),this.toast&&this.toast.parentNode&&this.toast.parentNode.removeChild(this.toast),super.destroy()}}class Et extends p{constructor(n={}){super(n)}render(){const{className:n="",content:t="This is a depth note with an inset neumorphic style.",icon:e,padding:i="md"}=this.props,s=e?`<iconify-icon class="kwami-depth-icon" icon="${e}" width="18" height="18"></iconify-icon>`:"";return`
            <div class="kwami-depth kwami-depth-${i} ${n}" data-kwami-id="${this.id}">
                ${s}
                <div class="kwami-depth-content">${t}</div>
            </div>
        `}onHydrate(){}setContent(n){var e;const t=(e=this.element)==null?void 0:e.querySelector(".kwami-depth-content");t&&(t.innerHTML=n)}setIcon(n){if(!this.element)return;const t=this.element.querySelector(".kwami-depth-icon");if(n)if(t)t.setAttribute("icon",n);else{const e=document.createElement("iconify-icon");e.className="kwami-depth-icon",e.setAttribute("icon",n),e.setAttribute("width","18"),e.setAttribute("height","18"),this.element.insertBefore(e,this.element.firstChild)}else t&&t.remove()}}class Tt extends p{constructor(n={}){super(n)}render(){const{className:n="",content:t="This is a shallow note with a raised neumorphic style.",icon:e,padding:i="md"}=this.props,s=e?`<iconify-icon class="kwami-shallow-icon" icon="${e}" width="18" height="18"></iconify-icon>`:"";return`
            <div class="kwami-shallow kwami-shallow-${i} ${n}" data-kwami-id="${this.id}">
                ${s}
                <div class="kwami-shallow-content">${t}</div>
            </div>
        `}onHydrate(){}setContent(n){var e;const t=(e=this.element)==null?void 0:e.querySelector(".kwami-shallow-content");t&&(t.innerHTML=n)}setIcon(n){if(!this.element)return;const t=this.element.querySelector(".kwami-shallow-icon");if(n)if(t)t.setAttribute("icon",n);else{const e=document.createElement("iconify-icon");e.className="kwami-shallow-icon",e.setAttribute("icon",n),e.setAttribute("width","18"),e.setAttribute("height","18"),this.element.insertBefore(e,this.element.firstChild)}else t&&t.remove()}}const q={mode:"dark",colors:{light:{primary:"#ff9500",secondary:"#007aff",background:"#e0e5ec",shadow:"rgba(163, 177, 198, 0.6)",light:"rgba(255, 255, 255, 0.8)"},dark:{primary:"#ff9500",secondary:"#5856d6",background:"#1e1e1e",shadow:"rgba(0, 0, 0, 0.5)",light:"rgba(255, 255, 255, 0.03)"}}};class Dt extends p{constructor(t={}){super(t);l(this,"config");l(this,"toggle",null);l(this,"colorPickers",new Map);l(this,"systemThemeListener",null);this.config=this.loadConfig()}loadConfig(){const{config:t,storageKey:e="kwami-theme-control"}=this.props;if(e)try{const i=localStorage.getItem(e);if(i){const s=JSON.parse(i);if(s&&s.mode&&s.colors)return this.mergeConfig(s,t)}}catch{}return this.mergeConfig(q,t)}mergeConfig(t,e){var i,s;return e?{mode:e.mode??t.mode,colors:{light:{...t.colors.light,...(i=e.colors)==null?void 0:i.light},dark:{...t.colors.dark,...(s=e.colors)==null?void 0:s.dark}}}:{...t}}saveConfig(){const{storageKey:t="kwami-theme-control"}=this.props;if(t)try{localStorage.setItem(t,JSON.stringify(this.config))}catch{}}getEffectiveMode(){return this.config.mode==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.config.mode}getControls(){return this.props.controls||["mode","primary","secondary","background","shadow","light"]}render(){const{layout:t="horizontal",showLabels:e=!0}=this.props,i=this.getControls(),s=this.getEffectiveMode(),a=this.config.colors[s],r=this.config.mode==="light"?0:this.config.mode==="dark"?1:2;this.toggle=new Y({states:[{icon:"solar:sun-bold",label:"Light"},{icon:"solar:moon-bold",label:"Dark"},{icon:"solar:monitor-bold",label:"System"}],initialState:r});const o=[{key:"background",label:"Background",icon:"solar:layers-linear"},{key:"shadow",label:"Shadow",icon:"solar:cloud-linear"},{key:"light",label:"Light",icon:"solar:sun-fog-linear"},{key:"primary",label:"Primary",icon:"solar:palette-linear"},{key:"secondary",label:"Secondary",icon:"solar:palette-2-linear"}];let c="";for(const{key:d,label:g}of o)if(i.includes(d)){const m=new b({defaultColor:a[d],popupDirection:"down"});this.colorPickers.set(d,m),c+=`
                    <div class="kwami-theme-control-item" data-control="${d}">
                        ${e?`<span class="kwami-theme-control-label">${g}</span>`:""}
                        ${m.render()}
                    </div>
                `}return`
            <div class="kwami-theme-control kwami-theme-control-${t}" data-kwami-id="${this.id}">
                ${i.includes("mode")?`
                    <div class="kwami-theme-control-item kwami-theme-control-mode" data-control="mode">
                        ${e?'<span class="kwami-theme-control-label">Theme</span>':""}
                        ${this.toggle.render()}
                    </div>
                `:""}
                ${c?`
                    <div class="kwami-theme-control-colors">
                        ${c}
                    </div>
                `:""}
            </div>
        `}onHydrate(){if(this.element){if(this.toggle){const t=this.element.querySelector(".kwami-toggle");t&&this.toggle.hydrate(t)}this.colorPickers.forEach((t,e)=>{var s;const i=(s=this.element)==null?void 0:s.querySelector(`[data-control="${e}"] .kwami-colorpicker`);i&&t.hydrate(i)}),this.setupEventListeners(),this.applyTheme(),this.setupSystemThemeListener()}}setupEventListeners(){var i;const t=(i=this.element)==null?void 0:i.querySelector(".kwami-toggle");t&&this.addListener(t,"togglechange",s=>{const a=s.detail,r=["light","dark","system"];this.config.mode=r[a.state],this.onConfigChange(),this.updateColorPickerValues()}),["primary","secondary","background","shadow","light"].forEach(s=>{var r;if(this.colorPickers.get(s)){const o=(r=this.element)==null?void 0:r.querySelector(`[data-control="${s}"] .kwami-colorpicker`);o&&this.addListener(o,"colorchange",c=>{const d=c.detail.color,g=this.getEffectiveMode();this.config.colors[g][s]=d,this.onConfigChange()})}})}setupSystemThemeListener(){if(this.config.mode==="system"){const t=window.matchMedia("(prefers-color-scheme: dark)"),e=()=>{this.applyTheme(),this.updateColorPickerValues()};t.addEventListener("change",e),this.systemThemeListener=()=>t.removeEventListener("change",e)}}updateColorPickerValues(){const t=this.getEffectiveMode(),e=this.config.colors[t];this.colorPickers.forEach((i,s)=>{const a=s;e[a]&&i.setColor(e[a])})}onConfigChange(){var t;this.saveConfig(),this.applyTheme(),(t=this.element)==null||t.dispatchEvent(new CustomEvent("themechange",{detail:{config:this.config},bubbles:!0})),this.props.onChange&&this.props.onChange(this.config)}applyTheme(){const t=document.documentElement,e=document.body,i=this.getEffectiveMode(),s=this.config.colors[i];t.setAttribute("data-theme",i),e.setAttribute("data-theme",i),t.style.setProperty("--accent-primary",s.primary),t.style.setProperty("--accent-secondary",s.secondary),t.style.setProperty("--kwami-accent",s.primary),t.style.setProperty("--kwami-bg",s.background),t.style.setProperty("--kwami-surface",s.background),t.style.setProperty("--kwami-shadow-dark",s.shadow),t.style.setProperty("--kwami-shadow-light",s.light)}getConfig(){return{...this.config}}setConfig(t){if(this.config=this.mergeConfig(this.config,t),this.onConfigChange(),this.updateColorPickerValues(),t.mode&&this.toggle){const e=t.mode==="light"?0:t.mode==="dark"?1:2;this.toggle.setState(e)}}setMode(t){this.setConfig({mode:t})}reset(){if(this.config={...q},this.onConfigChange(),this.updateColorPickerValues(),this.toggle){const t=this.config.mode==="light"?0:this.config.mode==="dark"?1:2;this.toggle.setState(t)}}destroy(){var t;this.systemThemeListener&&this.systemThemeListener(),this.colorPickers.forEach(e=>e.destroy()),(t=this.toggle)==null||t.destroy(),super.destroy()}}u.Accordion=Ct,u.Activator=lt,u.Button=H,u.ButtonConfigurator=_,u.Checkbox=pt,u.ColorPicker=b,u.Component=p,u.DatePicker=mt,u.Depth=Et,u.Expandable=at,u.Fader=kt,u.Icon=j,u.IconConfigurator=it,u.Knob=wt,u.Label=L,u.LabelConfigurator=tt,u.Modal=St,u.Pin=ht,u.Popover=$t,u.Radio=gt,u.Selector=ut,u.Shallow=Tt,u.Slider=st,u.Stepper=ft,u.Switch=rt,u.Tabs=bt,u.Text=O,u.TextArea=ct,u.TextConfigurator=Z,u.TextInput=ot,u.ThemeControl=Dt,u.Title=S,u.TitleConfigurator=Q,u.Toast=Lt,u.Toggle=Y,u.Tooltip=xt,u.adjustBrightness=k,u.applyTheme=K,u.defaultButtonConfig=I,u.defaultDarkColors=P,u.defaultIconConfig=R,u.defaultLabelConfig=N,u.defaultLightColors=v,u.defaultTextConfig=F,u.defaultTheme=U,u.defaultThemeControlConfig=q,u.defaultTitleConfig=B,u.generateGradientColors=X,u.getEffectiveTheme=V,u.hexToRgb=z,u.hslToHex=x,u.hslToRgb=A,u.parseColor=C,u.renderTitle=J,u.rgbToHsl=D,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"})});
