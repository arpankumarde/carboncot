import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

const Page = () => {
  return (
    <Suspense>
      <PaymentPage />
    </Suspense>
  );
};

export default Page;
