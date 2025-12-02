const kartVerileri = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'E', 'F', 'E', 'F'];

class HafizaOyunu {
    constructor() {
       
        this.sahne = document.getElementById('ana-sahne');
        
        
        this.kartlar = [];
        this.acikKartlar = [];
        this.eslesenSayisi = 0;
        this.hamle = 0;

       
        this.arayuzOlustur();
        this.oyunuBaslat();
    }

    
    arayuzOlustur() {
        
        this.sahne.style.width = '500px';
        this.sahne.style.margin = '50px auto';
        this.sahne.style.fontFamily = 'Arial, sans-serif';
        this.sahne.style.textAlign = 'center';

        let baslik = document.createElement('h1'); 
        baslik.textContent = 'Hafıza Oyunu';
        baslik.style.color = '#333';
        this.sahne.appendChild(baslik); 

        
        this.bilgiPaneli = document.createElement('div');
        this.bilgiPaneli.style.marginBottom = '20px';
        this.bilgiPaneli.style.fontSize = '18px';
        this.bilgiPaneli.innerHTML = 'Hamle: <span id="hamle">0</span> | En İyi: <span id="skor">0</span>';
        this.sahne.appendChild(this.bilgiPaneli);

       let yenileBtn = document.createElement('button');
        yenileBtn.textContent = 'Yeniden Başlat';
        
      
        yenileBtn.style.padding = '8px 16px';
        yenileBtn.style.backgroundColor = '#6fcf38ff'; 
        yenileBtn.style.color = 'white';
        yenileBtn.style.border = 'none';
        yenileBtn.style.borderRadius = '5px';
        yenileBtn.style.cursor = 'pointer';
        yenileBtn.style.fontSize = '16px';
        
    

     
        yenileBtn.onclick = () => this.oyunuBaslat();

        this.bilgiPaneli.appendChild(yenileBtn);
        this.oyunAlani = document.createElement('div');
        this.oyunAlani.style.display = 'flex';
        this.oyunAlani.style.flexWrap = 'wrap'; 
        this.oyunAlani.style.justifyContent = 'center';
        this.oyunAlani.style.gap = '10px';
        this.sahne.appendChild(this.oyunAlani);

       
        this.skoruGuncelle();
    }

    oyunuBaslat() {
        this.hamle = 0;
        this.eslesenSayisi = 0;
        this.acikKartlar = [];
        document.getElementById('hamle').textContent = this.hamle;
        this.oyunAlani.innerHTML = ''; 

        
        let karisikKartlar = [...kartVerileri].sort(() => 0.5 - Math.random());

        
        karisikKartlar.forEach((emoji, index) => {
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
            
          
            kart.dataset.deger = emoji; 
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
        if (!eskiSkor || this.hamle < eskiSkor) {
            localStorage.setItem('enIyiSkor', this.hamle);
            this.skoruGuncelle();
        }
    }

    skoruGuncelle() {
        let skor = localStorage.getItem('enIyiSkor') || '-'; 
        document.getElementById('skor').textContent = skor;
    }
}


new HafizaOyunu();