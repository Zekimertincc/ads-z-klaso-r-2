document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector(".start");
    const sahne = document.getElementById("sahne");
    const inputKelime = document.getElementById("inputKelime");
    const kelimeListesi = ["Merhaba", "Dünya", "Takistoskop", "Çalışma", "Test"];
    let currentIndex = 0;
    let currentWord;

    // Tuşa basıldığında işlemi başlat
    startButton.addEventListener("click", function() {
        currentIndex = 0;
        inputKelime.value = ""; // Input alanını temizle
        showNextWord();
    });

    // Sonraki kelimeyi göster
    function showNextWord() {
        // Eğer tüm kelimeleri gösterdikse işlemi sonlandır
        if (currentIndex >= kelimeListesi.length) return;

        // Önceki kelimenin borderını kaldır
        if (currentWord) currentWord.classList.remove("blink");

        // Yeni kelimeyi oluştur
        const kelimeDiv = document.createElement("div");
        kelimeDiv.classList.add("kelimeDiv");
        kelimeDiv.textContent = kelimeListesi[currentIndex];
        sahne.appendChild(kelimeDiv);

        // Kelimeyi mavi border ile yanıp söndür
        setTimeout(() => {
            kelimeDiv.classList.add("blink");
        }, 100);

        // Gelecek kelimeyi göstermek için zamanlayıcı
        setTimeout(() => {
            // Eğer kullanıcı kelimeyi yanlış girdiyse
            if (inputKelime.value !== kelimeListesi[currentIndex]) {
                kelimeDiv.classList.add("wrong"); // Yanlış girilen kelimenin stilini değiştir
            }
        }, 3000); // 3 saniye sonra kelimeyi kaldır
    }
});
