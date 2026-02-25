import { getAllApis } from "@/lib/api-data";
import { HomeClient } from "@/components/home-client";

export default function Home() {
  const apis = getAllApis();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HomeClient apis={apis} />

      <footer className="mt-20 border-t border-border pb-8 pt-6 text-center text-sm text-muted-foreground">
        <p>
          API catalog data from{" "}
          <a
            href="https://github.com/marcelscruz/public-apis"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            marcelscruz/public-apis
          </a>{" "}
          (MIT). Built with Next.js + Tailwind CSS.
        </p>
        <p className="mt-2">
          <a
            href="https://github.com/akuligowski9/api-explorer"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            View on GitHub
          </a>
          {" "}&middot;{" "}
          <a
            href="https://github.com/akuligowski9/api-explorer/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Contribute
          </a>
        </p>
      </footer>
    </div>
  );
}
