const FoodApp = () => {
  const foodElements = [
    "/food-svgs/apple.svg",
    "/food-svgs/banana.svg",
    "/food-svgs/carrot.svg",
    // Add more SVGs here
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Food app</h1>
      <div className="bg-gray-200 p-8">
        <h1 className="text-3xl font-bold mb-4">My Refrigerator</h1>
        <div className="grid grid-cols-3 gap-4">
          {foodElements.map((src, index) => (
            <div key={index} className="text-center">
              <img
                src={src}
                alt={`Food ${index}`}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p>Food {index}</p>
            </div>
          ))}
        </div>
      </div>
      <ul class="space-y-4">
        <li class="flex items-center">
          <svg
            class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
          <p class="ml-4">
            Customizing your
            <code class="text-sm font-bold text-gray-900">
              tailwind.config.js
            </code>{" "}
            file
          </p>
        </li>
        <li class="flex items-center">
          <svg
            class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
          <p class="ml-4">
            Extracting classes with
            <code class="text-sm font-bold text-gray-900">@apply</code>
          </p>
        </li>
        <li class="flex items-center">
          <svg
            class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="11" />
            <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
          </svg>
          <p class="ml-4">Code completion with instant preview</p>
        </li>
      </ul>
      <button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
    </div>
  );
};

export default FoodApp;
