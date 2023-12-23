let graphqlServerUrl              = "https://www.universeisland.games/api/graphql";

if (process && process.env && process.env.NODE_ENV === "development") {
    graphqlServerUrl              = "https://www.universeisland.games/api/graphql";
}

export const GRAPHQL_SERVER_URL = graphqlServerUrl;
export const ADMIN_URL = process.env.ADMIN_URL;
export const ARTICLE_IMAGE_PATH = "public/images/article";
export const NEWS_IMAGE_PATH = "public/images/news";
export const LINK_IMAGE_PATH = "public/images/link";
export const PARTNER_IMAGE_PATH = "public/images/partner";
export const DOMAIN = "www.universeisland.games";