// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'K Nearest Neighbors Model from Scratch',

    summary: `K-Nearest Neighbors classifier built from scratch using only NumPy, with fit/predict methods, validated on the classic Iris dataset.`,

    description: `This project goal was to explain and implement a simple K Nearest Neighbors classifier model.
    For that, a class with methods of fit and predict was build.
    For this implementation, it was only used numpy and python, since the main purpose was to develop the mathematical basis of the model.
    In order to test the model, a famous pre loaded model from sklearn was uses (iris model)`,

    tech: ['Numpy', 'Machine Learning'],

    sub_topic: 'Personal/Study',
    
    // outcomes: ``,
    
    github_url: 'https://github.com/pesr0/-STUDY-ml_from_scratch/tree/main/knn_model_from_scratch',
    
    image: 'assets/knn_model.png',
});
