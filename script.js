const jokeText = document.getElementById("jokeText");
const getJokeBtn = document.getElementById("getJoke");
const copyBtn = document.getElementById("copyJoke");
const toggleSwitch = document.getElementById("toggleTheme");
const toggleIcon = document.querySelector(".toggle-icon");

// API: https://v2.jokeapi.dev/joke/Any
async function fetchJoke() {
  jokeText.textContent = "Loading joke... 😂";

  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart,single");
    const data = await res.json();

    if (data.type === "single") {
      jokeText.textContent = data.joke;
    } else {
      jokeText.textContent = `${data.setup} 😂\n${data.delivery}`;
    }
  } catch (err) {
    jokeText.textContent = "Failed to load joke. 😢 Check your internet.";
  }
}

getJokeBtn.addEventListener("click", fetchJoke);

copyBtn.addEventListener("click", () => {
  const text = jokeText.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => (copyBtn.textContent = "📋 Copy"), 1500);
  });
});

// Toggle theme logic
toggleSwitch.addEventListener("change", () => {
  const isDark = toggleSwitch.checked;
  document.body.classList.toggle("dark", isDark);
  toggleIcon.textContent = isDark ? "🌙" : "🌞";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";
  document.body.classList.toggle("dark", isDark);
  toggleSwitch.checked = isDark;
  toggleIcon.textContent = isDark ? "🌙" : "🌞";
});
