/**
 * Status Badge Component
 * Menampilkan badge status stok dengan warna sesuai kondisi:
 * - Hijau (Aman): qty >= safety
 * - Oranye (Menipis): qty < safety dan qty > 0
 * - Merah (Kosong): qty == 0
 */

Vue.component('status-badge', {
    template: '#tpl-status-badge',
    props: {
        qty: {
            type: Number,
            required: true
        },
        safety: {
            type: Number,
            required: true
        },
        catatan: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showTooltip: false
        };
    },
    computed: {
        // Tentukan status berdasarkan qty vs safety
        status() {
            if (this.qty === 0) {
                return 'kosong';
            } else if (this.qty < this.safety) {
                return 'menipis';
            } else {
                return 'aman';
            }
        },
        
        // Tentukan class badge
        badgeClass() {
            return {
                'badge': true,
                'safe': this.status === 'aman',
                'warning': this.status === 'menipis',
                'danger': this.status === 'kosong'
            };
        },
        
        // Tentukan text dan icon
        statusText() {
            switch(this.status) {
                case 'aman':
                    return '✓ Aman';
                case 'menipis':
                    return '⚠ Menipis';
                case 'kosong':
                    return '✗ Kosong';
                default:
                    return '?';
            }
        },
        
        // Text untuk hover tooltip
        tooltipText() {
            return `Stok: ${this.qty} | Safety: ${this.safety}`;
        }
    },
    methods: {
        // Method untuk show/hide tooltip
        toggleTooltip() {
            this.showTooltip = !this.showTooltip;
        },
        
        // Method untuk hide tooltip saat mouse leave
        hideTooltip() {
            this.showTooltip = false;
        }
    }
});
