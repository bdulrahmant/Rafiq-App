function AuthLayout({ image, children, imageRight = false }) {
  return (
    <div className="min-h-screen flex">

      {/* image left */}
      {!imageRight && (
        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="auth"
            className="w-full h-screen object-cover"
          />
        </div>
      )}

      {/* form/content */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 bg-gray-50">
        {children}
      </div>

      {/* image right */}
      {imageRight && (
        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="auth"
            className="w-full h-screen object-cover"
          />
        </div>
      )}

    </div>
  );
}

export default AuthLayout;