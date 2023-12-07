import { FaStar } from "react-icons/fa";


const difficultyLevels = Object.freeze({
  HARD: 'hard',
  MEDIUM: 'medium',
  EASY: 'easy'
})

const DifficultyStars = ({ difficulty }: { difficulty: String }) => {
  return (
    <section>
      {
        difficulty === difficultyLevels.HARD ? <section className='flex flex-row gap-x-1'>
          <FaStar />
          <FaStar />
          <FaStar />
        </section > : difficulty === difficultyLevels.MEDIUM ? <section className='flex flex-row gap-x-1'>
          <FaStar />
          <FaStar />
          <FaStar className='text-gray-400' />
        </section> : <section className='flex flex-row gap-x-1'>
          <FaStar />
          <FaStar className='text-gray-400' />
          <FaStar className='text-gray-400' />
        </section>
      }
    </section>
  )
}

export default DifficultyStars