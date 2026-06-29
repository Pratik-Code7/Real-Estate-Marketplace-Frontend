import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="py-10 bg-white font-serif min-h-screen flex items-center justify-center">
      <div className="text-center w-full max-w-3xl">
        {/* 404 Image Section */}
        <div
          className="h-[400px] bg-center bg-no-repeat bg-contain flex items-start justify-center"
          style={{
            backgroundImage:
              "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
          }}
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mt-10">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="-mt-12">
          <h3 className="text-2xl sm:text-3xl font-semibold">
            Look like you're lost
          </h3>

          <p className="mt-2 text-gray-600">
            the page you are looking for not available!
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
