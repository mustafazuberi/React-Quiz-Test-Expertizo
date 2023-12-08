import { IoStarSharp } from "react-icons/io5";

const difficultyLevels = Object.freeze({
  HARD: "hard",
  MEDIUM: "medium",
  EASY: "easy",
});

const DifficultyStars = ({ difficulty }: { difficulty: String }) => {
  const starCount = 3;
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const isWhite =
        (difficulty === difficultyLevels.MEDIUM && i === starCount - 1) ||
        (difficulty === difficultyLevels.EASY && i >= starCount - 2);
      stars.push(
        <IoStarSharp key={i} className={isWhite ? "text-gray-200" : "text-black"} />
      );
    }

    return stars;
  };
  return (
    <section>
      <section className="flex flex-row gap-x-1">
        {renderStars().map((star: React.ReactNode) => star)}
      </section>
    </section>
  );
};

export default DifficultyStars;
