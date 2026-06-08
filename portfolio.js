// ─── UI: Menu Mobile ──────────────────────────────────────────────────
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ─── UI: Navbar ao rolar ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2');
    }
});

// ─── UI: Cursor Glow ──────────────────────────────────────────────────
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ─── Canvas: Animação de Rede Neural no Background ────────────────────
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');
const interactiveBg = document.getElementById('interactive-bg');

let width, height;
let particles = [];

const colors = ['rgba(0, 243, 255, 0.5)', 'rgba(176, 38, 255, 0.5)', 'rgba(255, 255, 255, 0.2)'];

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 200;

        if (distance < maxDistance) {
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            this.x -= directionX * 0.5;
            this.y -= directionY * 0.5;
        }
    }
}

function createParticles() {
    particles = [];
    let numParticles = (width * height) / 15000;
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

let mouse = { x: null, y: null };

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
    let xPercent = (e.x / window.innerWidth) * 100;
    let yPercent = (e.y / window.innerHeight) * 100;
    interactiveBg.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(0, 243, 255, 0.08) 0%, transparent 40%),
        radial-gradient(circle at ${100 - xPercent}% ${100 - yPercent}%, rgba(176, 38, 255, 0.08) 0%, transparent 50%),
        #050505
    `;
});

window.addEventListener('resize', function() {
    initCanvas();
    createParticles();
});

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                         + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
            if (distance < (width/10) * (height/10)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update(mouse);
    }
    connect();
}

initCanvas();
createParticles();
animate();

// ─── About Story Modal ───────────────────────────────────────────────
const openAboutStoryBtn = document.getElementById('open-about-story-btn');
const closeAboutStoryBtn = document.getElementById('close-about-story-btn');
const aboutStoryModal = document.getElementById('about-story-modal');
const aboutStoryPanel = document.getElementById('about-story-panel');

openAboutStoryBtn.addEventListener('click', () => {
    aboutStoryModal.classList.remove('hidden');
    void aboutStoryModal.offsetWidth;
    aboutStoryModal.classList.remove('opacity-0');
    aboutStoryPanel.classList.remove('scale-95');
    aboutStoryPanel.classList.add('scale-100');
});

closeAboutStoryBtn.addEventListener('click', closeAboutStory);

aboutStoryModal.addEventListener('click', (e) => {
    if (e.target === aboutStoryModal) closeAboutStory();
});

function closeAboutStory() {
    aboutStoryModal.classList.add('opacity-0');
    aboutStoryPanel.classList.remove('scale-100');
    aboutStoryPanel.classList.add('scale-95');
    setTimeout(() => { aboutStoryModal.classList.add('hidden'); }, 300);
}

aboutStoryModal.addEventListener('mousemove', (e) => {
    const rect = aboutStoryPanel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imgContainer = document.getElementById('about-story-img-container');
    if (imgContainer) {
        const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
        const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
        imgContainer.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }

    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;
    aboutStoryPanel.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(0, 243, 255, 0.07) 0%, transparent 55%), rgba(20, 20, 30, 0.6)`;
});

aboutStoryModal.addEventListener('mouseleave', () => {
    const imgContainer = document.getElementById('about-story-img-container');
    if (imgContainer) imgContainer.style.transform = '';
    aboutStoryPanel.style.background = '';
});

// ─── Archive Modal ────────────────────────────────────────────────────
const openArchiveBtn = document.getElementById('open-archive-btn');
const closeArchiveBtn = document.getElementById('close-archive-btn');
const archiveModal = document.getElementById('project-archive');
const archivePanel = document.getElementById('archive-panel');
const folderContent = document.getElementById('folder-content');

let archiveData = {};
let firstFolderKey = null;

openArchiveBtn.addEventListener('click', () => {
    archiveModal.classList.remove('hidden');
    void archiveModal.offsetWidth;
    archiveModal.classList.remove('opacity-0');
    archivePanel.classList.remove('scale-95');
    archivePanel.classList.add('scale-100');
    if (firstFolderKey) renderFolder(firstFolderKey);
});

