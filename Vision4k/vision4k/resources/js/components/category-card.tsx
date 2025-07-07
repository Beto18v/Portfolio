// Definimos los tipos para las props del componente
interface CategoryCardProps {
    category: {
        id: number;
        name: string;
        image: string;
    };
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <div className="relative transform overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={category.image} alt={category.name} className="h-48 w-full object-cover" />
            <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
            </div>
        </div>
    );
}
