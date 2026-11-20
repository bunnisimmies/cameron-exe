
document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // boyfriend os 98 ♡
  // cameron.exe
  // ==========================================

  const desktop = document.querySelector(".desktop");
  const windows = document.querySelectorAll(".window");
  const heartContainer = document.getElementById("heart-container");

  let highestZ = 20;
  let reasonIndex = 0;

  // ==========================================
  // window system
  // ==========================================

  function bringToFront(win) {
    win.style.zIndex = ++highestZ;
  }

  function openWindow(id) {
    const win = document.getElementById(id);

    if (!win) return;

    win.hidden = false;
    bringToFront(win);
  }

  function closeWindow(id) {
    const win = document.getElementById(id);

    if (!win) return;

    win.hidden = true;

    if (id === "game") {
      stopGame();
    }
  }

  document.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => {
      openWindow(button.dataset.open);
    });
  });

  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
      closeWindow(button.dataset.close);
    });
  });

  // draggable windows

  windows.forEach(win => {

    win.addEventListener("pointerdown", () => {
      bringToFront(win);
    });

    const bar = win.querySelector(".title-bar");

    if (!bar) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    bar.addEventListener("pointerdown", event => {

      if (event.target.closest("button")) return;

      dragging = true;
      bringToFront(win);

      const rect = win.getBoundingClientRect();

      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;

      win.style.left = rect.left + "px";
      win.style.top = rect.top + "px";
      win.style.transform = "none";

      bar.setPointerCapture(event.pointerId);
    });

    bar.addEventListener("pointermove", event => {

      if (!dragging) return;

      const maxX = Math.max(
        0,
        window.innerWidth - win.offsetWidth
      );

      const maxY = Math.max(
        0,
        window.innerHeight - win.offsetHeight - 48
      );

      win.style.left = Math.max(
        0,
        Math.min(event.clientX - offsetX, maxX)
      ) + "px";

      win.style.top = Math.max(
        0,
        Math.min(event.clientY - offsetY, maxY)
      ) + "px";
    });

    const stopDragging = () => {
      dragging = false;
    };

    bar.addEventListener("pointerup", stopDragging);
    bar.addEventListener("pointercancel", stopDragging);
    bar.addEventListener("lostpointercapture", stopDragging);
  });

  // ==========================================
  // heart explosions
  // ==========================================

  function explodeHearts(amount = 45) {

    for (let i = 0; i < amount; i++) {

      const heart = document.createElement("span");

      heart.className = "flying-heart";

      const symbols = ["♥", "♡", "✦", "✧"];

      heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      heart.style.left = "50%";
      heart.style.top = "50%";

      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 450;

      heart.style.setProperty(
        "--x",
        Math.cos(angle) * distance + "px"
      );

      heart.style.setProperty(
        "--y",
        Math.sin(angle) * distance + "px"
      );

      heart.style.setProperty(
        "--rotation",
        Math.random() * 720 + "deg"
      );

      heart.style.fontSize =
        15 + Math.random() * 25 + "px";

      heartContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1900);
    }
  }

  // ==========================================
  // love letter
  // ==========================================

  document.getElementById("read-letter")
    .addEventListener("click", () => {

      closeWindow("letter");
      openWindow("message");

      explodeHearts(65);

      setTimeout(() => {
        openWindow("error");
      }, 900);
    });

  document.getElementById("heart-button")
    .addEventListener("click", () => {
      explodeHearts(100);
    });

  // ==========================================
  // reasons
  // ==========================================

  const reasons = [
    "because you make even ordinary days feel special ♡",
    "because talking to you is my favourite part of the day ♡",
    "because your smile makes everything brighter ♡",
    "because you make me feel loved from miles away ♡",
    "because you're my favourite notification ♡",
    "because you make me laugh without even trying ♡",
    "because you're effortlessly adorable ♡",
    "because every little moment with you matters ♡",
    "because i can always be myself around you ♡",
    "because you make the distance feel smaller ♡",
    "because i love learning new things about you ♡",
    "because you're my favourite person to say goodnight to ♡",
    "because you're you, and that's more than enough ♡"
  ];

  document.getElementById("next-reason")
    .addEventListener("click", () => {

      document.getElementById("reason-text").textContent =
        reasons[reasonIndex];

      reasonIndex = (reasonIndex + 1) % reasons.length;

      explodeHearts(12);
    });

  // ==========================================
  // virtual hugs
  // ==========================================

  const hugMessages = [
    "one giant virtual hug delivered! ♡",
    "ezra is wrapping his arms around you right now ♡",
    "sending you the warmest cuddle in the universe ♡",
    "distance can't stop these hugs! ♡",
    "another hug? of course, baby! ♡",
    "you have unlimited hugs from ezra ♡"
  ];

  let hugIndex = 0;

  document.getElementById("hug-button")
    .addEventListener("click", () => {

      document.getElementById("hug-message").textContent =
        hugMessages[hugIndex];

      hugIndex = (hugIndex + 1) % hugMessages.length;

      explodeHearts(55);
    });

  // ==========================================
  // final surprise
  // ==========================================

  document.getElementById("final-surprise")
    .addEventListener("click", () => {

      document.querySelector("#surprise h2").textContent =
        "i love you in every universe ♡";

      explodeHearts(150);
    });

  // ==========================================
  // start menu
  // ==========================================

  const startButton = document.getElementById("start-button");

  const startMenu = document.createElement("div");

  startMenu.className = "start-menu";
  startMenu.hidden = true;

  startMenu.innerHTML = `
    <div class="start-menu-title">♡ boyfriend os 98</div>

    <button data-start="letter">♡ love letter</button>
    <button data-start="distance">♡ miles apart</button>
    <button data-start="reasons">♡ reasons i love you</button>
    <button data-start="surprise">♡ little surprise</button>
    <button data-start="game">♡ catch my love</button>
    <button data-start="music">♫ music player</button>
    <button data-start="shutdown">♡ shut down</button>
  `;

  desktop.appendChild(startMenu);

  startButton.addEventListener("click", event => {
    event.stopPropagation();
    startMenu.hidden = !startMenu.hidden;
  });

  startMenu.querySelectorAll("[data-start]").forEach(button => {

    button.addEventListener("click", () => {

      const action = button.dataset.start;

      startMenu.hidden = true;

      if (action === "shutdown") {

        openWindow("error");

        document.querySelector("#error p").textContent =
          "cannot shut down. ezra's love is still running ♡";

      } else if (action === "music") {

        showMusicPlayer();

      } else {

        openWindow(action);
      }
    });
  });

  document.addEventListener("pointerdown", event => {

    if (
      !startMenu.contains(event.target) &&
      !startButton.contains(event.target)
    ) {
      startMenu.hidden = true;
    }
  });

  // ==========================================
  // secret desktop easter egg
  // ==========================================

  let secretClicks = 0;

  desktop.addEventListener("click", event => {

    if (
      event.target !== desktop &&
      !event.target.classList.contains("stars")
    ) {
      return;
    }

    secretClicks++;

    if (secretClicks >= 5) {
      secretClicks = 0;
      openWindow("surprise");
      explodeHearts(25);
    }
  });

  // ==========================================
  // bunni's dialogue
  // ==========================================

  const bunnyButton = document.getElementById("bunny-button");
  const bunnySprite = document.getElementById("bunny-sprite");
  const bunnyDialogue = document.getElementById("bunny-dialogue");
  const bunnyText = document.getElementById("bunny-dialogue-text");
  const bunnyQuestions = document.getElementById("bunny-questions");
  const bunnyBack = document.getElementById("bunny-back");
  const bunnyClose = document.getElementById("bunny-dialogue-close");

  const bunnyGreeting =
    "cameron!! you're finally here! ezra told me to wait for you ♡";

  const bunnyAnswers = {

    love:
      "oh, cameron... i've checked every file on this computer, and there's not enough storage in the universe to hold how much ezra loves you! ♡",

    miss:
      "every single day! sometimes he wishes he could just teleport into your arms. but until then, he sends all his hugs through me! ♡",

    wish:
      "a day when he won't have to say goodnight through a screen anymore. just you, him, and a thousand ordinary mornings together. ♡"
  };

  function openBunnyDialogue() {

    bunnyDialogue.hidden = false;
    bunnyText.textContent = bunnyGreeting;

    bunnyQuestions.hidden = false;
    bunnyBack.hidden = true;

    bunnySprite.src = "icons/bunny-awake.png";
  }

  bunnyButton.addEventListener("click", () => {

    if (bunnyDialogue.hidden) {
      openBunnyDialogue();
      explodeHearts(8);
    } else {
      bunnyDialogue.hidden = true;
    }
  });

  document.querySelectorAll(".bunny-option").forEach(button => {

    button.addEventListener("click", () => {

      bunnyText.textContent =
        bunnyAnswers[button.dataset.question];

      bunnyQuestions.hidden = true;
      bunnyBack.hidden = false;

      bunnySprite.src = "icons/bunny-blink.png";

      setTimeout(() => {
        bunnySprite.src = "icons/bunny-awake.png";
      }, 300);
    });
  });

  bunnyBack.addEventListener("click", () => {

    bunnyText.textContent =
      "what else would you like to know, cameron? ♡";

    bunnyQuestions.hidden = false;
    bunnyBack.hidden = true;
  });

  bunnyClose.addEventListener("click", () => {
    bunnyDialogue.hidden = true;
  });

  // bunny idle animations

  setInterval(() => {

    if (!document.body.classList.contains("logged-in")) return;
    if (!bunnyDialogue.hidden) return;

    const sleepy = Math.random() > 0.7;

    bunnySprite.src = sleepy
      ? "icons/bunny-sleep.png"
      : "icons/bunny-blink.png";

    setTimeout(() => {
      bunnySprite.src = "icons/bunny-awake.png";
    }, sleepy ? 2200 : 250);

  }, 6000);

  // ==========================================
  // NEW: mini music player ♡
  // ==========================================

  const music = document.getElementById("background-music");
  const musicPlayer = document.getElementById("music-player");
  const musicRestore = document.getElementById("music-restore");
  const musicMinimize = document.getElementById("music-minimize");
  const musicPlay = document.getElementById("music-play");
  const musicLoop = document.getElementById("music-loop");
  const musicDisc = document.getElementById("music-disc");
  const musicProgress = document.getElementById("music-progress");
  const musicVolume = document.getElementById("music-volume");
  const musicCurrentTime = document.getElementById("music-current-time");
  const musicDuration = document.getElementById("music-duration");
  const musicStatus = document.getElementById("music-status");

  let musicUnlocked = false;

  // starting volume
  music.volume = 0.45;
  music.loop = true;

  function formatMusicTime(seconds) {

    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" +
      String(remainingSeconds).padStart(2, "0");
  }

  function updateMusicUI() {

    const playing = !music.paused && !music.ended;

    musicPlay.textContent = playing ? "Ⅱ" : "▶";

    musicPlay.setAttribute(
      "aria-label",
      playing ? "pause music" : "play music"
    );

    musicDisc.classList.toggle("playing", playing);

    if (playing) {
      musicStatus.textContent =
        "playing cameron's favourite song ♡";
    } else if (musicUnlocked) {
      musicStatus.textContent =
        "paused ♡ press play whenever you're ready";
    }
  }

  function showMusicPlayer() {

    musicPlayer.hidden = false;
    musicRestore.hidden = true;
  }

  function minimizeMusicPlayer() {

    musicPlayer.hidden = true;
    musicRestore.hidden = false;
  }

  async function playMusic() {

    try {

      await music.play();

      musicStatus.textContent =
        "playing cameron's favourite song ♡";

    } catch (error) {

      musicStatus.textContent =
        "press ▶ to start our song ♡";

      console.log("music playback needs a click:", error);
    }

    updateMusicUI();
  }

  // called when cameron successfully logs in
  function unlockMusicPlayer() {

    musicUnlocked = true;

    showMusicPlayer();

    musicStatus.textContent =
      "a little song just for you ♡";

    updateMusicUI();
  }

  // play/pause button

  musicPlay.addEventListener("click", () => {

    if (music.paused) {
      playMusic();
    } else {
      music.pause();
    }
  });

  // minimize and restore

  musicMinimize.addEventListener("click", () => {
    minimizeMusicPlayer();
  });

  musicRestore.addEventListener("click", () => {
    showMusicPlayer();
  });

  // looping toggle

  musicLoop.addEventListener("click", () => {

    music.loop = !music.loop;

    musicLoop.classList.toggle("active", music.loop);

    musicLoop.setAttribute(
      "aria-pressed",
      String(music.loop)
    );

    musicStatus.textContent = music.loop
      ? "repeat is on ♡"
      : "repeat is off ♡";
  });

  // volume slider

  musicVolume.addEventListener("input", () => {

    music.volume = Number(musicVolume.value) / 100;
  });

  // progress bar

  music.addEventListener("loadedmetadata", () => {

    musicDuration.textContent =
      formatMusicTime(music.duration);
  });

  music.addEventListener("timeupdate", () => {

    musicCurrentTime.textContent =
      formatMusicTime(music.currentTime);

    if (
      Number.isFinite(music.duration) &&
      music.duration > 0
    ) {

      musicProgress.value =
        (music.currentTime / music.duration) * 100;
    }
  });

  musicProgress.addEventListener("input", () => {

    if (
      Number.isFinite(music.duration) &&
      music.duration > 0
    ) {

      music.currentTime =
        (Number(musicProgress.value) / 100) *
        music.duration;
    }
  });

  music.addEventListener("play", updateMusicUI);
  music.addEventListener("pause", updateMusicUI);
  music.addEventListener("ended", updateMusicUI);

  music.addEventListener("error", () => {

    musicStatus.textContent =
      "song not found! check your music folder ♡";
  });

  // ==========================================
  // login and password hint
  // ==========================================

  const loginScreen = document.getElementById("login-screen");
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("login-password");
  const loginFeedback = document.getElementById("login-feedback");
  const hintButton = document.getElementById("hint-button");
  const loginHint = document.getElementById("login-hint");

  let loginAttempts = 0;

  loginForm.addEventListener("submit", event => {

    event.preventDefault();

    const password = passwordInput.value.trim();

    // correct password

    if (password === "201026") {

      loginFeedback.textContent =
        "welcome home, cameron ♡";

      loginForm.querySelector("button").disabled = true;

      // the successful login click can start playback.
      // if the browser blocks it, the play button remains available.

      musicUnlocked = true;

      playMusic();

      setTimeout(() => {

        document.body.classList.add("logged-in");

        loginScreen.classList.add("login-success");

        setTimeout(() => {

          loginScreen.remove();

          // show the mini music player
          unlockMusicPlayer();

          // bunni welcomes cameron
          openBunnyDialogue();

          explodeHearts(25);

          // love letter opens shortly afterwards

          setTimeout(() => {

            openWindow("letter");
            explodeHearts(35);

          }, 3000);

        }, 1200);

      }, 600);

      return;
    }

    // incorrect password

    loginAttempts++;

    passwordInput.value = "";
    passwordInput.focus();

    loginFeedback.textContent =
      "oops! that's not quite right, my love ♡";

    if (loginAttempts >= 3 && loginHint.hidden) {

      hintButton.hidden = false;

      loginFeedback.textContent =
        "hmm... need a little help, baby? ♡";
    }
  });

  hintButton.addEventListener("click", () => {

    loginHint.hidden = false;
    hintButton.hidden = true;
  });

  // ==========================================
  // bunny cursor trail
  // ==========================================

  if (window.matchMedia("(pointer: fine)").matches) {

    let lastTrail = 0;

    document.addEventListener("pointermove", event => {

      if (Date.now() - lastTrail < 70) return;

      lastTrail = Date.now();

      const heart = document.createElement("span");

      heart.className = "bunny-trail";

      heart.textContent =
        Math.random() > 0.5 ? "♥" : "✦";

      heart.style.left = event.clientX + "px";
      heart.style.top = event.clientY + "px";

      document.body.appendChild(heart);

      heart.addEventListener(
        "animationend",
        () => heart.remove(),
        { once: true }
      );
    });
  }

  // ==========================================
  // catch my love game
  // ==========================================

  const gameWindow = document.getElementById("game");
  const gameArea = document.getElementById("game-area");
  const gameBunny = document.getElementById("game-bunny");
  const gameScoreText = document.getElementById("game-score");
  const gameTimeText = document.getElementById("game-time");
  const gameOverlay = document.getElementById("game-overlay");
  const gameTitle = document.getElementById("game-overlay-title");
  const gameMessage = document.getElementById("game-overlay-message");
  const gameStartButton = document.getElementById("game-start");

  let gameRunning = false;
  let gameScore = 0;
  let gameTime = 30;
  let bunnyX = 0;

  let fallingHearts = [];
  let gameFrame = null;
  let lastFrame = 0;
  let spawnClock = 0;
  let gameEndTime = 0;

  let gameKeys = {
    left: false,
    right: false
  };

  function gameWidth() {
    return gameArea.clientWidth;
  }

  function setBunnyPosition(x) {

    const width = gameWidth();
    const half = gameBunny.offsetWidth / 2;

    bunnyX = Math.max(
      half,
      Math.min(x, width - half)
    );

    gameBunny.style.left = bunnyX + "px";
  }

  function clearGameHearts() {

    fallingHearts.forEach(heart => {
      heart.element.remove();
    });

    fallingHearts = [];
  }

  function resetGameScreen() {

    gameScore = 0;
    gameTime = 30;

    gameScoreText.textContent = "0";
    gameTimeText.textContent = "30";

    clearGameHearts();

    setBunnyPosition(gameWidth() / 2);
  }

  function stopGame() {

    gameRunning = false;

    cancelAnimationFrame(gameFrame);
    gameFrame = null;

    gameKeys.left = false;
    gameKeys.right = false;

    clearGameHearts();

    gameTitle.textContent =
      "ready, cameron? ♡";

    gameMessage.textContent =
      "move bunni with your mouse, finger, or arrow keys to catch falling hearts!";

    gameStartButton.textContent =
      "start game ♡";

    gameOverlay.hidden = false;

    gameScoreText.textContent = "0";
    gameTimeText.textContent = "30";
  }

  function spawnHeart() {

    const golden = Math.random() < 0.12;

    const element = document.createElement("div");

    element.className = golden
      ? "game-heart golden"
      : "game-heart";

    element.textContent = golden ? "✦" : "♥";

    const x =
      Math.random() * Math.max(0, gameWidth() - 30);

    const heart = {
      element,
      x,
      y: -35,
      size: 30,
      speed: 105 + Math.random() * 95,
      points: golden ? 50 : 10
    };

    element.style.left = x + "px";
    element.style.transform = "translateY(-35px)";

    gameArea.appendChild(element);
    fallingHearts.push(heart);
  }

  function finishGame() {

    gameRunning = false;

    cancelAnimationFrame(gameFrame);
    gameFrame = null;

    clearGameHearts();

    gameTime = 0;
    gameTimeText.textContent = "0";

    gameTitle.textContent = "time's up! ♡";

    if (gameScore >= 250) {

      gameMessage.textContent =
        "love meter overloaded!! congratulations, cameron. you've caught ezra's whole heart ♡";

      explodeHearts(100);

    } else if (gameScore >= 100) {

      gameMessage.textContent =
        "look at all that love! and that's only a tiny bit of what ezra feels ♡";

      explodeHearts(50);

    } else {

      gameMessage.textContent =
        "even if you missed every heart, ezra would still choose you ♡";

      explodeHearts(25);
    }

    gameStartButton.textContent = "play again ♡";
    gameOverlay.hidden = false;
  }

  function updateGame(timestamp) {

    if (!gameRunning) return;

    if (!lastFrame) {
      lastFrame = timestamp;
    }

    const delta = Math.min(
      (timestamp - lastFrame) / 1000,
      0.05
    );

    lastFrame = timestamp;

    const remaining = Math.max(
      0,
      (gameEndTime - timestamp) / 1000
    );

    gameTime = Math.ceil(remaining);
    gameTimeText.textContent = gameTime;

    if (remaining <= 0) {
      finishGame();
      return;
    }

    // keyboard movement

    if (gameKeys.left) {
      setBunnyPosition(bunnyX - 270 * delta);
    }

    if (gameKeys.right) {
      setBunnyPosition(bunnyX + 270 * delta);
    }

    // spawn falling hearts

    spawnClock += delta;

    if (spawnClock >= 0.48) {
      spawnClock = 0;
      spawnHeart();
    }

    const bunnyHalf = gameBunny.offsetWidth / 2;

    const bunnyTop =
      gameArea.clientHeight -
      gameBunny.offsetHeight - 6;

    fallingHearts = fallingHearts.filter(heart => {

      heart.y += heart.speed * delta;

      heart.element.style.transform =
        `translateY(${heart.y}px)`;

      const heartCenter =
        heart.x + heart.size / 2;

      const caughtHorizontally =
        Math.abs(heartCenter - bunnyX) <
        bunnyHalf + 5;

      const caughtVertically =
        heart.y + heart.size >= bunnyTop + 8 &&
        heart.y <= bunnyTop + gameBunny.offsetHeight;

      if (caughtHorizontally && caughtVertically) {

        gameScore += heart.points;
        gameScoreText.textContent = gameScore;

        heart.element.remove();

        return false;
      }

      if (heart.y > gameArea.clientHeight) {

        heart.element.remove();
        return false;
      }

      return true;
    });

    gameFrame = requestAnimationFrame(updateGame);
  }

  function startGame() {

    cancelAnimationFrame(gameFrame);

    resetGameScreen();

    gameRunning = true;
    gameOverlay.hidden = true;

    spawnClock = 0;
    lastFrame = 0;

    gameFrame = requestAnimationFrame(timestamp => {

      gameEndTime = timestamp + 30000;

      updateGame(timestamp);
    });
  }

  gameStartButton.addEventListener("click", startGame);

  // mouse and touch controls

  gameArea.addEventListener("pointermove", event => {

    if (!gameRunning) return;

    const rect = gameArea.getBoundingClientRect();

    setBunnyPosition(event.clientX - rect.left);
  });

  gameArea.addEventListener("pointerdown", event => {

    if (!gameRunning) return;

    const rect = gameArea.getBoundingClientRect();

    setBunnyPosition(event.clientX - rect.left);
  });

  // arrow keys

  document.addEventListener("keydown", event => {

    if (!gameRunning || gameWindow.hidden) return;

    if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault();
    }

    if (event.key === "ArrowLeft") {
      gameKeys.left = true;
    }

    if (event.key === "ArrowRight") {
      gameKeys.right = true;
    }
  });

  document.addEventListener("keyup", event => {

    if (event.key === "ArrowLeft") {
      gameKeys.left = false;
    }

    if (event.key === "ArrowRight") {
      gameKeys.right = false;
    }
  });

  window.addEventListener("blur", () => {

    gameKeys.left = false;
    gameKeys.right = false;
  });

  // ==========================================
  // everything is ready ♡
  // ==========================================

  console.log("cameron.exe loaded successfully ♡");

});
