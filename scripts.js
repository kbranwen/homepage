// ==========================================
// 1. КОНСОЛЬНЕ ПОВІДОМЛЕННЯ ДЛЯ РЕКРУТЕРІВ / QA
// ==========================================
console.log(
  "%c STOP right there! 🛑 \n%c You are entering a RESTRICTED AREA. \nAll activities are monitored by QA Department.", 
  "color: #ff4d4d; font-size: 20px; font-weight: bold;", 
  "color: #00d4ff; font-size: 14px;"
);

// ==========================================
// 2. ГЛОБАЛЬНІ ЗМІННІ ТА АУДІО
// ==========================================
let rainInterval = null;
let photoClickCount = 0;
let photoClickTimer = null;
const doakesAudio = new Audio("assets/james-doakes.mp3");

// ==========================================
// 3. ІНІЦІАЛІЗАЦІЯ ПІСЛЯ ЗАВАНТАЖЕННЯ DOM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  runInitialLoader();
  initDoakesEasterEgg();
});

// ==========================================
// 4. ЛОГІКА ЗАВАНТАЖЕННЯ POLICE DATABASE (LOADER)
// ==========================================
function runInitialLoader() {
  const overlay = document.getElementById("loader-overlay");
  const fill = document.getElementById("progress-fill");
  const percentText = document.getElementById("progress-text");
  const statusText = document.getElementById("loader-status");

  if (!overlay) return;

  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 2) + 3;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      if (statusText) statusText.innerText = "ACCESS GRANTED.";

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 600);
    }

    if (progress > 30 && progress < 70) {
      if (statusText) statusText.innerText = "Checking permissions...";
    } else if (progress >= 70 && progress < 100) {
      if (statusText) statusText.innerText = "Loading investigation...";
    }

    if (fill) fill.style.width = progress + "%";
    if (percentText) percentText.innerText = progress + "%";
  }, 60);
}

// ==========================================
// 5. ЕФЕКТ ДОЩУ (DETECTIVE MODE)
// ==========================================
function createRainDrop() {
  if (!document.body.classList.contains("detective-mode")) return;

  const drop = document.createElement("span");
  drop.classList.add("rain-drops");

  drop.style.left = Math.random() * window.innerWidth + "px";

  const duration = Math.random() * 0.6 + 0.7;
  drop.style.animationDuration = duration + "s";

  document.body.appendChild(drop);

  setTimeout(() => {
    drop.remove();
  }, duration * 1000);
}

function stopRain() {
  if (rainInterval) {
    clearInterval(rainInterval);
    rainInterval = null;
  }
  document.querySelectorAll(".rain-drops").forEach((drop) => drop.remove());
}

