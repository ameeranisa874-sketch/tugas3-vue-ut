/**
 * Order Form Component
 * Komponen untuk membuat pemesanan bahan ajar baru
 */

Vue.component('order-form', {
    template: '#tpl-order-form',
    props: {
        apiData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            // Form data
            form: {
                nim: '',
                nama: '',
                upbjj: '',
                paket: '',
                qty: 1,
                notes: ''
            },
            
            // Form state
            isSubmitted: false,
            submittedData: null,
            selectedPaket: null
        };
    },
    
    computed: {
        // UPBJJ options dari data
        upbjjOptions() {
            return this.apiData.upbjjList || [];
        },
        
        // Paket options dari data
        paketOptions() {
            return this.apiData.paket || [];
        },
        
        // Detail paket yang dipilih
        selectedPaketDetail() {
            if (!this.form.paket) return null;
            return this.paketOptions.find(p => p.kode === this.form.paket);
        },
        
        // Total harga (harga paket * qty)
        totalPrice() {
            if (!this.selectedPaketDetail) return 0;
            return this.selectedPaketDetail.harga * this.form.qty;
        },
        
        // Validasi form
        isFormValid() {
            return this.form.nim && 
                   this.form.nama && 
                   this.form.upbjj && 
                   this.form.paket && 
                   this.form.qty > 0;
        }
    },
    
    methods: {
        // Validasi NIM (harus 9 digit)
        validateNim(nim) {
            return /^\d{9}$/.test(nim);
        },
        
        // Submit form
        submitForm() {
            // Validasi NIM
            if (!this.validateNim(this.form.nim)) {
                alert('NIM harus berupa 9 digit angka!');
                return;
            }
            
            // Validasi form
            if (!this.isFormValid) {
                alert('Harap lengkapi semua field yang diperlukan!');
                return;
            }
            
            // Simpan data yang dikirim
            this.submittedData = JSON.parse(JSON.stringify(this.form));
            this.submittedData.totalPrice = this.totalPrice;
            this.submittedData.paketNama = this.selectedPaketDetail.nama;
            this.submittedData.paketIsi = this.selectedPaketDetail.isi;
            this.submittedData.tanggalPesan = new Date().toLocaleString('id-ID');
            
            console.log('Order submitted:', this.submittedData);
            this.isSubmitted = true;
            
            // Auto-reset setelah 3 detik
            setTimeout(() => this.resetForm(), 3000);
        },
        
        // Reset form
        resetForm() {
            this.form = {
                nim: '',
                nama: '',
                upbjj: '',
                paket: '',
                qty: 1,
                notes: ''
            };
            this.isSubmitted = false;
            this.submittedData = null;
        },
        
        // Handle Enter key pada form
        handleFormKeypress(event) {
            if (event.key === 'Enter' && event.ctrlKey) {
                event.preventDefault();
                this.submitForm();
            }
        }
    },
    
    mounted() {
        console.log('Order form mounted');
    }
});