interface HabitProps  {
  completed: number;
}

export const Habit =  (props: HabitProps) => {

  const {completed = 0} = props;

  return <p className="bg-red-600 w-10 h-10 text-white rounded m-2 flex items-center justify-center">{completed}</p>
} 