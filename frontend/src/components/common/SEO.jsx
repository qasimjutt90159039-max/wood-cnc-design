import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    const baseTitle = 'Wood CNC Design Shop - RealCNC';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Interior Decorator`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        description || 'Wood CNC Design Shop - RealCNC. Interior Decorator specializing in custom wood and CNC design. 468 Sultan Ahmed Rd, Ichhra Lahore, Pakistan.'
      );
    }
    window.scrollTo(0, 0);
  }, [title, description]);

  return null;
};

export default SEO;
