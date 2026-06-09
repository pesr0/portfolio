// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Reconstruction of Overlapping Signals – ML Clusterization',

    description: `Development of a machine learning script using Gaussian Mixture Model clustering (sklearn) to separate and reconstruct signals with overlapping peaks, enabling analyses that were previously impossible due to peak overlap. 
    The main challenges here were related to the consistent and coherent manipulation of signals (scipy) and adapting the solution for scenarios with signal behavior variations. 
    These challenges were addressed through constant collaboration with the technical team to better understand the possibilities. Today, the script is actively used and was a key component in securing patents.`,

    // tier: null,

    sub_topic: 'Braskem',

    // FontAwesome icon (e.g. 'fas fa-folder-open', 'fas fa-brain', 'fas fa-chart-line')
    // icon: 'fas fa-car-side',

    // Available colors: neon-blue | neon-purple | neon-green
    // accent_color: 'neon-blue',

    // background_image: 'assets/porsche_logo.png',

    tech: ['Pandas', 'Numpy', 'sk-learn', 'scipy', 'Machine Learning'],

    // github_url: '#',
    
    // live_url: '#'
});
