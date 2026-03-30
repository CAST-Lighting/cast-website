import { CmsPageRenderer } from '~/lib/makeswift/cms-page-renderer';
import StyleGuideComponent from '~/lib/makeswift/components/cast/StyleGuide';

export default async function StyleGuidePage() {
  const makeswiftPage = await CmsPageRenderer({ templatePath: '/style-guide', data: {} });
  if (makeswiftPage) return makeswiftPage;
  return <StyleGuideComponent />;
}
