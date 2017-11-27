import { BASE_METRIC_WEIGHTS, EXPLOITABILITY_COEF, SCOPE_COEF } from '../metrics/base';
import { TEMPORAL_METRIC_WEIGHTS } from '../metrics/temporal';
import { ENV_METRIC_WEIGHTS } from '../metrics/environmental';
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

// Calculate Environmental Score

export function calcEnvScore(envValues, baseValues, tempValues) {
    if (!baseValues) return null;

    // Get weights
    // 
    // For metrics that are modified versions of Base Score metrics, e.g. Modified Attack Vector, use the value of
    // the Base Score metric if the modified version value is "X" ("Not Defined").

    let weights = {};
    Object.entries(envValues).forEach(([metric, value]) => {
        const metricValue = metric.includes('M') ?
            value === "X" ? baseValues[metric.substring(1)] : value
            : value;
        weights[metric] = ENV_METRIC_WEIGHTS[metric][metricValue];
    });
    weights.MPR = ENV_METRIC_WEIGHTS.MPR[envValues.MS === "X" ? baseValues.S : envValues.MS][envValues.MPR === "X" ? baseValues.PR : envValues.MPR];

    // Get weights for temp metrics
    const tempWeights = calcMetricWeights(TEMPORAL_METRIC_WEIGHTS, tempValues);

    // Calculate the score
    let subScore;
    let impact;
    const exploitabality = EXPLOITABILITY_COEF * weights.MAV * weights.MAC * weights.MPR * weights.MUI;
    const impactMultiplier = Math.min(1 - (
        (1 - weights.MC * weights.CR) *
        (1 - weights.MI * weights.IR) *
        (1 - weights.MA * weights.AR)), 0.915);

    if (envValues.MS === 'U' || (envValues.MS === 'X' && baseValues.S === 'U')) {
        impact = weights.MS * impactMultiplier;
        subScore = round(Math.min(impact + exploitabality, 10));
    } else {
        impact = weights.MS * (impactMultiplier - 0.029) - 3.25 * Math.pow(impactMultiplier - 0.02, 15);
        subScore = round(Math.min((impact + exploitabality) * SCOPE_COEF, 10));
    }
    if (impact <= 0) return null;
    return round(subScore * tempWeights.E * tempWeights.RL * tempWeights.RC);
}

export function calculateEnvScore(envValues, baseValues, tempValues) {
    if (!baseValues) return { score: null, vector: null };

    // Calcultate env score
    const score = calcEnvScore(envValues, baseValues, tempValues);

    // Define new vector
    const { CR, IR, AR, MAV, MAC, MPR, MUI, MS, MC, MI, MA } = envValues;
    let vector = "";

    if (CR !== "X") vector += "/CR:" + CR;
    if (IR !== "X") vector += "/IR:" + IR;
    if (AR !== "X") vector += "/AR:" + AR;
    if (MAV !== "X") vector += "/MAV:" + MAV;
    if (MAC !== "X") vector += "/MAC:" + MAC;
    if (MPR !== "X") vector += "/MPR:" + MPR;
    if (MUI !== "X") vector += "/MUI:" + MUI;
    if (MS !== "X") vector += "/MS:" + MS;
    if (MC !== "X") vector += "/MC:" + MC;
    if (MI !== "X") vector += "/MI:" + MI;
    if (MA !== "X") vector += "/MA:" + MA;

    return { score: score, vector: vector };
}