closeArchiveBtn.addEventListener('click', () => {
    archiveModal.classList.add('opacity-0');
    archivePanel.classList.remove('scale-100');
    archivePanel.classList.add('scale-95');
    setTimeout(() => { archiveModal.classList.add('hidden'); }, 300);
});

function initFolderBtns() {
    const folderBtns = document.querySelectorAll('.folder-btn');
    folderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            folderBtns.forEach(b => {
                b.classList.remove('active', 'text-neon-purple', 'bg-neon-purple/10');
                b.classList.add('text-gray-400');
                const icon = b.querySelector('i');
                icon.classList.remove('fa-folder-open');
                icon.classList.add('fa-folder');
            });
            btn.classList.add('active', 'text-neon-purple', 'bg-neon-purple/10');
            btn.classList.remove('text-gray-400');
            const activeIcon = btn.querySelector('i');
            activeIcon.classList.remove('fa-folder');
            activeIcon.classList.add('fa-folder-open');
            renderFolder(btn.getAttribute('data-folder'));
        });
    });
}

function initExpTabs() {
    const expBtns = document.querySelectorAll('.exp-btn');
    const expContents = document.querySelectorAll('.exp-content');

    expBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            expBtns.forEach(b => {
                b.classList.remove('text-neon-blue', 'bg-neon-blue/10');
                if (window.innerWidth >= 768) {
                    b.classList.remove('border-l-2', 'border-neon-blue');
                    b.classList.add('border-l-2', 'border-transparent', 'text-gray-400');
                } else {
                    b.classList.remove('border-b-2', 'border-neon-blue');
                    b.classList.add('border-b-2', 'border-transparent', 'text-gray-400');
                }
            });

            btn.classList.add('text-neon-blue', 'bg-neon-blue/10');
            btn.classList.remove('text-gray-400');
            if (window.innerWidth >= 768) {
                btn.classList.add('border-l-2', 'border-neon-blue');
                btn.classList.remove('border-transparent');
            } else {
                btn.classList.add('border-b-2', 'border-neon-blue');
                btn.classList.remove('border-transparent');
            }

            expContents.forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('block');
            });

            const targetContent = document.getElementById(btn.getAttribute('data-target'));
            targetContent.classList.remove('hidden');
            targetContent.classList.add('block');
            targetContent.style.animation = 'none';
            targetContent.offsetHeight;
            targetContent.style.animation = null;
        });
    });
}

// ─── Project Detail Modal ─────────────────────────────────────────────
const projectDetailModal = document.getElementById('project-detail-modal');
const projectDetailPanel = document.getElementById('project-detail-panel');

document.getElementById('close-project-detail-btn').addEventListener('click', closeProjectDetail);

projectDetailModal.addEventListener('click', (e) => {
    if (e.target === projectDetailModal) closeProjectDetail();
});

function closeProjectDetail() {
    projectDetailModal.classList.add('opacity-0');
    projectDetailPanel.classList.remove('scale-100');
    projectDetailPanel.classList.add('scale-95');
    setTimeout(() => { projectDetailModal.classList.add('hidden'); }, 300);
}

// ─── Data Loading ─────────────────────────────────────────────────────

const accentColors = {
    'neon-blue':   { text: 'text-neon-blue',   hover: 'group-hover:text-neon-blue',   link: 'hover:text-neon-blue'   },
    'neon-purple': { text: 'text-neon-purple', hover: 'group-hover:text-neon-purple', link: 'hover:text-neon-purple' },
    'neon-green':  { text: 'text-neon-green',  hover: 'group-hover:text-neon-green',  link: 'hover:text-neon-green'  },
};

