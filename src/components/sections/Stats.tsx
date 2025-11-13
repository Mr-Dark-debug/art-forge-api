export function Stats() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">12,847+</p>
            <p className="text-muted-foreground">Images Today</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">342+</p>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">89+</p>
            <p className="text-muted-foreground">Models</p>
          </div>
        </div>
      </div>
    </div>
  );
}
