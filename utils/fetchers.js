import { request } from "graphql-request";
import axios from "axios";

export const graphCMS = query => request(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, query)
export const strapiCMS = query => request(process.env.NEXT_PUBLIC_STRAPI_ENDPOINT, query)
export const wordpressCMS = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORDPRESS_ENDPOINT,
  // headers: {'Authorization': 'Basic YOUR_API_KEY'}
});
export const wordpressGraphCMS = query => request(process.env.NEXT_PUBLIC_WORDPRESS_GRAPH_ENDPOINT, query)


