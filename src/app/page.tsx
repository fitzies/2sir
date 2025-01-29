import PageWrapper from "@/components/page-wrapper";
import Link from "next/link";

function LinkBox({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      className="border px-4 lg:w-1/4 w-5/6 py-1 rounded-lg hover:opacity-50 duration-150"
      href={href}
    >
      <p>{name}</p>
      <p className="text-xs text-zinc-400">{description}</p>
    </Link>
  );
}

export default async function Page() {
  return (
    <PageWrapper className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold py-4 text-center">
        2nd Battalion, Singapore Infantry Regigment Links
      </h1>
      <div className="w-full h-[70vh] flex flex-col justify-center items-center gap-4">
        <LinkBox
          name="SST"
          description="Fill in SST forms for them to later be approved by your officer
        commanding."
          href="/forms/sst"
        />
        <LinkBox
          name="PAR"
          description="Fill in Post-Action Review for previous conducts to be shared in the Battalion."
          href="/"
        />
      </div>
    </PageWrapper>
  );
}
