const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let w, h, stars = [];
const STAR_COUNT = 300;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 1,
            blink: Math.random(),
            speed: 0.01 + Math.random() * 0.02
        });
    }
}
createStars();

function draw() {
    ctx.clearRect(0, 0, w, h);

    stars.forEach(s => {
        s.blink += s.speed;
        if (s.blink > 1 || s.blink < 0) s.speed *= -1;

        ctx.globalAlpha = s.blink;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw);
}
draw();

const paragraph = `
LA FERIA NACIONAL DE DURANGO, BETTER KNOWN SIMPLY AS LA FERIA. THIS ANNUAL CELEBRATION IS A VIBRANT SPACE SIMILAR TO A CARNIVAL, BUT ON A MUCH LARGER AND MORE IMMERSIVE SCALE. EVERY SUMMER DURING MY CHILDHOOD, VISITING LA FERIA BECAME A TRADITION. MY MOM’S SIDE OF THE FAMILY IS FROM DURANGO, SO WHENEVER WE TRAVELED THERE, GOING TO LA FERIA WAS SOMETHING WE ALL LOOKED FORWARD TO. ONE OF THE THINGS I REMEMBER MOST CLEARLY IS THE TIME OF DAY WE USUALLY WENT. WE OFTEN ARRIVED JUST AS THE SUN WAS SETTING, WHEN THE SKY TURNED ORANGE AND PINK. AS THE DAYLIGHT FADED, ALL THE LIGHTS AROUND THE BUILDINGS, PARKS, AND GAMES SWITCHED ON, FILLING THE FAIRGROUNDS WITH BRIGHT, COLORFUL GLOWS. THE RIDES SPARKLED, THE FOOD STANDS LIT UP, AND THE WHOLE PLACE FELT ALIVE IN A WAY THAT FELT ALMOST DREAMLIKE. ANOTHER MEMORY THAT ALWAYS STANDS OUT IS THE WATER FOUNTAINS SCATTERED THROUGHOUT THE FERIA. THEY WERE A MAGNET FOR KIDS. MY COUSINS AND I WOULD RUN THROUGH THEM OVER AND OVER, GETTING COMPLETELY SOAKED AND LAUGHING THE ENTIRE TIME. DOZENS OF OTHER CHILDREN JOINED IN, TURNING THE FOUNTAINS INTO A PLAYFUL GATHERING SPOT THAT FELT JUST AS EXCITING AS ANY RIDE. LA FERIA WAS A PLACE WHERE I FELT CLOSE TO MY FAMILY, MY CULTURE, AND THE EXCITEMENT OF BEING A KID. EVEN NOW, IT’S STILL ONE OF THE HAPPIEST PLACES I REMEMBER FROM MY CHILDHOOD.
`;

let textOffsetY = 0;

function drawMemoryText(ctx, width, height) {
    ctx.save();
    ctx.font = "80px GridTypeBauhaus";
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.textBaseline = "top";

    const words = memoryText.split(" ");
    let x = 0;
    let y = textOffsetY;

    for (let i = 0; i < words.length; i++) {
        const word = words[i] + " ";
        const w = ctx.measureText(word).width;

        if (x + w > width) {
            x = 0;
            y += 90; // line height
        }

        ctx.fillText(word, x, y);
        x += w;
    }

    textOffsetY -= 0.15; // slow upward drift

    if (y < -2000) textOffsetY = height;

    ctx.restore();
}


/* ---------------- Ticket ---------------- */

const ticketLeft = document.querySelector(".ticket-left");
const ticketRight = document.querySelector(".ticket-right");

function updateTicketSplit() {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  let progress = scrollTop / maxScroll;
  progress = Math.min(progress, 1);

  const distance = 300; // how far tickets move apart
  const eased = Math.pow(progress, 0.8); // smooth easing

  ticketLeft.style.transform = `translateX(-${eased * distance}px)`;
  ticketRight.style.transform = `translateX(${eased * distance}px)`;

  // Optional fade out
  ticketLeft.style.opacity = 1 - progress;
  ticketRight.style.opacity = 1 - progress;
}

window.addEventListener("scroll", updateTicketSplit);


/* ---------------- LOADING BAR ---------------- */

const loadingBar = document.querySelector(".loading-bar");
const loadingContainer = document.querySelector(".loading-container");
const loadingText = document.querySelector(".loading-text");

function updateLoadingBar() {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;

    let progress = (scrollTop / maxScroll) * 100;
    progress = Math.min(progress, 100);

    loadingBar.style.width = progress + "%";

    if (progress >= 100) {
        loadingContainer.style.opacity = "0";
        loadingText.style.opacity = "0";
    }
}

window.addEventListener("scroll", updateLoadingBar);


/* ---------------- FERRIS WHEEL SEATS ---------------- */
const wrappers = document.querySelectorAll(".seat-wrapper");
const wheelSize = 450;
const centerX = wheelSize / 2;
const centerY = wheelSize / 2;
const radius = 180;

wrappers.forEach((wrapper, index) => {
  const angle = (index / wrappers.length) * 2 * Math.PI;
  const x = centerX + radius * Math.cos(angle) - 35;
  const y = centerY + radius * Math.sin(angle) - 35;

  wrapper.style.left = `${x}px`;
  wrapper.style.top = `${y}px`;

  // Rotate wrapper to match wheel
  const degrees = (angle * 180) / Math.PI;
  wrapper.style.transform = `rotate(${degrees}deg)`;

  // Counter-rotate seat to stay upright
  const seat = wrapper.querySelector(".seat");
  seat.style.transform = `rotate(${-degrees}deg)`;

  seat.addEventListener("click", () => {
    alert(`Seat ${index + 1} clicked`);
  });
});

/* ---------------- MEGA DROP ---------------- */
document.querySelector(".megadrop-seats").addEventListener("click", () => {
    alert("Mega Drop seats clicked!");
});


/* ---------------- cotton candy ---------------- */
const candies = document.querySelectorAll(".candy");
const zoomOverlay = document.querySelector(".zoom-overlay");
const zoomImage = document.querySelector(".zoom-image");

candies.forEach(candy => {
    candy.addEventListener("click", () => {
        zoomImage.src = candy.src;
        zoomOverlay.style.display = "flex";

        setTimeout(() => {
            zoomImage.style.transform = "scale(1)";
        }, 10);
    });
});

zoomOverlay.addEventListener("click", () => {
    zoomImage.style.transform = "scale(0.5)";
    setTimeout(() => {
        zoomOverlay.style.display = "none";
    }, 200);
});
