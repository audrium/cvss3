import { initialBaseValues, initialTemporalValues, initialEnvValues } from '../modules/main';

const vectorRegex = /^CVSS:3\.0\/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])\/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$/;

export function validateVector(vector) {
    return vectorRegex.test(vector);
}

export function calcMetricWeights(metricWeights, metrics) {
    let weights = {};
    Object.entries(metrics).forEach(([metric, value]) => {
        weights[metric] = metricWeights[metric][value];
    });
    if ('PR' in weights) {
        weights.PR = metricWeights.PR[metrics.S][metrics.PR];
    }
    return weights;
}

export function round(num) {
    return Math.ceil(num * 10) / 10;
}

export function parseVector(vector) {
    const values = vector.substring(9).split('/'); // Remove 'CVSS:3.0/'

    let base = { ...initialBaseValues };
    let temp = { ...initialTemporalValues };
    let env = { ...initialEnvValues };

    values.forEach(metricValue => {
        const [metric, value] = metricValue.split(':');
        if (metric in base) base[metric] = value;
        if (metric in temp) temp[metric] = value;
        if (metric in env) env[metric] = value;
    })
    return { baseValues: base, tempValues: temp, envValues: env };
}