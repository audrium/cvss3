const METRIC_WEIGHTS = {
    AV: {
        N: 0.85,
        A: 0.62,
        L: 0.55,
        P: 0.2
    },
    AC: {
        H: 0.44,
        L: 0.77
    },
    PR: {
        U: {
            N: 0.85,
            L: 0.62,
            H: 0.27
        },
        // These values are used if Scope is Unchanged
        C: {
            N: 0.85,
            L: 0.68,
            H: 0.5
        }
    },
    // These values are used if Scope is Changed
    UI: {
        N: 0.85,
        R: 0.62
    },
    S: {
        U: 6.42,
        C: 7.52
    },
    C: {
        N: 0,
        L: 0.22,
        H: 0.56
    },
    I: {
        N: 0,
        L: 0.22,
        H: 0.56
    },
    A: {
        N: 0,
        L: 0.22,
        H: 0.56
    }
    // C, I and A have the same weights
};
const EXPLOITABILITY_COEF = 8.22;
const SCOPE_COEF = 1.08;

function calcMetricWeights(metrics) {
    let weights = {};
    Object.entries(metrics).forEach(([metric, value]) => {
        weights[metric] = METRIC_WEIGHTS[metric][value];
    });
    weights.PR = METRIC_WEIGHTS.PR[metrics.S][metrics.PR];
    return weights;
}

export function calcBaseScore(metrics) {

    // Get weights for all metrics
    const weights = calcMetricWeights(metrics);

    // Calculate the base score
    let score;
    const exploitabality = EXPLOITABILITY_COEF * weights.AV * weights.AC * weights.PR * weights.UI;
    const impactMultiplier = (1 - ((1 - weights.C) * (1 - weights.I) * (1 - weights.A)));

    const impact = (metrics.S === 'U') ?
        weights.S * impactMultiplier :
        weights.S * (impactMultiplier - 0.029) - 3.25 * Math.pow(impactMultiplier - 0.02, 15);
    if (impact <= 0) return 0;

    if (metrics.S === 'U') {
        score = Math.min((exploitabality + impact), 10);
    } else {
        score = Math.min((exploitabality + impact) * SCOPE_COEF, 10);
    }
    return Math.ceil(score * 10) / 10;
}