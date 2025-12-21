const kartIcerik_3x4 = ['A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F'];
const kartIcerik_4x4 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const DECKS = {
    "3x4": kartIcerik_3x4,
    "4x4": kartIcerik_4x4
};

function karistir(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

class HafizaOyunu {
    constructor() {
        this.sahne = document.getElementById('ana-sahne');
        this.acikKartlar = [];
        this.eslesenSayisi = 0;
        this.hamle = 0;
        this.mod = "3x4";
        this.kilitli = false;
        this.saniye = 0;
        this.zamanlayici = null;
        this.oyunBasladiMi = false;

        this.arayuzOlustur();
        this.baslat("3x4");
    }

    arayuzOlustur() {
        document.body.style.margin = "0";
        document.body.style.minHeight = "100vh";
        document.body.style.display = "flex";
        document.body.style.justifyContent = "center";
        document.body.style.alignItems = "flex-start";
        document.body.style.background =
            "radial-gradient(circle at 20% 20%, rgba(47, 0, 255, 0.25), transparent 40%)," +
            "radial-gradient(circle at 80% 0%, rgba(57, 109, 27, 0.25), transparent 35%)," +
            "linear-gradient(180deg, #0f172a 0%, #111827 60%, #0b1020 100%)";
        document.body.style.backgroundAttachment = "fixed";

        this.sahne.style.width = '600px';
        this.sahne.style.margin = '50px auto';
        this.sahne.style.fontFamily = 'Arial, sans-serif';
        this.sahne.style.textAlign = 'center';

        this.sahne.style.background = "rgba(255,255,255,0.08)";
        this.sahne.style.backdropFilter = "blur(10px)";
        this.sahne.style.border = "1px solid rgba(255,255,255,0.18)";
        this.sahne.style.borderRadius = "18px";
        this.sahne.style.padding = "20px";
        this.sahne.style.boxShadow = "0 20px 60px rgba(0,0,0,0.35)";
        this.sahne.style.color = "white";

        let baslik = document.createElement('h1');
        baslik.textContent = 'Hafıza Oyunu';
        baslik.style.color = "white";
        this.sahne.appendChild(baslik);

        this.bilgiPaneli = document.createElement('div');
        this.bilgiPaneli.style.marginBottom = '20px';
        this.bilgiPaneli.innerHTML = `
            Hamle: <span id="hamle">0</span> | Süre: <span id="timer">0</span>s
        `;
        this.sahne.appendChild(this.bilgiPaneli);

        this.skorTablosuContainer = document.createElement('div');
        this.skorTablosuContainer.style.margin = '20px auto';
        this.skorTablosuContainer.style.padding = '10px';
        this.skorTablosuContainer.style.border = '1px solid rgba(255,255,255,0.18)';
        this.skorTablosuContainer.style.borderRadius = '10px';
        this.skorTablosuContainer.style.backgroundColor = 'rgba(255,255,255,0.08)';
        this.skorTablosuContainer.style.backdropFilter = "blur(8px)";
        this.skorTablosuContainer.style.color = "white";
        this.sahne.appendChild(this.skorTablosuContainer);

        let btn_4x4 = document.createElement('button');
        btn_4x4.textContent = '4x4 oyun';
        this.butonStil(btn_4x4);
        btn_4x4.onclick = () => this.baslat("4x4");
        this.bilgiPaneli.appendChild(btn_4x4);

        let btn_3x4 = document.createElement('button');
        btn_3x4.textContent = '3x4 oyun';
        this.butonStil(btn_3x4);
        btn_3x4.onclick = () => this.baslat("3x4");
        this.bilgiPaneli.appendChild(btn_3x4);

        let yenileBtn = document.createElement('button');
        yenileBtn.textContent = 'Yeniden Başlat';
        this.butonStil(yenileBtn, '#6fcf38ff');
        yenileBtn.onclick = () => this.baslat(this.mod);
        this.bilgiPaneli.appendChild(yenileBtn);

        this.oyunAlani = document.createElement('div');
        this.oyunAlani.style.display = 'grid';
        this.oyunAlani.style.justifyContent = 'center';
        this.oyunAlani.style.gap = '10px';
        this.sahne.appendChild(this.oyunAlani);

        this.skorTablosunuCiz();
    }

    butonStil(btn, color = '#0051ffff') {
        btn.style.padding = '12px 16px';
        btn.style.margin = '10px';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.backgroundColor = color;
        btn.style.color = 'white';
        btn.style.cursor = 'pointer';
        btn.style.transition = "transform 0.3s ease";
        btn.addEventListener("mouseover", () => btn.style.transform = "scale(1.1)");
        btn.addEventListener("mouseout", () => btn.style.transform = "scale(1)");
    }

    timerBaslat() {
        this.oyunBasladiMi = true;
        this.zamanlayici = setInterval(() => {
            this.saniye++;
            document.getElementById('timer').textContent = this.saniye;
        }, 1000);
    }

    timerDurdur() {
        clearInterval(this.zamanlayici);
        this.oyunBasladiMi = false;
    }

    baslat(mod) {
        this.timerDurdur();
        this.saniye = 0;
        document.getElementById('timer').textContent = "0";
        this.mod = mod;
        this.hamle = 0;
        this.eslesenSayisi = 0;
        this.acikKartlar = [];
        this.kilitli = false;
        document.getElementById('hamle').textContent = this.hamle;
        this.oyunAlani.innerHTML = '';

        this.oyunAlani.style.gridTemplateColumns = 'repeat(4, 100px)';

        const karisikKartlar = karistir(DECKS[mod]);
        karisikKartlar.forEach((deger) => {
            let kart = document.createElement('div');
            kart.style.width = '100px';
            kart.style.height = '100px';
            kart.style.backgroundColor = '#333';
            kart.style.color = 'white';
            kart.style.fontSize = '40px';
            kart.style.display = 'flex';
            kart.style.justifyContent = 'center';
            kart.style.alignItems = 'center';
            kart.style.cursor = 'pointer';
            kart.style.borderRadius = '10px';

            kart.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
            kart.style.userSelect = "none";

            kart.dataset.deger = deger;
            kart.dataset.durum = "hidden";
            kart.textContent = '?';
            kart.addEventListener('click', () => this.kartaTikla(kart));
            this.oyunAlani.appendChild(kart);
        });

        this.skorTablosunuCiz();
    }

    kartaTikla(kart) {
        if (this.kilitli || kart.dataset.durum !== "hidden" || this.acikKartlar.length === 2) return;
        if (!this.oyunBasladiMi) this.timerBaslat();

        kart.animate([
            { transform: 'rotateY(0deg)' },
            { transform: 'rotateY(180deg)' }
        ], {
            duration: 300,
            iterations: 1
        });

        kart.dataset.durum = "open";
        kart.style.backgroundColor = 'white';
        kart.style.color = 'black';
        kart.style.border = '2px solid #333';
        kart.textContent = kart.dataset.deger;
        this.acikKartlar.push(kart);

        if (this.acikKartlar.length === 2) {
            this.hamle++;
            document.getElementById('hamle').textContent = this.hamle;
            this.kontrolEt();
        }
    }

    kontrolEt() {
        const [k1, k2] = this.acikKartlar;
        if (k1.dataset.deger === k2.dataset.deger) {
            this.eslesenSayisi += 2;
            k1.dataset.durum = "matched";
            k2.dataset.durum = "matched";
            k1.style.backgroundColor = '#4CAF50';
            k2.style.backgroundColor = '#4CAF50';
            k1.style.color = 'white';
            k2.style.color = 'white';
            this.acikKartlar = [];

            if (this.eslesenSayisi === DECKS[this.mod].length) {
                this.timerDurdur();
                setTimeout(() => {
                    alert(`Tebrikler! Hamle: ${this.hamle} | Süre: ${this.saniye}s`);
                    this.skoruKaydet();
                }, 400);
            }
        } else {
            this.kilitli = true;

            k1.style.backgroundColor = '#ff0000ff';
            k2.style.backgroundColor = '#ff0000ff';

            setTimeout(() => {
                [k1, k2].forEach(k => {
                    k.style.transition = "transform 0.3s ease, background-color 0.3s ease";
                    k.style.transform = "rotateY(0deg)";
                    k.dataset.durum = "hidden";
                    k.style.backgroundColor = '#333';
                    k.style.color = 'white';
                    k.style.border = 'none';
                    k.textContent = '?';
                });

                this.acikKartlar = [];
                this.kilitli = false;
            }, 800);
        }
    }

    skoruKaydet() {
        const keyHamle = `enIyiSkor_${this.mod}`;
        const keySure = `enIyiSure_${this.mod}`;
        const eskiHamle = localStorage.getItem(keyHamle);
        const eskiSure = localStorage.getItem(keySure);

        if (!eskiHamle || this.hamle < parseInt(eskiHamle)) localStorage.setItem(keyHamle, String(this.hamle));
        if (!eskiSure || this.saniye < parseInt(eskiSure)) localStorage.setItem(keySure, String(this.saniye));

        this.skorTablosunuCiz();
    }

    skorTablosunuCiz() {
        const h3x4 = localStorage.getItem('enIyiSkor_3x4') || '-';
        const s3x4 = localStorage.getItem('enIyiSure_3x4') || '-';
        const h4x4 = localStorage.getItem('enIyiSkor_4x4') || '-';
        const s4x4 = localStorage.getItem('enIyiSure_4x4') || '-';

        this.skorTablosuContainer.innerHTML = `
            <h3 style="margin:5px 0; color:white;">Genel Skor Tablosu</h3>
            <table style="width:100%; border-collapse:collapse; text-align:center; color:white;">
                <thead>
                    <tr style="border-bottom:1px solid rgba(255,255,255,0.18);">
                        <th>Mod</th><th>En İyi Hamle</th><th>En İyi Süre</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><strong>3x4</strong></td><td>${h3x4}</td><td>${s3x4}s</td></tr>
                    <tr><td><strong>4x4</strong></td><td>${h4x4}</td><td>${s4x4}s</td></tr>
                </tbody>
            </table>
        `;
    }
}

new HafizaOyunu();
