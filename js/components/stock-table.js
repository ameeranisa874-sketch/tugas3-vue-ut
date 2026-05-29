/**
 * Stock Table Component
 * Komponen untuk menampilkan, menambah, mengubah, dan menghapus data stok bahan ajar
 */

Vue.component('ba-stock-table', {
    template: '#tpl-stock-table',
    props: {
        apiData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            // Data lokal (copy dari apiData.stok)
            daftarStok: [],
            
            // Filter state
            filterUpbjj: '',
            filterKategori: '',
            searchKeyword: '',
            
            // Form state (untuk add/edit)
            formMode: 'add', // 'add' atau 'edit'
            isFormVisible: false,
            formData: this.getEmptyFormData(),
            editingIndex: null,
            
            // Kategori available berdasarkan filterUpbjj
            availableCategories: []
        };
    },
    
    computed: {
        // Daftar UPBJJ yang available dari data
        upbjjOptions() {
            return this.apiData.upbjjList || [];
        },
        
        // Kategori default (sebelum filter dependent)
        categoryOptions() {
            return this.apiData.kategoriList || [];
        },
        
        // Kategori yang available setelah memilih UPBJJ (Dependent Options)
        filteredCategoryOptions() {
            if (!this.filterUpbjj) {
                return this.categoryOptions;
            }
            
            // Ambil kategori yang ada di data stok untuk UPBJJ yang dipilih
            const categories = new Set();
            this.daftarStok.forEach(item => {
                if (item.upbjj === this.filterUpbjj) {
                    categories.add(item.kategori);
                }
            });
            
            return this.categoryOptions.filter(cat => categories.has(cat));
        },
        
        // Data stok yang sudah difilter dan dicari
        filteredData() {
            let filtered = this.daftarStok;
            
            // Filter berdasarkan UPBJJ
            if (this.filterUpbjj) {
                filtered = filtered.filter(item => item.upbjj === this.filterUpbjj);
            }
            
            // Filter berdasarkan Kategori (dependent pada UPBJJ)
            if (this.filterKategori) {
                filtered = filtered.filter(item => item.kategori === this.filterKategori);
            }
            
            // Search berdasarkan keyword (kode, judul, atau lokasiRak)
            if (this.searchKeyword) {
                const keyword = this.searchKeyword.toLowerCase();
                filtered = filtered.filter(item => 
                    item.kode.toLowerCase().includes(keyword) ||
                    item.judul.toLowerCase().includes(keyword) ||
                    item.lokasiRak.toLowerCase().includes(keyword)
                );
            }
            
            return filtered;
        }
    },
    
    methods: {
        // Get empty form data
        getEmptyFormData() {
            return {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                harga: 0,
                qty: 0,
                safety: 0,
                catatanHTML: ''
            };
        },
        
        // Reset filter ke kondisi awal
        resetFilter() {
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.searchKeyword = '';
            console.log('Filter direset');
        },
        
        // Tampilkan form untuk add data baru
        showAddForm() {
            this.formMode = 'add';
            this.formData = this.getEmptyFormData();
            this.editingIndex = null;
            this.isFormVisible = true;
        },
        
        // Tampilkan form untuk edit data
        showEditForm(index) {
            this.formMode = 'edit';
            this.editingIndex = index;
            this.formData = JSON.parse(JSON.stringify(this.daftarStok[index]));
            this.isFormVisible = true;
        },
        
        // Simpan data (add atau edit)
        saveData() {
            // Validasi form sederhana
            if (!this.formData.kode || !this.formData.judul) {
                alert('Kode dan Judul harus diisi!');
                return;
            }
            
            if (this.formMode === 'add') {
                // Add mode - tambah data baru
                this.daftarStok.push(JSON.parse(JSON.stringify(this.formData)));
                console.log('Data baru ditambahkan:', this.formData);
            } else {
                // Edit mode - update data existing
                this.$set(this.daftarStok, this.editingIndex, JSON.parse(JSON.stringify(this.formData)));
                console.log('Data diupdate di index:', this.editingIndex);
            }
            
            this.isFormVisible = false;
            this.formData = this.getEmptyFormData();
        },
        
        // Tampilkan modal konfirmasi sebelum delete
        confirmDelete(index) {
            const item = this.daftarStok[index];
            this.$root.$emit('openModal', {
                title: 'Konfirmasi Hapus',
                message: `Apakah Anda yakin ingin menghapus "${item.judul}"?`,
                confirmText: 'Hapus',
                callback: () => this.deleteData(index)
            });
        },
        
        // Hapus data
        deleteData(index) {
            const deleted = this.daftarStok.splice(index, 1);
            console.log('Data dihapus:', deleted);
            alert('Data berhasil dihapus!');
        },
        
        // Handle Enter key pada form
        handleFormKeypress(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.saveData();
            }
        },
        
        // Handle Esc key untuk close form
        handleEscKey(event) {
            if (event.key === 'Escape') {
                this.isFormVisible = false;
            }
        }
    },
    
    watch: {
        // Watcher: ketika UPBJJ berubah, reset kategori filter
        filterUpbjj(newVal) {
            this.filterKategori = '';
            console.log('UPBJJ filter changed to:', newVal);
        }
    },
    
    mounted() {
        // Copy data dari apiData ke data lokal
        this.daftarStok = JSON.parse(JSON.stringify(this.apiData.stok || []));
        console.log('Stock table mounted with data:', this.daftarStok);
        
        // Tambah event listener untuk keyboard shortcuts
        document.addEventListener('keydown', this.handleEscKey);
    },
    
    beforeDestroy() {
        // Remove event listener
        document.removeEventListener('keydown', this.handleEscKey);
    }
});