function openProjectDetail(proj) {
    const colors = accentColors[proj.accent_color] || accentColors['neon-blue'];

    const header = document.getElementById('project-detail-header');
    header.style.backgroundImage = '';
    if (proj.background_image) {
        const safeImg = sanitizeUrl(proj.background_image);
        if (safeImg !== '#') header.style.backgroundImage = "url('" + safeImg + "')";
    }

    const iconEl = document.getElementById('project-detail-icon');
    iconEl.className = (proj.icon || 'fas fa-folder-open') + ' text-3xl ' + colors.text;

    document.getElementById('project-detail-title').textContent = proj.title || '';

    const techContainer = document.getElementById('project-detail-tech');
    techContainer.innerHTML = '';
    (proj.tech || []).forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'text-xs font-mono px-3 py-1 rounded-full border border-gray-600 ' + colors.text;
        badge.textContent = t;
        techContainer.appendChild(badge);
    });

    document.getElementById('project-detail-desc').textContent = proj.description || '';

    const linksContainer = document.getElementById('project-detail-links');
    linksContainer.innerHTML = '';
    if (proj.github_url && sanitizeUrl(proj.github_url) !== '#') {
        const a = document.createElement('a');
        a.href = sanitizeUrl(proj.github_url);
        a.target = '_blank';
        a.className = 'flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-white rounded-lg transition-colors font-mono text-sm';
        const icon = document.createElement('i');
        icon.className = 'fab fa-github';
        a.appendChild(icon);
        a.appendChild(document.createTextNode(' GitHub'));
        linksContainer.appendChild(a);
    }
    if (proj.live_url && sanitizeUrl(proj.live_url) !== '#') {
        const a = document.createElement('a');
        a.href = sanitizeUrl(proj.live_url);
        a.target = '_blank';
        a.className = 'flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg transition-colors font-mono text-sm ' + colors.text + ' hover:border-gray-400';
        const icon = document.createElement('i');
        icon.className = 'fas fa-external-link-alt';
        a.appendChild(icon);
        a.appendChild(document.createTextNode(' Link'));
        linksContainer.appendChild(a);
    }

    projectDetailModal.classList.remove('hidden');
    void projectDetailModal.offsetWidth;
    projectDetailModal.classList.remove('opacity-0');
    projectDetailPanel.classList.remove('scale-95');
    projectDetailPanel.classList.add('scale-100');
}

function sanitizeUrl(url) {
    if (!url) return '#';
    const str = String(url).trim();
    if (/^javascript:/i.test(str)) return '#';
    return str;
}

function buildLinkAnchor(url, iconClass, className) {
    const safe = sanitizeUrl(url);
    const a = document.createElement('a');
    a.href = safe;
    a.className = className;
    if (safe !== '#') a.target = '_blank';
    const i = document.createElement('i');
    i.className = iconClass;
    a.appendChild(i);
    return a;
}

function renderFolder(folderKey) {
    folderContent.innerHTML = '';
    (archiveData[folderKey] || []).forEach(proj => {
        const card = document.createElement('div');
        card.className = 'glass-panel p-5 rounded-xl border border-gray-700 hover:border-neon-purple transition-colors animate-fade-in';

        const header = document.createElement('div');
        header.className = 'flex justify-between items-start mb-3';

        const titleEl = document.createElement('h4');
        titleEl.className = 'text-lg font-bold text-white';
        titleEl.textContent = proj.title || '';

        const linksDiv = document.createElement('div');
        linksDiv.className = 'flex gap-2';
        if (proj.github_url) linksDiv.appendChild(buildLinkAnchor(proj.github_url, 'fab fa-github', 'text-gray-400 hover:text-white'));
        if (proj.live_url) linksDiv.appendChild(buildLinkAnchor(proj.live_url, 'fas fa-external-link-alt', 'text-gray-400 hover:text-white ml-2'));

        header.appendChild(titleEl);
        header.appendChild(linksDiv);

        const descEl = document.createElement('p');
        descEl.className = 'text-gray-400 text-sm mb-4';
        descEl.textContent = proj.description || '';

        const techDiv = document.createElement('div');
        techDiv.className = 'flex flex-wrap gap-2';
        (proj.tech || []).forEach(t => {
            const badge = document.createElement('span');
            badge.className = 'text-xs text-neon-blue font-mono bg-neon-blue/10 px-2 py-1 rounded';
            badge.textContent = t;
            techDiv.appendChild(badge);
        });

        card.appendChild(header);
        card.appendChild(descEl);
        card.appendChild(techDiv);
        folderContent.appendChild(card);
    });
}

