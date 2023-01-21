import { HabitDay } from "../HabitDay";
import { generateDatesFromYearBeginning } from "../../utils/generate-dates-from year-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDatesFromYearBeginning();
const mintDatesSize = 18 * 7;
const amountDaysToFill = mintDatesSize - summaryDates.length;

export const SummaryTable = () => {
  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, i) => {
          return (
            <div
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
            >
              {weekDay}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          return <HabitDay key={date.toString()} />;
        })}

        {amountDaysToFill > 0 &&
          Array.from({
            length: amountDaysToFill,
          }).map((_, i) => 
              <div key={i.toString()} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"/>;
          )}
      </div>
    </div>
  );
};
