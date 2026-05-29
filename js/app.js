/**
 * Root Vue Instance & Application State Management
 * Mengelola state tab dan koordinasi antar komponen
 */

// Registrasi Vue Filters (Vue Filters untuk formatting)
Vue.filter('currency', function(value) {
    if (!value) return 'Rp0';
    return 'Rp' + parseInt(value).toLocaleString('id-ID');
});

Vue.filter('unit', function(value) {
    if (!value && value !== 0) return '0 buah';
    return value + ' buah';
});

Vue.filter('formatDate', function(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
});

// Root Vue Instance
const app = new Vue({
    el: '#app',
    data: {
        // Tab Navigation
        activeTab: 'stok', // 'stok' | 'tracking' | 'order'
        
        // API Data
        apiData: null,
        isLoading: true,
        apiError: null,
        
        // Local state untuk tracking counter
        doCounter: 1
    },
    
    computed: {
        // Computed untuk halaman yang aktif
        isStokTabActive() {
            return this.activeTab === 'stok';
        },
        isTrackingTabActive() {
            return this.activeTab === 'tracking';
        },
        isOrderTabActive() {
            return this.activeTab === 'order';
        }
    },
    
    methods: {
        // Method untuk mengubah tab aktif
        switchTab(tabName) {
            this.activeTab = tabName;
            console.log('Switched to tab:', tabName);
        },
        
        // Method untuk fetch data dari API
        async loadData() {
            this.isLoading = true;
            this.apiError = null;
            
            const result = await ApiService.fetchData();
            
            if (result.success) {
                this.apiData = result.data;
                console.log('Data loaded successfully:', this.apiData);
            } else {
                console.warn('Failed to fetch data, using mock data');
                this.apiData = ApiService.getMockData();
            }
            
            this.isLoading = false;
        },
        
        // Method untuk generate nomor DO otomatis
        generateDoNumber() {
            const year = new Date().getFullYear();
            const sequence = String(this.doCounter).padStart(4, '0');
            this.doCounter++;
            return `DO${year}-${sequence}`;
        }
    },
    
    watch: {
        // Watcher 1: Monitor perubahan activeTab
        activeTab(newTab, oldTab) {
            console.log(`Tab changed from '${oldTab}' to '${newTab}'`);
            // Bisa tambah logic tambahan saat tab berubah
        },
        
        // Watcher 2: Monitor perubahan apiData
        apiData(newData) {
            if (newData) {
                console.log('API Data updated:', newData);
            }
        }
    },
    
    created() {
        // Lifecycle hook - dipanggil saat instance dibuat
        this.loadData();
    },
    
    mounted() {
        // Lifecycle hook - dipanggil saat DOM sudah siap
        console.log('Vue app mounted successfully');
    }
});
