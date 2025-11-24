import { getLandingPage } from "@/lib/dynamic-landing";
import BankHome from "./(landing)/bank/page";
import HomePage from "./(landing)/home/page";
import VetHome from "./(landing)/vet/page";

export default function LandingPage() {
  const landingPage = getLandingPage();

  switch (landingPage) {
    case "bank":
      return <BankHome />;
    case "vet":
      return <VetHome />;
    default:
      return <HomePage />;
  }
}
