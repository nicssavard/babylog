import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../../display/Button";
import { api } from "~/utils/api";
import AWS from "aws-sdk";
import useStore from "~/store/userStore";
import FormInput from "../../display/FormInput";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../../display/loading";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInputs {
  name: string;
  birthDate: string;
  image: FileList;
}

interface Props {
  onClose: () => void;
}

export default function NewBabyModal({ onClose }: Props) {
  const [open, setOpen] = useState(true);
  const user = useStore((state) => state.user);

  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => addBaby(data);

  const { mutate: newBaby, isLoading: isPosting } =
    api.baby.addBaby.useMutation({
      onSuccess: () => {
        toast.success("Baby added!");
        onClose();
      },
      onError: (e) => {
        console.log(e);
        toast.error("Failed to post! Please try again later.");
      },
    });

  const addBaby = (data: FormInputs) => {
    if (!user) {
      toast.error("Please log in first!");
      return;
    }
    const imageKey = `${user?.id}-${data.name}`;
    newBaby({
      userId: user?.id,
      name: data.name,
      image: imageKey,
      birthDate: new Date(data.birthDate),
    });
    uploadToS3(data.image[0]!, imageKey);
  };

  const uploadToS3 = (file: File, imageKey: string) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
      if (!bucketName) {
        return;
      }
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
                <form
                  /* eslint-disable */ /* Error: Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises */
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex flex-col">
                    <div>
                      <h2>
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                          Add a Baby
                        </Dialog.Title>
                      </h2>
                    </div>
                    <FormInput
                      label="Name"
                      register={register("name", { required: true })}
                      type="text"
                      placeholder="Baby's name"
                    />
                    <FormInput
                      label="Date of Birth"
                      register={register("birthDate", { required: true })}
                      type="date"
                    />
                    <FormInput
                      label="Image"
                      register={register("image", { required: true })}
                      type="file"
                    />
                    <div className="mt-5 flex flex-row">
                      <Button
                        className="mr-4"
                        color="slate"
                        type="button"
                        onClick={onClose}
                      >
                        <span className="text-white">Cancel</span>
                      </Button>
                      {!isPosting ? (
                        <Button color="blue" type="submit">
                          <span className="text-white">Add</span>
                        </Button>
                      ) : (
                        <LoadingSpinner size={30} />
                      )}
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
