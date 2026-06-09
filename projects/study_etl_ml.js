// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: "ETL Mercado Livre's API",

    description: `The main goal of this project is to gather, clean, organize and store data from a category (in this case Computer Monitors) of products in Mercado Livre, a giant marketplace which opperates mainly in Latin America.
    The data retrieved is intended to be used in future data projects such as ML projects.`,

    // tier: null,

    sub_topic: 'Personal/Study',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line')
    // icon: 'fas fa-car-side',

    // Available colors: neon-blue | neon-purple | neon-green
    // accent_color: 'neon-blue',

    // background_image: 'assets/porsche_logo.png',

    tech: ['SQLite', 'PostgresDB', 'AWS Cloud'],

    github_url: 'https://github.com/pesr0/-STUDY-mercado_livre_api_data_upload',
    
    // live_url: '#'
});
