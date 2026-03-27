function toggleTheme() {
  document.body.classList.toggle("dark");

  const btn = document.querySelector(".theme-btn");
  btn.innerText = document.body.classList.contains("dark")
    ? "Modo Claro"
    : "Modo Escuro";
}

function toggleFollow(event) {
  const btn = event.target;
  const card = btn.closest(".card");
  const followers = card.querySelector(".followers");

  let count = parseInt(followers.innerText);

  if (!btn.classList.contains("active")) {
    btn.classList.add("active");
    btn.innerText = "Seguindo";
    followers.innerText = count + 1;
  } else {
    btn.classList.remove("active");
    btn.innerText = "Seguir";
    followers.innerText = count - 1;
  }
}

function editProfile(event) {
  const card = event.target.closest(".card");

  // 🔥 fecha todos antes de abrir
  document.querySelectorAll(".edit-form").forEach(form => {
    form.style.display = "none";
  });

  card.querySelector(".edit-form").style.display = "block";
}

function closeEdit(event) {
  const card = event.target.closest(".card");
  card.querySelector(".edit-form").style.display = "none";
}

function selectColor(event) {
  const card = event.target.closest(".card");
  const colors = card.querySelectorAll(".color-options span");

  colors.forEach(c => c.classList.remove("selected"));
  event.target.classList.add("selected");
}

function saveProfile(event) {
  const card = event.target.closest(".card");

  const nameInput = card.querySelector(".edit-name");
  const roleInput = card.querySelector(".edit-role");
  const skillsInput = card.querySelector(".edit-skills");
  const fileInput = card.querySelector(".edit-avatar");

  const name = card.querySelector("h3");
  const role = card.querySelector(".role");
  const skillsDiv = card.querySelector(".skills");

  // Nome e profissão
  if (nameInput.value) name.innerText = nameInput.value;
  if (roleInput.value) role.innerText = roleInput.value;

  // Skills
  if (skillsInput.value) {
    skillsDiv.innerHTML = "";
    skillsInput.value.split(",").forEach(skill => {
      const span = document.createElement("span");
      span.innerText = skill.trim();
      skillsDiv.appendChild(span);
    });
  }

  // Avatar
  if (fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      card.querySelector(".avatar").src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }

  // Cor
  const selectedColor = card.querySelector(".selected");
  if (selectedColor) {
    card.style.background = selectedColor.style.background;
  }

  // Fecha formulário
  card.querySelector(".edit-form").style.display = "none";

  // Limpa campos
  nameInput.value = "";
  roleInput.value = "";
  skillsInput.value = "";
  fileInput.value = "";
}