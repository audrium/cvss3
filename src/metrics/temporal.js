export const TEMPORAL_METRICS = [
    {
        title: 'Exploit Code Maturity (E) *',
        name: 'E',
        description: 'This metric measures the likelihood of the vulnerability being attacked, and is typically based on the current state of exploit techniques, exploit code availability, or active, in-the-wild exploitation.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Unproven', value: 'U' },
            { label: 'Proof-of-Concept', value: 'P' },
            { label: 'Functional', value: 'F' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Remediation Level (RL) *',
        name: 'RL',
        description: 'The Remediation Level of a vulnerability is an important factor for prioritization. The typical vulnerability is unpatched when initially published. Workarounds or hotfixes may offer interim remediation until an official patch or upgrade is issued. Each of these respective stages adjusts the temporal score downwards, reflecting the decreasing urgency as remediation becomes final.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Official Fix', value: 'O' },
            { label: 'Temporary Fix', value: 'T' },
            { label: 'Workaround', value: 'W' },
            { label: 'Unavailable', value: 'U' }
        ]
    },
    {
        title: 'Report Confidence (RC) *',
        name: 'RC',
        description: 'This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. This Base Score increases as fewer privileges are required.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Unknown', value: 'U' },
            { label: 'Reasonable', value: 'R' },
            { label: 'Confirmed', value: 'C' }
        ]
    }
];

export const TEMPORAL_METRIC_WEIGHTS = {
    E: {
        X: 1, U: 0.91, P: 0.94, F: 0.97, H: 1
    },
    RL: {
        X: 1, O: 0.95, T: 0.96, W: 0.97, U: 1
    },
    RC: {
        X: 1, U: 0.92, R: 0.96, C: 1
    },
};