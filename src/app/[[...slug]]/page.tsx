import '@/index.css'
import { ClientOnly } from './client'

export function generateStaticParams() {
    return [{ slug: [''] }]
}

export default async function Page() {
    return <ClientOnly />
}