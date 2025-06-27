let angle = 0;
let speed = 0.02;
let direction = 1;
let opacity = 20;  
let colorShift = 0;

const buttons = {
  up: document.getElementById("up"),
  down: document.getElementById("down"),
  left: document.getElementById("left"),
  right: document.getElementById("right")
};

function pressButton(button) {
  button.style.opacity = "0.5"; 
}

function releaseButton(button) {
  button.style.opacity = "1";  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

const gui = new dat.GUI({width: '100%',closeOnTop:true, closed:true});
gui.domElement.querySelector('.close-button').innerHTML = 'Open Controls'; 
const params = {
  speed: 0.02,
  direction: 1,
  opacity: 20,
  colorShift: 0,
  size: Math.min(window.innerWidth, window.innerHeight) / 2,
  steps: 100,
  alphaFactor: 255 / 100,
  ellipseSize: 10,
  colorMode: 'Green' 

};
gui.add(params, 'speed', 0.01, 0.1).step(0.01).name("Speed").onFinishChange(value => {
  speed = value;
});
gui.add(params, 'direction', { "Clockwise": 1, "Counterclockwise": -1 }).name("direction").onFinishChange(value => {
  direction = value;
});
gui.add(params, 'opacity', 0, 100).step(5).name("Alpha").onFinishChange(value => {
  opacity = value;
});
gui.add(params, 'colorShift', 0, 255).step(1).name("Color").onFinishChange(value => {
  colorShift = value;
});
gui.add(params, 'colorMode', ['Red', 'Green', 'Blue']).name("Color Mode");
gui.add(params, 'size', 50, 2000).step(10).name("Spiral size").onFinishChange(value => {
  size = value;
});
gui.add(params, 'steps', 10, 200).step(10).name("Number of circles").onFinishChange(value => {
  steps = value;
  params.alphaFactor = 255 / params.steps; // Mise à jour automatique
});
gui.add(params, 'alphaFactor', .5, 255).step(1).name("Alpha factor").onFinishChange(value => {
  alphaFactor = value;
});
gui.add(params, 'ellipseSize', 0.1, 200).step(0.1).name("Ellipse Size").onFinishChange(value => {
  ellipseSize = value;
});


document.addEventListener("dblclick", () => {
  params.speed = random(0.01, 0.1);
  params.direction = random([1, -1]); // Choix aléatoire entre horaire et anti-horaire
  params.opacity = random(0.5, 100);
  params.colorShift = random(0, 255);
  params.colorMode = "Red";
  params.size = random(50, 2000);
  params.steps = random(10, 200);
  params.alphaFactor = random(0, 255);
  params.ellipseSize = random(10, 200);

  gui.__controllers.forEach(controller => controller.updateDisplay());
});


function draw() {
  background(0, opacity);
  translate(width / 2, height / 2);

  colorShift = lerp(colorShift, random(255), 0.05);

  for (let i = 0; i < params.steps; i++) {
    let currentAngle = angle + i * 0.1;
    let x = cos(currentAngle) * params.size * (i / params.steps);
    let y = sin(currentAngle) * params.size * (i / params.steps);

    // stroke(255, colorShift, 255 - colorShift, params.alphaFactor * (params.steps - i));
    // stroke(colorShift, 255, 255 - colorShift, params.alphaFactor * (params.steps - i));
    let r = 0, g = 0, b = 0;
    switch (params.colorMode) {
      case 'Red':
        r = 255; 
        g = params.colorShift; 
        b = 255 - params.colorShift;
        break;
      case 'Green':
        r = params.colorShift; 
        g = 255; 
        b = 255 - params.colorShift;
        break;
      case 'Blue':
        r = params.colorShift; 
        g = 255 - params.colorShift; 
        b = 255;
        break;
    }

    stroke(r, g, b, params.alphaFactor * (params.steps - i));
    strokeWeight(1);
    ellipse(x, y, i * params.ellipseSize);
  }

  angle += speed * direction;
}


document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    opacity = min(opacity + 10, 100);
    pressButton(buttons.up);
  }
  if (event.key === "ArrowDown") {
    opacity = max(opacity - 10, 0);
    pressButton(buttons.down);
  }
  if (event.key === "ArrowLeft") {
    direction = -1;
    pressButton(buttons.left);
  }
  if (event.key === "ArrowRight") {
    direction = 1;
    pressButton(buttons.right);
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") releaseButton(buttons.up);
  if (event.key === "ArrowDown") releaseButton(buttons.down);
  if (event.key === "ArrowLeft") releaseButton(buttons.left);
  if (event.key === "ArrowRight") releaseButton(buttons.right);
});

buttons.up.addEventListener("mousedown", () => pressButton(buttons.up));
buttons.up.addEventListener("mouseup", () => releaseButton(buttons.up));

buttons.down.addEventListener("mousedown", () => pressButton(buttons.down));
buttons.down.addEventListener("mouseup", () => releaseButton(buttons.down));

buttons.left.addEventListener("mousedown", () => pressButton(buttons.left));
buttons.left.addEventListener("mouseup", () => releaseButton(buttons.left));

buttons.right.addEventListener("mousedown", () => pressButton(buttons.right));
buttons.right.addEventListener("mouseup", () => releaseButton(buttons.right));

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  clear(); 
  background(0);
}


// Ajout des boutons interactifs
document.addEventListener("DOMContentLoaded", function () {
  let doubleclickToggle = document.createElement("a");
  doubleclickToggle.href = "#";
  doubleclickToggle.textContent = "DOUBLE CLICK";
  doubleclickToggle.style.position = "fixed";
  doubleclickToggle.style.bottom = "10px";
  doubleclickToggle.style.left = "10px";
  doubleclickToggle.style.fontSize = "10px";
  doubleclickToggle.style.fontFamily = "SquareDance00";
  doubleclickToggle.style.color = "white";
  doubleclickToggle.style.textDecoration = "none";
  doubleclickToggle.style.textTransform = "uppercase";
  doubleclickToggle.style.padding = "5px 10px";
  doubleclickToggle.style.borderRadius = "5px";
  // doubleclickToggle.style.cursor = "pointer";

  let fullscreenToggle = document.createElement("a");
  fullscreenToggle.href = "#";
  fullscreenToggle.textContent = "FULLSCREEN";
  fullscreenToggle.style.position = "fixed";
  fullscreenToggle.style.bottom = "10px";
  fullscreenToggle.style.right = "10px";
  fullscreenToggle.style.fontSize = "10px";
  fullscreenToggle.style.fontFamily = "SquareDance00";
  fullscreenToggle.style.color = "white";
  fullscreenToggle.style.textDecoration = "none";
  fullscreenToggle.style.textTransform = "uppercase";
  fullscreenToggle.style.padding = "5px 10px";
  fullscreenToggle.style.borderRadius = "5px";
  fullscreenToggle.style.cursor = "pointer";

  fullscreenToggle.addEventListener("click", function (event) {
    event.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  document.body.appendChild(doubleclickToggle);
  document.body.appendChild(fullscreenToggle);
});