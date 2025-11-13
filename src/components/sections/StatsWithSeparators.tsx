export function StatsWithSeparators() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold" style={{ color: '#95d63f' }}>12,847+</p>
            <p className="text-muted-foreground">Images Today</p>
          </div>
          <span className="text-4xl font-bold text-black dark:text-white hidden md:block">|</span>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold" style={{ color: '#95d63f' }}>342+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <span className="text-4xl font-bold text-black dark:text-white hidden md:block">|</span>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold" style={{ color: '#95d63f' }}>89+</p>
            <p className="text-muted-foreground">Models</p>
          </div>
        </div>
      </div>
    </div>
  );
}