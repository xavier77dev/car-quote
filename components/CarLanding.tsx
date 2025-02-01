import { FeatureCar } from "./FeatureCar";
import { FormQuote } from "./form/quote/FormQuote";

export default function CarLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
          <FeatureCar />
          <FormQuote />
        </div>
      </div>
    </div>
  );
}
