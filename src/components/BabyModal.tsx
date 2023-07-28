import { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "./Button";
import { useRef } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import AWS from "aws-sdk";
import useStore from "~/store/userStore";

interface Props {
  onClose: () => void;
}

export default function BabyModal({ onClose }: Props) {
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null); // Add this line
  const nameRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const user = useStore((state) => state.user);
  const { data: sessionData } = useSession();

  const newBaby = api.baby.addBaby.useMutation();
  // const { data: presignedUrl } = api.baby.getPresignedUrl.useQuery({
  //   fileName: fileName || "default",
  // });

  // const addBaby = () => {
  //   const imageKey = `${user?.id}-${nameRef.current?.value}`;
  //   if (imageKey) {
  //     setFileName(imageKey); // This will trigger the useQuery hook to run
  //   }
  //   console.log(presignedUrl);
  //   if (presignedUrl) {
  //     uploadFile(presignedUrl, file!);
  //   }
  // };

  // const uploadFile = async (url: string, file: File): Promise<void> => {
  //   console.log(url, file);
  //   try {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: file,
  //       headers: {
  //         "Content-Type": file.type,
  //       },
  //     });

  //     if (!response.ok) {
  //       const errorBody = await response.text(); // Get response body as text
  //       console.error("Error uploading file:", errorBody); // Log the error body
  //       return;
  //     }

  //     console.log("File uploaded successfully");
  //   } catch (err) {
  //     console.error("Error during the request:", err);
  //   }
  // };

  const addBaby = () => {
    if (
      !nameRef.current?.value ||
      !birthDateRef.current?.value ||
      !imageRef.current?.value ||
      !user?.id
    ) {
      console.log("missing data");
      return;
    }
    const imageKey = `${user?.id}-${nameRef.current?.value}`;
    newBaby.mutate({
      userId: user?.id,
      name: nameRef.current?.value,
      image: imageKey,
      birthDate: new Date(birthDateRef.current?.value),
    });
    uploadToS3(file!, imageKey);

    onClose();
  };

  const uploadToS3 = (file: File, imageKey: string) => {
    console.log("s3");
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
      if (!bucketName) {
        console.error("AWS bucket name is not defined");
        return;
      }
      console.log(imageKey);
      const params: AWS.S3.PutObjectRequest = {
        Bucket: bucketName,
        Key: imageKey,
        Body: Buffer.from(reader.result as ArrayBuffer),
      };

      try {
        const s3 = new AWS.S3({
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
          region: process.env.NEXT_PUBLIC_AWS_REGION,
        });

        const stored = await s3.upload(params).promise();
        console.log(stored);
      } catch (error) {
        console.error(error);
      }
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(true)}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="rounded-lg bg-white p-20 text-left">
                <form>
                  <div className="flex flex-col">
                    <div>
                      <h2>
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                          Add a Baby
                        </Dialog.Title>
                      </h2>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          ref={nameRef}
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Baby's name"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <div className="mt-1">
                        <input
                          ref={birthDateRef}
                          type="date"
                          name="dateOfBirth"
                          id="dateOfBirth"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Baby's name"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <div className="mt-1">
                        <input
                          ref={imageRef}
                          type="file"
                          name="image"
                          id="image"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Baby's name"
                          onChange={(e) => {
                            if (e.target.files)
                              setFile(e.target.files[0] || null);
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex flex-row">
                      <Button
                        className="mr-4"
                        color="slate"
                        type="button"
                        onClick={onClose}
                      >
                        <span className="text-white">Cancel</span>
                      </Button>
                      <Button color="blue" type="button" onClick={addBaby}>
                        <span className="text-white">Add</span>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
