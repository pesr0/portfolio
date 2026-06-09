// Each file adds one project to PORTFOLIO_PROJECTS.
// tier 1 = first featured card | 2 = second | 3 = third | no tier = explorer only
window.PORTFOLIO_PROJECTS = window.PORTFOLIO_PROJECTS || [];
window.PORTFOLIO_PROJECTS.push({
    title: 'Reconstruction of Overlapping Signals – ML Clusterization',

    summary: `Gaussian Mixture Model script to separate and reconstruct overlapping signal peaks, enabling analyses that were previously impossible. Actively used in production and credited in company patents.`,

    description: `Development of a machine learning script using Gaussian Mixture Model clustering (sklearn) to separate and reconstruct signals with overlapping peaks, enabling analyses that were previously impossible due to peak overlap. 
    The main challenges here were related to the consistent and coherent manipulation of signals (scipy) and adapting the solution for scenarios with signal behavior variations. 
    These challenges were addressed through constant collaboration with the technical team to better understand the possibilities.`,

    tech: ['Pandas', 'Numpy', 'sk-learn', 'scipy', 'Machine Learning'],
    
    sub_topic: 'Braskem',
    
    outcomes: `This solution unlocked an entirely new type of analysis that was not feasible before, and it became a key component in securing patents for Braskem. The script remains in active use today.`,

    image: 'assets/deconvolutions.png',
});