function loadLanding() {
    const data = window.PORTFOLIO_LANDING || {};
    document.getElementById('hero-greeting').textContent = data.greeting || '';
    document.getElementById('hero-name').textContent = data.name || '';
    document.getElementById('hero-title').textContent = data.title || '';
    document.getElementById('hero-description').textContent = data.description || '';
    const githubEl = document.getElementById('hero-github');
    if (data.github_url) githubEl.href = sanitizeUrl(data.github_url);
    if (data.name) document.title = data.name + ' | Portfólio';
}

function loadAbout() {
    const data = window.PORTFOLIO_ABOUT || {};

    const textContainer = document.getElementById('about-text');
    // paragraphs suportam HTML para formatação inline (escrito pelo autor em about_me.js)
    (data.paragraphs || []).forEach(para => {
        const p = document.createElement('p');
        p.innerHTML = para;
        textContainer.appendChild(p);
    });

    const skillsList = document.getElementById('about-skills');
    (data.skills || []).forEach(skill => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        const icon = document.createElement('i');
        icon.className = 'fas fa-caret-right text-neon-green';
        li.appendChild(icon);
        li.appendChild(document.createTextNode(' ' + skill));
        skillsList.appendChild(li);
    });

    const img = document.getElementById('about-image');
    if (data.image_path) img.src = data.image_path;
    if (data.image_alt) img.alt = data.image_alt;

    const storyImg = document.getElementById('about-story-image');
    if (storyImg && data.image_path) storyImg.src = data.image_path;

    const storyContainer = document.getElementById('about-story-text');
    if (storyContainer) {
        (data.full_description_paragraphs || []).forEach(para => {
            const p = document.createElement('p');
            p.innerHTML = para;
            storyContainer.appendChild(p);
        });
    }
}

function loadExperiences() {
    const experiences = (window.PORTFOLIO_EXPERIENCES || []).slice();
    experiences.sort((a, b) => (a.order || 0) - (b.order || 0));

    const tabsContainer = document.getElementById('exp-tabs-container');
    const contentsContainer = document.getElementById('exp-contents-container');

    const colorClasses = {
        'neon-blue':   'text-neon-blue',
        'neon-purple': 'text-neon-purple',
        'neon-green':  'text-neon-green',
    };

    experiences.forEach((exp, i) => {
        const jobId = 'job-' + (i + 1);
        const isFirst = i === 0;
        const colorClass = colorClasses[exp.color] || 'text-neon-blue';

        const btn = document.createElement('button');
        btn.className = [
            'exp-btn', 'px-6', 'py-3', 'text-left', 'font-mono', 'text-sm',
            'border-b-2', 'md:border-b-0', 'md:border-l-2', 'whitespace-nowrap',
            isFirst
                ? 'border-neon-blue text-neon-blue bg-neon-blue/10'
                : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white transition-colors'
        ].join(' ');
        if (isFirst) btn.classList.add('active');
        btn.dataset.target = jobId;
        btn.textContent = exp.company;
        tabsContainer.appendChild(btn);

        const content = document.createElement('div');
        content.id = jobId;
        content.className = 'exp-content ' + (isFirst ? 'block' : 'hidden') + ' animate-fade-in';

        const h3 = document.createElement('h3');
        h3.className = 'text-xl font-bold text-white';
        h3.appendChild(document.createTextNode((exp.role || '') + ' '));
        const compSpan = document.createElement('span');
        compSpan.className = colorClass;
        compSpan.textContent = '@ ' + (exp.company || '');
        h3.appendChild(compSpan);

        const periodEl = document.createElement('p');
        periodEl.className = 'text-gray-400 font-mono text-sm mt-1 mb-6';
        periodEl.textContent = exp.period || '';

        const achUl = document.createElement('ul');
        achUl.className = 'space-y-4 text-gray-300';
        (exp.achievements || []).forEach(a => {
            const li = document.createElement('li');
            li.className = 'flex items-start gap-3';
            const iconEl = document.createElement('i');
            iconEl.className = 'fas fa-angle-right ' + colorClass + ' mt-1';
            const pEl = document.createElement('p');
            pEl.textContent = a;
            li.appendChild(iconEl);
            li.appendChild(pEl);
            achUl.appendChild(li);
        });

        content.appendChild(h3);
        content.appendChild(periodEl);
        content.appendChild(achUl);
        contentsContainer.appendChild(content);
    });

    initExpTabs();
}

