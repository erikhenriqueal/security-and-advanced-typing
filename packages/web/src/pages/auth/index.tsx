import AuthPageHero from "../../components/AuthPageHero";
import AuthSelector from "../../components/AuthSelector";

export default function AuthPage() {
  return (
    // <div className="w-full min-h-dvh h-max my-12 space-y-8 lg:h-dvh lg:my-0 lg:space-y-0 lg:*:inline-block lg:*:align-top lg:*:w-1/2 lg:*:h-full">
    <div className="w-full min-h-dvh flex flex-col py-12 gap-8 lg:h-dvh lg:flex-row lg:py-0 lg:gap-0 lg:*:w-1/2 lg:*:h-full">
      <div>
        <div className="min-h-96 mx-8 bg-secondary rounded-3xl lg:h-full lg:m-0 lg:rounded-none">
          <AuthPageHero />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-center items-center mx-2 lg:h-full">
          <AuthSelector />
        </div>
      </div>
    </div>
  );
}