import { BASE_METRIC_WEIGHTS, EXPLOITABILITY_COEF, SCOPE_COEF } from '../modules/baseMetrics';

function calcMetricWeights(metrics) {
    let weights = {};
    Object.entries(metrics).forEach(([metric, value]) => {
        weights[metric] = BASE_METRIC_WEIGHTS[metric][value];
    });
    weights.PR = BASE_METRIC_WEIGHTS.PR[metrics.S][metrics.PR];
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