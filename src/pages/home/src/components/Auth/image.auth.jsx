function AuthImage({ src }) {
    return (
        <div className="hidden md:w-1/2 md:block h-screen">
        <img
            src={src}
            alt="auth"
            className="w-full h-full object-cover"
        />
        </div>
    );
    }

export default AuthImage;