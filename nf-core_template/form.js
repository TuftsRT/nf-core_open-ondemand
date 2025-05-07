document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("label").forEach((label) => {
    if (label.textContent.trim() === "TOWER_ACCESS_TOKEN (Optional)") {
      label.style.color = "green";
      label.style.fontWeight = "bold";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("label").forEach((label) => {
    if (label.textContent.trim() === "Resume") {
      label.style.color = "green";
      label.style.fontWeight = "bold";
    }
  });
});

