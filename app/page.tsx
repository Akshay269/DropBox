import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to DropBox, <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            officia excepturi
          </h1>

          <p className="pb-20">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
            vero excepturi, tempora temporibus, expedita quia reprehenderit cum,
            voluptas vel asperiores alias quas velit consequuntur doloribus
            maiores sapiente enim ab magni. Facilis, fugiat.
          </p>

          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
          >
            Try it for Now
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1E1010] dark:bg-slate=800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
}