function loadProjects() {
    const projects = window.PORTFOLIO_PROJECTS || [];

    archiveData = {};
    projects.forEach(proj => {
        const folder = proj.sub_topic || 'Other';
        if (!archiveData[folder]) archiveData[folder] = [];
        archiveData[folder].push(proj);
    });
    firstFolderKey = Object.keys(archiveData)[0] || null;

    const folderList = document.getElementById('folder-list');
    Object.keys(archiveData).forEach((key, i) => {
        const isFirst = i === 0;
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.className = [
            'folder-btn', 'w-full', 'text-left', 'px-3', 'py-2', 'rounded',
            'flex', 'items-center', 'gap-2', 'whitespace-nowrap',
            isFirst ? 'active text-neon-purple bg-neon-purple/10' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
        ].join(' ');
        btn.dataset.folder = key;
        const icon = document.createElement('i');
        icon.className = 'fas ' + (isFirst ? 'fa-folder-open' : 'fa-folder');
        btn.appendChild(icon);
        btn.appendChild(document.createTextNode(' ' + key.replace(/_/g, ' ')));
        li.appendChild(btn);
        folderList.appendChild(li);
    });
    initFolderBtns();

    const featuredContainer = document.getElementById('featured-projects');
    [1, 2, 3].forEach(tier => {
        const proj = projects.find(p => p.tier === tier);
        if (!proj) return;

        const colors = accentColors[proj.accent_color] || accentColors['neon-blue'];

        const card = document.createElement('div');
        card.className = 'project-card glass-panel rounded-xl overflow-hidden group cursor-pointer h-80 relative';

        const bgDiv = document.createElement('div');
        bgDiv.className = 'absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-20 transition-opacity duration-300';
        if (proj.background_image) {
            const safeImg = sanitizeUrl(proj.background_image);
            if (safeImg !== '#') bgDiv.style.backgroundImage = "url('" + safeImg + "')";
        }

        const gradDiv = document.createElement('div');
        gradDiv.className = 'absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/80 to-transparent';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'relative h-full p-6 flex flex-col justify-end z-10 project-content';

        const iconRow = document.createElement('div');
        iconRow.className = 'flex justify-between items-center mb-2';

        const iconEl = document.createElement('i');
        iconEl.className = (proj.icon || 'fas fa-folder-open') + ' text-4xl ' + colors.text;

        const linksDiv = document.createElement('div');
        linksDiv.className = 'flex gap-3';
        if (proj.github_url) linksDiv.appendChild(buildLinkAnchor(proj.github_url, 'fab fa-github text-xl', 'text-gray-300 ' + colors.link + ' transition-colors'));
        if (proj.live_url) linksDiv.appendChild(buildLinkAnchor(proj.live_url, 'fas fa-external-link-alt text-xl', 'text-gray-300 ' + colors.link + ' transition-colors'));

        iconRow.appendChild(iconEl);
        iconRow.appendChild(linksDiv);

        const titleEl = document.createElement('h3');
        titleEl.className = 'text-2xl font-bold text-white mb-2 ' + colors.hover + ' transition-colors';
        titleEl.textContent = proj.title || '';

        const descEl = document.createElement('p');
        descEl.className = 'text-gray-400 text-sm mb-4 line-clamp-3';
        descEl.textContent = proj.description || '';

        const techDiv = document.createElement('div');
        techDiv.className = 'flex flex-wrap gap-2 font-mono text-xs text-gray-500';
        (proj.tech || []).forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            techDiv.appendChild(span);
        });

        contentDiv.appendChild(iconRow);
        contentDiv.appendChild(titleEl);
        contentDiv.appendChild(descEl);
        contentDiv.appendChild(techDiv);

        card.appendChild(bgDiv);
        card.appendChild(gradDiv);
        card.appendChild(contentDiv);

        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            openProjectDetail(proj);
        });

        featuredContainer.appendChild(card);
    });
}

