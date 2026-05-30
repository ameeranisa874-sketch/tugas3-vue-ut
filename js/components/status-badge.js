/**
 * Status Badge Component
 * Menampilkan status stok dengan warna dan tooltip
 * Status: SAFE (qty > safety), WARNING (qty <= safety), DANGER (qty = 0)
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
        // Status berdasarkan qty dan safety
        status() {
            if (this.qty === 0) {
                return 'DANGER';
            } else if (this.qty <= this.safety) {
                return 'WARNING';
            } else {
                return 'SAFE';
            }
        },
        
        // CSS class untuk badge
        badgeClass() {
            return `badge ${this.status.toLowerCase()}`;
        },
        
        // Text status
        statusText() {
            if (this.status === 'SAFE') {
                return '✅ Aman';
            } else if (this.status === 'WARNING') {
                return '⚠️ Perlu Reorder';
            } else {
                return '❌ Stok Habis';
            }
        },
        
        // Tooltip text
        tooltipText() {
            return `Qty: ${this.qty}, Safety: ${this.safety}`;
        }
    },
    methods: {
        // Toggle tooltip
        toggleTooltip() {
            this.showTooltip = !this.showTooltip;
        },
        
        // Hide tooltip
        hideTooltip() {
            this.showTooltip = false;
        }
    }
});
