// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'K Means Clusterization Model from Scratch',

    summary: `K-Means clustering algorithm built from scratch using only NumPy — pure mathematical implementation, no sklearn internals, validated on a synthetic dataset.`,

    description: `This project goal was to explain and implement a simple K Means CLusterization model.
    For that, a class with method predict was build.
    For this implementation, it was only used numpy and python, since the main purpose was to develop the mathematical basis of the model.
    In order to test the model, a sklearn sinthetic dataset builder was used.`,

    tech: ['Numpy', 'Machine Learning'],
    
    sub_topic: 'Personal/Study',

    // outcomes: ``,
    
    github_url: 'https://github.com/pesr0/-STUDY-ml_from_scratch/tree/main/kmeans_clust_from_scratch',
    
    image: 'assets/kmeans_clust_model.png',
});
