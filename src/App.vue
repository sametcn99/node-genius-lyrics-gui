<template>
    <main style="">
        <h1>Node Genius Lyrics GUI</h1>
        <p style="text-align: center;">Write your Api key below and select a folder.<br />The Application is
            automatically
            add lyrics metadata to flac
            and
            mp3 audio files.</p>
        <input v-model="inputText" type="text" placeholder="Paste your API key">
        <button @click="selectFolder">Select Folder</button>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputText = ref('');

async function selectFolder() {
    try {
        // Do something with the API key stored in inputText.value
        console.log("API Key:", inputText.value);
        await window.electronAPI.selectDirectory(inputText.value);
    } catch (error) {
        console.error(error);
    }
}
</script>
