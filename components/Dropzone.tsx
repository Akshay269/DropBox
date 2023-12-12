"use client";
import {cn} from "@/lib/utils"
import DropzoneComponent from "react-dropzone";
import { useState } from "react";
import {useUser} from "@clerk/nextjs";
import {addDoc,collection,serverTimestamp} from "firebase/firestore";
import {db, storage} from "@/firebase";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";


function Dropzone() {
  const maxSize = 20971520;
  const [loading, setLoading] = useState(false);
  const {isLoaded,isSignedIn,user}=useUser();

  const onDrop = (acceptedFiles:File[]) => {
     acceptedFiles.forEach((file) => {
       const reader = new FileReader();
       reader.onabort = () => console.log("file reading was aborted");
       reader.onerror = () => console.log("file reading has failed");
       reader.onload = async() => {
         await uploadPost(file);
       };
       reader.readAsArrayBuffer(file);
     });
  }

  const uploadPost = async(selectedFile:File) => {
     if(loading) return;
     if(!user) return;

     setLoading(true);
     const docRef=await addDoc(collection(db,"users",user.id,"files"),{
        userId:user.id,
        filename:selectedFile.name,
        fullName:user.fullName,
        profileImg:user.imageUrl,
        type:selectedFile.type,
        size:selectedFile.size,
        createdAt:serverTimestamp()
      });

      const imageRef=ref(storage, 'users/${user.id}/files/${docRef.id}');

      uploadBytes(imageRef,selectedFile).then(async(snapshot) => {
        const downloadURL=await getDownloadURL(imageRef);
        await updateDoc(doc(db,"users",user.id,"files",docRef.id),{
          fileUrl:downloadURL,
        });
      });


      setLoading(false);

  };

  return (
    <DropzoneComponent
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragReject,
        isDragActive,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn
                ("w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center" ,
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400")
              }
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