// ==========================================
// 6. ПЕРЕМИКАЧ РЕЖИМІВ (HR vs DETECTIVE)
// ==========================================
function toggleMode() {
  document.body.classList.toggle("detective-mode");

  const isDetective = document.body.classList.contains("detective-mode");
    document.title = isDetective 
    
  ? "🚨 CASE #028 // RESTRICTED ACCESS" 
        : "Résumé";
    
  // 🌧️ Керування дощем
  if (isDetective) {
    if (!rainInterval) {
      rainInterval = setInterval(createRainDrop, 40);
    }
  } else {
    stopRain();
  }

  // 📸 Зміна фотографії
const photo = document.getElementById("user-photo");
if (photo) {
  photo.src = isDetective ? "assets/avatar-detective.jpg" : "assets/avatar.jpg";
  
  // 🕵️‍♀️ Підказка для пасхалки при наведенні
  photo.title = isDetective 
    ? "🔍 ПОДОЗРЮВАНИЙ: Допитати (3 швидкі кліки)" 
    : "Tetiana Tolkachova";
}

  // 📄 🔒 Підміна файлу завантаження (HR vs SCP)
  const pdfBtn = document.getElementById("btn-pdf");
  if (pdfBtn) {
    if (isDetective) {
      pdfBtn.setAttribute("href", "assets/Clasified-resume.pdf");
      pdfBtn.setAttribute("download", "Clasified_resume_RESTRICTED.pdf");
      pdfBtn.innerText = "🛑 [CLASSIFIED] DOSSIER (PDF)";
    } else {
      pdfBtn.setAttribute("href", "assets/Resume.pdf");
      pdfBtn.setAttribute("download", "CV_QA_Engineer.pdf");
      pdfBtn.innerText = "📄 Завантажити CV (PDF)";
    }
  }

  // 💬 Кнопка контакту
  const contactBtn = document.getElementById("btn-contact");
  if (contactBtn) {
    contactBtn.innerText = isDetective
      ? "🔐 Секретна папка / BUGS"
      : "💬 Зв'язатися в Telegram";
  }

// 📝 Текстові блоки (Концепція: Небезпечний Bug-Злочинець)
  updateText("user-name", isDetective ? "ДОСЬЄ №028 // MOST WANTED" : "Tetiana Tolkachova");
  updateText("page-title", isDetective ? "🔎 ОРІЄНТУВАННЯ: BUG HUNTER" : "JUNIOR MANUAL QA ENGINEER");
  updateText("section-main-title", isDetective ? "🕵️‍♀️ МАТЕРІАЛИ СПРАВИ: ОСОБЛИВО НЕБЕЗПЕЧНА" : "📌 РЕЗЮМЕ / ПРОФЕСІЙНИЙ ПРОФІЛЬ");
  updateText("title-summary", isDetective ? "📁 ОСОБОВА СПРАВА ПІДОЗРЮВАНОЇ" : "👤 ІНФОРМАЦІЯ ПРО МЕНЕ");
  updateText("text-summary", isDetective 
    ? "Орієнтування: Звинувачується у масовому викритті критичних дефектів, нещадному зломі бізнес-логіки та зламі стрес-тестів. При виявленні на продакшені — негайно затримати та працевлаштувати."
    : "Цілеспрямована QA спеціалістка з аналітичним мисленням. Маю досвід розробки тестової документації, пошуку та локалізації дефектів. Орієнтована на якість продукту.");

  updateText("title-skills", isDetective ? "🗂 РЕЧОВІ ДОКАЗИ (HARD SKILLS)" : "🛠 ТЕХНІЧНІ НАВИЧКИ (HARD SKILLS)");
  updateText("title-education", isDetective ? "📂 СПЕЦПІДГОТОВКА (EDUCATION)" : "🎓 ОСВІТА (EDUCATION)");
  updateText("edu-academy-desc", isDetective ? "Спеціалізація: Manual QA." : "Курс: Manual Quality Assurance");
  updateText("title-languages", isDetective ? "🗣 КАНАЛИ ЗВ'ЯЗКУ (LANGUAGES)" : "🌐 ВОЛОДІННЯ МОВАМИ (LANGUAGES)");
  updateText("lang-eng-level", isDetective ? "B1 - Intermediate (обочий рівень для міжнародного розшуку)" : "B1 - Intermediate");
  updateText("title-projects", isDetective ? "🗃 МІСЦЯ ЗЛОЧИНУ (ПРОЄКТИ & ПРАКТИКА)" : "💼 ПРАКТИЧНИЙ ДОСВІД & ПРОЄКТИ");
}

// Допоміжна функція для безпечного оновлення тексту
function updateText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

