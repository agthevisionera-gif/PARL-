async function sendMessage() {
  const responseElement = document.getElementById("response");

  responseElement.innerText = "Carregando...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST"
    });

    const data = await res.json();

    responseElement.innerText = data.message || JSON.stringify(data);

  } catch (error) {
    responseElement.innerText = "Erro ao conectar com API 😢";
  }
}
