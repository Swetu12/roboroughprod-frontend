import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchHeroData = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/homepages?populate=hero.badge.image&populate=hero.cta&populate=hero.clientLogos`
    );
    const data = res.data.data[0].hero;

    // Map the image URLs properly for the badges
    const badgesWithUrl = Array.isArray(data.badge)
      ? data.badge.map((badge: any) => ({
          name: badge.name,
          image: badge.image
            ? badge.image.url.startsWith('http') // Check if the URL is absolute (Cloudinary)
              ? badge.image.url // Keep Cloudinary URL as is
              : `${API_URL}${badge.image.url}` // Append API_URL for relative Strapi images
            : null,
        }))
      : [];

    // Map client logos URLs similarly
    const clientLogosWithUrl = data.clientLogos.map(
      (logo: any) =>
        logo.url.startsWith('http') // Check if it's already an absolute URL (Cloudinary)
          ? logo.url // Keep Cloudinary URL as is
          : `${API_URL}${logo.url}` // Append API_URL for relative Strapi images
    );

    return {
      title: data.title,
      cta: data.cta[0],
      badge: badgesWithUrl,
      clientLogos: clientLogosWithUrl,
    };
  } catch (error) {
    console.error('Error fetching hero data:', error);
    throw error;
  }
};

export const fetchNavbarLinks = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/homepages?filters[documentId][$eq]=r2s5dap34w5g4hee00ddmoju&populate[navbar][populate][link]=*`
    );
    const links = res.data.data[0]?.navbar?.link.map((link: any) => ({
      id: link.id,
      name: link.Title,
      href: link.url,
    }));

    return links || [];
  } catch (error) {
    console.log('Error fetching navbar links: ', error);
    throw error;
  }
};

export const fetchFooterData = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/homepages?populate[footer][populate][cta]=*`);
    console.log('API Response:', res.data); // Log the full response
    const footerData = res.data.data[0]; // Use the full object
    return (
      footerData || {
        footer: {
          available: 'Currently unavailable',
          title: 'Default Title',
          copyright: '© 2024 Default Copyright',
          cta: { text: 'Default Button', url: '/' },
        },
      }
    );
  } catch (error) {
    console.error('Error fetching footer data:', error);
    throw error;
  }
};

export const fetchServicesData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/homepages?populate[services][populate][service][populate]=image`);
    const homepage = response.data.data[0];

    if (homepage && homepage.services && homepage.services.service) {
      return homepage.services.service;
    } else {
      throw new Error('No services found.');
    }
  } catch (error) {
    throw new Error('Error fetching services data.');
  }
};

export const fetchAboutData = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/homepages?populate%5Babout%5D%5Bpopulate%5D%5Bpfp%5D=true&populate%5Babout%5D%5Bpopulate%5D%5Bexperience%5D%5Bpopulate%5D%5Bcard%5D%5Bpopulate%5D%5Bimage%5D=true`
    );
    return res.data.data[0];
  } catch (err) {
    console.log('Failed to fetch data. Please try again later', err);
    throw err;
  }
};

export const fetchReviewsData = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/homepages?populate%5Bclients%5D%5Bpopulate%5D%5Bcard%5D%5Bpopulate%5D%5Bimage%5D=true`
    );
    return res.data.data[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching review data data. Please try again later');
  }
};

export const fetchPhotographyData = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/photographies?populate%5Bservices%5D%5Bpopulate%5D%5Bimage%5D=true`);
    return res.data.data[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchPhotographySlugData = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/photography-slugs?populate%5Bphotos%5D%5Bpopulate%5D%5Bvideo%5D=true`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching photography slug data');
  }
};

export const fetchVideographyData = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/videographies?populate%5Bservices%5D%5Bpopulate%5D%5Bimage%5D=true`);
    return res.data.data[0];
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching videography slug data');
  }
};

export const fetchVideographySlugData = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/videography-slugs?populate[reels][populate][video]=true`);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching videography slug data');
  }
};

export const fetchImageLayoutData = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/videography-slugs?filters[slug][$eq]=placeholder&populate[imageLayout][populate]=thumbnail`
    );
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching videography slug data');
  }
};
export const fetchVideoGalleryData = async () => {
  try {
    const res = await axios.get(`http://localhost:1337/api/videography-slugs?populate[gallery][populate][image]=true`);
    console.log('gallery api: ', res.data.data);
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching videography slug data');
  }
};
