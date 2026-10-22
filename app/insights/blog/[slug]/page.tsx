import BlogDetail, { generateMetadata } from '../../[slug]/page';

export const revalidate = 60;
export { generateMetadata };
export default BlogDetail;
