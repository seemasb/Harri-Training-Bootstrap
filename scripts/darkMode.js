export default function darkMode() {
    let storedTheme = localStorage.getItem('theme');
    storedTheme = storedTheme ? storedTheme : 'light'
    let targetTheme;
    if (storedTheme === "dark") darkModeToggle.innerHTML = '<i class="fa-solid fa-sun fa-lg"></i> <span>Light Mode</span>';
    document.documentElement.setAttribute('data-theme', storedTheme)

    // When someone clicks the button
    darkModeToggle.addEventListener('click', () => {
        var currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "light") {
            targetTheme = "dark";
            darkModeToggle.innerHTML = '<i class="fa-solid fa-sun fa-lg"></i> <span>Light Mode</span>';
        }
        else {
            targetTheme = "light";
            darkModeToggle.innerHTML = '<i class="fa-regular fa-moon fa-lg SearchIcon"></i> <span>Dark Mode</span>';
        }

        document.documentElement.setAttribute('data-theme', targetTheme)
        localStorage.setItem('theme', targetTheme);
    })
}
