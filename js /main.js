document.addEventListener('DOMContentLoaded', () => {
    // 1. 네비게이션 바 투명도 제어
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('a:not(.bg-white\\/10)');
    const navLogo = navbar.querySelector('.text-2xl');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.remove('bg-transparent', 'py-4');
            navbar.classList.add('py-2');
            navLogo.classList.replace('text-white', 'text-coffee-900');
            navLinks.forEach(link => link.classList.replace('text-white/90', 'text-coffee-800'));
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-2');
            navbar.classList.add('bg-transparent', 'py-4');
            navLogo.classList.replace('text-coffee-900', 'text-white');
            navLinks.forEach(link => link.classList.replace('text-coffee-800', 'text-white/90'));
        }
    });

    // 2. 스크롤 애니메이션 (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 3. 메뉴 카테고리 필터링 (Tab Logic)
    const filterBtns = document.querySelectorAll('.filter-btns button');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 버튼 스타일 업데이트
            filterBtns.forEach(b => {
                b.classList.remove('bg-coffee-900', 'text-white');
                b.classList.add('bg-white', 'text-coffee-900');
            });
            btn.classList.remove('bg-white', 'text-coffee-900');
            btn.classList.add('bg-coffee-900', 'text-white');

            const filterValue = btn.getAttribute('data-filter');

            // 메뉴 아이템 필터링 및 애니메이션
            menuItems.forEach(item => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // 4. 라이트박스 갤러리 (Modal)
    const galleryImgs = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryImgs.forEach(container => {
        container.addEventListener('click', () => {
            const imgSrc = container.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            // 부드러운 페이드인
            setTimeout(() => {
                lightbox.classList.remove('opacity-0');
                lightboxImg.classList.remove('scale-95');
                lightboxImg.classList.add('scale-100');
            }, 10);
        });
    });

    const closeLightbox = () => {
        lightbox.classList.add('opacity-0');
        lightboxImg.classList.remove('scale-100');
        lightboxImg.classList.add('scale-95');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 5. 최상단 이동 버튼 (Scroll to Top)
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.remove('hidden');
            setTimeout(() => {
                scrollTopBtn.classList.remove('opacity-0', 'translate-y-10');
            }, 10);
        } else {
            scrollTopBtn.classList.add('opacity-0', 'translate-y-10');
            setTimeout(() => {
                scrollTopBtn.classList.add('hidden');
            }, 300);
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});