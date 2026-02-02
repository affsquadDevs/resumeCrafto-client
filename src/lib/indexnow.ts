export async function submitToIndexNow(urls: string[]) {
    const HOST = "resumecraftor.com";
    const KEY = "bb61bdfb24914bcea64b8c174c87ed4b";
    const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

    try {
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: KEY_LOCATION,
                urlList: urls,
            }),
        });

        if (response.ok) {
            console.log("IndexNow submission successful");
            return true;
        } else {
            console.error("IndexNow submission failed", response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error("IndexNow submission error", error);
        return false;
    }
}
