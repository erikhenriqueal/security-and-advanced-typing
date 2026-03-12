import AuthSelector from "../../components/AuthSelector";

export default function AuthPage() {
  return (
    <div className="w-full h-dvh md:*:inline-block lg:*:align-top">
      <div className="w-1/2 h-full bg-secondary"></div>
      <div className="w-1/2 h-full">
        <div className="h-full grid place-content-center">
          <AuthSelector />
        </div>
      </div>
    </div>
  );
}