// ==========================================
// 7. СИНІЙ ЕКРАН СМЕРТІ (BSOD)
// ==========================================
function handleContactClick(event) {
  const isDetective = document.body.classList.contains("detective-mode");

  if (isDetective) {
    event.preventDefault();

    const bsod = document.createElement("div");
    bsod.className = "bsod-overlay";
    bsod.innerHTML = `
      <div class="bsod-sad-face">:(</div>
      <div class="bsod-title">Your system ran into a critical QA bug and needs to restart. We're just collecting some error info, and then we'll redirect you to Telegram.</div>
      <div class="bsod-details">
        <span id="bsod-percent">0%</span> complete<br><br>
        Stop code: BUG_FOUND_CRITICAL_FAILURE<br>
        What failed: Secret_Folder_Access.sys<br><br>
        <span style="color: #ffea00;">RECOMMENDED_ACTION: Hire ME to fix this bug immediately.</span>
      </div>
    `;

    document.body.appendChild(bsod);

    let percent = 0;
    const percentElement = document.getElementById("bsod-percent");

    const interval = setInterval(() => {
      percent += Math.floor(Math.random() * 5) + 1;

      if (percent >= 100) {
        percent = 100;
        if (percentElement) percentElement.innerText = "100%";
        clearInterval(interval);

        setTimeout(() => {
          bsod.remove();
          window.open("https://t.me/kbrnwn", "_blank");
        }, 1500);
      } else {
        if (percentElement) percentElement.innerText = `${percent}%`;
      }
    }, 180);
  }
}

// ==========================================
// 8. ЗНИЩЕННЯ ДОКАЗІВ
// ==========================================
function destroyEvidence() {
  if (confirm("Ви впевнені, що хочете видалити всі докази?")) {
    if (confirm("Рекрутери не зможуть вас знайти! Точно видалити?")) {
      
      // 1. Зупиняємо дощ
      stopRain();

      // 2. Скидаємо стилі Detective Mode
      document.body.classList.remove("detective-mode");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.margin = "0";
      document.body.style.padding = "0";

      // 3. Замінюємо сторінку на чистий білий екран з повідомленням
      document.body.innerHTML = `
        <div style="
          background: #ffffff; 
          height: 100vh; 
          display: flex; 
          flex-direction: column;
          justify-content: center; 
          align-items: center; 
          font-family: 'Courier New', Courier, monospace; 
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
          overflow: hidden;
        ">
          <h1 style="
            color: #1e293b; 
            font-size: clamp(2rem, 8vw, 6rem); 
            font-weight: 900; 
            text-transform: uppercase; 
            letter-spacing: 4px; 
            margin: 0 0 30px 0; 
            width: 100%; 
            line-height: 1.1;
            user-select: none;
          ">
            💥 СПРАВУ ЗНИЩЕНО!
          </h1>

          <a href="index.html" style="
            font-size: 1.1rem; 
            color: #cbd5e1; 
            text-decoration: none; 
            font-weight: 600;
            border: 1px dashed #e2e8f0;
            padding: 10px 20px;
            border-radius: 6px;
            transition: all 0.3s ease;
          " onmouseover="this.style.borderColor='#007bff'; this.style.color='#007bff';" onmouseout="this.style.borderColor='#e2e8f0'; this.style.color='#cbd5e1';">
            [ ВІДНОВИТИ З БЕКАПУ ]
          </a>
        </div> 
      `;
    }
  }
}

// ==========================================
// 9. ПАСХАЛКА DOAKES ("SURPRISE!")
// ==========================================
function initDoakesEasterEgg() {
  const photo = document.getElementById("user-photo");

  if (photo) {
    photo.addEventListener("click", () => {
      if (!document.body.classList.contains("detective-mode")) return;

      photoClickCount++;

      clearTimeout(photoClickTimer);
      photoClickTimer = setTimeout(() => {
        photoClickCount = 0;
      }, 800);

      if (photoClickCount === 3) {
        photoClickCount = 0;

        doakesAudio.currentTime = 0;
        doakesAudio.play().catch((err) => console.log("Audio play blocked:", err));

        photo.style.transform = "scale(1.08) rotate(3deg)";
        photo.style.filter = "brightness(1.3) contrast(1.2)";

        setTimeout(() => {
          photo.style.transform = "";
          photo.style.filter = "";
        }, 600);
      }
    });
  }
}