import Header from "../components/Header";
import Hero from "../components/Hero";
import WallpaperGrid from "../components/WallpaperGrid";

const categories = [
  {
    title: "Activity",
    items: [
      "Dark Aesthetic",
      "Pink Aesthetic",
      "Blue Aesthetic",
      "Red Aesthetic",
    ],
  },
  {
    title: "Car",
    items: [
      "Carbon Fiber",
      "Lamborghini",
      "BMW",
      "Tesla",
      "Mustang",
      "Ferrari",
    ],
  },
  {
    title: "Cute",
    items: [
      "Kawaii",
      "Hello Kitty",
      "Gudetama",
      "Line Friends",
      "Kakao Friends",
    ],
  },
  {
    title: "Fantasy",
    items: ["Unicorn", "Cyberpunk", "Aladdin", "Retro", "Fairy", "Wonderland"],
  },
  {
    title: "Animal",
    items: [
      "Wolf",
      "Dragon",
      "Unicorn",
      "Cat",
      "Lion",
      "Tiger",
      "Fox",
      "Elephant",
    ],
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-primary text-gray-100">
      <Header />
      <Hero />
      <WallpaperGrid />
    </div>
  );
};

export default Home;
