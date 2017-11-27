export const ENV_METRICS = [
    {
        title: 'Confidentiality Requirement (CR) *',
        name: 'CR',
        description: 'These metrics enable the analyst to customize the CVSS score depending on the importance of the Confidentiality of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Confidentiality impact metric versus the other modified impacts.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Low', value: 'L' },
            { label: 'Medium', value: 'M' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Integrity Requirement (IR) *',
        name: 'IR',
        description: 'These metrics enable the analyst to customize the CVSS score depending on the importance of the Integrity of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Integrity impact metric versus the other modified impacts.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Low', value: 'L' },
            { label: 'Medium', value: 'M' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Availability Requirement (AR) *',
        name: 'AR',
        description: 'These metrics enable the analyst to customize the CVSS score depending on the importance of the Availability of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Availability impact metric versus the other modified impacts.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Low', value: 'L' },
            { label: 'Medium', value: 'M' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Modified Attack Vector (MAV) *',
        name: 'MAV',
        description: 'This metric reflects the context by which vulnerability exploitation is possible. The Base Score increases the more remote (logically, and physically) an attacker can be in order to exploit the vulnerable component.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Network', value: 'N' },
            { label: 'Adjacent Network', value: 'A' },
            { label: 'Local', value: 'L' },
            { label: 'Physical', value: 'P' }
        ]
    },
    {
        title: 'Modified Attack Complexity (MAC) *',
        name: 'MAC',
        description: 'These metrics enable the analyst to customize the CVSS score depending on the importance of the Availability of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Availability impact metric versus the other modified impacts.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Modified Privileges Required (MPR) *',
        name: 'MPR',
        description: 'This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. This Base Score increases as fewer privileges are required.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Modified User Interaction (MUI) *',
        name: 'MUI',
        description: 'This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise the vulnerable component. This metric determines whether the vulnerability can be exploited solely at the will of the attacker, or whether a separate user (or user-initiated process) must participate in some manner. The Base Score is highest when no user interaction is required.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'None', value: 'N' },
            { label: 'Required', value: 'R' }
        ]
    },
    {
        title: 'Modified Scope (MS) *',
        name: 'MS',
        description: 'Does a successful attack impact a component other than the vulnerable component? If so, the Base Score increases and the Confidentiality, Integrity and Authentication metrics should be scored relative to the impacted component.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'Unchanged', value: 'U' },
            { label: 'Changed', value: 'C' }
        ]
    },
    {
        title: 'Modified Confidentiality (MC) *',
        name: 'MC',
        description: 'This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Modified Integrity (MI) *',
        name: 'MI',
        description: 'This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and veracity of information.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Modified Availability (MA) *',
        name: 'MA',
        description: 'This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. It refers to the loss of availability of the impacted component itself, such as a networked service (e.g., web, database, email). Since availability refers to the accessibility of information resources, attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of an impacted component.',
        options: [
            { label: 'Not Defined', value: 'X' },
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    }
];

export const ENV_METRIC_WEIGHTS = {
    // CR, IR and AR have the same weights
    CR: {
        X: 1, L: 0.5, M: 1, H: 1.5
    },
    IR: {
        X: 1, L: 0.5, M: 1, H: 1.5
    },
    AR: {
        X: 1, L: 0.5, M: 1, H: 1.5
    },
    MAV: {
        N: 0.85, A: 0.62, L: 0.55, P: 0.2
    },
    MAC: {
        H: 0.44, L: 0.77
    },
    MPR: {
        // These values are used if Scope is Unchanged
        U: {
            N: 0.85, L: 0.62, H: 0.27
        },
        // These values are used if Scope is Changed
        C: {
            N: 0.85, L: 0.68, H: 0.5
        }
    },
    MUI: {
        N: 0.85, R: 0.62
    },
    MS: {
        U: 6.42, C: 7.52
    },
    // MC, MI and MA have the same weights
    MC: {
        N: 0, L: 0.22, H: 0.56
    },
    MI: {
        N: 0, L: 0.22, H: 0.56
    },
    MA: {
        N: 0, L: 0.22, H: 0.56
    }
};