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

export function getNextValue(array, element) {
    const index = array.indexOf(element);
    return index === -1 ? null : array[index + 1];
}

export function parseVector(vector) {

    const values = vector.split(/[:/]/);
    const baseValues = values.slice(0, 18);
    const additionalValues = values.slice(18);

    let base = {};
    Object.entries(initialBaseValues).forEach(([metric, value]) => {
        base[metric] = getNextValue(baseValues, metric) || value;
    });

    let temp = {};
    Object.entries(initialTemporalValues).forEach(([metric, value]) => {
        temp[metric] = getNextValue(additionalValues, metric) || value;
    });

    let env = {};
    Object.entries(initialEnvValues).forEach(([metric, value]) => {
        env[metric] = getNextValue(additionalValues, metric) || value;
    });

    return { baseValues: base, tempValues: temp, envValues: env };
}