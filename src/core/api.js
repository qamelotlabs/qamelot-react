const api = {
    //devUrl: 'http://127.0.0.1:8000/v2/collections/', //local api url
    devUrl: 'http://qamelot.coming-soon.xyz/v2/collections/', //local api url
    baseUrl: '/mock_data', //mock data base folder
    nfts: '/nfts.json',
    nftShowcases: '/nft_showcases.json',
    authors: '/authors.json',
    authorsSales: '/author_ranks.json',
    hotCollections: '/hot-collections.json',
    contactUs: '/contact-forms',
    blogs: '/blog-posts',
    recent: '/blog-posts/recent.json',
    comments: '/blog-posts/comments.json',
    tags: '/blog-posts/tags.json',
}

export const openseaApi = {
    base: 'https://testnets.opensea.io',
    api: 'https://testnets-api.opensea.io',
}

export default api;