export const baseMetrics = [
    {
        title: 'Attack Vector (AV) *',
        value: 'AV',
        description: 'This metric reflects the context by which vulnerability exploitation is possible. The Base Score increases the more remote (logically, and physically) an attacker can be in order to exploit the vulnerable component.',
        options: [
            { label: 'Network', value: 'N' },
            { label: 'Adjacent', value: 'A' },
            { label: 'Local', value: 'L' },
            { label: 'Physical', value: 'P' }
        ]
    },
    {
        title: 'Attack Complexity (AC) *',
        value: 'AC',
        description: 'This metric describes the conditions beyond the attacker’s control that must exist in order to exploit the vulnerability. Such conditions may require the collection of more information about the target, the presence of certain system configuration settings, or computational exceptions.',
        options: [
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Privileges Required (PR)*',
        value: 'PR',
        description: 'This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. This Base Score increases as fewer privileges are required.',
        options: [
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'User Interaction (UI)*',
        value: 'UI',
        description: 'This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise the vulnerable component. This metric determines whether the vulnerability can be exploited solely at the will of the attacker, or whether a separate user (or user-initiated process) must participate in some manner. The Base Score is highest when no user interaction is required.',
        options: [
            { label: 'None', value: 'N' },
            { label: 'Required', value: 'R' },
        ]
    },
    {
        title: 'Scope (S)*',
        value: 'S',
        description: 'Does a successful attack impact a component other than the vulnerable component? If so, the Base Score increases and the Confidentiality, Integrity and Authentication metrics should be scored relative to the impacted component.',
        options: [
            { label: 'Unchanged', value: 'U' },
            { label: 'Changed', value: 'C' },
        ]
    },
    {
        title: 'Confidentiality (C)*',
        value: 'C',
        description: 'This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones.',
        options: [
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Integrity (I)*',
        value: 'I',
        description: 'This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and veracity of information.',
        options: [
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
    {
        title: 'Availability (A)*',
        value: 'A',
        description: 'This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. It refers to the loss of availability of the impacted component itself, such as a networked service (e.g., web, database, email). Since availability refers to the accessibility of information resources, attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of an impacted component.',
        options: [
            { label: 'None', value: 'N' },
            { label: 'Low', value: 'L' },
            { label: 'High', value: 'H' }
        ]
    },
];