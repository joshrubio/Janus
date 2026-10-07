import { Suspense } from "react";
import { redirect } from "next/navigation";

function RedirectToCatalog(): never {
  redirect("/catalog");
}

export default function RootPage() {
  return (
    <Suspense>
      <RedirectToCatalog />
    </Suspense>
  );
}
