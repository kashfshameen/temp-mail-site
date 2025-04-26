function copyEmail() {
  const emailInput = document.getElementById("email");
  emailInput.select();
  emailInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Email copied: " + emailInput.value);
}
