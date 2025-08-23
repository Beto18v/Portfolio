import type { Project } from '@/types/portfolio';

export const projects: Project[] = [
    {
        id: '1',
        title: 'AdoptaFácil',
        description:
            'AdoptaFácil is a complete digital ecosystem designed to revolutionize the pet adoption process in Colombia. The platform combines modern technologies with a focus on animal welfare, creating a comprehensive experience that connects adopters, pet owners, shelters, and business partners in one place.',
        image: 'public/Adoptafacil.jpg',
        technologies: ['Laravel', 'React.js', 'MySQL', 'Typescript', 'Python', 'Tailwind CSS'],
        liveUrl: 'https://adoptafacil.up.railway.app/',
        githubUrl: 'https://github.com/Beto18v/AdoptaFacil.git',
        category: 'Full Stack',
        featured: true,
        date: '2024-01-15',
    },
    {
        id: '2',
        title: 'Vision 4k',
        description:
            'Vision4K is a modern platform for sharing and downloading wallpapers in ultra high definition (4K). It offers a seamless user experience with a focus on high-quality visuals and easy navigation.',
        image: '/api/placeholder/600/400',
        technologies: ['Laravel', 'React.js', 'MySQL', 'Typescript', 'Tailwind CSS'],
        liveUrl: '##',
        githubUrl: 'https://github.com/Beto18v/Vision4k.git',
        category: 'Full Stack',
        featured: true,
        date: '2023-11-20',
    },
];
