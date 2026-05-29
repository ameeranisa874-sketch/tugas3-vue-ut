/**
 * DO Tracking Component
 * Komponen untuk mencari dan melacak status pengiriman DO (Delivery Order)
 */

Vue.component('do-tracking', {
    template: '#tpl-do-tracking',
    props: {
        apiData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            // Data lokal (copy dari apiData.tracking)
            trackingData: [],
            
            // Search state
            searchQuery: '',
            searchType: 'doNumber', // 'doNumber' atau 'nim'
            searchResult: null,
            hasSearched: false,
            
            // Form state untuk add DO baru
            isAddFormVisible: false,
            newDoData: this.getEmptyDoData()
        };
    },
    
    computed: {
        // Placeholder text berdasarkan search type
        searchPlaceholder() {
            return this.searchType === 'doNumber' 
                ? 'Cari Nomor DO (contoh: DO2025-0001)' 
                : 'Cari NIM Mahasiswa (contoh: 123456789)';
        },
        
        // Hasil pencarian berdasarkan search type
        foundTracking() {
            if (!this.searchQuery || !this.hasSearched) {
                return null;
            }
            
            const query = this.searchQuery.toLowerCase();
            
            if (this.searchType === 'doNumber') {
                // Cari berdasarkan nomor DO (object key)
                for (let obj of this.trackingData) {
                    for (let doNumber in obj) {
                        if (doNumber.toLowerCase().includes(query)) {
                            return {
                                doNumber: doNumber,
                                data: obj[doNumber]
                            };
                        }
                    }
                }
            } else if (this.searchType === 'nim') {
                // Cari berdasarkan NIM
                for (let obj of this.trackingData) {
                    for (let doNumber in obj) {
                        if (obj[doNumber].nim && obj[doNumber].nim.includes(query)) {
                            return {
                                doNumber: doNumber,
                                data: obj[doNumber]
                            };
                        }
                    }
                }
            }
            
            return null;
        },
        
        // Status styling berdasarkan status DO
        statusClass() {
            if (!this.foundTracking) return '';
            
            const status = this.foundTracking.data.status;
            
            if (status.includes('Terima')) return 'status-delivered';
            if (status.includes('Dalam')) return 'status-shipping';
            if (status.includes('Penolakan')) return 'status-rejected';
            
            return 'status-pending';
        }
    },
    
    methods: {
        // Get empty DO data
        getEmptyDoData() {
            return {
                nim: '',
                nama: '',
                status: 'Pending',
                ekspedisi: 'JNE',
                tanggalKirim: new Date().toISOString().split('T')[0],
                paket: '',
                total: 0,
                perjalanan: []
            };
        },
        
        // Handle Enter key pada search
        handleSearchKeypress(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.performSearch();
            }
        },
        
        // Handle Esc key untuk reset search
        handleEscKey(event) {
            if (event.key === 'Escape') {
                this.resetSearch();
            }
        },
        
        // Perform search
        performSearch() {
            if (!this.searchQuery.trim()) {
                alert('Silakan masukkan ' + (this.searchType === 'doNumber' ? 'Nomor DO' : 'NIM'));
                return;
            }
            
            this.hasSearched = true;
            console.log(`Searching by ${this.searchType}:`, this.searchQuery);
            
            if (!this.foundTracking) {
                console.log('No matching tracking found');
            }
        },
        
        // Reset search
        resetSearch() {
            this.searchQuery = '';
            this.searchResult = null;
            this.hasSearched = false;
            this.searchType = 'doNumber';
            console.log('Search reset');
        },
        
        // Toggle search type
        toggleSearchType() {
            this.searchType = this.searchType === 'doNumber' ? 'nim' : 'doNumber';
            this.searchQuery = '';
            this.hasSearched = false;
        },
        
        // Show form untuk add DO baru
        showAddForm() {
            this.isAddFormVisible = true;
            this.newDoData = this.getEmptyDoData();
        },
        
        // Add DO baru
        addDo() {
            // Validasi
            if (!this.newDoData.nim || !this.newDoData.nama) {
                alert('NIM dan Nama harus diisi!');
                return;
            }
            
            // Generate nomor DO
            const doNumber = this.$root.generateDoNumber();
            
            // Buat object DO baru
            const newDo = {};
            newDo[doNumber] = {
                ...this.newDoData,
                perjalanan: [{
                    waktu: new Date().toLocaleString('id-ID'),
                    keterangan: 'DO dibuat'
                }]
            };
            
            // Tambah ke tracking data
            this.trackingData.push(newDo);
            
            console.log('DO baru ditambahkan:', doNumber, newDo);
            alert(`DO baru berhasil dibuat: ${doNumber}`);
            
            this.isAddFormVisible = false;
            this.newDoData = this.getEmptyDoData();
        },
        
        // Format tanggal untuk display
        formatDateTime(dateTimeString) {
            if (!dateTimeString) return '';
            
            const date = new Date(dateTimeString);
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            
            return date.toLocaleDateString('id-ID', options);
        }
    },
    
    mounted() {
        // Copy data dari apiData ke data lokal
        this.trackingData = JSON.parse(JSON.stringify(this.apiData.tracking || []));
        console.log('DO Tracking mounted with data:', this.trackingData);
        
        // Tambah event listener untuk keyboard shortcuts
        document.addEventListener('keydown', this.handleEscKey);
    },
    
    beforeDestroy() {
        // Remove event listener
        document.removeEventListener('keydown', this.handleEscKey);
    }
});
