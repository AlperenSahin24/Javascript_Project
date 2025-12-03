const kartVerileri = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'E', 'F', 'E', 'F'];

class HafizaOyunu {
    constructor() {
        this.panel = document.getElementById('ana-sahne');
        
        this.kartlar = [];
        this.acikKartlar = [];
        this.eslesenSayisi = 0;
        this.hamle = 0;

        this.arayuzOlustur();
        this.oyunuBaslat();
    }

    arayuzOlustur() {
        // Oyun paneli
        this.panel.style.width = '500px';
        this.panel.style.margin = '50px auto';
        this.panel.style.fontFamily = 'Arial, sans-serif';
        this.panel.style.textAlign = 'center';

        // h1 başlık
        let baslik = document.createElement('h1');
        baslik.textContent = 'Hafiza Oyunu';
        baslik.style.color = '#333';
        this.panel.appendChild(baslik);

        // bilgi paneli
        this.bilgiPaneli = document.createElement('div');
        this.bilgiPaneli.style.marginBottom = '20px';
        this.bilgiPaneli.style.display = 'flex';           
        this.bilgiPaneli.style.justifyContent = 'space-between'; 
        this.bilgiPaneli.style.alignItems = 'center';      
        this.bilgiPaneli.style.padding = '0 20px';        
        this.panel.appendChild(this.bilgiPaneli);

        // Hamle sayisi ve skor metini
        let metinKutusu = document.createElement('div');
        metinKutusu.style.fontSize = '18px';
        metinKutusu.innerHTML = 'Hamle: <span id="hamle">0</span> <br> En İyi: <span id="skor">0</span>';
        this.bilgiPaneli.appendChild(metinKutusu);

        //Oyunu yeniden başlatma butonu
        let yenileBtn = document.createElement('button');
        yenileBtn.textContent = 'Yeniden Başlat';
        yenileBtn.style.padding = '10px 20px';
        yenileBtn.style.backgroundColor = '#166fe2ff';
        yenileBtn.style.color = 'white';
        yenileBtn.style.border = 'none';
        yenileBtn.style.borderRadius = '5px';
        yenileBtn.style.cursor = 'pointer';
        yenileBtn.style.fontSize = '16px';
        yenileBtn.style.margin='10px';
        
        //butona efekt ekleme
        yenileBtn.style.transition="transform 0.5s ease";
        yenileBtn.addEventListener("mouseover",()=>{
            yenileBtn.style.transform="scale(1.1)";
        });
         yenileBtn.addEventListener("mouseout",()=>{
            yenileBtn.style.transform="scale(1)";
        });
        yenileBtn.onmouseover = () => yenileBtn.style.backgroundColor = '#051d6eff'; 
        yenileBtn.onmouseout = () => yenileBtn.style.backgroundColor = '#166fe2ff';  
     
        yenileBtn.onclick = () => this.oyunuBaslat();

        this.bilgiPaneli.appendChild(yenileBtn);
     

        
        this.oyunAlani = document.createElement('div');
        this.oyunAlani.style.display = 'flex';
        this.oyunAlani.style.flexWrap = 'wrap';
        this.oyunAlani.style.justifyContent = 'center';
        this.oyunAlani.style.gap = '10px';
        this.panel.appendChild(this.oyunAlani);

        this.skoruGuncelle();
    }

    oyunuBaslat() {
        this.hamle = 0;
        this.eslesenSayisi = 0;
        this.acikKartlar = [];
        
        //Skoru guncelle
        let hamleElement = document.getElementById('hamle');
        if(hamleElement) hamleElement.textContent = this.hamle;

        this.oyunAlani.innerHTML = '';

        let karisikKartlar = [...kartVerileri].sort(() => 0.5 - Math.random());

        karisikKartlar.forEach((harfler) => {
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
            kart.style.userSelect = 'none';
            
            kart.dataset.deger = harfler;
            kart.textContent = '?';

            kart.addEventListener('click', (e) => this.kartaTikla(e.target));
            this.oyunAlani.appendChild(kart);
        });
    }

    kartaTikla(kart) {
        if (kart.style.backgroundColor === 'white' || this.acikKartlar.length === 2) return;

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
            this.acikKartlar = [];
            
            k1.style.backgroundColor = '#4CAF50';
            k1.style.color = 'white';
            k2.style.backgroundColor = '#4CAF50';
            k2.style.color = 'white';

            if (this.eslesenSayisi === kartVerileri.length) {
                setTimeout(() => {
                    alert(`Tebrikler! Bitti. Hamle: ${this.hamle}`);
                    this.skoruKaydet();
                }, 500);
            }
        } else {
            setTimeout(() => {
                k1.style.backgroundColor = '#333';
                k1.style.color = 'white';
                k1.style.border = 'none';
                k1.textContent = '?';

                k2.style.backgroundColor = '#333';
                k2.style.color = 'white';
                k2.style.border = 'none';
                k2.textContent = '?';
                
                this.acikKartlar = [];
            }, 1000);
        }
       
    }

    skoruKaydet() {
        let eskiSkor = localStorage.getItem('enIyiSkor');
        if (!eskiSkor || this.hamle < parseInt(eskiSkor)) {
            localStorage.setItem('enIyiSkor', this.hamle);
            this.skoruGuncelle();
        }
    }

    skoruGuncelle() {
        let skor = localStorage.getItem('enIyiSkor') || '-';
        let skorElement = document.getElementById('skor');
        if(skorElement) skorElement.textContent = skor;
    }
}

new HafizaOyunu();
