import Counter from "@/components/ui/counter";
import "./../ui/counter.css";

export function Stats() {
  return (
    <div className="w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold">
              <Counter value={12847} fontSize={60} fontWeight="bold" textColor="#95d63f" />
            </div>
            <p className="text-2xl font-semibold mt-4 dark:text-white text-black">Images Today</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold">
              <Counter value={342} fontSize={60} fontWeight="bold" textColor="#95d63f" />
            </div>
            <p className="text-2xl font-semibold mt-4 dark:text-white text-black">Active Users</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold">
              <Counter value={89} fontSize={60} fontWeight="bold" textColor="#95d63f" />
            </div>
            <p className="text-2xl font-semibold mt-4 dark:text-white text-black">Models</p>
          </div>
        </div>
      </div>
    </div>
  );
}