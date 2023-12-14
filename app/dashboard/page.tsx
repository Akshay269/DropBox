import { auth } from "@clerk/nextjs";
import { db } from "@/firebase";
import Dropzone from "@/components/Dropzone";
import { collection, getDocs } from "firebase/firestore";
import { FileType } from "@/typings";
import TableWrapper from "@/components/Table/TableWrapper";

async function Dashboard() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));
  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().createdAt?.seconds * 1000) || undefined,
    size: doc.data().size,
    type: doc.data().type,
    downloadURL: doc.data().downloadURL,
    fullName: doc.data().fullName,
  }));

  console.log(skeletonFiles);

  return (
    <div>
      <Dropzone />

      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>

        <div>{<TableWrapper skeletonFiles={skeletonFiles} />}</div>
      </section>
    </div>
  );
}

export default Dashboard;
