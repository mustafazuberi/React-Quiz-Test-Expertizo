import { FaStar } from "react-icons/fa";

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

      stars.push(<FaStar key={i} color={isWhite ? "white" : "black"} />);
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
