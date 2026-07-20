// 🌧️ 1. Глобальна змінна для таймера дощу (ОБОВ'ЯЗКОВО НА ПОЧАТКУ ФАЙЛУ!)
let rainInterval = null;
// 🕵️‍♂️ Логіка завантаження POLICE DATABASE
function runInitialLoader() {
  const overlay = document.getElementById("loader-overlay");
  const fill = document.getElementById("progress-fill");
  const percentText = document.getElementById("progress-text");
  const statusText = document.getElementById("loader-status");

  if (!overlay) return;

  let progress = 0;

  const interval = setInterval(() => {
    // Пришвидшуємо прогрес випадковими кроками для реалістичності
    progress += Math.floor(Math.random() * 2) + 3;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Фінальний статус перед зниканням
      if (statusText) statusText.innerText = "ACCESS GRANTED.";

      // Затримка 400ms на 100%, потім плавно ховаємо
      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 600);
    }

    // Зміна тексту статусу по ходу завантаження
    if (progress > 30 && progress < 70) {
      if (statusText) statusText.innerText = "Checking permissions...";
    } else if (progress >= 70 && progress < 100) {
      if (statusText) statusText.innerText = "Loading investigation...";
    }

    // Оновлюємо ширину смуги та відсотки
    if (fill) fill.style.width = progress + "%";
    if (percentText) percentText.innerText = progress + "%";
  }, 60); // Швидкість заповнення (усього ~1.5 - 2 секунди)
}

// Запускаємо лоадер одразу після завантаження DOM
document.addEventListener("DOMContentLoaded", () => {
  runInitialLoader();
});
// 📸 2. Функція створення однієї краплі
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

// 🔄 3. Перемикач режимів
function toggleMode() {
  document.body.classList.toggle("detective-mode");

  const isDetective = document.body.classList.contains("detective-mode");

  // 🌧️ Вмикаємо/Вимикаємо дощ
  if (isDetective) {
    if (!rainInterval) {
      rainInterval = setInterval(createRainDrop, 40);
    }
  } else {
    clearInterval(rainInterval);
    rainInterval = null;
    document.querySelectorAll(".rain-drops").forEach(drop => drop.remove());
  }

  // 📸 Зміна фотографії
  const photo = document.getElementById("user-photo");
  if (photo) {
    photo.src = isDetective ? "assets/avatar-detective.jpg" : "assets/avatar.jpg";
  }

    // 📄 🔒 ПІДМІНА ФАЙЛУ ЗАВАНТАЖЕННЯ (HR vs SCP)
const pdfBtn = document.getElementById("btn-pdf");
  if (pdfBtn) {
    if (isDetective) {
      pdfBtn.setAttribute("href", "assets/Clasified-resume.pdf");
      pdfBtn.setAttribute("download", "Clasified_resume_RESTRICTED.pdf");
      pdfBtn.innerText = "🛑 [CLASSIFIED] SCP DOSSIER (PDF)";
    } else {
      pdfBtn.setAttribute("href", "assets/Resume.pdf");
      pdfBtn.setAttribute("download", "CV_QA_Engineer.pdf");
      pdfBtn.innerText = "📄 Завантажити CV (PDF)";
    }
  }
    
  document.getElementById("user-name").innerText = isDetective
    ? "ДОСЬЄ №028 // CLASSIFIED"
    : "Tetiana Tolkachova";
  document.getElementById("page-title").innerText = isDetective
    ? "🔎 МАТЕРІАЛИ РОЗСЛІДУВАННЯ: BUG HUNTER"
    : "JUNIOR MANUAL QA ENGINEER";

  document.getElementById("section-main-title").innerText = isDetective
    ? "🕵️‍♀️ МАТЕРІАЛИ СПРАВИ: ПОШУК ТА ЛІКВІДАЦІЯ БАГІВ"
    : "📌 РЕЗЮМЕ / ПРОФЕСІЙНИЙ ПРОФІЛЬ";
  document.getElementById("title-summary").innerText = isDetective
    ? "📁 ОСОБОВА СПРАВА ПІДОЗРЮВАНОГО"
    : "👤 ІНФОРМАЦІЯ ПРО МЕНЕ";
  document.getElementById("text-summary").innerText = isDetective
    ? "Ціль: Впровадитися в IT-сектор, зламати опір багів та вивести якість софту на чисту воду. Надійна, уважна до найдрібніших деталей, стійка до стрес-тестів."
    : "Цілеспрямована QA спеціалістка з аналітичним мисленням. Маю досвід розробки тестової документації, пошуку та локалізації дефектів. Орієнтована на якість продукту.";

  document.getElementById("title-skills").innerText = isDetective
    ? "🗂 РЕЧОВІ ДОКАЗИ (HARD SKILLS)"
    : "🛠 ТЕХНІЧНІ НАВИЧКИ (HARD SKILLS)";
  document.getElementById("title-education").innerText = isDetective
    ? "📂 СПЕЦПІДГОТОВКА (EDUCATION)"
    : "🎓 ОСВІТА (EDUCATION)";
  document.getElementById("edu-academy-desc").innerText = isDetective
    ? "Спеціалізація: Manual QA."
    : "Курс: Manual Quality Assurance";

  document.getElementById("title-languages").innerText = isDetective
    ? "🗣 ШИФРУВАННЯ (LANGUAGES)"
    : "🌐 ВОЛОДІННЯ МОВАМИ (LANGUAGES)";
  document.getElementById("lang-eng-level").innerText = isDetective
    ? "B1 - Intermediate (Дешифрування без словника)"
    : "B1 - Intermediate";

  document.getElementById("title-projects").innerText = isDetective
    ? "🗃 АРХІВ ЗАКРИТИХ СПРАВ (ПРОЄКТИ & ПРАКТИКА)"
    : "💼 ПРАКТИЧНИЙ ДОСВІД & ПРОЄКТИ";

  document.getElementById("btn-pdf").innerText = isDetective
    ? "📄 Скачати PDF"
    : "📄 Завантажити CV (PDF)";
  document.getElementById("btn-contact").innerText = isDetective
    ? "🔐 Секретна папка / BUGS"
    : "💬 Зв'язатися в Telegram";
}

