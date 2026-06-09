// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Linear Regression Model from Scratch',

    summary: `Linear Regression model built from scratch using NumPy and gradient descent — only sklearn is used for synthetic data generation, not for the model itself.`,

    description: `This project goal was to explain and implement a simple Linear Regression model.
    For that, a class with methods of fit and predict was build.
    For this implementation, it was only used numpy and python, since the main purpose was to develop the mathematical basis of the model.
    In order to test the model, synthetic data was created with sklearn make_regression method.`,

    tech: ['Numpy', 'Machine Learning'],

    sub_topic: 'Personal/Study',

    image: 'assets/lin_reg.png',
    
    github_url: 'https://github.com/pesr0/-STUDY-ml_from_scratch/tree/main/reg_model_from_scratch',
});
