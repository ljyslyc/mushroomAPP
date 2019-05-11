(function() {
    function change() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 320 * 22 + 'px';
    }
    change();
    window.addEventListener('resize', change, false);
})();