// 2. Синій екран смерті (BSOD) для секретної папки
function handleContactClick(event) {
  const isDetective = document.body.classList.contains("detective-mode");

  if (isDetective) {
    event.preventDefault(); // Зупиняємо звичайний перехід

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
        percentElement.innerText = "100%";
        clearInterval(interval);

        setTimeout(() => {
          bsod.remove();
          window.open("https://t.me/kbrnwn", "_blank");
        }, 1500);

      } else {
        percentElement.innerText = `${percent}%`;
      }
    }, 180);
  }
}

 
// 3. Знищення доказів (Величезний світло-сірий заголовок)
function destroyEvidence() {
    if (confirm("Ви впевнені, що хочете видалити всі докази?")) {
        if (confirm("Рекрутери не зможуть вас знайти! Точно видалити?")) {
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
          <!-- Чіткий і яскравий заголовок -->
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

          <!-- "Напівпрозора" світло-сіра кнопка відновлення -->
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
        // Змінна для збереження інтервалу дощу
        let rainInterval = null;

        // Функція генерації однієї краплі
        function createRainDrop() {
            // Дощ йде тільки якщо включений Detective Mode
            if (!document.body.classList.contains("detective-mode")) return;

            const drop = document.createElement("span");
            drop.classList.add("rain-drops");

            // Випадкова позиція по ширині екрана (від 0% до 100%)
            drop.style.left = Math.random() * window.innerWidth + "px";

            // Випадкова тривалість падіння (від 0.7s до 1.3s) для реалістичності
            const duration = Math.random() * 0.6 + 0.7;
            drop.style.animationDuration = duration + "s";

            document.body.appendChild(drop);

            // Видаляємо краплю після завершення анімації
            setTimeout(() => {
                drop.remove();
            }, duration * 1000);
        }
    }
    // 🔦 1. Функція перемикання ліхтарика
    function toggleTorch() {
        document.body.classList.toggle("torch-active");
        const isTorchOn = document.body.classList.contains("torch-active");
  
        const torchBtn = document.getElementById("btn-torch");
        if (torchBtn) {
            torchBtn.innerText = isTorchOn ? "💡 Вимкнути ліхтарик" : "🔦 Увімкнути ліхтарик";
        }
    }
}