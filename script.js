// Toggle mobile nav, load projects, current year
const toggle = document.querySelector('.nav-toggle');
const list = document.querySelector('#nav-list');
if (toggle && list){
  toggle.addEventListener('click', () => {
    const open = list.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

// Fetch and render projects
fetch('projects.json')
  .then(r => r.json())
  .then(projects => {
    const grid = document.getElementById('project-grid');
    projects.forEach(p => {
      const li = document.createElement('article');
      li.className = 'card';
      li.innerHTML = `
        <a href="${p.url}" target="_blank" rel="noopener">
          <img src="${p.image}" alt="${p.title} preview" loading="lazy">
          <h3>${p.title}</h3>
          <p>${p.tagline}</p>
          <div class="meta-inline">
            <span>${p.role}</span>
            <span>•</span>
            <time datetime="${p.year}-01-01">${p.year}</time>
          </div>
          <span class="external">Open case study →</span>
        </a>`;
      grid.appendChild(li);
    });
  })
  .catch(() => {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = '<p style="color:var(--muted)">Add your projects to <code>projects.json</code> to populate this section.</p>';
  });
