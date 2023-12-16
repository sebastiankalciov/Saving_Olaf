document.addEventListener("DOMContentLoaded", function () {

    const snowflakesContainer = document.querySelector(".snowflakes");

    for (let i = 0; i < 50; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const snowflake = document.createElement("div");
        snowflake.className = "snowflake";
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 2 + 1}s`;

        snowflakesContainer.appendChild(snowflake);

        snowflake.addEventListener("animationiteration", () => {
            snowflake.style.left = `${Math.random() * 100}vw`;
        });
    }
    
});