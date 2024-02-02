export const useCheckout = defineStore("checkout", ({
    state: () => ({
        items: [],
    }),
    actions: {
        addToItems(cart) {
            const i = this.items.findIndex(v => v.id === cart.id);
            if (i >= 0) {
                this.items.splice(i, 1);
            } else {
                this.items.push(cart);
            }
        },
        has(id) {
            return this.items.findIndex(v => v.id === id) >= 0;
        },
        qty(cart) {
            const item = this.items.find(v => v.id == cart.id);
            if (item) {
                item.quantity = cart.quantity
            }
        },
        delete(id) {
            this.items = this.items.filter(v => v.id != id)
        },
        clear() {
            this.items = [];
        }
    }
}))