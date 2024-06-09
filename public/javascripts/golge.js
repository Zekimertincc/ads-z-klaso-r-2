let metin1 = "Hiç sen bir su değirmeninin içini dolaştın mı adaşım?\n" +
"Görülecek şeydir o... Yamulmuş duvarlar, tavana yakın\n" +
"ufacık pencereler ve kalın kalasların üstünde simsiyah bir çatı... Sonra bir sürü çarklar, kocaman taşlar, miller, sıçraya sıçraya dönen tozlu kayışlar... Ve bir köşede birbiri üstüne yığılmış\n" +
"buğday, mısır, çavdar, her çeşitten ekin çuvalları. Karşıda beyaz\n" +
"torbalara doldurulmuş unlar...\n" +
"Taşların yanında, duman halinde, sıcak ve ince zerreler\n" +
"uçuşur. Halbuki döşemedeki küçük kapağı kaldırınca aşağıdan\n" +
"doğru sis halinde soğuk su damlaları insanın yüzüne yayılır...\n" +
"Ya o seslere ne dersin adaşım, her köşeden ayrı ayrı makamlarda çıkıp da kulağa hep birlikte kocaman bir dalga halinde dolan seslere?.. Yukarıdaki tahta oluktan inen sular, kavak\n" +
"ağaçlarında esen kış rüzgân gibi uğuldar, taşlann kâh yükselen, kâh alçalan ağlamaklı sesleri kayışların tokat gibi şaklayışına kanşır... Ve mütemadiyen dönen tahtadan çarklar gıcırdar,\n" +
"gıcırdar\n" +
"Ben çok eskiden böyle bir değirmen görmüştüm adaşım,\n" +
"ama bir daha görmek istemem.";

const startButton = document.querySelector(".start");
const levelSet = document.getElementById("level");
const timerElement = document.querySelector(".timer");
const sahneElement = document.getElementById("sahne");

let index = 0;
let intervalId;
let timerInterval;

startButton.addEventListener("click", function() {
    oyunLoop();
});

function oyunLoop() {
    // Seçilen zorluk seviyesine göre interval süresini belirle
    let intervalTime;
    if (levelSet.value === "1") {
        intervalTime = 1000;
    } else if (levelSet.value === "2") {
        intervalTime = 700;
    } else if (levelSet.value === "3") {
        intervalTime = 500;
    }

    // Metni sahneye ekle
    kelimeEkle();

    // Belirlenen aralıklarla bir sonraki kelimeyi görünür yap
    intervalId = setInterval(kelimeGoster, intervalTime);

    // Zamanlayıcıyı başlat
    const duration = 60000; // 1 dakika (60 saniye) milisaniye cinsinden
    const startTime = new Date().getTime();

    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsed = currentTime - startTime;
        const remaining = duration - elapsed;

        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        timerElement.textContent = `00:${seconds < 10 ? '0' + seconds : seconds}`;

        if (remaining <= 0) {
            clearInterval(timerInterval);
            clearInterval(intervalId);
            timerElement.textContent = "00:00";
            // Egzersiz bittiğinde tüm kelimeleri görünür yap
            document.querySelectorAll('.kelime').forEach(kelime => kelime.classList.add('visible'));
        }
    }, 1000);
}

function kelimeEkle() {
    // Metni boşluklara göre ayır
    let kelimeListesi = metin1.split(" ");
    // Her kelimeyi sahneye ekle
    kelimeListesi.forEach((kelime, index) => {
        let kelimeDiv = document.createElement("div");
        kelimeDiv.className = "kelime";
        kelimeDiv.textContent = kelime;
        kelimeDiv.id = `kelime-${index}`;
        sahneElement.appendChild(kelimeDiv);
    });
}

function kelimeGoster() {
    let kelimeDiv = document.getElementById(`kelime-${index}`);
    if (kelimeDiv) {
        kelimeDiv.classList.add("visible");
        index++;
    } else {
        clearInterval(intervalId);
    }
}