function loadContact() {
    const data = window.PORTFOLIO_CONTACT || {};

    const availEl = document.getElementById('contact-availability');
    if (availEl) availEl.textContent = data.availability_message || '';

    const emailEl = document.getElementById('contact-email');
    if (emailEl) {
        if (data.email) emailEl.href = `mailto:${data.email}`;
        if (data.cta_label) emailEl.textContent = data.cta_label;
    }

    const emailDisplayEl = document.getElementById('contact-email-display');
    if (emailDisplayEl && data.email) emailDisplayEl.textContent = data.email;

    const profileLinks = document.getElementById('about-profile-links');
    if (profileLinks) {
        const linkDefs = [
            { url: data.cv_url,           icon: 'fas fa-file-arrow-down', label: 'CV',      color: 'neon-green'  },
            { url: data.social?.linkedin, icon: 'fab fa-linkedin',        label: 'LinkedIn', color: 'neon-blue'   },
            { url: data.social?.github,   icon: 'fab fa-github',          label: 'GitHub',   color: 'neon-purple' },
        ];
        linkDefs.forEach(({ url, icon, label, color }) => {
            const safe = sanitizeUrl(url);
            if (!safe || safe === '#') return;
            const a = document.createElement('a');
            a.href = safe;
            a.target = '_blank';
            a.className = `flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border font-mono text-xs transition-all border-${color}/30 text-${color} hover:bg-${color}/10 hover:border-${color}`;
            const i = document.createElement('i');
            i.className = icon;
            a.appendChild(i);
            a.appendChild(document.createTextNode(label));
            profileLinks.appendChild(a);
        });
    }

    const socialIcons = {
        github:   'fab fa-github',
        linkedin: 'fab fa-linkedin',
        kaggle:   'fab fa-kaggle',
        twitter:  'fab fa-twitter',
    };

    const socialContainer = document.getElementById('footer-social');
    if (data.social && socialContainer) {
        Object.entries(data.social).forEach(([platform, url]) => {
            const a = document.createElement('a');
            a.href = sanitizeUrl(url);
            a.className = 'hover:text-neon-blue transition-colors';
            if (sanitizeUrl(url) !== '#') a.target = '_blank';
            const icon = document.createElement('i');
            icon.className = (socialIcons[platform] || 'fas fa-link') + ' text-xl';
            a.appendChild(icon);
            socialContainer.appendChild(a);
        });
    }

    const nameEl = document.getElementById('footer-name');
    if (nameEl && data.footer_name) nameEl.textContent = data.footer_name;
}

function initPortfolio() {
    try {
        loadLanding();
        loadAbout();
        loadContact();
        loadExperiences();
        loadProjects();
    } catch (err) {
        console.error('Erro ao inicializar portfólio:', err);
    }
}

initPortfolio();
