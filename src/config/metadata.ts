import type { Metadata } from 'next'

const metadata: Metadata = {
    title: {
        default: 'PTLCC Training',
        template: `%s | PTLCC Training`,
    },
    description: 'PTLCC Training Website',
    icons: [
        {
            url: '/next.svg',
            href: '/next.svg',
        },
    ],
}

export default metadata
