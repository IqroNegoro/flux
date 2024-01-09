export const useCart = defineStore("carts", ({
    state: () => ({
        open: false,
        carts: [],
        limit: 10,
        skip: 0,
        hasNext: true
    }),
    actions: {
        handleState() {
            this.open = !this.open
        },
        async getCarts() {
            if (this.hasNext) {
                const { data, error } = await getCarts({
                    params: {
                        limit: this.limit,
                        skip: this.skip
                    }
                });

                this.carts.push(...data.value);
                
                data.value.length < this.limit ? this.hasNext = false : this.skip += this.limit
                
                return {data, error};
            }
        }
    },
}))