/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/index',
                destination: '/',
                permanent: true,
            }
        ]
    },
    async rewrites(){
        return [{
            source: '/api/:slug*',
            destination: 'http://localhost:8765/api/:slug*'
        }]
    }
}

module.exports = nextConfig