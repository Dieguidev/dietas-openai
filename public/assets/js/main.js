let translateButton = document.querySelector("#translateButton");

translateButton.addEventListener("click", async () => {
  const inputText = document.querySelector("#inputText");

  const text = document.querySelector("#inputText").value.trim();

  const targetLang = document.querySelector("#targetLang").value.trim();
  if (text === "") {
    alert("Por favor, ingresa un texto para traducir.");
    return false;
  }

  const userMessage = document.createElement("div");
  userMessage.className = "chat__message chat__message--user";
  userMessage.textContent = text;

  const messagesContainer = document.querySelector(".chat__messages");
  messagesContainer.appendChild(userMessage);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  try {
    const response = await fetch("api/traducir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        targetLang,
      }),
    });

    const data = await response.json();

    const botMessage = document.createElement("div");
    botMessage.className = "chat__message chat__message--bot";
    botMessage.textContent = data.translatedText;
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } catch (error) {
    console.log(error);
  }

  inputText.value = "";
});
