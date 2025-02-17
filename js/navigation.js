document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.main-nav__item');
    const contentFrame = document.querySelector('.content-frame');

    if (!navItems.length || !contentFrame) return;

    function activateTab(targetTab) {
        navItems.forEach(item => {
            const link = item.querySelector('.main-nav__link');
            if (link.getAttribute('href') === targetTab) {
                item.classList.add('main-nav__item--active');
            } else {
                item.classList.remove('main-nav__item--active');
            }
        });
    }

    function adjustIframeHeight() {
        try {
            const frameDoc = contentFrame.contentDocument || contentFrame.contentWindow.document;
            if (frameDoc) {
                contentFrame.style.height = frameDoc.documentElement.scrollHeight + 'px';
            }
        } catch (e) {
        }
    }

    function updatePageTitle() {
        try {
            const frameDoc = contentFrame.contentDocument || contentFrame.contentWindow.document;
            if (frameDoc) {
                document.title = frameDoc.title;
            }
        } catch (e) {
        }
    }

    function setInitialTab() {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            contentFrame.src = savedTab;
            activateTab(savedTab);
        } else {
            const defaultTab = contentFrame.getAttribute('src');
            contentFrame.src = defaultTab;
            activateTab(defaultTab);
        }
    }

    contentFrame.addEventListener('load', function () {
        adjustIframeHeight();
        updatePageTitle();
    });

    window.addEventListener('resize', adjustIframeHeight);

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetPage = e.currentTarget.querySelector('.main-nav__link').getAttribute('href');
            contentFrame.src = targetPage;
            activateTab(targetPage);
            localStorage.setItem('activeTab', targetPage);
            setTimeout(adjustIframeHeight, 500);
        });
    });

    setInitialTab();
    updatePageTitle();
});