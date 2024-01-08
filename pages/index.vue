<template>
    <div class="p-4">
        <div class="grid grid-cols-4 grid-flow-row gap-4" v-if="!pending">
            <ProductCard v-for="product in products" :product="product" :key="product.id" />
            <!-- <ClientOnly style="height:100vh; width:100vw"> -->
                <!-- <LMap
                  ref="map"
                  :center="[47.21322, -1.559482]"
                >
                  <LTileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                    layer-type="base"
                    name="OpenStreetMap"
                  />
                </LMap> -->
              <!-- </ClientOnly> -->
        </div>
    </div>
</template>
<script setup>
const user = useUser();
const { data: products, pending, error, refresh } = await getProducts();
useHead({
    title: "Flux Store"
})
</script>