import Image from "next/image";
import {TextForm} from "@/components/TextForm";

export default function Home() {
  return (
      <>
          <div className="flex justify-center py-10 mb-5">
              <h1 className="text-6xl font-bold">free text vault!</h1>
          </div>
          <TextForm />
      </>
  );
}