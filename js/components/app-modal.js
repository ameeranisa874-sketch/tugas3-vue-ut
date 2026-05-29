/**
 * Modal Component
 * Pop-up konfirmasi untuk action seperti delete data
 * Penggunaan:
 * - this.$root.$emit('openModal', {title, message, confirmText, callback})
 */

Vue.component('app-modal', {
    template: '#tpl-app-modal',
    data() {
        return {
            isOpen: false,
            title: '',
            message: '',
            confirmText: 'Hapus',
            onConfirm: null
        };
    },
    methods: {
        /**
         * Open modal dengan custom message dan callback
         * @param {Object} config - {title, message, confirmText, callback}
         */
        open(config = {}) {
            this.title = config.title || 'Konfirmasi';
            this.message = config.message || 'Apakah Anda yakin?';
            this.confirmText = config.confirmText || 'Hapus';
            this.onConfirm = config.callback || null;
            this.isOpen = true;
        },
        
        /**
         * Close modal
         */
        close() {
            this.isOpen = false;
            this.onConfirm = null;
        },
        
        /**
         * Confirm action dan jalankan callback
         */
        confirm() {
            if (this.onConfirm && typeof this.onConfirm === 'function') {
                this.onConfirm();
            }
            this.close();
        }
    },
    
    mounted() {
        // Register event listener untuk buka modal dari komponen lain
        this.$root.$on('openModal', this.open);
    },
    
    beforeDestroy() {
        // Cleanup event listener
        this.$root.$off('openModal', this.open);
    }
});
