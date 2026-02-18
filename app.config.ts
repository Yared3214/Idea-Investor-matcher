import 'dotenv/config'

export default {
  expo: {
    name: 'idea-investor-matcher',
    slug: 'idea-investor-matcher',
    extra: {
      API_URL: process.env.API_URL,
    },
  },
}
