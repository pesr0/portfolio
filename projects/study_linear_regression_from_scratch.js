// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Linear Regression Model from Scratch',

    description: `This project goal was to explain and implement a simple Linear Regression model.
    For that, a class with methods of fit and predict was build.
    For this implementation, it was only used numpy and python, since the main purpose was to develop the mathematical basis of the model.
    In order to test the model, synthetic data was created with sklearn make_regression method.`,

    // tier: null,

    sub_topic: 'Personal/Study',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line')
    // icon: 'fas fa-car-side',

    // Available colors: neon-blue | neon-purple | neon-green
    // accent_color: 'neon-blue',

    // background_image: 'assets/porsche_logo.png',

    tech: ['Numpy', 'Machine Learning'],

    github_url: 'https://github.com/pesr0/-STUDY-ml_from_scratch/tree/main/reg_model_from_scratch',
    
    // live_url: '#'
});
