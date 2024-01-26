<template>
    <div class="w-full h-screen px-4 text-center snap-y overflow-y-auto snap-mandatory">
      <nav class="px-2 fixed z-10 bg-white top-0 left-0 w-full h-16 flex justify-between items-center font-medium">
        <h1 class="text-xl">Flux</h1>
        <div class="flex flex-row gap-2">
          <NuxtLink :to="{name: 'shop'}" class="border border-primary px-4 py-1 hover:bg-primary hover:text-white">Shop</NuxtLink>
          <NuxtLink :to="{name: 'register'}" class="bg-primary px-4 py-1 text-white rounded-sm">Register</NuxtLink>
        </div>
      </nav>
      <div class="w-full h-screen flex snap-center justify-center md:justify-around items-center flex-col md:flex-row gap-4">
        <div class="w-full flex justify-center items-center flex-col gap-4">
          <h1 class="text-3xl font-medium text-center leading-normal">Find the best products at affordable prices only here</h1>
          <p class="text-secondary font-light">Take a moment and discover the magic on our site</p>
          <div class="flex flex-row gap-2">
            <NuxtLink :to="{name: 'shop'}" class="border border-primary md:px-6 md:py-3 px-2 py-1 hover:bg-primary hover:text-white">Get Started <i class="bx bx-cart"></i> </NuxtLink>
            <NuxtLink :to="{name: 'register'}" class="bg bg-primary text-white rounded-sm md:px-6 md:py-3 px-2 py-1">Register</NuxtLink>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <div class="mx-auto w-max p-3 flex border border-primary flex-col gap-1 rounded-md relative">
            <div class="absolute right-2 top-2 bg-primary flex justify-center items-center p-2 rounded-full">
              <i class="bx bxs-heart text-white"></i>
            </div>
            <img class="w-48 rounded-md" src="https://cdn.discordapp.com/attachments/1190176942293520454/1193109556407058502/2product-59.98919-BLACKWHITE-Xms-2023-08-19T1352210700_1000x1.png?ex=65bdf9dd&is=65ab84dd&hm=424c39f969c59aed387528dc6cfe59889e67be8345b0de069285dae375c199e8&" alt="Shoes">
            <div class="flex flex-col gap-4">
              <div class="font-medium flex flex-row justify-between">
                <h1 class="font-semibold">Shoes</h1>
                <p>{{formatRp(299999)}}</p>
              </div>
              <button @click="unauthenticated = true" class="bg-primary py-2 rounded-sm text-white">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-screen flex snap-center justify-center md:justify-around items-center flex-col md:flex-row gap-4">
        <div class="w-full flex flex-col gap-2">
          <h1 class="text-3xl font-medium text-center leading-normal">Stay on top of your fashion with Fluxshop</h1>
          <p class="text-secondary font-light text-xs md:text-base">We offer a wide range of clothing, shoes, and accessories for men, women, and kids. From everyday basics to statement pieces, our collection has something for every occasion</p>
          <NuxtLink :to="{name: 'shop'}" class="bg-primary px-4 py-1 text-white rounded-sm mx-auto">View All Products</NuxtLink>
        </div>
        <div class="w-full text-xs md:text-sm flex flex-row gap-2 justify-center items-center">
          <div class="max-md:mx-auto w-max p-3 flex border border-primary flex-col gap-1 rounded-md relative">
            <div class="absolute right-2 top-2 bg-primary flex justify-center items-center p-2 rounded-full">
              <i class="bx bxs-heart text-white"></i>
            </div>
            <img class="w-36 rounded-md mx-auto" src="/img/shoes.png" alt="Shoes">
            <div class="flex flex-col gap-4">
              <div class="font-medium flex flex-row justify-between">
                <h1 class="font-semibold">Shoes</h1>
                <p>{{formatRp(299999)}}</p>
              </div>
              <button @click="unauthenticated = true" class="bg-primary py-2 rounded-sm text-white">Add To Cart</button>
            </div>
          </div>
          <div class="max-md:mx-auto w-max p-3 flex border border-primary flex-col gap-1 rounded-md relative">
            <div class="absolute right-2 top-2 bg-primary flex justify-center items-center p-2 rounded-full">
              <i class="bx bxs-heart text-white"></i>
            </div>
            <img class="w-36 rounded-md mx-auto" src="/img/bag.png" alt="Shoes">
            <div class="flex flex-col gap-4">
              <div class="font-medium flex flex-row justify-between">
                <h1 class="font-semibold">Shoes</h1>
                <p>{{formatRp(299999)}}</p>
              </div>
              <button @click="unauthenticated = true" class="bg-primary py-2 rounded-sm text-white">Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-screen flex snap-center justify-center items-center text-center flex-col gap-4">
        <h1 class="text-xl md:text-3xl font-medium leading-normal">Welcome to our e-commerce site. <br> The best place to fulfill all your shopping needs!</h1>
        <p class="text-sm font-light text-secondary">We offer excellent features that make our service the right choice for buying all kinds of products</p>
        <div class="w-full hidden-scrollbar grid grid-cols-3 grid-rows-2 max-md:flex max-md:flex-row max-md:snap-x max-md:overflow-x-auto max-md:snap-mandatory md:text-left text-center gap-3 md:gap-6 px-4">
          <div class="flex justify-center items-center w-full shrink-0 snap-center flex-col bg-secondary text-white p-4 rounded-sm gap-3">
            <div class="bg-white p-2 mx-auto rounded-full flex justify-center items-center">
              <i class="bx bxs-navigation text-primary"></i>
            </div>
            <h1 class="font-medium text-white">Ease of Navigation</h1>
            <p class="text-sm">Easily find the product you are looking for. Our simple and intuitive site navigation means you can easily find what you need</p>
          </div>
          <div class="flex justify-center items-center w-full shrink-0 snap-center flex-col bg-secondary text-white p-4 rounded-sm gap-3">
            <div class="bg-white p-2 mx-auto rounded-full flex justify-center items-center">
              <i class="bx bxs-cart text-primary"></i>
            </div>
            <h1 class="font-medium text-white">Hiqh Quality Products</h1>
            <p class="text-sm">We only sell hight quality products from trusted, well-known brands. Buy with confidence because all of our products have gone through rigorous selection to ensure the best quality</p>
          </div>
          <div class="flex justify-center items-center w-full shrink-0 snap-center flex-col bg-secondary text-white p-4 rounded-sm gap-3">
            <div class="bg-white p-2 mx-auto rounded-full flex justify-center items-center">
              <i class="bx bx-dollar text-primary"></i>
            </div>
            <h1 class="font-medium text-white">Best Prices</h1>
            <p class="text-sm">We offer the best prices on the market for all the products we sell. Get high-quality products without breaking the bank</p>
          </div>
          <div class="flex justify-center items-center w-full shrink-0 snap-center flex-col bg-secondary text-white p-4 rounded-sm gap-3">
            <div class="bg-white p-2 mx-auto rounded-full flex justify-center items-center">
              <i class="bx bx-credit-card text-primary"></i>
            </div>
            <h1 class="font-medium text-white">Attractive Promos</h1>
            <p class="text-sm">Don't miss the opportunity to get your dream product at a lower price. We offer various attractive promos that are available regularly</p>
          </div>
          <div class="flex justify-center items-center w-full shrink-0 snap-center flex-col bg-secondary text-white p-4 rounded-sm gap-3">
            <div class="bg-white p-2 mx-auto rounded-full flex justify-center items-center">
              <i class="bx bx-credit-card text-primary"></i>
            </div>
            <h1 class="font-medium text-white">Ease of Payment</h1>
            <p class="text-sm">We offer a variety of safe and reliable payment methods to make it easier for you to make purchases. Enjoy the convenience of paying via bank transfer, credit card or digital wallet</p>
          </div>
          <div class="flex justify-center items-center w-full shrink-0 snap-center flex-col bg-secondary text-white p-4 rounded-sm gap-3">
            <div class="bg-white p-2 mx-auto rounded-full flex justify-center items-center">
              <i class="bx bxs-user-voice text-primary"></i>
            </div>
            <h1 class="font-medium text-white">Customer Service</h1>
            <p class="text-sm">Our customer service team is ready to assist you with any question or concerns you may have. We are commited to providing the best service to all of our customers</p>
          </div>
        </div>
      </div>
      <div class="w-full h-screen flex snap-center justify-center items-center text-center flex-col gap-4">
        <h1 class="text-xl md:text-3xl font-medium leading-normal">Making the Right Decision <br> Trusted Product Reviews</h1>
        <p class="text-sm font-light text-secondary">Find the best products by reading reviews from real customers</p>
        <div class="w-full hidden-scrollbar grid grid-cols-3 grid-rows-1 max-md:flex max-md:flex-row max-md:snap-x max-md:overflow-x-auto max-md:snap-mandatory md:text-left text-center gap-3 md:gap-6 px-4">
          <div class="bg-secondary text-white flex justify-center items-center w-full shrink-0 snap-center flex-col p-4 rounded-md gap-3">
            <p class="text-sm">"Fluxshop offers a wide selection of quality products from various categories, from fashion to electronics. ALl products offered by Fluxshop have gone throught strict selection to ensure the quality."</p>
            <div class="flex flex-row gap-1 text-[#FFC250]">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
            <div class="flex flex-col justify-center items-center gap-1">
              <img src="/img/irene.jpg" alt="" class="rounded-full object-center object-cover aspect-square w-12">
              <h1>Irene</h1>
              <p class="text-xs">Abyssal Hunter</p>
            </div>
          </div>
          <div class="bg-secondary text-white flex justify-center items-center w-full shrink-0 snap-center flex-col p-4 rounded-md gap-3">
            <p class="text-sm">"Fluxshop offers a competitive prices and attractive discounts for the products they sell. You compare the price of the product you want with the prices offered by other sellers on the Fluxshop platform"</p>
            <div class="flex flex-row gap-1 text-[#FFC250]">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
            <div class="flex flex-col justify-center items-center gap-1">
              <img src="/img/kita.gif" alt="" class="rounded-full object-center object-cover aspect-square w-12">
              <h1>Kita Ikuyo</h1>
              <p class="text-xs">Kessoku Band Member</p>
            </div>
          </div>
          <div class="bg-secondary text-white flex justify-center items-center w-full shrink-0 snap-center flex-col p-4 rounded-md gap-3">
            <p class="text-sm">"Etto... Anoo.... aaaaaAAaaaaaaaa..... ummmmm..... aaaaaaaaaaaaaaaAAAAAAAAAAA"</p>
            <div class="flex flex-row gap-1 text-[#FFC250]">
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
              <i class="bx bxs-star"></i>
            </div>
            <div class="flex flex-col justify-center items-center gap-1">
              <img src="/img/bocchi.png" alt="" class="rounded-full object-center object-cover aspect-square w-12">
              <h1>Hitori Goto</h1>
              <p class="text-xs">Kessoku Band Member</p>
            </div>
          </div>
        </div>
      </div>
      <Login v-if="!user.authenticated && unauthenticated" />
    </div>
</template>
<script setup>
const user = useUser();
const unauthenticated = useUnauthenticated();

useHead({
    title: "Flux Store"
});
definePageMeta({
  layout: false
})
</script>