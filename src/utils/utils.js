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