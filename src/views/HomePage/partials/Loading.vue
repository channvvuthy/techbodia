<template>
    <div class="loading">Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
</template>
<style>
.dot {
    animation: loadingDots 1.5s infinite;
}

.dot:nth-child(1) {
    animation-delay: 0s;
}

.dot:nth-child(2) {
    animation-delay: 0.3s;
}

.dot:nth-child(3) {
    animation-delay: 0.6s;
}

@keyframes loadingDots {

    0%,
    20% {
        opacity: 0;
    }

    40% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>