import { BASE_METRIC_WEIGHTS, EXPLOITABILITY_COEF, SCOPE_COEF } from '../metrics/base';
import { TEMPORAL_METRIC_WEIGHTS } from '../metrics/temporal';
import { calcMetricWeights, round } from './utils';

// Calculate Base Score

function calcBaseScore(metrics) {

    // Get weights for all metrics
    const weights = calcMetricWeights(BASE_METRIC_WEIGHTS, metrics);

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
    return round(score);
}

export function calculateBaseScore(metrics) {
    const { AV, AC, PR, UI, S, C, I, A } = metrics;
    if (!AV || !AC || !PR || !UI || !S || !C || !I || !A)
        return null;

    const score = calcBaseScore(metrics);
    return { score: score, vector: `CVSS:3.0/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}` };
}

// Calculate Temporal Score

export function calculateTempScore(metrics, baseScores) {
    if (!baseScores) return { score: null, vector: null };

    // Get weights for all metrics
    const weights = calcMetricWeights(TEMPORAL_METRIC_WEIGHTS, metrics);

    // Calcultate temporal score
    const score = round(baseScores * weights.E * weights.RL * weights.RC);

    // Define new vector
    const { E, RL, RC } = metrics;
    let vector = "";

    if (E !== "X") vector += "/E:" + E;
    if (RL !== "X") vector += "/RL:" + RL;
    if (RC !== "X") vector += "/RC:" + RC;

    return { score: score, vector: vector };
}
