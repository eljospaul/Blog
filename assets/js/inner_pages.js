
$(function () {

    "use strict";

    if (window.innerWidth > 991) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-ma .bg-img",
                start: "top",
                endTrigger: ".about-ma",
                end: "bottom bottom",
                pin: true, 
                pinSpacing: false
            }
        });
    }

    var testim = new Swiper(".testimonials-ds .testim-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 1500,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    $(function () {
        let cards = gsap.utils.toArray(".cards .card-item");

        let stickDistance = 0;

        let firstCardST = ScrollTrigger.create({
            trigger: cards[0],
            start: "center center"
        });

        let lastCardST = ScrollTrigger.create({
            trigger: cards[cards.length - 1],
            start: "bottom bottom"
        });

        cards.forEach((card, index) => {
            var scale = 1 - (cards.length - index) * 0.025;
            let scaleDown = gsap.to(card, { scale: scale, 'transform-origin': '"50% ' + (lastCardST.start + stickDistance) + '"' });

            ScrollTrigger.create({
                trigger: card,
                start: "center center",
                end: () => lastCardST.start + stickDistance,
                pin: true,
                pinSpacing: false,
                ease: "none",
                animation: scaleDown,
                toggleActions: "restart none none reverse"
            });
        });
    });

    $('.accordion .accordion-item').on('click', function() {
        $(this).addClass("active").siblings().removeClass("active");
    });

});



const musicContainer = document.getElementById("control-panel");
const playButton = document.getElementById("playBtn");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const musicImage = document.getElementById("music-cover");
const progress = document.getElementById("bar");
const progressContainer = document.getElementById("progress-bar");
const infoBar = document.getElementById('info');
const releaseDate = document.getElementById("release-date");
const title = document.getElementById("track-name");
const description = document.getElementById("track-description");
const curTime = document.getElementById("curTime")
const totTime = document.getElementById("totTime")

const music = [
    {
        "title": "Noise",
        "description": "– a raw, mellow vibe straight from my room to your ears. Lo-fi mood, no filters, just sound and soul.",
        "image": "../imgs/works/w2.png",
        "date": "06-12-2025"
    },
    {
        "title": "Mist",
        "description": "- Made with nothing but heart, headphones, and late nights. This one’s personal — the beginning of everything.",
        "image": "../imgs/works/w1.jpg",
        "date": "06-03-2025"
    }
];
let musicIndex = 0;

function getMusicTitle(music) {
    return music.charAt(0).toUpperCase() + music.slice(1);
}

function loadmusic(music) {
  const daysRange = 1;
  const inputDate = new Date(music.date);
  const today = new Date();
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInTime = Math.abs(inputDate - today);
  const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  title.innerHTML = getMusicTitle(music.title);
  musicImage.src = `./assets/images/${music.image}`;
  audio.src = `./assets/audio/${music.title}.mp3`;
  description.innerHTML = getMusicTitle(music.description);
  if (diffInDays <= daysRange) {
    releaseDate.innerHTML = "Latest Release";
  } else {
    releaseDate.innerHTML = (music.date);
  }
}

function playmusic() {
    musicContainer.classList.add("active");
    // infoBar.classList.add("active");
    playButton.querySelector("i.fas").classList.remove("fa-play");
    playButton.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}

function pausemusic() {
    musicContainer.classList.remove("active");
    // infoBar.classList.remove("active");
    playButton.querySelector("i.fas").classList.remove("fa-pause");
    playButton.querySelector("i.fas").classList.add("fa-play");
    audio.pause();
}

function prevmusic() {
    musicIndex--;
    if (musicIndex < 0) musicIndex = music.length - 1;
    loadmusic(music[musicIndex]);
    playmusic();
}

function nextmusic() {
    musicIndex++;
    if (musicIndex > music.length - 1) musicIndex = 0;
    loadmusic(music[musicIndex]);
    playmusic();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    
    progress.style.width = `${progressPercent}%`;
    let minutes = Math.floor(Math.round(currentTime) / 60);
    let seconds = Math.round(currentTime) - minutes * 60;
    if (seconds > 9) {
    seconds = seconds
    } else {
    seconds = "0" + seconds
    }
    if (minutes > 9) {
    minutes = minutes
    } else {
    minutes = "0" + minutes
    }
    let totMinutes = Math.floor(Math.round(duration) / 60);
    let totSeconds = Math.round(duration) - totMinutes * 60;
    if (minutes && seconds === NaN) {
    minutes = "00"
    seconds = "00"
    }
    if (totMinutes === NaN) {
    totMinutes = "00"
    totSeconds = "00"
    }
    curTime.innerHTML = minutes + ":" + seconds
    totTime.innerHTML = "0" + totMinutes + ":" + totSeconds
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playButton.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("active");
    isPlaying ? pausemusic() : playmusic();
});

prevButton.addEventListener("click", prevmusic);
nextButton.addEventListener("click", nextmusic);

audio.addEventListener("ended", nextmusic);

// Init
loadmusic(music[musicIndex]);


const url = new URL(window.location.href)
var m = url.searchParams.get("m");
if (m === "w1") {
    loadmusic(music[1]);
}