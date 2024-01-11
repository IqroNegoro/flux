export const useCheckout = defineStore("checkout", ({
    state: () => ({
        checkout: [],
    }),
    actions: {
        addToCheckout(cart) {
            const i = this.checkout.findIndex(v => v.id === cart.id);
            if (i >= 0) {
                this.checkout.splice(i, 1);
            } else {
                this.checkout.push(cart);
            }
        },
        has(id) {
            return this.checkout.findIndex(v => v.id === id) >= 0;
        },
        qty(cart) {
            const item = this.checkout.find(v => v.id == cart.id);
            if (item) {
                item.quantity = cart.quantity
            }
        },
        delete(id) {
            this.checkout = this.checkout.filter(v => v.id != id)
        }
    }
}))