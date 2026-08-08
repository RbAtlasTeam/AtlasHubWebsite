const KEY_URL =
    "https://raw.githubusercontent.com/RbAtlasTeam/AtlasHub-KeySystem/refs/heads/main/key.txt";

const keyInput = document.getElementById("keyInput");
const copyButton = document.getElementById("copyKey");
const copyStatus = document.getElementById("copyStatus");

async function loadKey() {
    try {
        const response = await fetch(KEY_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch key");
        }

        const text = await response.text();

        // key.txt contains:
        // return "ATLAS-0000-0000"

        const match = text.match(/return\s+["']([^"']+)["']/);

        if (!match) {
            throw new Error("Invalid key format");
        }

        keyInput.value = match[1];

    } catch (error) {
        console.error(error);

        keyInput.value = "Unable to load key";
    }
}

copyButton.addEventListener("click", async () => {

    if (!keyInput.value || keyInput.value === "Unable to load key") {
        return;
    }

    try {
        await navigator.clipboard.writeText(keyInput.value);

        copyStatus.textContent = "Key copied!";

        setTimeout(() => {
            copyStatus.textContent = "";
        }, 2000);

    } catch (error) {
        console.error(error);

        copyStatus.textContent = "Unable to copy key.";
    }
});

loadKey();
