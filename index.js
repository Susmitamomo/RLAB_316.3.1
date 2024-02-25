document.addEventListener('DOMContentLoaded', function () {
    const topMenuEl = document.getElementById('top-menu');
    const subMenuEl = document.getElementById('sub-menu');
    const mainEl = document.getElementById('main');

    const menuLinks = [
        {text: 'About', href: '/about'},
        {text: 'Catalog', href: '#', subLinks: [
            {text: 'All', href: '/catalog/all'},
            {text: 'Top Selling', href: '/catalog/top'},
            {text: 'Search', href: '/catalog/search'},
        ]},
        {text: 'Orders', href: '#' , subLinks: [
            {text: 'New', href: '/orders/new'},
            {text: 'Pending', href: '/orders/pending'},
            {text: 'History', href: '/orders/history'},
        ]},
        
    ];

    // Function to build submenu
    function buildSubmenu(subLinks) {
        subMenuEl.innerHTML = ''; // Clear the submenu

        subLinks.forEach(link => {
            const subMenuItem = document.createElement('a');
            subMenuItem.setAttribute('href', link.href);
            subMenuItem.textContent = link.text;
            subMenuEl.appendChild(subMenuItem);
        });
    }

    // Function to handle menu item clicks
    function handleMenuItemClick(event) {
        event.preventDefault();
        const clickedLink = event.target;
        const clickedText = clickedLink.textContent.toLowerCase();

        // Toggle active class
        menuLinks.forEach(link => {
            const linkText = link.text.toLowerCase();
            const linkEl = document.querySelector(`#top-menu a[href="/${linkText}"]`);
            if (linkEl === clickedLink) {
                linkEl.classList.add('active');
                if (link.subLinks) {
                    subMenuEl.classList.add('active');
                    buildSubmenu(link.subLinks);
                } else {
                    subMenuEl.classList.remove('active');
                }
            } else {
                linkEl.classList.remove('active');
            }
        });

        // Update main content
        mainEl.innerHTML = `<h1>${clickedText.charAt(0).toUpperCase() + clickedText.slice(1)}</h1>`;
    }

    // Add menu items to topMenuEl
    menuLinks.forEach(link => {
        const menuItem = document.createElement('a');
        menuItem.setAttribute('href', link.href);
        menuItem.textContent = link.text;
        topMenuEl.appendChild(menuItem);
    });

    // Attach event listener to topMenuEl
    topMenuEl.addEventListener('click', handleMenuItemClick);

    // Attach event listener to subMenuEl to prevent default link behavior
    subMenuEl.addEventListener('click', function(event) {
        event.preventDefault();
    });

    // Add flex-around class to subMenuEl
    subMenuEl.classList.add('flex-around');
});
