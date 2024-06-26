let metinler = [{
    başlık: "Spinosauruslar Suda Yaşıyormuş",
    metin: "Spinosaurus adlı dinozorların günümüzden 95 ila 100 milyon yıl önce Kuzey Afrika’da kara üzerinde yaşadığı düşünülüyordu. Ancak geçtiğimiz nisan ayında yayımlanan bir makaleye konu olan çalışma, bu düşünceyi değiştirdi. Bu çalışmada Fas’ın doğusunda yer alan Kem Kem bölgesindeki nehir yataklarında bulunan ve bir Spinosaurus’a ait olduğu anlaşılan kuyruk kemiğinden yola çıkılarak, bu dinozorların suda da yaşadıkları ortaya koyulmuştu. Çalışmaya göre Spinosauruslar kuyruklarını birer kürek gibi kullanarak suda hareket edebiliyordu. Çalışmalarına devam eden araştırmacılar aynı bölgede 1200’den fazla dinozor dişi tespit ettiler. Üstelik bunların yüzde 45’i Spinosauruslara aitti. Bu dişler Kem Kem bölgesinde pek çok Spinosaurus’un yaşadığının kanıtı elbette. Ağustos ayında yayımlanan başka bir makaleye göre bu dişler aynı zamanda, onun suda yaşayan bir canlı olduğunu da gösteriyor. Hatta sayıca bu kadar fazla diş bulmak Spinosaurusların yalnızca su içmek ya da beslenmek için suya girmediğini, yaşamlarını suda geçirdiğini kanıtlıyor."
},
{
    başlık: "Bu Robot Parmak Üç Boyutlu Yazıcıyla Üretildi",
    metin: "Parmaklarımızda bulunan kaslar, tendonlar ve bağ dokular, parmaklarımızı hareket ettirebilmemizi sağlar. ABD'de bulunan Santa Cruz Üniversitesi ve Japonya'da bulunan Ritsumeikan Üniversitesi'nden bilim insanları da parmaklarımızın bu yapısından esinlenerek geçtiğimiz aylarda bir robot parmak üretti. Üç boyutlu yazıcı aracılığıyla üretilen robot parmağın hareket edebilmesi için insan parmaklarında bulunan kemikler, tendonlar, bağ dokuları ve kaslar göz önünde bulundurularak sert ve esnek malzemeler bir arada kullanıldı. Bilim insanları daha sonra bir bilgisayar programı kullanarak robot parmağın modelini oluşturdu. Böylece bilgisayar modellemesindeki robot parmağın hareketleriyle üç boyutlu yazıcıyla üretilen robot parmağın hareketlerini kıyaslayabildiler. Sonuç olarak, ikisinin hareketlerinin birbirleriyle çok uyumlu olduğunu gördüler. Bu çalışma, gelecekte üç boyutlu yazıcılar kullanılarak robot el gibi daha karmaşık robotların yapılabileceğini göstermesi açısından önemli bulunuyor."
},
{
    başlık: "Bilinen en sıradışı gezegenlerden biri",
    metin: "Avrupa Uzay Ajansı'nın CHEOPS adlı uzay teleskobuyla gözlemlenen WASP-189b adlı ötegezegenin yüzey sıcaklığının 3.200 santigrat derece olduğu bulundu. Bu, bir demiri eritip gaz haline getirebilecek kadar yüksek bir sıcaklık! WASP-189b, HD 133112 adlı yıldızın çevresindeki yörüngesinde hareket ediyor ve bu hareketini 3 günden daha kısa sürede tamamlıyor. Dünya'dan yaklaşık 326 ışık yılı uzaklıkta dolanan ve Jüpiter'in 1,6 katı kadar büyük olan gezegenin bir tarafında sürekli gece yaşanırken diğer tarafında sürekli gündüz yaşanıyor! HD 133112 ise çevresinde bir gezegen sistemi bulunan, bilinen en sıcak yıldızlardan biri. "
}
];
const startButton = document.querySelector(".start");
const timerElement = document.querySelector(".timer");
const başlık = document.querySelector(".başlık");
const metin = document.querySelector(".text");
const levelSet = document.querySelector("#level");
const egzersizBitir = document.querySelector(".bitir");
const sonyazı = document.querySelector("#sonyazı");
let timerInterval;
let süre;
let highScore = 0;
let kelimeSayisi;
let oyunAd= "hızlıokuma";

function metinGöster() {
    clearInterval(timerInterval);
    if (levelSet.value === "1") {
        başlık.innerHTML = metinler[0].başlık;
        metin.innerHTML = metinler[0].metin;
    } else if (levelSet.value === "2") {
        başlık.innerHTML = metinler[1].başlık;
        metin.innerHTML = metinler[1].metin;
    } else if (levelSet.value === "3") {
        başlık.innerHTML = metinler[2].başlık;
        metin.innerHTML = metinler[2].metin;
    }
    startTimer();
    kelimeSayisi = kelimeSay();
}



async function saveScore(score) {
    try {
        const response = await fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ score })
        });
        if (response.ok) {
            alert('Score saved');
        } else {
            const errorText = await response.text();
            alert(`Error saving score: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function startTimer() {
    let seconds = 0;
    timerInterval = setInterval(() => {
        seconds++;
        timerElement.textContent = seconds + " saniye";
    }, 1000);
}

function endTimer() {
    süre = parseInt(timerElement.textContent.split(" ")[0]); // Get time in seconds
    clearInterval(timerInterval);
    console.log("Egzersiz süresi: " + süre + " saniye");
    sonYazılar();
    if (süre > highScore) {
        highScore = süre;
        saveScore(highScore);
    }
}

function kelimeSay() {
    let metinIcerik = metin.textContent.trim();
    return metinIcerik.split(/\s+/).length;
}

function sonYazılar() {
    sonyazı.innerHTML = kelimeSayisi + " kelimeyi " + süre + " saniyede okudunuz";
}

startButton.addEventListener("click", function () {
    metinGöster();
});

egzersizBitir.addEventListener("click", function () {
    endTimer();
});
